"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

// The eye: two cubic curves from corner to corner. Landmark dots are sampled along them, like a face mesh.
const LEFT = { x: 36, y: 200 };
const RIGHT = { x: 364, y: 200 };
const TOP = [LEFT, { x: 100, y: 118 }, { x: 300, y: 118 }, RIGHT] as const;
const BOTTOM = [RIGHT, { x: 300, y: 282 }, { x: 100, y: 282 }, LEFT] as const;
const EYE_PATH = `M ${LEFT.x} ${LEFT.y} C ${TOP[1].x} ${TOP[1].y} ${TOP[2].x} ${TOP[2].y} ${RIGHT.x} ${RIGHT.y} C ${BOTTOM[1].x} ${BOTTOM[1].y} ${BOTTOM[2].x} ${BOTTOM[2].y} ${LEFT.x} ${LEFT.y} Z`;

function bezier(p: readonly { x: number; y: number }[], t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * p[0].x + 3 * u * u * t * p[1].x + 3 * u * t * t * p[2].x + t * t * t * p[3].x,
    y: u * u * u * p[0].y + 3 * u * u * t * p[1].y + 3 * u * t * t * p[2].y + t * t * t * p[3].y,
  };
}
const LANDMARKS = [...Array.from({ length: 9 }, (_, i) => bezier(TOP, i / 8)), ...Array.from({ length: 7 }, (_, i) => bezier(BOTTOM, (i + 1) / 8))];

const MAX_X = 40;
const MAX_Y = 15;

/**
 * Eye gaze tracking, turned around: the eye follows your cursor. The iris is clipped to the eye, a reticle marks the
 * gaze point, a dashed line joins them and a readout shows the gaze in the box. Click (anywhere) to blink.
 * Pointer-driven only: nothing moves by itself, and with reduced motion the eye still follows but without easing.
 * All updates go straight to the DOM (no React state), and the rAF loop rests once the eye has caught up. Decorative.
 */
export function EyeGazeArt({ className }: { className?: string }) {
  const clipId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const irisRef = useRef<SVGGElement>(null);
  const reticleRef = useRef<SVGGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const readoutRef = useRef<SVGTSpanElement>(null);
  const lidRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const iris = irisRef.current;
    const reticle = reticleRef.current;
    const line = lineRef.current;
    const readout = readoutRef.current;
    const lid = lidRef.current;
    if (!svg || !iris || !reticle || !line || !readout || !lid) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let blinkTimer = 0;
    // current and target positions: iris offset (ix, iy) and reticle (rx, ry) in the 400x400 art space
    const cur = { ix: 0, iy: 0, rx: 200, ry: 200 };
    const tar = { ix: 0, iy: 0, rx: 200, ry: 200 };

    const apply = () => {
      iris.setAttribute("transform", `translate(${cur.ix.toFixed(2)} ${cur.iy.toFixed(2)})`);
      reticle.setAttribute("transform", `translate(${cur.rx.toFixed(1)} ${cur.ry.toFixed(1)})`);
      line.setAttribute("x1", (200 + cur.ix).toFixed(1));
      line.setAttribute("y1", (200 + cur.iy).toFixed(1));
      line.setAttribute("x2", cur.rx.toFixed(1));
      line.setAttribute("y2", cur.ry.toFixed(1));
      readout.textContent = `GAZE ${(cur.rx / 400).toFixed(2)}, ${(cur.ry / 400).toFixed(2)}`;
    };

    const step = () => {
      raf = 0;
      const k = reduce.matches ? 1 : 0.22;
      cur.ix += (tar.ix - cur.ix) * k;
      cur.iy += (tar.iy - cur.iy) * k;
      cur.rx += (tar.rx - cur.rx) * k;
      cur.ry += (tar.ry - cur.ry) * k;
      apply();
      const settled = Math.abs(tar.ix - cur.ix) + Math.abs(tar.iy - cur.iy) + Math.abs(tar.rx - cur.rx) + Math.abs(tar.ry - cur.ry) < 0.08;
      if (!settled) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      if (!rect.width) return;
      // where the eye looks: relative to the eye, scaled by the viewport, so the whole page is "in view"
      const nx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)));
      tar.ix = nx * MAX_X;
      tar.iy = ny * MAX_Y;
      // the reticle sits where the cursor is inside the art, and on its nearest edge when the cursor is outside
      tar.rx = Math.max(16, Math.min(384, ((e.clientX - rect.left) / rect.width) * 400));
      tar.ry = Math.max(16, Math.min(384, ((e.clientY - rect.top) / rect.height) * 400));
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onDown = () => {
      lid.dataset.blink = "true";
      window.clearTimeout(blinkTimer);
      blinkTimer = window.setTimeout(() => {
        lid.dataset.blink = "false";
      }, 150);
    };

    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(blinkTimer);
    };
  }, []);

  return (
    <div className={cn("relative size-full", className)} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 400 400" className="block size-full" focusable="false">
        <defs>
          <clipPath id={clipId}>
            <path d={EYE_PATH} />
          </clipPath>
        </defs>

        {/* measuring grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} className="stroke-border" strokeWidth={1}>
            <line x1={(i + 1) * 40} x2={(i + 1) * 40} y1={0} y2={400} />
            <line x1={0} x2={400} y1={(i + 1) * 40} y2={(i + 1) * 40} />
          </g>
        ))}

        <g ref={lidRef} className="eye-lid" data-blink="false">
          <path d={EYE_PATH} className="fill-card stroke-foreground" strokeWidth={2} />
          <g clipPath={`url(#${clipId})`}>
            <g ref={irisRef}>
              <circle cx={200} cy={200} r={54} className="fill-foreground/10 stroke-foreground" strokeWidth={2} />
              <circle cx={200} cy={200} r={38} className="fill-none stroke-foreground/40" strokeWidth={1} />
              <circle cx={200} cy={200} r={22} className="fill-primary" />
              <rect x={188} y={186} width={9} height={9} className="fill-card" />
            </g>
          </g>
        </g>

        {/* face-mesh style landmarks around the eye */}
        {LANDMARKS.map((p, i) => (
          <rect key={i} x={p.x - 2.5} y={p.y - 2.5} width={5} height={5} className="fill-primary" />
        ))}

        <line ref={lineRef} x1={200} y1={200} x2={200} y2={200} className="stroke-primary" strokeWidth={1} strokeDasharray="3 4" />
        <g ref={reticleRef}>
          <rect x={-13} y={-13} width={26} height={26} className="fill-none stroke-primary" strokeWidth={1.5} />
          <path d="M -21 0 H -7 M 7 0 H 21 M 0 -21 V -7 M 0 7 V 21" className="stroke-primary" strokeWidth={1.5} />
        </g>

        <text x={14} y={386} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest">
          <tspan ref={readoutRef}>GAZE 0.50, 0.50</tspan>
        </text>
        <text x={386} y={386} textAnchor="end" className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest">
          30 FPS / 5.3 DEG ERROR
        </text>
        <text x={14} y={22} className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest">
          MediaPipe landmarks
        </text>
      </svg>
    </div>
  );
}
