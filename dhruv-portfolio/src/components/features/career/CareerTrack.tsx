"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { LANES, activeIn, type Lane, type TrackItem, type TrackModel } from "@/lib/career";
import { cn } from "@/lib/utils";

const NOUN: Record<Lane, string> = {
  study: "Study",
  work: "Work",
  contest: "Contest",
  project: "Project",
  cert: "Certificate",
};

/** Marks for single dates. Shape carries the meaning, not colour: diamond = contest, hollow square = project, tick = certificate. */
const MARK: Record<Exclude<Lane, "study" | "work">, string> = {
  contest: "size-2 rotate-45 bg-foreground md:size-3",
  project: "size-2 border-2 border-foreground md:size-3",
  cert: "h-2.5 w-0.5 bg-muted-foreground md:h-4",
};

const DURATION = 3200;

// Tailwind's `md`. Below it the bars and marks are only a picture (the cursor and the board are the controls), so they
// are not buttons there: no undersized targets, and nothing for a phone screen reader to step through 18 times.
const MD = "(min-width: 48rem)";
const subscribeMd = (notify: () => void) => {
  const query = window.matchMedia(MD);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getMd = () => window.matchMedia(MD).matches;

function Hit({
  interactive,
  pressed,
  label,
  onPick,
  className,
  style,
  children,
}: {
  interactive: boolean;
  pressed: boolean;
  label: string;
  onPick: () => void;
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  if (!interactive) {
    return (
      <span aria-hidden="true" className={cn(className, "pointer-events-none")} style={style}>
        {children}
      </span>
    );
  }
  return (
    <button type="button" aria-pressed={pressed} aria-label={label} onClick={onPick} className={className} style={style}>
      {children}
    </button>
  );
}

const pct = (value: number, steps: number) => `${(value / steps) * 100}%`;

/**
 * Career on one shared time axis (DESIGN.md §5, 2026-09-21). Study, work, contests, projects and certificates sit in
 * lanes, so overlap is visible. A cursor picks a month and the board lists what was going on; drag it, use the arrow
 * keys (it is a real range input laid over the plot), or pick any bar or mark for its detail. Once, when it scrolls
 * into view, the cursor runs from the first month to now; "Replay" runs it again. No sweep under reduced motion.
 * Every position comes from the data (src/lib/career.ts); below md the marks are decoration and the cursor does the work.
 */
export function CareerTrack({ model }: { model: TrackModel }) {
  const { steps, items, years, monthLabels, monthNames, rows, peak, peakLanes } = model;
  const last = steps - 1;

  const [cursor, setCursor] = useState(peak);
  const [picked, setPicked] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const isMd = useSyncExternalStore(subscribeMd, getMd, () => false);
  const frame = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const plot = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; scrubbing: boolean } | null>(null);

  // The first sweep waits until the chart itself (not the taller frame with the board) is mostly on screen; skipped under reduced motion.
  useEffect(() => {
    const node = frame.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (node.contains(document.activeElement)) {
            io.disconnect();
            return;
          }
          setCursor(0);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const from = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - from) / DURATION);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCursor(Math.round(eased * last));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, last]);

  /** Pick an item for its detail. From the chart the cursor jumps to it; from the board it stays on its month. */
  const pick = (item: TrackItem, moveCursor = true) => {
    setPlaying(false);
    setPicked((current) => (current === item.id ? null : item.id));
    if (moveCursor) setCursor(Math.min(last, Math.floor(item.from)));
  };

  const replay = () => {
    if (playing) return;
    started.current = true;
    setPicked(null);
    setCursor(0);
    setPlaying(true);
  };

  /** The month under a pointer x, on the same scale as the marks (a month is 1/steps of the plot). */
  const monthAt = (clientX: number) => {
    const box = plot.current?.getBoundingClientRect();
    if (!box) return cursor;
    return Math.max(0, Math.min(last, Math.round(((clientX - box.left) / box.width) * steps)));
  };

  const scrub = (clientX: number) => {
    setPlaying(false);
    setPicked(null);
    setCursor(monthAt(clientX));
  };

  const goNow = () => {
    setPlaying(false);
    setPicked(null);
    setCursor(last);
  };

  const here = activeIn(items, cursor);
  const activeIds = new Set(here.map((item) => item.id));
  const chosen = items.find((item) => item.id === picked);
  const spoken = here.length ? here.map((item) => item.title).join("; ") : "nothing dated";
  const edge = cursor / steps < 0.1 ? "start" : cursor / steps > 0.9 ? "end" : "mid";

  return (
    <section aria-labelledby="run-title" className="page-shell pb-(--section-pad) pt-2">
      <h2 id="run-title" className="sr-only">
        The run: study, work, contests, projects and certificates on one time line, {monthNames[0]} to {monthNames[last]}
      </h2>
      <p className="t-label mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="mark-plus text-primary" aria-hidden="true" />
          <span aria-hidden="true">[01]</span> The run
        </span>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">
          Drag the line through the months<span className="max-md:hidden">, or pick anything on it</span>
        </span>
        {/* a key for the three single-date shapes; the lanes are named, so it is decoration for assistive tech */}
        <span aria-hidden="true" className="flex items-center gap-4 md:ml-auto">
          <span className="flex items-center gap-2">
            <span className="trk-mark size-2 rotate-45 bg-foreground" /> Contest
          </span>
          <span className="flex items-center gap-2">
            <span className="trk-mark size-2 border-2 border-foreground" /> Project
          </span>
          <span className="flex items-center gap-2">
            <span className="trk-mark h-3 w-0.5 bg-muted-foreground" /> Certificate
          </span>
        </span>
      </p>

      <div className="border border-border bg-card">
        {/* the chart: every lane shares the plot's left and right edges (mx-4 / md:ml-32 md:mr-6) */}
        <div
          ref={frame}
          role="group"
          aria-label={`Time line, ${monthNames[0]} to ${monthNames[last]}`}
          className="relative touch-pan-y pt-1"
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            const box = plot.current?.getBoundingClientRect();
            if (!box || event.clientX < box.left || event.clientX > box.right) return;
            const onItem = (event.target as HTMLElement).closest("button") !== null;
            gesture.current = { id: event.pointerId, x: event.clientX, scrubbing: !onItem };
            if (!onItem) {
              event.currentTarget.setPointerCapture(event.pointerId);
              scrub(event.clientX);
            }
          }}
          onPointerMove={(event) => {
            const g = gesture.current;
            if (!g || g.id !== event.pointerId) return;
            if (!g.scrubbing) {
              if (Math.abs(event.clientX - g.x) < 4) return;
              g.scrubbing = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            scrub(event.clientX);
          }}
          onPointerUp={(event) => {
            if (gesture.current?.id === event.pointerId) gesture.current = null;
          }}
          onPointerCancel={(event) => {
            if (gesture.current?.id === event.pointerId) gesture.current = null;
          }}
        >
          {/* year lines and the hidden range input, both exactly over the plot */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 right-4 md:left-32 md:right-6">
            {years.map((year) => (
              <span key={year.label} className="absolute inset-y-0 border-l border-border" style={{ left: pct(year.at, steps) }} />
            ))}
          </div>

          <div ref={plot} className="absolute inset-y-0 left-4 right-4 z-10 md:left-32 md:right-6">
            <input
              type="range"
              min={0}
              max={last}
              step={1}
              value={cursor}
              aria-label="Month on the time line"
              aria-valuetext={`${monthNames[cursor]}: ${spoken}`}
              className="trk-slider pointer-events-none block h-full"
              style={{ width: pct(last, steps) }}
              onFocus={() => setPlaying(false)}
              onKeyDown={() => setPlaying(false)}
              onChange={(event) => {
                setPlaying(false);
                setPicked(null);
                setCursor(Number(event.target.value));
              }}
            />
          </div>

          {/* the cursor: a full-width box slid by container units, so it moves with transform only */}
          <div aria-hidden="true" className="trk-plot pointer-events-none absolute inset-y-0 left-4 right-4 z-[15] md:left-32 md:right-6">
            <div className="trk-cursor absolute inset-y-0 left-0 w-0" style={{ "--p": (cursor / steps) * 100 } as CSSProperties}>
              <span className="trk-cur absolute inset-y-0 bottom-10 left-0 w-px bg-primary" />
              <span
                className={cn(
                  "trk-cur t-label absolute bottom-2 whitespace-nowrap bg-primary px-2 py-1 text-primary-foreground",
                  edge === "start" ? "left-0" : edge === "end" ? "right-0 translate-x-px" : "-translate-x-1/2",
                )}
              >
                {monthLabels[cursor]}
              </span>
            </div>
          </div>

          {/* axis */}
          <div className="relative mx-4 h-9 md:ml-32 md:mr-6">
            {years.map((year, i) => (
              <span
                key={year.label}
                // a first year that the next one crowds out (under six months apart) is dropped on phones
                className={cn("t-label absolute top-2.5 pl-2 text-muted-foreground", i === 0 && years[1] && years[1].at < 6 && "max-md:hidden")}
                style={{ left: pct(year.at, steps) }}
              >
                {year.label}
              </span>
            ))}
            {monthLabels.map((label, i) => (
              <span
                key={label}
                className={cn("absolute bottom-0 border-l", i % 3 === 0 ? "h-2 border-foreground/40" : "h-1 border-border")}
                style={{ left: pct(i, steps) }}
              />
            ))}
          </div>

          {/* lanes */}
          {LANES.map((lane) => {
            const laneItems = items.filter((item) => item.lane === lane.key);
            const count = laneItems.length;
            const ordered = [...laneItems].sort((a, b) => a.from - b.from);
            return (
              <div key={lane.key} role="group" aria-label={`${lane.label}, ${count} ${count === 1 ? "item" : "items"}`} className="relative border-t border-border">
                <p className="t-label bg-transparent px-4 pt-2 text-muted-foreground md:absolute md:left-0 md:top-0 md:w-32 md:pt-3">
                  {lane.label} <span className="text-foreground">{String(count).padStart(2, "0")}</span>
                </p>

                <div
                  className={cn(
                    "relative mx-4 md:ml-32 md:mr-6",
                    lane.key === "study" && "h-12 md:h-14",
                    lane.key === "work" && "h-[4.5rem] md:h-24",
                    lane.key !== "study" && lane.key !== "work" && "h-[calc(var(--rows)*1.25rem_+_0.5rem)] md:h-[calc(var(--rows)*2rem_+_1rem)]",
                  )}
                  style={{ "--rows": rows[lane.key] } as CSSProperties}
                >
                  {ordered.map((item, index) => {
                    const isPicked = picked === item.id;
                    // the items going on in the cursor's month light up, so the sweep reads as a beam passing over the run
                    const on = activeIds.has(item.id);
                    const wide = item.to !== undefined && (item.to - item.from) / steps >= 0.2;
                    const text = item.to === undefined ? item.title : wide && lane.key === "study" ? item.org : item.label;
                    // the accessible name starts with the visible text (WCAG 2.5.3), then adds the role and dates
                    const label = item.to !== undefined ? `${text}. ${item.title}, ${item.dateText}` : `${item.title}, ${item.org}. ${item.dateText}`;

                    if (item.to !== undefined) {
                      const width = ((item.to - item.from) / steps) * 100;
                      const inside = wide;
                      const above = lane.key === "work" && index % 2 === 1;
                      // labels near the right edge hang leftwards from the bar end, so they never leave the frame at tablet widths
                      const alignEnd = item.from / steps > 0.72;
                      return (
                        <Hit
                          key={item.id}
                          interactive={isMd}
                          pressed={isPicked}
                          label={label}
                          onPick={() => pick(item)}
                          className={cn(
                            "trk-bar group absolute top-1/2 z-20 -mt-3 flex h-6 items-center border text-left md:-mt-4 md:h-8",
                            "transition-colors duration-(--dur-ui) ease-(--ease-out)",
                            lane.key === "study" && (on ? "border-primary bg-muted text-foreground" : "border-input bg-muted text-foreground hover:border-foreground"),
                            lane.key === "work" && (item.current || on ? "border-primary bg-primary text-primary-foreground" : "border-foreground bg-foreground text-background"),
                            // a thinner, wider outline than the 2 px focus ring, so a picked bar never looks focused
                            isPicked && "outline-1 outline-offset-4 outline-primary",
                          )}
                          style={{ left: pct(item.from, steps), width: `${width}%`, "--i": index } as CSSProperties}
                        >
                          {inside ? (
                            <span className="t-label truncate px-2 md:px-3">{lane.key === "study" ? item.org : item.label}</span>
                          ) : (
                            <span
                              className={cn(
                                "t-label pointer-events-none absolute whitespace-nowrap bg-card px-1 text-muted-foreground group-hover:text-foreground max-md:hidden",
                                item.current && "text-primary group-hover:text-primary",
                                above ? "bottom-full mb-1" : "top-full mt-1",
                                alignEnd ? "right-0" : "left-0",
                              )}
                            >
                              {item.label}
                            </span>
                          )}
                        </Hit>
                      );
                    }

                    return (
                      <Hit
                        key={item.id}
                        interactive={isMd}
                        pressed={isPicked}
                        label={label}
                        onPick={() => pick(item)}
                        className={cn(
                          "trk-pop group absolute z-20 grid size-3 -translate-x-1/2 place-items-center md:size-6",
                          "top-[calc(var(--row)*1.25rem_+_0.25rem)] md:top-[calc(var(--row)*2rem_+_0.5rem)]",
                        )}
                        style={{ left: pct(item.from, steps), "--row": item.row ?? 0, "--i": index } as CSSProperties}
                      >
                        <span
                          className={cn(
                            "trk-mark block transition-colors duration-(--dur-ui) ease-(--ease-out) group-hover:border-primary group-hover:bg-primary",
                            MARK[lane.key as keyof typeof MARK],
                            item.lane === "project" && "group-hover:bg-transparent",
                            (isPicked || on) && (item.lane === "project" ? "border-primary" : "bg-primary"),
                          )}
                        />
                        <span className="t-label pointer-events-none absolute bottom-full z-40 mb-1 hidden max-w-md truncate bg-foreground px-2 py-1 text-background md:group-hover:block md:group-focus-visible:block">
                          {item.title}
                        </span>
                      </Hit>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* the rail under the lanes holds the cursor's month label */}
          <div className="relative h-10 border-t border-border">
            <p className="t-label absolute left-4 top-3 hidden text-muted-foreground md:block">Cursor</p>
          </div>
        </div>

        {/* the picked item sits right under the chart, in a fixed-height strip so nothing below it moves */}
        <div className="min-h-28 border-t border-border p-4 md:p-5">
          {chosen ? (
            <div className="grid gap-x-8 gap-y-3 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto]">
              <div>
                <p className="t-label flex items-center gap-2 text-muted-foreground">
                  {chosen.current ? <span className="size-1.5 bg-primary" aria-hidden="true" /> : null}
                  {NOUN[chosen.lane]}
                </p>
                <p className="t-label mt-2 text-foreground">{chosen.dateText}</p>
              </div>
              <div>
                <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight tracking-tight">{chosen.title}</h3>
                <p className="t-label mt-2 text-muted-foreground">{chosen.org}</p>
                {chosen.blurb ? <p className="mt-3 max-w-[62ch] leading-relaxed text-muted-foreground">{chosen.blurb}</p> : null}
              </div>
              {chosen.href ? (
                <a
                  href={chosen.href}
                  {...(chosen.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="t-label inline-flex min-h-11 items-center gap-2 self-start border-b border-transparent text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:text-primary"
                >
                  {chosen.hrefLabel} <span aria-hidden="true">{chosen.external ? "↗" : "→"}</span>
                  {chosen.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              ) : null}
            </div>
          ) : (
            <p className="t-label text-muted-foreground">
              <span className="md:hidden">Pick anything in the month below for its detail.</span>
              <span className="max-md:hidden">Pick a bar or a mark for its detail. Bars are spans of time; marks are single dates.</span>
            </p>
          )}
        </div>

        {/* the board: what was going on in the cursor's month */}
        <div className="border-t border-border">
          <div className="flex flex-wrap items-end justify-between gap-4 p-4 md:p-6">
            <div>
              <p className="t-label text-muted-foreground">
                In this month
                {cursor === last ? " (now)" : cursor === peak ? ` (busiest: ${peakLanes} lanes at once)` : ""}
              </p>
              <p className="t-h2 mt-2 text-[clamp(1.75rem,3.4vw,3rem)]">{monthNames[cursor]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={goNow}
                aria-pressed={cursor === last}
                className="t-label inline-flex min-h-11 items-center gap-2 border border-input px-4 text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:border-primary aria-pressed:border-primary aria-pressed:text-primary"
              >
                Now
              </button>
              <button
                type="button"
                onClick={replay}
                className="t-label inline-flex min-h-11 items-center gap-2 border border-input px-4 text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:border-primary motion-reduce:hidden"
              >
                <span aria-hidden="true">{playing ? "..." : "↻"}</span> Replay from {monthLabels[0]}
              </button>
            </div>
          </div>

          <dl className="hairline-grid grid-cols-1 border-x-0 border-b-0 lg:grid-cols-5">
            {LANES.map((lane) => {
              const inLane = here.filter((item) => item.lane === lane.key);
              // an empty cell says what came last in its lane, so it is never a bare dash
              const before = inLane.length
                ? undefined
                : items
                    .filter((item) => item.lane === lane.key && Math.floor(item.to !== undefined ? item.to - 0.001 : item.from) < cursor)
                    .sort((a, b) => (b.to ?? b.from) - (a.to ?? a.from))[0];
              return (
                <div key={lane.key} className="grid min-h-14 grid-cols-[6.5rem_minmax(0,1fr)] gap-3 p-4 lg:block lg:min-h-28 lg:p-5">
                  <dt className="t-label text-muted-foreground">{lane.label}</dt>
                  <dd className="lg:mt-3">
                    {inLane.length ? (
                      <ul role="list" className="space-y-0.5">
                        {inLane.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              aria-pressed={picked === item.id}
                              onClick={() => pick(item, false)}
                              className={cn(
                                "flex min-h-11 w-full flex-col justify-center text-left text-[0.9375rem] leading-snug underline-offset-4 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:text-primary lg:min-h-0 lg:justify-start",
                                item.current && "text-primary",
                                picked === item.id && "underline decoration-primary decoration-2",
                              )}
                            >
                              {item.title}
                              {lane.key === "work" ? <span className="block text-muted-foreground">{item.label}</span> : null}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="block text-[0.9375rem] leading-snug text-muted-foreground">
                        {before ? (
                          <>
                            <span className="t-label block">Nothing this month. Last:</span>
                            <span className="mt-1 block">{before.title}</span>
                            <span className="t-label mt-1 block">{before.dateText}</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true">-</span>
                            <span className="sr-only">Nothing dated yet</span>
                          </>
                        )}
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {chosen ? `${chosen.title}, ${chosen.org}. ${chosen.dateText}.` : ""}
      </p>
    </section>
  );
}
