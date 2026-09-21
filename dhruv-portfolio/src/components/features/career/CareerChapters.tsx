import Link from "next/link";
import skillsData from "@/data/skills.json";
import projects from "@/data/projects.json";
import type { SkillGroup } from "@/types/skill";
import type { TimelineItem } from "@/types/experience";
import { getChapters, getTrackModel, type Chapter, type TrackModel } from "@/lib/career";
import { ArrowLink, SectionHead, Tag } from "@/components/ui/page-primitives";
import { cn } from "@/lib/utils";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

const KIND: Record<TimelineItem["type"], string> = { work: "Work", education: "Education", achievement: "Competitions" };
const TAGS: Record<TimelineItem["type"], string> = { work: "Tools and topics", education: "Coursework", achievement: "Skills used" };

/** Links that follow from the data: a competition that produced a project points at that project. */
const PROJECT_OF: Record<string, string> = { "sap-hackfest": "ecohive" };

/** Skills that skills.json says were learned at this place (its `note`/`notes` name it), minus any already shown as tags. */
function learnedAt(short: string, shown: string[]) {
  const names = (skillsData as SkillGroup[]).flatMap((group) =>
    group.note?.includes(short)
      ? group.skills
      : Object.entries(group.notes ?? {})
          .filter(([, note]) => note.includes(short))
          .map(([name]) => name),
  );
  return names.filter((name) => !shown.includes(name));
}

/** "Top 50 ... from 2000+ entries": read the two numbers from the line, so the picture can never disagree with the text. */
function funnelOf(item: TimelineItem) {
  for (const line of item.description) {
    const match = line.match(/Top (\d+).*?from (\d[\d,]*)\+? entries/i);
    if (match) return { top: Number(match[1]), total: Number(match[2].replace(/,/g, "")), line };
  }
  return null;
}

const CELLS = 200;

/** Where this chapter sits in the whole run: the same axis as the time line above, one strip, its span filled. Decorative. */
function Where({ chapter, model }: { chapter: Chapter; model: TrackModel }) {
  const mine = model.items.filter((item) => item.href === `#${chapter.key}`);
  const pos = (value: number) => `${(value / model.steps) * 100}%`;
  return (
    <div aria-hidden="true" className="mt-6 max-w-64">
      <div className="relative h-2 bg-border">
        {mine.map((item) =>
          item.to !== undefined ? (
            <span
              key={item.id}
              className={cn("absolute inset-y-0", item.current ? "bg-primary" : "bg-foreground")}
              style={{ left: pos(item.from), width: pos(item.to - item.from) }}
            />
          ) : (
            <span key={item.id} className="absolute -top-1 h-4 w-0.5 bg-foreground" style={{ left: pos(item.from) }} />
          ),
        )}
      </div>
      <p className="t-label mt-1.5 flex justify-between text-muted-foreground">
        <span>{model.years[0].label}</span>
        <span>now</span>
      </p>
    </div>
  );
}

/** 2000+ entries drawn as 200 cells (one cell = 10 entries); the ones that reached the top 50 are lit. Decorative. */
function Funnel({ top, total }: { top: number; total: number }) {
  const each = total / CELLS;
  const lit = Math.max(1, Math.ceil(top / each));
  return (
    <figure className="mt-6 max-w-sm">
      <div aria-hidden="true" className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-px">
        {Array.from({ length: CELLS }, (_, i) => (
          <span key={i} className={cn("aspect-square", i < lit ? "bg-primary" : "bg-border")} />
        ))}
      </div>
      <figcaption className="t-label mt-3 text-muted-foreground">
        {total.toLocaleString("en-US")}+ entries, {lit} of {CELLS} cells lit. One cell is {each} entries.
      </figcaption>
    </figure>
  );
}

function range(chapter: Chapter) {
  const starts = chapter.items.map((i) => i.startDate).sort();
  const ends = chapter.items.map((i) => i.endDate ?? i.startDate).sort();
  const first = starts[0];
  const last = ends[ends.length - 1];
  return { first, last, ongoing: chapter.ongoing };
}

