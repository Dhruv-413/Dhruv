import { cutsOf, levelOf, type Cuts } from "@/lib/github/calendar";
import type { LanguageRow, RepoRow } from "@/lib/github/types";
import { ArrowLink, Tag } from "@/components/ui/page-primitives";
import { cn } from "@/lib/utils";
import { CellMap, PITCH, spanOf, type MapCell } from "./CellMap";
import { RepoBoard } from "./RepoBoard";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const MONTH_LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
type Axis = { from: string; to: string };

// tints, biggest first (tokens only: no per-language brand colours)
const SPECTRUM = ["bg-foreground/60", "bg-foreground/42", "bg-foreground/30", "bg-foreground/22", "bg-foreground/16", "bg-foreground/12"];
const SEGMENT = ["bg-foreground/80", "bg-foreground/50", "bg-foreground/30", "bg-foreground/18", "bg-foreground/10"];

/**
 * A repository's life as pixels: one square per calendar month (a row per year), starting the month it was created
 * and running to now. Brighter = more of my commits that month, on one scale across all repositories, so tiles compare.
 * Months before the repository existed are not drawn, so the shape of the grid is the repo's lifespan.
 */
function Lifespan({ row, axis, cuts }: { row: RepoRow; axis: Axis; cuts: Cuts }) {
  const from = new Date(axis.from);
  const startYear = from.getUTCFullYear();
  const startMonth = from.getUTCMonth();
  const created = new Date(row.createdAt);
  const createdIndex = created.getUTCFullYear() * 12 + created.getUTCMonth() - (startYear * 12 + startMonth);
  const firstCommit = row.months.findIndex((n) => n > 0);
  const begin = Math.max(0, firstCommit >= 0 ? Math.min(createdIndex, firstCommit) : createdIndex);

  const cells: MapCell[] = [];
  row.months.forEach((n, i) => {
    if (i < begin) return;
    const absolute = startMonth + i;
    cells.push({ col: absolute % 12, row: Math.floor(absolute / 12), level: levelOf(n, cuts) });
  });
  const rows = Math.floor((startMonth + row.months.length - 1) / 12) + 1;

  return (
    <div
      role="img"
      aria-label={`${row.commits} commits by month, from ${month.format(created)} to ${month.format(new Date(row.pushedAt))}`}
      className="max-w-md pt-8"
    >
      <div className="grid" style={{ gridTemplateColumns: "2.25rem minmax(0, 1fr)" }} aria-hidden="true">
        <span />
        <span className="t-label relative mb-1.5 block h-3 text-[0.625rem] text-muted-foreground">
          {MONTH_LETTERS.map((letter, i) => (
            <span key={i} className="absolute top-0 -translate-x-1/2" style={{ left: `${((i * PITCH + 5) / spanOf(12)) * 100}%` }}>
              {letter}
            </span>
          ))}
        </span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "2.25rem minmax(0, 1fr)", gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }} aria-hidden="true">
        <CellMap className="cell-wipe col-start-2 block h-auto w-full" style={{ gridRow: `1 / span ${rows}` }} cols={12} rows={rows} cells={cells} />
        {Array.from({ length: rows }, (_, r) => (
          <span key={r} className="t-label self-center text-[0.625rem] text-muted-foreground" style={{ gridColumn: 1, gridRow: r + 1 }}>
            {startYear + r}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * The inside of one tile: five rows (header, title, calendar, facts, extras) that the board's `<li>` lays out as a
 * subgrid, so in a row of tiles the calendars, language bars and facts all line up whatever the description length.
 */
function TileBody({ row, index, axis, cuts }: { row: RepoRow; index: number; axis: Axis; cuts: Cuts }) {
  const facts = [
    `${row.commits} ${row.commits === 1 ? "commit" : "commits"}`,
    `${month.format(new Date(row.createdAt))} to ${month.format(new Date(row.pushedAt))}`,
    row.license,
  ].filter(Boolean);

  return (
    <>
      {/* the accent rule draws in along the top edge on hover / focus (transform only) */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-(--dur-reveal) ease-(--ease-out) group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="t-label text-muted-foreground">{String(index).padStart(2, "0")}</span>
        <span className="flex flex-wrap justify-end gap-2">
          {row.pinned ? <Tag>Pinned</Tag> : null}
          {row.mine ? null : <Tag>By {row.owner}</Tag>}
        </span>
      </div>

      <div className="min-w-0 pt-8">
        <h3 className="text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.1] font-bold tracking-tight text-balance">
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {row.title}
            <span aria-hidden="true" className="font-mono text-primary opacity-0 transition-opacity duration-(--dur-ui) group-focus-within:opacity-100 group-hover:opacity-100">
              {" "}
              ↗&#xFE0E;
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {row.description ? <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-muted-foreground">{row.description}</p> : null}
      </div>

      <Lifespan row={row} axis={axis} cuts={cuts} />

      <div className="pt-8">
        {row.languages.length ? (
          <>
            <div className="flex h-1.5 gap-px" aria-hidden="true">
              {row.languages.map((lang, i) => (
                <span key={lang.name} className={cn("block h-full", SEGMENT[Math.min(i, SEGMENT.length - 1)])} style={{ width: `${lang.share}%` }} />
              ))}
            </div>
            <p className="t-label mt-3 text-muted-foreground">
              <span className="sr-only">Languages by size: </span>
              {row.languages
                .slice(0, 3)
                .map((lang) => `${lang.name} ${lang.share}%`)
                .join(" / ")}
            </p>
          </>
        ) : null}
        <p className="t-label mt-3 text-muted-foreground">{facts.join(" / ")}</p>
      </div>

      <div>
        {row.topics.length ? (
          <ul role="list" className="mt-3 flex flex-wrap gap-2">
            {row.topics.map((topic) => (
              <li key={topic}>
                <Tag>{topic}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
        {row.caseStudy ? (
          <ArrowLink href={`/projects/${row.caseStudy.id}`} className="relative z-10 mt-2">
            Case study<span className="sr-only">: {row.caseStudy.title}</span>
          </ArrowLink>
        ) : null}
      </div>
    </>
  );
}

export function Repositories({ repos, languages, axis }: { repos: RepoRow[]; languages: LanguageRow[]; axis: Axis }) {
  const cuts = cutsOf(repos.flatMap((row) => row.months));
  const tiles = repos.map((row, i) => ({ key: row.fullName, body: <TileBody row={row} index={i + 1} axis={axis} cuts={cuts} /> }));

  return (
    <div>
      {languages.length ? (
        <div className="mb-14 md:mb-20">
          <h3 className="t-label mb-4 text-muted-foreground">Languages by size, repositories I own</h3>
          <div
            role="img"
            aria-label={`Languages by size: ${languages.map((lang) => `${lang.name} ${lang.share}%`).join(", ")}`}
            className="flex h-6 gap-px"
          >
            {languages.map((lang, i) => (
              <span key={lang.name} className={cn("block h-full min-w-1", SPECTRUM[Math.min(i, SPECTRUM.length - 1)])} style={{ width: `${lang.share}%` }} />
            ))}
          </div>
          <ul role="list" className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {languages.map((lang, i) => (
              <li key={lang.name} className="t-label flex items-center gap-2 text-muted-foreground">
                <span className={cn("size-2.5", SPECTRUM[Math.min(i, SPECTRUM.length - 1)])} aria-hidden="true" />
                {lang.name}
                <span className="font-mono text-foreground tabular-nums">{lang.share}%</span>
                <span>
                  / {lang.repos} {lang.repos === 1 ? "repo" : "repos"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            Bytes as GitHub counts them. Notebooks count their saved output, so Jupyter reads larger than the code I wrote in it.
          </p>
        </div>
      ) : null}

      <RepoBoard tiles={tiles} />

      <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
        Each square is one month of the repository&apos;s life, from the month it was created; brighter means more of my commits that month, on one scale for every tile. Private repositories are not listed.
      </p>
    </div>
  );
}
