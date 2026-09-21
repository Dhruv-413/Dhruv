import { cutsOf, levelOf } from "@/lib/github/calendar";
import type { CollabRow } from "@/lib/github/types";
import { Tag } from "@/components/ui/page-primitives";
import { cn } from "@/lib/utils";
import { CellMap, PITCH, spanOf, type MapCell } from "./CellMap";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const MONTH_LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const IST_MS = 19_800_000;

/**
 * Other people's public repositories that I worked on. Each is one ledger row in three parts: which project it is,
 * my last 12 months of commits there as a strip of squares (the site's cell language, same scale for every row), and
 * the pull requests and issues I opened. The whole row links to the repository.
 */
export function Collaborations({ rows, asOf }: { rows: CollabRow[]; asOf: string }) {
  if (!rows.length) return null;

  const cuts = cutsOf(rows.flatMap((row) => row.months));
  // the strip covers the 12 months ending with the snapshot month, so its letters start 11 months back
  const endMonth = new Date(Date.parse(asOf) + IST_MS).getUTCMonth();
  const letters = Array.from({ length: 12 }, (_, i) => MONTH_LETTERS[(endMonth - 11 + i + 12) % 12]);

  return (
    <ul role="list" className="border-b border-border">
      {rows.map((row, index) => {
        const cells: MapCell[] = row.months.map((n, i) => ({ col: i, row: 0, level: levelOf(n, cuts) }));
        return (
          <li
            key={row.fullName}
            className="group relative grid grid-cols-12 gap-x-(--gutter) gap-y-7 border-t border-border px-4 py-8 transition-colors duration-(--dur-ui) ease-(--ease-out) focus-within:bg-card hover:bg-card md:px-6 md:py-10"
          >
            {/* the accent rule draws down the left edge on hover / focus (transform only) */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-(--dur-reveal) ease-(--ease-out) group-focus-within:scale-y-100 group-hover:scale-y-100 motion-reduce:transition-none"
            />

            <div className="col-span-12 min-w-0 md:col-span-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="t-label text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <Tag>By {row.owner}</Tag>
              </div>
              <h3 className="mt-5 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05] font-bold tracking-tight text-balance">
                <a href={row.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">
                  {row.title}
                  <span aria-hidden="true" className="font-mono text-primary opacity-0 transition-opacity duration-(--dur-ui) group-focus-within:opacity-100 group-hover:opacity-100">
                    {" "}
                    ↗&#xFE0E;
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              {row.description ? <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{row.description}</p> : null}
              <p className="t-label mt-4 text-muted-foreground">
                {[row.language, `Pushed ${month.format(new Date(row.pushedAt))}`].filter(Boolean).join(" / ")}
              </p>
            </div>

            <div className="col-span-12 md:col-span-4">
              <p className="t-label text-muted-foreground">Commits, last 12 months</p>
              {row.commits > 0 ? (
                <div className="mt-4 max-w-xs">
                  <div role="img" aria-label={`${row.commits} commits by month over the last 12 months`}>
                    <div className="relative mb-1.5 h-3" aria-hidden="true">
                      {letters.map((letter, i) => (
                        <span
                          key={i}
                          className="t-label absolute top-0 -translate-x-1/2 text-[0.625rem] text-muted-foreground"
                          style={{ left: `${((i * PITCH + 5) / spanOf(12)) * 100}%` }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <CellMap className="cell-wipe block h-auto w-full" cols={12} rows={1} cells={cells} />
                  </div>
                  <p className="mt-4 font-mono text-3xl tabular-nums">
                    {row.commits}
                    <span className="t-label ml-2 align-middle text-muted-foreground">{row.commits === 1 ? "commit" : "commits"}</span>
                  </p>
                </div>
              ) : (
                <p className="mt-4 max-w-[30ch] text-[1rem] leading-relaxed text-muted-foreground">No commits here in the last year. The work was in issues and pull requests.</p>
              )}
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="t-label text-muted-foreground">Pull requests and issues</p>
              {row.contributions.length ? (
                <ul role="list" className="mt-4 space-y-4">
                  {row.contributions.map((item) => (
                    <li key={item.url} className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
                      {/* filled = merged or closed, hollow = still open */}
                      <span aria-hidden="true" className={cn("size-2.5 translate-y-px border border-foreground", item.state === "open" ? "bg-transparent" : "bg-foreground")} />
                      <span className="min-w-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 text-[0.9375rem] leading-snug underline decoration-border underline-offset-4 transition-colors duration-(--dur-ui) hover:text-primary hover:decoration-primary focus-visible:text-primary"
                        >
                          {item.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <span className="t-label mt-1 block text-muted-foreground">
                          {item.kind} / {item.state} / <time dateTime={item.at}>{month.format(new Date(item.at))}</time>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 max-w-[30ch] text-[1rem] leading-relaxed text-muted-foreground">Commits only, no pull requests or issues.</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