function Role({ item, single }: { item: TimelineItem; single: boolean }) {
  const current = !item.endDate && item.type !== "achievement";
  const funnel = funnelOf(item);
  const projectId = PROJECT_OF[item.id];
  const project = projectId ? projects.find((p) => p.id === projectId) : undefined;
  const dateText = item.type === "achievement" ? month.format(new Date(item.startDate)) : null;
  // contests are short entries: tighter lists and no tag heading, except the one that has a picture
  const compact = item.type === "achievement" && !funnel;

  return (
    <li className={cn("relative", !single && "border-l border-border pb-10 pl-6 last:pb-0 md:pl-10")}>
      {!single ? (
        <span className={cn("absolute -left-[5px] top-2 size-2.5", current ? "bg-primary" : "bg-foreground")} aria-hidden="true" />
      ) : null}

      <p className="t-label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
        {dateText ? (
          <time dateTime={item.startDate}>{dateText}</time>
        ) : (
          <span>
            <time dateTime={item.startDate}>{month.format(new Date(item.startDate))}</time>
            {" to "}
            {item.endDate ? <time dateTime={item.endDate}>{month.format(new Date(item.endDate))}</time> : "now"}
          </span>
        )}
        {item.mode ? <span className="border border-border px-1.5 py-0.5 text-foreground">{item.mode}</span> : null}
        {current ? (
          <span className="flex items-center gap-1.5 text-primary">
            <span className="size-1.5 bg-primary" aria-hidden="true" /> Current
          </span>
        ) : null}
      </p>

      <h4 className="mt-3 text-[clamp(1.4rem,2.6vw,2.25rem)] font-semibold leading-[1.08] tracking-tight">{item.title}</h4>
      {item.type === "achievement" || item.location !== item.mode ? (
        <p className="t-label mt-2 text-muted-foreground">{item.type === "achievement" ? item.organization : item.location}</p>
      ) : null}

      {item.description.length ? (
        <ul role="list" className={cn("max-w-[62ch] text-[1.0625rem] leading-relaxed", compact ? "mt-3 space-y-1.5" : "mt-5 space-y-3")}>
          {item.description.map((line) => (
            <li key={line} className="border-l border-border pl-4">
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      {funnel ? <Funnel top={funnel.top} total={funnel.total} /> : null}

      {item.metrics?.length ? (
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="t-label text-muted-foreground">{metric.label}</dt>
              <dd className="t-h2 mt-2">{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {item.tags.length ? (
        <div className={compact ? "mt-4" : "mt-6"}>
          {compact ? null : <p className="t-label mb-3 text-muted-foreground">{TAGS[item.type]}</p>}
          <ul role="list" className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project ? (
        <div className="mt-4">
          <ArrowLink href={`/projects/${project.id}`}>Read about {project.title}</ArrowLink>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Career, in full (DESIGN.md §5, 2026-09-21): one chapter per place, newest first. A place with several roles or
 * contests reads oldest to newest along a rail, so a progression (Deloitte: virtual SAP analyst, then onsite
 * data migration) shows as one story. Copy comes from timeline.json; the "learned here" chips come from skills.json.
 */
export function CareerChapters() {
  const chapters = getChapters();
  const model = getTrackModel();

  return (
    <section aria-labelledby="chapters-title" className="page-shell pb-(--section-pad)">
      <SectionHead index="02" label="Detail" title="Chapters" aside={`${chapters.length} places, newest first`} id="chapters-title" />

      <ol role="list" className="border-b border-border">
        {chapters.map((chapter, index) => {
          const { first, last, ongoing } = range(chapter);
          const roles = [...chapter.items].reverse();
          const shown = roles.flatMap((role) => role.tags);
          const learned = chapter.kind === "achievement" ? [] : learnedAt(chapter.short, shown);

          return (
            <li key={chapter.key} className="border-t border-border">
              <article id={chapter.key} data-reveal className="grid scroll-mt-24 grid-cols-12 gap-x-(--gutter) gap-y-8 py-10 md:py-14">
                <header className="col-span-12 md:sticky md:top-24 md:col-span-4 md:self-start">
                  <p className="t-label flex items-center gap-2 text-muted-foreground">
                    {ongoing ? <span className="size-1.5 bg-primary" aria-hidden="true" /> : null}
                    <span aria-hidden="true">[{String(index + 1).padStart(2, "0")}]</span> {KIND[chapter.kind]}
                  </p>
                  <h3 className="t-h2 mt-4 text-[clamp(2rem,3.6vw,3.25rem)] [overflow-wrap:anywhere]">{chapter.short}</h3>
                  {chapter.short !== chapter.org ? <p className="mt-3 max-w-[30ch] text-muted-foreground">{chapter.org}</p> : null}
                  <p className="t-label mt-4 text-foreground">
                    <time dateTime={first}>{month.format(new Date(first))}</time>
                    {" to "}
                    {ongoing ? "now" : <time dateTime={last}>{month.format(new Date(last))}</time>}
                  </p>
                  <Where chapter={chapter} model={model} />
                </header>

                <div className="col-span-12 md:col-span-8">
                  <ol role="list" className="space-y-0">
                    {roles.map((role) => (
                      <Role key={role.id} item={role} single={roles.length === 1} />
                    ))}
                  </ol>

                  {learned.length ? (
                    <div className="mt-10 border-t border-dashed border-border pt-6">
                      <p className="t-label mb-3 text-muted-foreground">Learned here</p>
                      <ul role="list" className="flex flex-wrap gap-2">
                        {learned.map((name) => (
                          <li key={name}>
                            <Tag>{name}</Tag>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3">
                        <ArrowLink href="/skills">See them on Skills</ArrowLink>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <nav aria-label="Continue" className="hairline-grid mt-16 grid-cols-1 md:mt-24 md:grid-cols-2">
        <Link
          href="/skills"
          className="group flex min-h-48 flex-col justify-between gap-10 p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:p-8"
        >
          <span className="t-label text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
            What I learned along the way
          </span>
          <span className="t-h1 flex items-end justify-between gap-4">
            Skills <span aria-hidden="true">↗</span>
          </span>
        </Link>
        <Link
          href="/projects"
          className="group flex min-h-48 flex-col justify-between gap-10 p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground md:p-8"
        >
          <span className="t-label text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
            {String(projects.length).padStart(2, "0")} projects, built in the same years
          </span>
          <span className="t-h1 flex items-end justify-between gap-4">
            Projects <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </nav>
    </section>
  );
}
