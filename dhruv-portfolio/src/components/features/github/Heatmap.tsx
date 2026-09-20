import type { ContributionWeek } from "@/types/github";
import { cn } from "@/lib/utils";

const LEVEL = [
  "bg-foreground/8",
  "bg-foreground/22",
  "bg-foreground/42",
  "bg-foreground/68",
  "bg-primary",
] as const;

const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const dayFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Contribution calendar in the site's square-cell language (DESIGN.md §4.6/§4.9). Visible at every width: below
 * ~760px it scrolls horizontally instead of being hidden. Cells are decorative; the region carries a text summary.
 */
export function Heatmap({ weeks, total }: { weeks: ContributionWeek[]; total: number }) {
  if (!weeks.length) return null;

  // Label a column with its month name when the month differs from the previous column's.
  const monthOf = (week: ContributionWeek) => (week.days[0] ? new Date(week.days[0].date).getUTCMonth() : -1);
  // Keep at least MIN_GAP columns between labels so short months never collide ("SEPT" + "OCT").
  const MIN_GAP = 3;
  const monthLabels: string[] = [];
  let lastLabelled = -MIN_GAP;
  for (let i = 0; i < weeks.length; i++) {
    const first = weeks[i].days[0];
    const changed = i === 0 || monthOf(weeks[i - 1]) !== monthOf(weeks[i]);
    if (first && changed && i - lastLabelled >= MIN_GAP) {
      monthLabels.push(monthFormatter.format(new Date(first.date)));
      lastLabelled = i;
    } else {
      monthLabels.push("");
    }
  }

  const columns = `repeat(${weeks.length}, minmax(0, 1fr))`;

  return (
    <div>
      <div
        role="region"
        aria-label={`Contribution calendar: ${total.toLocaleString("en-US")} contributions in the last year`}
        tabIndex={0}
        className="overflow-x-auto pb-3"
      >
        <div className="min-w-[760px]">
          <div className="t-label mb-2 grid text-muted-foreground" style={{ gridTemplateColumns: columns, columnGap: 3 }} aria-hidden="true">
            {monthLabels.map((label, i) => (
              <span key={i} className="overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-flow-col" style={{ gridTemplateColumns: columns, gridTemplateRows: "repeat(7, auto)", gap: 3 }} aria-hidden="true">
            {weeks.flatMap((week, weekIndex) =>
              week.days.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${dayFormatter.format(new Date(day.date))}`}
                  className={cn("cell-in aspect-square", LEVEL[Math.min(4, Math.max(0, day.level))])}
                  style={{ "--i": weekIndex } as React.CSSProperties}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <div className="t-label mt-3 flex items-center justify-end gap-2 text-muted-foreground" aria-hidden="true">
        Less
        {LEVEL.map((cls) => (
          <span key={cls} className={cn("size-3", cls)} />
        ))}
        More
      </div>
    </div>
  );
}
