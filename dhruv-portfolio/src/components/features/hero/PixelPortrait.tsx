"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pixel Portrait — the site's signature (DESIGN.md §4.6).
 * A small pixel-art image is rebuilt as a live cell mosaic on a 2D canvas:
 *   - load: cells "decode" top→bottom with a brief accent flash (≤ INTRO_MS)
 *   - pointer: cells near the cursor heat toward --primary and cool back down
 *   - idle: static — the rAF loop stops itself when nothing is animating
 * Pauses when off-screen / tab hidden. Reduced motion = one static draw, no pointer effects.
 * Colours: portrait pixels come from the image; the heat colour is read from the --primary-rgb token.
 */

const INTRO_MS = 1400;
const HEAT_RADIUS = 4.5; // cells
const HEAT_DECAY_MS = 260; // exponential time constant

function hash(x: number, y: number): number {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

interface PixelPortraitProps {
  /** Small pixel-art source (e.g. 64×64). Sampled 1 pixel → 1 cell. */
  src: string;
  /** Cells per side; must match the source resolution. */
  size?: number;
  /** Accessible name. Omit when a sibling <img> already names the portrait (the canvas is then aria-hidden). */
  label?: string;
  className?: string;
}

export function PixelPortrait({ src, size = 64, label, className }: PixelPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const n = size;
    const rgb = new Uint8ClampedArray(n * n * 3);
    const heat = new Float32Array(n * n);
    const threshold = new Float32Array(n * n);
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) threshold[y * n + x] = (y / n) * 0.8 + hash(x, y) * 0.2;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let accent: [number, number, number] = [255, 88, 45];
    let cellPx = 1;
    let dpr = 1;
    let ready = false;
    let visible = true;
    let disposed = false;
    let raf = 0;
    let start = 0;
    let lastT = 0;

    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary-rgb");
      const parts = raw.split(",").map((s) => parseInt(s, 10));
      if (parts.length === 3 && parts.every(Number.isFinite)) accent = [parts[0], parts[1], parts[2]];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cellPx = Math.max(1, Math.floor((wrap.clientWidth * dpr) / n));
      const px = cellPx * n;
      canvas.width = px;
      canvas.height = px;
      canvas.style.width = `${px / dpr}px`;
      canvas.style.height = `${px / dpr}px`;
    };

    /** Paints one frame; returns whether another frame is needed. */
    const draw = (now: number): boolean => {
      const reduced = reduceMotion.matches;
      const p = reduced ? 1 : Math.min(1, (now - start) / INTRO_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gap = cellPx >= 6 ? Math.max(1, Math.round(dpr)) : 0; // ~1 css px gutter
      const fill = cellPx - gap;
      let hot = false;
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          const i = y * n + x;
          let r = rgb[i * 3];
          let g = rgb[i * 3 + 1];
          let b = rgb[i * 3 + 2];
          if (!reduced) {
            if (p < 1) {
              const t = threshold[i];
              if (p < t) continue; // not decoded yet
              if (p - t < 0.09) [r, g, b] = accent; // decode flash
            }
            const h = heat[i];
            if (h > 0.01) {
              hot = true;
              r += (accent[0] - r) * h;
              g += (accent[1] - g) * h;
              b += (accent[2] - b) * h;
            }
          }
          ctx.fillStyle = `rgb(${r | 0} ${g | 0} ${b | 0})`;
          ctx.fillRect(x * cellPx, y * cellPx, fill, fill);
        }
      }
      return p < 1 || hot;
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = lastT ? now - lastT : 16;
      lastT = now;
      const k = Math.exp(-dt / HEAT_DECAY_MS);
      for (let i = 0; i < heat.length; i++) heat[i] *= k;
      if (draw(now)) raf = requestAnimationFrame(frame);
      else lastT = 0;
    };

    const kick = () => {
      if (!raf && ready && visible && !document.hidden && !disposed) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      if (!ready || reduceMotion.matches) return;
      const rect = canvas.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * n;
      const cy = ((e.clientY - rect.top) / rect.height) * n;
      if (cx < 0 || cy < 0 || cx >= n || cy >= n) return;
      const x0 = Math.max(0, Math.floor(cx - HEAT_RADIUS));
      const x1 = Math.min(n - 1, Math.ceil(cx + HEAT_RADIUS));
      const y0 = Math.max(0, Math.floor(cy - HEAT_RADIUS));
      const y1 = Math.min(n - 1, Math.ceil(cy + HEAT_RADIUS));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
          if (d < HEAT_RADIUS) {
            const i = y * n + x;
            heat[i] = Math.max(heat[i], 1 - d / HEAT_RADIUS);
          }
        }
      }
      kick();
    };

    const redrawStatic = () => {
      if (ready) draw(performance.now());
    };

    // -- setup ---------------------------------------------------------------------------
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      const off = document.createElement("canvas");
      off.width = n;
      off.height = n;
      const og = off.getContext("2d", { willReadFrequently: true });
      if (!og) return;
      og.imageSmoothingEnabled = false;
      og.drawImage(img, 0, 0, n, n);
      const data = og.getImageData(0, 0, n, n).data;
      for (let i = 0; i < n * n; i++) {
        rgb[i * 3] = data[i * 4];
        rgb[i * 3 + 1] = data[i * 4 + 1];
        rgb[i * 3 + 2] = data[i * 4 + 2];
      }
      ready = true;
      readAccent();
      resize();
      start = performance.now();
      if (reduceMotion.matches) redrawStatic();
      else kick();
    };
    img.src = src;

    const resizeObserver = new ResizeObserver(() => {
      if (!ready) return;
      resize();
      redrawStatic();
      kick();
    });
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    intersection.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      readAccent();
      redrawStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onVisibility = () => kick();
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", redrawStatic);
    wrap.addEventListener("pointermove", onPointer);
    wrap.addEventListener("pointerdown", onPointer);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", redrawStatic);
      wrap.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerdown", onPointer);
    };
  }, [src, size]);

  return (
    <div ref={wrapRef} className={cn("relative aspect-square w-full touch-pan-y select-none", className)}>
      <canvas
        ref={canvasRef}
        {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
        className="absolute inset-0 m-auto block max-w-full"
      />
    </div>
  );
}
