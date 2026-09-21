"use client";

import { useRef, useState } from "react";
import { addDays, levelOf, statsOf, weekdayOf } from "@/lib/github/calendar";
import type { DayRepo, LedgerPeriod } from "@/lib/github/types";
import { cn } from "@/lib/utils";
import { CellMap, PITCH, spanOf, type MapCell } from "./CellMap";
import { LEVEL_CLASS } from "./levels";

const number = new Intl.NumberFormat("en-US");
const dateOf = (iso: string) => new Date(`${iso}T00:00:00Z`);
const longDay = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDay = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const weekdayShort = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
const monthShort = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });

const MAX_SQUARES = 40;
const MIN_LABEL_GAP = 3;
const WEEK = 7;

function plural(n: number, word: string) {
  return `${number.format(n)} ${word}${n === 1 ? "" : "s"}`;
}

/**
 * The ledger: pick a period, then move through its days.
 *
 * Pointer: hovering the heatmap previews a day (it reverts when the pointer leaves); pressing or dragging commits it;
 * a tap commits on touch. Keyboard / screen reader / phone: a real range input under the grid, plus a week strip.
 * Committed changes that do not come from the slider (period, Busiest, Latest, a click, a week-strip tap) are spoken
 * through one polite live region; the slider speaks its own `aria-valuetext`, so nothing is announced twice.
 * Private contributions are only ever a count (DESIGN.md §5, 2026-09-21).
 */
