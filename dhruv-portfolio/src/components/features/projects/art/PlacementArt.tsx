"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hashSeed, mulberry32 } from "@/lib/pattern";
import { cn } from "@/lib/utils";

type State = "before" | "after";

const COLS = 5;
const ROWS = 5;
const TILE_W = 44;
const TILE_H = 28;

const rand = mulberry32(hashSeed("muj-placement-portal"));
// Each record has two homes: a hand-made scatter (before) and a row in the table (after).
const records = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    i,
    ax: 62 + col * 56,
    ay: 92 + row * 42,
    bx: 10 + rand() * 336,
    by: 40 + rand() * 250,
    br: (rand() - 0.5) * 48,
    flag: rand() < 0.3,
  };
});

/**
 * MUJ Placement Portal: the whole point of the project, as a toggle. Before: placement records as loose sheets
 * scattered by hand. After: the same records in one ordered table. It plays once, into "after", when it scrolls into
 * view (straight to "after" with reduced motion); the buttons let you go back and forth. The state lives on the
 * wrapper as `data-state` and the tiles move with CSS transitions. Decorative illustration, real controls.
 */
export function PlacementArt({ className }: { className?: string }) {
  const [state, setState] = useState<State>("before");
  const wrapRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setState("after");
        }, reduce ? 0 : 650);
      },
      { threshold: 0.5 },
    );
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const choose = (next: State) => {
    touched.current = true;
    setState(next);
  };

  return (
    <div ref={wrapRef} data-state={state} className={cn("flex size-full flex-col", className)}>
      <svg viewBox="0 0 400 340" className="block min-h-0 w-full flex-1" aria-hidden="true" focusable="false">
        <text x={14} y={24} className="art-fade show-before fill-muted-foreground font-mono text-[10px] uppercase tracking-widest">
          Manual sheets
        </text>
        <text x={14} y={24} className="art-fade show-after fill-muted-foreground font-mono text-[10px] uppercase tracking-widest">
          One central database
        </text>

        {/* the database frame, only in "after" */}
        <g className="art-fade show-after">
          <rect x={46} y={60} width={308} height={244} className="fill-none stroke-primary" strokeWidth={2} />
          <rect x={46} y={60} width={308} height={20} className="fill-primary" />
          <text x={56} y={74} className="fill-primary-foreground font-mono text-[9px] uppercase tracking-widest">
            Placement records
          </text>
        </g>

        {records.map((record) => (
          <g
            key={record.i}
            className="rec"
            style={
              {
                "--i": record.i,
                "--ax": `${record.ax}px`,
                "--ay": `${record.ay}px`,
                "--bx": `${record.bx.toFixed(1)}px`,
                "--by": `${record.by.toFixed(1)}px`,
                "--br": `${record.br.toFixed(1)}deg`,
              } as CSSProperties
            }
          >
            <rect width={TILE_W} height={TILE_H} className="fill-card stroke-foreground/60" />
            <line x1={6} x2={28} y1={10} y2={10} className="stroke-foreground/35" />
            <line x1={6} x2={20} y1={18} y2={18} className="stroke-foreground/35" />
            {record.flag ? <rect x={34} y={6} width={6} height={6} className="fill-primary" /> : null}
          </g>
        ))}
      </svg>

      <div role="group" aria-label="Placement tracking, before and after the portal" className="t-label grid shrink-0 grid-cols-2 border-t border-border">
        {(
          [
            ["before", "Before: by hand"],
            ["after", "After: one database"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={state === value}
            onClick={() => choose(value)}
            className={cn(
              "min-h-11 px-3 text-left transition-colors duration-(--dur-ui) ease-(--ease-out)",
              state === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
