import { cutsOf, levelOf } from "@/lib/github/calendar";
import type { RhythmData } from "@/lib/github/types";
import { CellMap, PITCH, spanOf, type MapCell } from "./CellMap";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOUR_LABELS = [0, 6, 12, 18];
const COLUMNS = "2.5rem minmax(0, 1fr) 3.25rem";

const hh = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

/**
 * Weekday x hour of my public commits, in IST: the same square-cell language as the ledger, drawn as one SVG.
 * Server component, no interaction; the figure carries a text summary because the cells are a picture.
 */
export function Rhythm({ rhythm }: { rhythm: RhythmData }) {
  const { grid, peak, total, weekdayTotals } = rhythm;
  if (!total || !peak) return null;

  const cuts = cutsOf(grid.flat());
  const cells: MapCell[] = grid.flatMap((row, weekday) => row.map((count, hour) => ({ col: hour, row: weekday, level: levelOf(count, cuts) })));
  const busiestDay = weekdayTotals.indexOf(Math.max(...weekdayTotals));

  return (
    <figure>
      <div role="group" aria-label="Commit rhythm grid, scrolls sideways on small screens" tabIndex={0} className="thin-scroll overflow-x-auto pb-2">
        <div role="img" aria-label="Public commits by weekday and hour, India Standard Time. The summary is below the grid." className="min-w-[460px]">
          <div className="t-label mb-2 grid text-muted-foreground" style={{ gridTemplateColumns: COLUMNS }} aria-hidden="true">
            <span />
            <span className="relative h-4">
              {HOUR_LABELS.map((hour) => (
                <span key={hour} className="absolute top-0" style={{ left: `${((hour * PITCH) / spanOf(24)) * 100}%` }}>
                  {String(hour).padStart(2, "0")}
                </span>
              ))}
            </span>
            <span className="text-right">Total</span>
          </div>
          <div className="grid" style={{ gridTemplateColumns: COLUMNS, gridTemplateRows: "repeat(7, minmax(0, 1fr))" }} aria-hidden="true">
            <CellMap
              className="cell-wipe col-start-2 row-span-7 row-start-1 block h-auto w-full"
              cols={24}
              rows={7}
              cells={cells}
              ring={{ col: peak.hour, row: peak.weekday }}
            />
            {DAYS.map((day, weekday) => (
              <span key={day} className="t-label self-center text-muted-foreground" style={{ gridColumn: 1, gridRow: weekday + 1 }}>
                {day}
              </span>
            ))}
            {weekdayTotals.map((n, weekday) => (
              <span
                key={weekday}
                className="t-label self-center text-right font-mono tabular-nums text-muted-foreground"
                style={{ gridColumn: 3, gridRow: weekday + 1 }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
        <span className="text-foreground">{DAYS_LONG[peak.weekday]}s, {hh(peak.hour)} to {hh((peak.hour + 1) % 24)} IST</span> is the busiest hour ({peak.count}{" "}
        {peak.count === 1 ? "commit" : "commits"}), and {DAYS_LONG[busiestDay]} is the busiest day ({weekdayTotals[busiestDay]} of {total}). Public repositories only; the hours are India Standard Time.
      </figcaption>
    </figure>
  );
}
