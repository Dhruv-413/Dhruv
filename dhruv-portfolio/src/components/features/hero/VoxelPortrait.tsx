"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pixel Vortex: the hero's interactive signature (DESIGN.md §4.6).
 *
 * The 64x64 pixel-art avatar is 4096 tiles, drawn as flat instanced quads: one draw call, no 3D library, no MSAA,
 * no per-pixel lighting. All motion is analytic in the vertex shader (no per-tile CPU physics, no ping-pong buffers),
 * so the cost per frame is one small uniform upload plus 16k vertices, which even an old integrated GPU handles.
 *   - load    : every tile spirals in from a wider, rotated orbit and lands on its pixel, flashing --primary
 *   - pointer : a whirlpool follows the cursor and leaves a short wake; tiles near it twist, lift and tint,
 *               then unwind back to the picture as the trail fades (about 1 s)
 *   - click   : a ring pulse pushes tiles outward as it travels across the face
 *   - scroll  : leaving the hero winds the picture slowly around its centre
 *   - idle    : once, right after the intro, one scripted swirl crosses the face so the interaction is discoverable
 * The picture always settles back to the clean, frontal portrait, and the loop rests when nothing is moving.
 * Safety: canvas capped at ~720 px and DPR 1.5, quality steps down (then stops animating) if frames run long,
 * weak-CPU devices start at a lower quality, context loss is handled, reduced motion draws one static frame,
 * no WebGL2 calls `onUnsupported` (parent swaps in the 2D canvas).
 */

const N = 64; // source resolution: tiles per side
const TRAIL = 8;
const PULSES = 2;
const TRAIL_GAP = 4.5; // cells between wake whirlpools; closer moves just drag the head one along
const FOV = (28 * Math.PI) / 180;
const REST_RY = 0.04;
const REST_RX = 0.05;
const INTRO_MS = 1700;
const INTRO_SPAN = 1.1; // shader intro parameter at the end of INTRO_MS (per-tile stagger uses the extra 0.1)
const EFFECT_MS = 2400; // keep drawing this long after the last trail/pulse; both are invisible by then
const SCROLL_GRACE_MS = 160;
const DEMO_DELAY_MS = 500;
const DEMO_MS = 1500;
const MAX_SIDE = 720; // device px, before the quality factor
const SLOW_FRAME_MS = 34; // averaged; below ~30 fps we step quality down

type Mat4 = Float32Array;

const identity = (): Mat4 => {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
};
const mul = (a: Mat4, b: Mat4): Mat4 => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  }
  return o;
};
const perspective = (fovy: number, aspect: number, near: number, far: number): Mat4 => {
  const f = 1 / Math.tan(fovy / 2);
  const o = new Float32Array(16);
  o[0] = f / aspect;
  o[5] = f;
  o[10] = (far + near) / (near - far);
  o[11] = -1;
  o[14] = (2 * far * near) / (near - far);
  return o;
};
const rotX = (a: number): Mat4 => {
  const m = identity();
  const c = Math.cos(a);
  const s = Math.sin(a);
  m[5] = c;
  m[6] = s;
  m[9] = -s;
  m[10] = c;
  return m;
};
const rotY = (a: number): Mat4 => {
  const m = identity();
  const c = Math.cos(a);
  const s = Math.sin(a);
  m[0] = c;
  m[2] = -s;
  m[8] = s;
  m[10] = c;
  return m;
};
const translate = (x: number, y: number, z: number): Mat4 => {
  const m = identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
};

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 aCell;
layout(location=1) in vec3 aColor;

uniform mat4 uProj;
uniform mat4 uModel;
uniform float uN;
uniform float uIntro;
uniform float uTime;
uniform float uScroll;
uniform vec4 uTrail[${TRAIL}];
uniform vec4 uPulse[${PULSES}];
uniform vec3 uAccent;

