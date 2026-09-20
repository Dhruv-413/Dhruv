import { cellLevels } from "@/lib/pattern";
import { cn } from "@/lib/utils";

const COLS = 64;
const ROWS = 14;
const STEP = 10;
const FILL = [
  "fill-foreground/6",
  "fill-foreground/16",
  "fill-foreground/45",
  "fill-primary",
] as const;

/**
 * Typographic project "cover" (DESIGN.md §4.8): no screenshots exist, so each project gets a deterministic cell
 * pattern seeded from its id (same square-cell language as the portrait and the GitHub heatmap). Decorative.
 */
export function ProjectCover({ id, className }: { id: string; className?: string }) {
  const levels = cellLevels(id, COLS, ROWS);
  return (
    <svg
      viewBox={`0 0 ${COLS * STEP} ${ROWS * STEP}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("block w-full border border-border bg-card", className)}
    >
      {levels.flatMap((row, y) =>
        row.map((level, x) => (
          <rect key={`${x}-${y}`} x={x * STEP + 1} y={y * STEP + 1} width={STEP - 2} height={STEP - 2} className={FILL[level]} />
        )),
      )}
    </svg>
  );
}
