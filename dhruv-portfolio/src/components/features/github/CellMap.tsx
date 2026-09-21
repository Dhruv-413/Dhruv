import type { CSSProperties } from "react";
import type { Level } from "@/lib/github/calendar";
import { FILL_CLASS } from "./levels";

/** A cell is CELL units wide with GAP between cells; the viewBox scales the whole map with its container. */
const CELL = 10;
const GAP = 2;
export const PITCH = CELL + GAP;
/** Width or height of `n` cells in viewBox units (the last cell has no trailing gap). */
export const spanOf = (n: number) => n * PITCH - GAP;

export interface MapCell {
  col: number;
  row: number;
  level: Level;
}

/**
 * The square-cell picture (DESIGN.md §4.6) as one SVG with a path per level, instead of one element per cell:
 * a year of days is 5 paths, not 366 divs, so hydration, style recalculation and re-render on every step stay small.
 * Decorative: the page carries the same data as text and as a range input.
 */
export function CellMap({
  cols,
  rows,
  cells,
  ring,
  className,
  style,
}: {
  cols: number;
  rows: number;
  cells: MapCell[];
  /** A cell to outline (the selected day, or the busiest hour). */
  ring?: { col: number; row: number } | null;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: string[] = ["", "", "", "", ""];
  for (const cell of cells) paths[cell.level] += `M${cell.col * PITCH} ${cell.row * PITCH}h${CELL}v${CELL}h${-CELL}z`;

  return (
    <svg viewBox={`0 0 ${spanOf(cols)} ${spanOf(rows)}`} className={className} style={style} aria-hidden="true" focusable="false">
      {([0, 1, 2, 3, 4] as const).map((level) => (paths[level] ? <path key={level} d={paths[level]} className={FILL_CLASS[level]} /> : null))}
      {ring ? (
        <rect
          x={ring.col * PITCH - 1.5}
          y={ring.row * PITCH - 1.5}
          width={CELL + 3}
          height={CELL + 3}
          fill="none"
          className="stroke-foreground"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}
