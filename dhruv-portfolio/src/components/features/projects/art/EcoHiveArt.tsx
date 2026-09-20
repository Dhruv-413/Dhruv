import type { CSSProperties } from "react";
import { hashSeed, mulberry32 } from "@/lib/pattern";
import { cn } from "@/lib/utils";

const R = 24; // hex radius
const GAP = 2;
const W = Math.sqrt(3) * R;
const ROW_H = 1.5 * R;
const ROWS = 11;
const COLS = 10;

const rand = mulberry32(hashSeed("ecohive-hive"));

function hexPoints(cx: number, cy: number) {
  return Array.from({ length: 6 }, (_, k) => {
    const angle = (Math.PI / 180) * (60 * k + 30);
    return `${(cx + (R - GAP) * Math.cos(angle)).toFixed(1)},${(cy + (R - GAP) * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");
}

// Rows of cells; about one in six is a "credit" (accent), one in five a softly filled cell, the rest are empty.
const rows = Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLS }, (_, col) => {
    const cx = 14 + col * W + (row % 2 ? W / 2 : 0);
    const cy = 22 + row * ROW_H;
    const r = rand();
    return { key: `${row}-${col}`, points: hexPoints(cx, cy), kind: r < 0.16 ? "credit" : r < 0.36 ? "soft" : "empty" };
  }),
);

const LEGEND = ["Trees", "Water", "Air", "Mangroves"] as const;

/**
 * EcoHive: a hive of cells, the platform's mission (trees, water, air, mangroves) as its legend. Some cells hold
 * credit (accent). Hover a cell and it lights up, then fades slowly, so the cursor leaves a trail through the hive.
 * The rows fade in from the top when the art scrolls into view. Decorative.
 */
export function EcoHiveArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative size-full", className)} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="block size-full" focusable="false">
        {rows.map((cells, row) => (
          <g key={row} className="cell-in" style={{ "--i": row * 5 } as CSSProperties}>
            {cells.map((cell) => (
              <polygon
                key={cell.key}
                points={cell.points}
                className={cn("hex", cell.kind === "credit" && "hex-credit", cell.kind === "soft" && "hex-soft")}
              />
            ))}
          </g>
        ))}
      </svg>
      <p className="t-label pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-x-4 gap-y-1 border-t border-border bg-card px-3 py-2 text-muted-foreground">
        {LEGEND.map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="size-1.5 bg-primary" />
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
