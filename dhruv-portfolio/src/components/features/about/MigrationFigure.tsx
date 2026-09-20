import type { CSSProperties } from "react";
import { cellLevels, hashSeed, mulberry32 } from "@/lib/pattern";
import { cn } from "@/lib/utils";

const SIZE = 8;
const SEED = "old-system-new-system";
const STAGES = ["E", "T", "L"] as const;

// Same pattern on both sides: it is the same data. Order is seeded so the move looks organic, not row by row.
const levels = cellLevels(SEED, SIZE, SIZE);
const rand = mulberry32(hashSeed(`${SEED}-order`));
const order = Array.from({ length: SIZE * SIZE }, () => Math.round(rand() * 60));
const total = levels.flat().filter((level) => level > 0).length;

function Grid({ side }: { side: "old" | "new" }) {
  return (
    <div className="grid flex-1 grid-cols-8 gap-0.75">
      {levels.flatMap((row, y) =>
        row.map((level, x) => {
          const i = y * SIZE + x;
          // Level 0 is an empty slot. In the old system the data is grey; in the new one the accent cells appear.
          if (level === 0) return <span key={i} className="aspect-square border border-border" />;
          return (
            <span
              key={i}
              className={cn(
                "aspect-square",
                side === "old" ? "mig-out bg-foreground" : "mig-in",
                side === "new" && (level === 3 ? "bg-primary" : "bg-foreground"),
              )}
              style={{ "--o": order[i] } as CSSProperties}
            />
          );
        }),
      )}
    </div>
  );
}

/**
 * "I move data from old systems to new ones", drawn. As the statement beside it is read (CSS scroll-driven, see
 * globals.css) a copy of every tile travels from the old grid to the new one, vermilion in transit, while the
 * Extract / Transform / Load stages light up in turn and a counter ticks up to the number of tiles moved.
 * Without scroll-timeline support or with reduced motion it shows the finished state. Decorative, hidden from
 * assistive tech; below `lg` the statement fills the row, so there is no gap to fill and this is not rendered.
 */
export function MigrationFigure({ className }: { className?: string }) {
  return (
    <figure aria-hidden="true" className={cn("mig", className)}>
      <div className="flex items-center gap-(--mig-g)">
        <Grid side="old" />
        <div className="flex w-(--mig-c) shrink-0 flex-col gap-1.5">
          {STAGES.map((stage, i) => (
            <span
              key={stage}
              className="mig-stage t-label flex aspect-square w-full items-center justify-center border border-primary bg-primary text-primary-foreground"
              style={{ "--s": i } as CSSProperties}
            >
              {stage}
            </span>
          ))}
        </div>
        <Grid side="new" />
      </div>
      <figcaption className="t-label mt-3 flex justify-between text-muted-foreground">
        <span>Old system</span>
        <span>New system</span>
      </figcaption>
      <div className="t-label mt-8 flex items-baseline justify-between gap-4 border-t border-border pt-3 text-muted-foreground">
        <span>Fig. 02 / Extract, transform, load</span>
        <span
          className="mig-count whitespace-nowrap tabular-nums text-foreground"
          data-total={total}
          style={{ "--total": total } as CSSProperties}
        />
      </div>
    </figure>
  );
}
