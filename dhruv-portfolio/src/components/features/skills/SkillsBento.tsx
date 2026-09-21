"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AzureFigure, type Lane } from "./AzureFigure";
import { LakehouseFigure, type Mode } from "./LakehouseFigure";

export interface BentoProject {
  id: string;
  title: string;
}

export interface BentoSkill {
  name: string;
  note?: string;
  about?: string;
  projectIds: string[];
}

export interface BentoGroup {
  category: string;
  blurb: string;
  note?: string;
  figure?: "lakehouse" | "azure";
  skills: BentoSkill[];
}

// Picking one of these chips also drives the figure in its tile.
const MODE_OF: Record<string, Mode> = {
  "Data Lake": "lake",
  "Data Warehouse": "warehouse",
  Lakehouse: "lakehouse",
  "Apache Spark": "spark",
};
const LANE_OF: Record<string, Lane> = {
  "Azure VM Scale Sets": "vm",
  "Azure Functions": "fn",
  "Azure Storage": "st",
};

/*
 * Tiling (12 columns from lg): the two figure tiles 6 + 6 (equal widths keep their figures the same height), then the small tiles 3 + 5 + 4 and 4 + 4 + 4 (row one is sized so all three wrap their chips to two rows), so every row
 * sums to 12. Two columns from md: two figure tiles side by side, then the small ones in pairs. One column below md.
 * With a different number of groups the last row of small tiles will not fill: change these together with the data.
 */