export function GitHubLedger({ periods, reposByDay }: { periods: LedgerPeriod[]; reposByDay: Record<string, DayRepo[]> }) {
  const [key, setKey] = useState(periods[0].key);
  const [picked, setPicked] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const grid = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reached = useRef<number | null>(null);

  const period = periods.find((p) => p.key === key) ?? periods[0];
  const { days, start } = period;
  const stats = statsOf(days);
  const last = Math.max(0, days.length - 1);
  const committed = Math.min(picked ?? stats.bestIndex, last);
  const selected = Math.min(hover ?? committed, last);

  const offset = weekdayOf(start);
  const cols = Math.ceil((offset + days.length) / 7);
  const maxTotal = Math.max(...periods.map((p) => p.total), 1);
  const dayAt = (index: number) => addDays(start, index);

  const say = (index: number) => setAnnouncement(`${longDay.format(dateOf(dayAt(index)))}: ${plural(days[index] ?? 0, "contribution")}`);
  const commit = (index: number) => {
    setPicked(index);
    setHover(null);
  };
  const choose = (next: string) => {
    const p = periods.find((x) => x.key === next) ?? periods[0];
    setKey(next);
    setPicked(null);
    setHover(null);
    setAnnouncement(`${p.label}: ${plural(p.total, "contribution")}, ${number.format(p.total - p.private)} public and ${number.format(p.private)} private.`);
  };

  const cellAt = (clientX: number, clientY: number): number | null => {
    const box = grid.current?.getBoundingClientRect();
    if (!box) return null;
    // the map is drawn in viewBox units (a cell plus its gap is PITCH), so map the pointer into those
    const col = Math.floor((((clientX - box.left) / box.width) * spanOf(cols)) / PITCH);
    const row = Math.floor((((clientY - box.top) / box.height) * spanOf(7)) / PITCH);
    const index = col * 7 + row - offset;
    return col >= 0 && col < cols && row >= 0 && row < 7 && index >= 0 && index < days.length ? index : null;
  };

  // Month labels: one per month change. A first month that lasts fewer than MIN_LABEL_GAP columns goes unlabelled,
  // so the next month is never the one that gets dropped ("SEPT, NOV" with October missing).
  const monthStarts: { col: number; label: string }[] = [];
  let lastMonth = "";
  for (let c = 0; c < cols; c++) {
    const first = dayAt(Math.max(0, c * 7 - offset));
    const month = first.slice(0, 7);
    if (month !== lastMonth) monthStarts.push({ col: c, label: monthShort.format(dateOf(first)) });
    lastMonth = month;
  }
  if (monthStarts.length > 1 && monthStarts[1].col - monthStarts[0].col < MIN_LABEL_GAP) monthStarts.shift();
  const monthLabels = Array.from({ length: cols }, (_, c) => monthStarts.find((m) => m.col === c)?.label ?? "");

  const cells: MapCell[] = days.map((n, i) => ({ col: Math.floor((i + offset) / 7), row: (i + offset) % 7, level: levelOf(n, stats.cuts) }));
  const ring = { col: Math.floor((selected + offset) / 7), row: (selected + offset) % 7 };

  const date = dayAt(selected);
  const count = days[selected] ?? 0;
  const dayRepos = reposByDay[date] ?? [];
  const publicCommits = dayRepos.reduce((sum, r) => sum + r.n, 0);
  const publicTotal = period.total - period.private;
  const publicShare = period.total ? Math.round((publicTotal / period.total) * 100) : 0;
  // seven days around the selected one (shifted at the ends so there are always seven)
  const weekStart = Math.max(0, Math.min(selected - 3, days.length - WEEK));
  const week = Array.from({ length: Math.min(WEEK, days.length) }, (_, k) => weekStart + k);

  const facts: [string, string][] = [
    ["Active days", `${number.format(stats.active)} of ${number.format(days.length)}`],
    ["Longest streak", plural(stats.longest, "day")],
    ["Busiest day", stats.bestCount ? `${number.format(stats.bestCount)} on ${shortDay.format(dateOf(dayAt(stats.bestIndex)))}` : "None"],
    [
      "Public mix",
      `${number.format(period.commits)} commits, ${plural(period.pullRequests, "PR")}, ${plural(period.issues, "issue")}, ${plural(period.reviews, "review")}`,
    ],
  ];

  const ghostButton =
    "t-label min-h-11 border border-input px-4 transition-colors duration-(--dur-ui) hover:border-foreground focus-visible:border-foreground";

  return (
    <div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div
        role="group"
        aria-label="Period"
        className="hairline-grid mb-10 grid-cols-2 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        style={{ "--cols": periods.length } as React.CSSProperties}
      >
        {periods.map((p) => {
          const on = p.key === key;
          return (
            <button
              key={p.key}
              type="button"
              aria-pressed={on}
              onClick={() => choose(p.key)}
              className={cn(
                "p-4 text-left transition-colors duration-(--dur-ui) ease-(--ease-out) focus-visible:z-10 max-md:odd:last:col-span-2 md:p-5",
                on ? "bg-foreground text-background" : "hover:bg-card",
              )}
            >
              <span className="t-label block">{p.label}</span>
              <span className="mt-3 block font-mono text-2xl tabular-nums md:text-3xl">
                {number.format(p.total)}
                <span className="sr-only"> contributions</span>
              </span>
              <span className="mt-4 flex h-1.5 bg-current/20" aria-hidden="true">
                <span className="block h-full bg-current" style={{ width: `${((p.total - p.private) / maxTotal) * 100}%` }} />
                <span className="block h-full bg-current/45" style={{ width: `${(p.private / maxTotal) * 100}%` }} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-12 grid gap-x-(--gutter) gap-y-8 md:mb-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-label text-muted-foreground">Public / private contributions</p>
          <p className="mt-3 font-mono text-[clamp(2.5rem,5vw,4.5rem)] leading-none tabular-nums">
            {number.format(publicTotal)}
            <span className="text-muted-foreground"> / </span>
            {number.format(period.private)}
          </p>
          <span className="mt-5 flex h-2 max-w-md bg-foreground/15" aria-hidden="true">
            <span className="block h-full bg-foreground" style={{ width: `${publicShare}%` }} />
          </span>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
            {publicShare}% of {period.label.toLowerCase()} happened in public repositories. Private work is counted here and never named.
          </p>
        </div>
        <dl className="border-b border-border md:col-span-7">
          {facts.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 border-t border-border py-3">
              <dt className="t-label shrink-0 text-muted-foreground">{label}</dt>
              <dd className="text-right font-mono text-[0.9375rem] tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="t-label mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" aria-hidden="true">
        <span>
          {weekdayShort.format(dateOf(date))} {shortDay.format(dateOf(date))}
        </span>
        <span className={count > 0 ? "text-primary" : "text-muted-foreground"}>{plural(count, "contribution")}</span>
        <span className="text-muted-foreground">
          {publicCommits ? plural(publicCommits, "public commit") : count > 0 ? "private or not a commit" : "quiet day"}
        </span>
      </p>

      <div
        role="region"
        aria-label={`Contribution calendar, ${period.label}: ${number.format(period.total)} contributions. Use the slider below to step through days.`}
        tabIndex={0}
        className="thin-scroll overflow-x-auto px-1 pb-3 [direction:rtl]"
      >
        <div className="relative min-w-[760px] pl-9 [direction:ltr]">
          <div className="t-label mb-2 grid text-muted-foreground" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, columnGap: 3 }} aria-hidden="true">
            {monthLabels.map((label, i) => (
              <span key={i} className="overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>

          <div className="relative">
            {[1, 3, 5].map((row) => (
              <span
                key={row}
                aria-hidden="true"
                className="t-label absolute -left-9 text-muted-foreground"
                style={{ top: `${((row + 0.5) / 7) * 100}%`, transform: "translateY(-50%)" }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][row]}
              </span>
            ))}
            <div
              ref={grid}
              aria-hidden="true"
              className="cursor-crosshair select-none"
              onPointerDown={(event) => {
                if (event.pointerType === "touch") return;
                dragging.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
                const index = cellAt(event.clientX, event.clientY);
                reached.current = index;
                if (index !== null) commit(index);
              }}
              onPointerMove={(event) => {
                if (event.pointerType === "touch") return;
                const index = cellAt(event.clientX, event.clientY);
                if (index === null) return;
                if (dragging.current) {
                  reached.current = index;
                  commit(index);
                } else setHover(index);
              }}
              onPointerUp={(event) => {
                const index = cellAt(event.clientX, event.clientY);
                if (event.pointerType === "touch") {
                  // a tap (a scroll ends in pointercancel instead)
                  if (index !== null) {
                    commit(index);
                    say(index);
                  }
                } else if (dragging.current) {
                  const final = index ?? reached.current;
                  if (final !== null) say(final);
                }
                dragging.current = false;
              }}
              onPointerCancel={() => {
                dragging.current = false;
              }}
              onPointerLeave={() => setHover(null)}
            >
              <CellMap key={period.key} className="cell-wipe block h-auto w-full" cols={cols} rows={7} cells={cells} ring={ring} />
            </div>
          </div>
        </div>
      </div>

      <div className="t-label mt-3 flex items-center justify-end gap-2 text-muted-foreground" aria-hidden="true">
        Less
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span key={level} className={cn("size-3", LEVEL_CLASS[level])} />
        ))}
        More
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <label htmlFor="gh-day" className="t-label text-muted-foreground">
            Step through days
          </label>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => {
                commit(stats.bestIndex);
                say(stats.bestIndex);
              }}
              className={ghostButton}
            >
              Busiest day
            </button>
            <button
              type="button"
              onClick={() => {
                commit(last);
                say(last);
              }}
              className={ghostButton}
            >
              Latest
            </button>
          </div>
        </div>
        <input
          id="gh-day"
          type="range"
          min={0}
          max={last}
          value={selected}
          onChange={(event) => commit(Number(event.target.value))}
          aria-valuetext={`${longDay.format(dateOf(date))}: ${plural(count, "contribution")}`}
          className="gh-slider mt-2"
        />
      </div>

      <div className="mt-6 grid gap-x-(--gutter) gap-y-8 border border-border p-5 md:grid-cols-12 md:p-8">
        <div className="md:col-span-5">
          <p className="t-label text-muted-foreground">Selected day</p>
          <p className="mt-3 text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight tracking-tight">{longDay.format(dateOf(date))}</p>
          <p className="mt-3 font-mono text-4xl tabular-nums md:text-5xl">
            <span className={count > 0 ? "text-primary" : undefined}>{number.format(count)}</span>
            <span className="t-label ml-3 align-middle text-muted-foreground">{count === 1 ? "contribution" : "contributions"}</span>
          </p>

          <p className="t-label mt-8 mb-2 text-muted-foreground">The week around it</p>
          <ul role="list" className="grid max-w-sm grid-cols-7 gap-1">
            {week.map((index) => {
              const on = index === committed;
              const n = days[index] ?? 0;
              const d = dateOf(dayAt(index));
              return (
                <li key={index}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      commit(index);
                      say(index);
                    }}
                    className={cn(
                      "flex min-h-11 w-full flex-col items-center justify-center gap-1 border px-0 py-1 transition-colors duration-(--dur-ui) hover:border-foreground focus-visible:border-foreground",
                      on ? "border-foreground" : "border-transparent",
                    )}
                  >
                    <span className={cn("block size-3", LEVEL_CLASS[levelOf(n, stats.cuts)])} aria-hidden="true" />
                    <span className="t-label text-muted-foreground" aria-hidden="true">
                      {d.getUTCDate()}
                    </span>
                    <span className="sr-only">
                      {longDay.format(d)}: {plural(n, "contribution")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="md:col-span-7">
          {dayRepos.length ? (
            <>
              <p className="t-label text-muted-foreground">{plural(publicCommits, "public commit")}, by repository</p>
              <ul role="list" className="mt-3 border-b border-border">
                {dayRepos.map((r, i) => (
                  <li key={r.repo} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-3 border-t border-border py-4">
                    <a
                      href={`https://github.com/${r.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 break-words text-[1.0625rem] font-medium leading-snug underline decoration-transparent underline-offset-4 transition-colors duration-(--dur-ui) hover:text-primary hover:decoration-primary focus-visible:text-primary"
                    >
                      {r.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className="font-mono text-xl tabular-nums">{number.format(r.n)}</span>
                    {/* one square per commit: the same cell language, instead of a list of messages */}
                    <span className="col-span-2 flex flex-wrap gap-1" aria-hidden="true">
                      {Array.from({ length: Math.min(r.n, MAX_SQUARES) }, (_, k) => (
                        <span key={k} className={cn("block size-2.5", i === 0 ? "bg-primary" : "bg-foreground/80")} />
                      ))}
                      {r.n > MAX_SQUARES ? <span className="t-label ml-1 text-muted-foreground">+ {r.n - MAX_SQUARES}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              {count > 0
                ? "No public commit is on record for this day, so it was private work or another kind of contribution. Private repositories show up here as a count only."
                : "Nothing on this day."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
