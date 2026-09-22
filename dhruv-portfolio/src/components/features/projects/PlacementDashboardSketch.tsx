import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SAMPLE_STUDENTS, type SampleRecord } from "@/lib/placement-sample";

// Areas the owner confirmed the staff screens covered (2026-09-23).
const TABS = ["Students", "Drives", "Stats"] as const;
const COLS = "grid-cols-[1.7fr_0.9fr_0.6fr_0.7fr]";

function describe(rows: SampleRecord[]): string {
  const twice = rows.find((row) => row.mark === "Twice");
  const updated = rows.find((row) => row.mark === "Updated");
  return [
    `Reconstruction, not a screenshot: the placement portal's staff screen, with ${rows.length} sample student rows (branch, CGPA, backlogs).`,
    twice
      ? `${twice.name} appears twice, as ${rows
          .filter((row) => row.name === twice.name)
          .map((row) => row.branch.replace(/\.$/, ""))
          .join(" and as ")}.`
      : "",
    updated ? `${updated.name} is marked as updated.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * MUJ Placement Portal: a redrawn staff screen, because no real screenshot can be shared. Drawn from the owner's
 * description (student records, drives, stats; staff and admin log in, students don't). It is a picture of a UI, so
 * it is one image to assistive tech, and the caption says plainly what it is. `rows` lets the home demo show what an
 * import produced; `compact` drops the key where the surrounding text already explains it.
 */
export function PlacementDashboardSketch({
  rows = SAMPLE_STUDENTS,
  compact = false,
  caption = "Fig. The staff screen, redrawn",
  className,
}: {
  rows?: SampleRecord[];
  compact?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div role="img" aria-label={describe(rows)} className="overflow-hidden border border-border bg-card">
        <div aria-hidden="true">
          <div className="t-label flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-muted-foreground">
            <span>Placement portal / Staff</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 bg-foreground" />
              Signed in: TnP staff
            </span>
          </div>

          <div className="t-label flex border-b border-border">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={cn(
                  "border-r border-border px-4 py-2.5",
                  i === 0 ? "border-b-2 border-b-foreground text-foreground" : "text-muted-foreground",
                )}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-88 font-mono text-[0.8125rem]">
              <div className={cn("t-label grid gap-3 border-b border-border px-4 py-2.5 text-muted-foreground", COLS)}>
                <span>Student</span>
                <span>Branch</span>
                <span>CGPA</span>
                <span>Backlogs</span>
              </div>
              {rows.map((row, i) => (
                <div
                  key={`${row.name}-${i}`}
                  data-mark={row.mark}
                  style={{ "--i": i } as CSSProperties}
                  className={cn(
                    "sketch-row",
                    "grid gap-3 border-b border-border px-4 py-2.5 last:border-b-0",
                    COLS,
                    row.mark && "bg-primary/10",
                  )}
                >
                  <span className="flex flex-wrap items-center gap-x-2 whitespace-nowrap">
                    {row.name}
                    {row.mark ? <span className="t-label bg-primary px-1.5 text-primary-foreground">{row.mark}</span> : null}
                  </span>
                  <span className="text-muted-foreground">{row.branch}</span>
                  <span>{row.cgpa}</span>
                  <span className={row.backlogs ? "text-foreground" : "text-muted-foreground"}>{row.backlogs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="t-label mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-muted-foreground">
        <span>{caption}</span>
        <span>Reconstruction, not a screenshot. Sample data</span>
        {compact ? null : (
          <span className="w-full normal-case tracking-normal">
            CGPA: grade average out of 10. Backlogs: failed courses not yet cleared.
          </span>
        )}
      </figcaption>
    </figure>
  );
}
