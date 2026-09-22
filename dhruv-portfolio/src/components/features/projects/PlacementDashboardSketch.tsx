import { cn } from "@/lib/utils";

// Synthetic rows. The portal is private and holds real student data, so nothing here comes from it.
const ROWS = [
  { name: "Sample student 01", branch: "CSE", cgpa: "8.4", backlogs: 0 },
  { name: "Sample student 02", branch: "IT", cgpa: "7.1", backlogs: 0 },
  { name: "Sample student 03", branch: "ECE", cgpa: "6.2", backlogs: 2 },
  { name: "Sample student 04", branch: "CSE", cgpa: "9.0", backlogs: 0 },
  { name: "Sample student 05", branch: "ME", cgpa: "6.8", backlogs: 1 },
];

// Areas the owner confirmed the staff screens covered (2026-09-23).
const TABS = ["Students", "Drives", "Stats"] as const;

/**
 * MUJ Placement Portal: a redrawn staff screen, because no real screenshot can be shared. Drawn from the owner's
 * description (student records with eligibility, drives, stats; staff and admin log in, students don't). It is a
 * picture of a UI, so it is one image to assistive tech, and the caption says plainly what it is.
 */
export function PlacementDashboardSketch({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        role="img"
        aria-label="Reconstruction, not a screenshot: a redrawn staff screen of the placement portal with Students, Drives and Stats tabs, and a table of five sample students showing branch, CGPA, backlogs and whether each is eligible."
        className="overflow-hidden border border-border bg-card"
      >
        <div aria-hidden="true">
          <div className="t-label flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-muted-foreground">
            <span>Placement portal / Staff</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 bg-primary" />
              Signed in: TnP staff
            </span>
          </div>

          <div className="t-label flex border-b border-border">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={cn(
                  "border-r border-border px-4 py-2.5",
                  i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-120 font-mono text-[0.8125rem]">
              <div className="t-label grid grid-cols-[1.6fr_0.7fr_0.6fr_0.8fr_0.9fr] gap-3 border-b border-border px-4 py-2.5 text-muted-foreground">
                <span>Student</span>
                <span>Branch</span>
                <span>CGPA</span>
                <span>Backlogs</span>
                <span>Eligible</span>
              </div>
              {ROWS.map((row) => {
                const eligible = row.backlogs === 0 && Number(row.cgpa) >= 7;
                return (
                  <div
                    key={row.name}
                    className="grid grid-cols-[1.6fr_0.7fr_0.6fr_0.8fr_0.9fr] gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
                  >
                    <span>{row.name}</span>
                    <span className="text-muted-foreground">{row.branch}</span>
                    <span>{row.cgpa}</span>
                    <span className={row.backlogs ? "text-foreground" : "text-muted-foreground"}>{row.backlogs}</span>
                    <span className="flex items-center gap-2">
                      <span className={cn("size-2", eligible ? "bg-primary" : "border border-foreground/50")} />
                      {eligible ? "Yes" : "No"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="t-label mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-muted-foreground">
        <span>Fig. The staff screen, redrawn</span>
        <span>Reconstruction, not a screenshot. Sample data</span>
        <span className="w-full normal-case tracking-normal">
          CGPA: grade average out of 10. Backlogs: failed courses not yet cleared. Eligible: may apply to placement drives
          (company hiring rounds).
        </span>
      </figcaption>
    </figure>
  );
}