out vec3 vColor;
out vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 rot(vec2 v, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

void main() {
  // quad corner from the vertex id (triangle strip): no vertex buffer needed
  vec2 corner = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1));
  vUv = corner;

  vec2 centre = vec2(uN * 0.5 - 0.5);
  vec2 pos = aCell;
  float radius = length(pos - centre);
  float lift = 0.0;
  float energy = 0.0;
  float spin = 0.0;
  float size = 1.02;

  // intro: tiles spiral in from a wider orbit, staggered, and pop to full size
  float thr = hash(aCell) * 0.35 + (1.0 - min(radius / 45.0, 1.0)) * 0.25;
  float t = clamp((uIntro - thr) / 0.5, 0.0, 1.0);
  float k = pow(1.0 - t, 3.0);
  pos = centre + rot(pos - centre, k * (2.4 + radius * 0.06)) * (1.0 + k * 1.5);
  size *= smoothstep(0.0, 0.3, t);
  float flash = k * step(0.001, t) * 0.9;

  // scroll: the picture winds slowly around its centre as the hero leaves
  pos = centre + rot(pos - centre, uScroll * uScroll * 1.5 * smoothstep(0.0, 40.0, radius));

  // pointer trail: each point is a whirlpool that unwinds as it ages
  for (int i = 0; i < ${TRAIL}; i++) {
    vec4 tr = uTrail[i];
    float age = uTime - tr.z;
    float life = tr.w * exp(-age * 2.6);
    vec2 d = pos - tr.xy;
    float f = life * (1.0 - smoothstep(0.0, 7.5, length(d)));
    pos = tr.xy + rot(d, f * 1.6) * (1.0 + f * 0.15);
    spin += f * 1.6;
    lift += f * 2.2;
    energy += f;
  }

  // click pulses: a ring travels outward and shoves tiles ahead of it
  for (int j = 0; j < ${PULSES}; j++) {
    vec4 q = uPulse[j];
    float age = uTime - q.z;
    vec2 d = pos - q.xy;
    float dist = length(d) + 0.0001;
    float band = (dist - age * 30.0) / 3.2;
    float ring = exp(-band * band) * exp(-age * 1.7) * q.w;
    pos += d / dist * ring * 2.4;
    lift += ring * 3.5;
    energy += ring * 0.9;
  }

  vec3 world = vec3(pos.x - uN * 0.5 + 0.5, uN * 0.5 - 0.5 - pos.y, lift);
  // a hair of per-instance depth keeps overlapping coplanar tiles from flickering
  world.z += float(gl_InstanceID) * 0.00001;
  // tiles turn with the swirl and swell a little, so a twisted patch stays a filled patch (no see-through gaps)
  world.xy += rot((corner - 0.5) * size * (1.0 + min(energy, 1.5) * 0.3), spin);

  gl_Position = uProj * (uModel * vec4(world, 1.0));
  vColor = mix(aColor, uAccent, clamp(flash + energy * 0.2, 0.0, 0.5)) * (1.0 + energy * 0.08);
}
`;

const FRAG = `#version 300 es
precision mediump float;
in vec3 vColor;
in vec2 vUv;
out vec4 outColor;
void main() {
  // a faint darker rim gives the mosaic its tile edges without geometry gaps or MSAA
  vec2 e = abs(vUv - 0.5);
  float rim = smoothstep(0.38, 0.5, max(e.x, e.y));
  outColor = vec4(vColor * (1.0 - 0.2 * rim), 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("createShader failed");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader: ${log}`);
  }
  return shader;
}

interface VoxelPortraitProps {
  /** 64x64 source image, sampled 1 pixel : 1 tile. */
  src: string;
  className?: string;
  /** First frame drawn: the parent can retire its static placeholder. */
  onReady?: () => void;
  /** WebGL2 missing / context lost / shader failure: the parent should render a fallback. */
  onUnsupported?: () => void;
}

export function VoxelPortrait({ src, className, onReady, onUnsupported }: VoxelPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Effect Events: always call the latest parent callbacks without re-running (and re-creating) the GL context.
  const notifyReady = useEffectEvent(() => onReady?.());
  const notifyUnsupported = useEffectEvent(() => onUnsupported?.());

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      depth: true,
      powerPreference: "default",
    });
    if (!gl) {
      notifyUnsupported();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weakDevice = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

    let disposed = false;
    let ready = false;
    let visible = true;
    let raf = 0;
    let quality = weakDevice ? 0.72 : 1;
    let lite = false;
    let accent: [number, number, number] = [1, 0.345, 0.176];

    // pose (smoothed toward targets)
    let ry = REST_RY;
    let rx = REST_RX;
    let targetRy = REST_RY;
    let targetRx = REST_RX;
    const startedAt = performance.now();
    let lastFrame = 0;
    let lastEffectAt = 0;
    let lastScrollAt = 0;
    let ema = 16.7;
    let frames = 0;
    let progress = 0;

    const trail = new Float32Array(TRAIL * 4); // x, y, birth (s), strength
    const pulses = new Float32Array(PULSES * 4);
    const emptyTrail = new Float32Array(TRAIL * 4);
    const emptyPulses = new Float32Array(PULSES * 4);
    let trailHead = 0;
    let pulseHead = 0;
    let headIdx = -1; // the trail slot currently following the cursor
    let prevCx = -99;
    let prevCy = -99;
    let demo: "waiting" | "running" | "done" = reduceMotion.matches ? "done" : "waiting";
    let demoStart = 0;

    // -- GL setup ---------------------------------------------------------------------------
    let program: WebGLProgram;
    let vao: WebGLVertexArrayObject | null = null;
    const buffers: WebGLBuffer[] = [];
    let instanceCount = 0;
    const loc: Record<string, WebGLUniformLocation | null> = {};

    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      const p = gl.createProgram();
      if (!p) throw new Error("createProgram failed");
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(`link: ${gl.getProgramInfoLog(p)}`);
      program = p;
    } catch (error) {
      console.warn("[PixelVortex] falling back to 2D:", error);
      notifyUnsupported();
      return;
    }
    for (const name of ["uProj", "uModel", "uN", "uIntro", "uTime", "uScroll", "uTrail", "uPulse", "uAccent"]) {
      loc[name] = gl.getUniformLocation(program, name);
    }

    const readAccent = () => {
      const parts = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-rgb")
        .split(",")
        .map((s) => parseInt(s, 10));
      if (parts.length === 3 && parts.every(Number.isFinite)) accent = [parts[0] / 255, parts[1] / 255, parts[2] / 255];
    };

    const currentModel = (): Mat4 => mul(rotX(rx), rotY(ry));

    const draw = (nowMs: number, live: boolean) => {
      if (!ready) return;
      const t = live ? (nowMs - startedAt) / 1000 : 0;
      const intro = live ? Math.min(1, (nowMs - startedAt) / INTRO_MS) * INTRO_SPAN : INTRO_SPAN;
      const aspect = canvas.width / Math.max(1, canvas.height);
      const dist = (N * 1.12) / (2 * Math.tan(FOV / 2));
      const proj = mul(perspective(FOV, aspect, 10, 400), translate(0, 0, -dist));

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(program);
      gl.uniformMatrix4fv(loc.uProj, false, proj);
      gl.uniformMatrix4fv(loc.uModel, false, currentModel());
      gl.uniform1f(loc.uN, N);
      gl.uniform1f(loc.uIntro, intro);
      gl.uniform1f(loc.uTime, t);
      gl.uniform1f(loc.uScroll, live ? progress : 0);
      gl.uniform4fv(loc.uTrail, live ? trail : emptyTrail);
      gl.uniform4fv(loc.uPulse, live ? pulses : emptyPulses);
      gl.uniform3f(loc.uAccent, accent[0], accent[1], accent[2]);
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, instanceCount);
    };

    /** Size the drawing buffer: ~1 device px per CSS px (max 1.5), capped so a big or hi-DPI screen never over-fills. */
    const resize = () => {
      const cssW = Math.max(1, wrap.clientWidth);
      const cssH = Math.max(1, wrap.clientHeight);
      const scale = Math.min(
        Math.min(window.devicePixelRatio || 1, 1.5) * quality,
        (MAX_SIDE * quality) / Math.max(cssW, cssH),
      );
      const w = Math.max(1, Math.round(cssW * scale));
      const h = Math.max(1, Math.round(cssH * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const drawStatic = () => {
      if (!ready) return;
      ry = REST_RY;
      rx = REST_RX;
      resize();
      draw(performance.now(), false);
    };

    /** Ray-cast the pointer onto the picture plane (model space) and return grid coordinates. */
    const pointerToCell = (clientX: number, clientY: number): [number, number] | null => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      const tanH = Math.tan(FOV / 2);
      const aspect = rect.width / rect.height;
      const d = [nx * tanH * aspect, ny * tanH, -1];
      const dist = (N * 1.12) / (2 * tanH);
      const m = currentModel();
      const rt = (v: number[]) => [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[4] * v[0] + m[5] * v[1] + m[6] * v[2],
        m[8] * v[0] + m[9] * v[1] + m[10] * v[2],
      ]; // R^T * v
      const rd = rt(d);
      const rc = rt([0, 0, -dist]);
      if (Math.abs(rd[2]) < 1e-4) return null;
      const s = rc[2] / rd[2];
      const local = rt([d[0] * s, d[1] * s, d[2] * s + dist]);
      return [local[0] + N / 2 - 0.5, N / 2 - 0.5 - local[1]];
    };

    /** The head whirlpool follows the cursor; once it has moved TRAIL_GAP cells a new one is left behind as wake. */
    const moveVortex = (cx: number, cy: number, nowS: number, strength: number) => {
      const head = headIdx * 4;
      if (headIdx >= 0 && Math.hypot(cx - trail[head], cy - trail[head + 1]) < TRAIL_GAP) {
        trail[head] = cx;
        trail[head + 1] = cy;
        trail[head + 2] = nowS;
        trail[head + 3] = strength;
      } else {
        headIdx = trailHead;
        const o = headIdx * 4;
        trail[o] = cx;
        trail[o + 1] = cy;
        trail[o + 2] = nowS;
        trail[o + 3] = strength;
        trailHead = (trailHead + 1) % TRAIL;
      }
      lastEffectAt = performance.now();
    };

    const pushPulse = (cx: number, cy: number, nowS: number) => {
      const o = pulseHead * 4;
      pulses[o] = cx;
      pulses[o + 1] = cy;
      pulses[o + 2] = nowS;
      pulses[o + 3] = 1;
      pulseHead = (pulseHead + 1) % PULSES;
      lastEffectAt = performance.now();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!ready || reduceMotion.matches || lite) return;
      const rect = wrap.getBoundingClientRect();
      const ux = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const uy = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      demo = "done";
      targetRy = REST_RY + ux * 0.2;
      targetRx = REST_RX + uy * 0.14;
      const cell = pointerToCell(e.clientX, e.clientY);
      if (cell) {
        // faster strokes make a stronger whirlpool
        const speed = Math.hypot(cell[0] - prevCx, cell[1] - prevCy);
        prevCx = cell[0];
        prevCy = cell[1];
        moveVortex(cell[0], cell[1], (performance.now() - startedAt) / 1000, Math.min(1.2, 0.55 + speed * 0.08));
      }
      lastEffectAt = performance.now();
      kick();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!ready || reduceMotion.matches || lite) return;
      demo = "done";
      const cell = pointerToCell(e.clientX, e.clientY);
      if (cell) pushPulse(cell[0], cell[1], (performance.now() - startedAt) / 1000);
      onPointerMove(e);
    };
    const onPointerLeave = () => {
      targetRy = REST_RY;
      targetRx = REST_RX;
      lastEffectAt = performance.now();
      kick();
    };
    const onScroll = () => {
      lastScrollAt = performance.now();
      kick();
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden || reduceMotion.matches || lite) return;
      const dt = lastFrame ? Math.min(now - lastFrame, 120) : 16.7;
      lastFrame = now;
      const nowS = (now - startedAt) / 1000;

      // pose easing (frame-rate independent)
      const k = 1 - Math.exp(-dt / 200);
      ry += (targetRy - ry) * k;
      rx += (targetRx - rx) * k;

      // scroll progress: 0 while the portrait is on screen, 1 once it has left the top
      const rect = wrap.getBoundingClientRect();
      progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

      // one scripted swirl after the intro, until the visitor takes over
      const introDone = now - startedAt > INTRO_MS;
      if (demo === "waiting" && now - startedAt > INTRO_MS + DEMO_DELAY_MS) {
        demo = "running";
        demoStart = now;
      }
      if (demo === "running") {
        const u = (now - demoStart) / DEMO_MS;
        if (u >= 1) demo = "done";
        else moveVortex(31.5 + 21 * Math.sin(u * Math.PI * 1.7 + 0.6), 30 + 17 * Math.sin(u * Math.PI * 2.7), nowS, 0.9);
      }

      // watchdog: keep the page smooth on weak GPUs (quality steps down, then animation stops)
      frames++;
      ema = ema * 0.9 + dt * 0.1;
      if (frames > 40 && ema > SLOW_FRAME_MS) {
        if (quality > 0.55) {
          quality = quality > 0.8 ? 0.72 : 0.5;
          resize();
          ema = 16.7;
          frames = 0;
        } else {
          lite = true;
          drawStatic();
          return;
        }
      }

      draw(now, true);

      // Rest once the intro, effects and pose have all settled: WCAG 2.2.2, and no idle battery cost.
      const settled = Math.abs(ry - targetRy) < 0.002 && Math.abs(rx - targetRx) < 0.002;
      const busy =
        !introDone ||
        demo !== "done" ||
        !settled ||
        performance.now() - lastEffectAt < EFFECT_MS ||
        performance.now() - lastScrollAt < SCROLL_GRACE_MS;
      if (busy) raf = requestAnimationFrame(frame);
    };

    function kick() {
      if (!raf && ready && visible && !document.hidden && !disposed && !reduceMotion.matches && !lite) {
        lastFrame = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    const contextLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      notifyUnsupported();
    };
    canvas.addEventListener("webglcontextlost", contextLost);

    // -- load the pixels and build instance data ----------------------------------------------
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      const off = document.createElement("canvas");
      off.width = N;
      off.height = N;
      const og = off.getContext("2d", { willReadFrequently: true });
      if (!og) {
        notifyUnsupported();
        return;
      }
      og.imageSmoothingEnabled = false;
      og.drawImage(img, 0, 0, N, N);
      const data = og.getImageData(0, 0, N, N).data;

      // per instance: cell x, cell y, r, g, b (5 floats)
      const inst = new Float32Array(N * N * 5);
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const i = y * N + x;
          inst.set([x, y, data[i * 4] / 255, data[i * 4 + 1] / 255, data[i * 4 + 2] / 255], i * 5);
        }
      }
      instanceCount = N * N;

      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const ivbo = gl.createBuffer();
      if (!ivbo) {
        notifyUnsupported();
        return;
      }
      buffers.push(ivbo);
      gl.bindBuffer(gl.ARRAY_BUFFER, ivbo);
      gl.bufferData(gl.ARRAY_BUFFER, inst, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0);
      gl.vertexAttribDivisor(0, 1);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8);
      gl.vertexAttribDivisor(1, 1);
      gl.bindVertexArray(null);

      readAccent();
      resize();
      ready = true;
      if (reduceMotion.matches) drawStatic();
      else kick();
      notifyReady();
    };
    img.onerror = () => notifyUnsupported();
    img.src = src;

    // -- observers -----------------------------------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      if (!ready) return;
      resize();
      if (reduceMotion.matches || lite) drawStatic();
      else kick();
    });
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    intersection.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readAccent();
      if (reduceMotion.matches || lite) drawStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onVisibility = () => kick();
    const onMotionChange = () => {
      if (reduceMotion.matches) {
        progress = 0;
        drawStatic();
      } else kick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (vao) gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={cn("relative aspect-square w-full touch-pan-y select-none", className)}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
    </div>
  );
}