const HERO_SPANS = ["lg:col-span-6", "lg:col-span-6"];
const SMALL_SPANS = ["lg:col-span-3", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

/** Links to the projects that used a skill. With none, shows `fallback` (where a concept was learned) or says so plainly. */
function UsedIn({
  ids,
  projects,
  fallback,
  inline = false,
  className,
}: {
  ids: string[];
  projects: Map<string, BentoProject>;
  fallback?: string;
  /** Label and links on one row (the bottom bar) instead of stacked. */
  inline?: boolean;
  className?: string;
}) {
  if (!ids.length) {
    return fallback ? (
      <p className={cn("t-label text-muted-foreground", className)}>{fallback}</p>
    ) : (
      <p className={cn("t-label text-muted-foreground", className)}>No project on this site uses it yet.</p>
    );
  }
  return (
    <div className={cn(inline && "flex flex-wrap items-center gap-x-4", className)}>
      <p className="t-label text-muted-foreground">Used in</p>
      <ul role="list" className={cn("flex flex-wrap gap-x-5", !inline && "mt-1")}>
        {ids.map((id) => {
          const project = projects.get(id);
          if (!project) return null;
          return (
            <li key={id}>
              <Link
                href={`/projects/${id}`}
                className="t-label inline-flex min-h-11 items-center gap-2 border-b border-transparent text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:text-primary"
              >
                {project.title} <span aria-hidden="true">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The stack as a bento (DESIGN.md §5, 2026-09-21). Pick a skill: a slim readout pinned to the bottom edge says what it means and
 * which of my projects used it, and every skill that shared a project with it gets a red mark. The two newest groups
 * are the large tiles and carry a figure that the chips drive (Data Warehouse tidies the records, Azure Functions
 * lights its lane). Nothing is selected on load. Below md there is no bottom bar: the same detail opens inside the tile. Everything is
 * derived from the data passed in; nothing here claims a use the project data does not show.
 */
export function SkillsBento({ groups, projects }: { groups: BentoGroup[]; projects: BentoProject[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("lake");
  const [load, setLoad] = useState(35);
  const [ready, setReady] = useState({ lake: false, azure: false });
  const touched = useRef({ lake: false, azure: false });
  const lakeRef = useRef<HTMLDivElement>(null);
  const azureRef = useRef<HTMLDivElement>(null);

  // The figures' contents mount when they come within a short scroll of the viewport (their frames reserve the height), which
  // keeps ~300 SVG elements out of the initial hydration.
  useEffect(() => {
    const timers: number[] = [];
    const observers = (["lake", "azure"] as const).map((key) => {
      const el = key === "lake" ? lakeRef.current : azureRef.current;
      if (!el) return undefined;
      const mount = () => setReady((previous) => ({ ...previous, [key]: true }));
      if (typeof IntersectionObserver === "undefined") {
        timers.push(window.setTimeout(mount, 0));
        return undefined;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          mount();
        },
        { rootMargin: "250px 0px" },
      );
      observer.observe(el);
      return observer;
    });
    return () => {
      observers.forEach((observer) => observer?.disconnect());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  // Once, when a figure first scrolls into view, it moves on its own so people see it work (unless already touched).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const watch = (el: HTMLElement | null, delay: number, run: () => void) => {
      if (!el) return undefined;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          timers.push(window.setTimeout(run, reduce ? 0 : delay));
        },
        { threshold: 0.6 },
      );
      observer.observe(el);
      return observer;
    };
    const observers = [
      watch(lakeRef.current, 900, () => {
        if (!touched.current.lake) setMode("warehouse");
      }),
      watch(azureRef.current, 700, () => {
        if (!touched.current.azure) setLoad(72);
      }),
    ];
    return () => {
      observers.forEach((observer) => observer?.disconnect());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const pick = (name: string) => {
    setActive((current) => (current === name ? null : name));
    if (MODE_OF[name]) {
      touched.current.lake = true;
      setMode(MODE_OF[name]);
    }
    if (LANE_OF[name]) touched.current.azure = true;
  };

  const projectById = new Map(projects.map((project) => [project.id, project]));
  const located = groups.flatMap((group) => group.skills.map((skill) => ({ group, skill }))).find((entry) => entry.skill.name === active);
  const activeIds = new Set(located?.skill.projectIds ?? []);
  const focus = active ? (LANE_OF[active] ?? null) : null;

  // Span of each tile: figure tiles take HERO_SPANS in order, the others SMALL_SPANS in order.
  const spans = groups.map((group, index) => {
    const before = groups.slice(0, index);
    return group.figure
      ? HERO_SPANS[before.filter((g) => g.figure).length]
      : SMALL_SPANS[before.filter((g) => !g.figure).length];
  });

  const usedCount = located?.skill.projectIds.length ?? 0;
  const announcement = located
    ? `${located.skill.name}, ${located.group.category}. ${
        usedCount ? `Used in ${usedCount} ${usedCount === 1 ? "project" : "projects"}.` : "Not used in a project on this site."
      }`
    : "";

  return (
    <div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <ul role="list" className="hairline-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-flow-dense">
        {groups.map((group, index) => {
          const hero = Boolean(group.figure);
          const owns = Boolean(located) && located?.group === group;
          return (
            <li key={group.category} data-reveal className={cn("flex flex-col p-5 md:p-6", spans[index])}>
              <p className="t-label flex items-center justify-between text-muted-foreground">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">
                  {String(group.skills.length).padStart(2, "0")} {group.skills.length === 1 ? "skill" : "skills"}
                </span>
              </p>
              <h3 className={cn("t-h2 mt-4", hero ? "text-[clamp(2rem,3.6vw,3.25rem)]" : "text-[clamp(1.5rem,2.4vw,2.25rem)]")}>
                {group.category}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-snug text-muted-foreground">{group.blurb}</p>
              {group.note ? <p className="t-label mt-3 text-muted-foreground">{group.note}</p> : null}

              {group.figure === "lakehouse" ? (
                <div ref={lakeRef} className="mt-6">
                  <LakehouseFigure mode={mode} ready={ready.lake} />
                </div>
              ) : null}
              {group.figure === "azure" ? (
                <div ref={azureRef} className="mt-6">
                  <AzureFigure
                    load={load}
                    focus={focus}
                    ready={ready.azure}
                    onChange={(value) => {
                      touched.current.azure = true;
                      setLoad(value);
                    }}
                  />
                </div>
              ) : null}

              <ul role="list" className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isActive = skill.name === active;
                  const related = !isActive && skill.projectIds.some((id) => activeIds.has(id));
                  return (
                    <li key={skill.name}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => pick(skill.name)}
                        className={cn(
                          "inline-flex min-h-11 scroll-mb-40 items-center gap-2 border px-3 text-[0.9375rem] transition-colors duration-(--dur-ui) ease-(--ease-out)",
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-foreground",
                        )}
                      >
                        {skill.name}
                        {related ? (
                          <>
                            <span className="size-2 bg-primary" aria-hidden="true" />
                            <span className="sr-only">, shares a project with the selected skill</span>
                          </>
                        ) : null}
                        {skill.projectIds.length ? (
                          <>
                            <span className={cn("t-label", !isActive && "opacity-70")} aria-hidden="true">
                              {String(skill.projectIds.length).padStart(2, "0")}
                            </span>
                            <span className="sr-only">
                              , used in {skill.projectIds.length} {skill.projectIds.length === 1 ? "project" : "projects"}
                            </span>
                          </>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {owns && located ? (
                <div className="mt-6 border-t-2 border-primary pt-4 md:hidden">
                  <p className="text-[0.9375rem] leading-snug">{located.skill.about ?? located.group.blurb}</p>
                  {located.skill.note ? <p className="t-label mt-2 text-muted-foreground">{located.skill.note}</p> : null}
                  <UsedIn
                    ids={located.skill.projectIds}
                    projects={projectById}
                    fallback={located.skill.about ? located.group.note : undefined}
                    className="mt-4"
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      {located ? (
        <div
          role="region"
          aria-label="Selected skill"
          className="sticky bottom-3 z-10 mt-3 hidden items-center gap-x-8 gap-y-1 border border-border bg-background px-4 py-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:grid-cols-[minmax(9rem,0.6fr)_minmax(0,1.1fr)_minmax(0,1.9fr)]"
        >
          <div>
            <p className="t-label text-muted-foreground">{located.group.category}</p>
            <p className="t-h2 text-[clamp(1.25rem,1.8vw,1.75rem)]">{located.skill.name}</p>
          </div>
          <div>
            <p className="line-clamp-2 text-[0.875rem] leading-snug">{located.skill.about ?? located.group.blurb}</p>
            {located.skill.note ? <p className="t-label mt-1 text-muted-foreground">{located.skill.note}</p> : null}
          </div>
          <UsedIn
            ids={located.skill.projectIds}
            projects={projectById}
            fallback={located.skill.about ? located.group.note : undefined}
            inline
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      ) : null}
    </div>
  );
}
