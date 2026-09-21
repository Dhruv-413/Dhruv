import timelineData from "@/data/timeline.json";
import projectsData from "@/data/projects.json";
import certifications from "@/data/certifications.json";
import type { TimelineItem } from "@/types/experience";

/**
 * The career, as data for two views: the shared time axis (CareerTrack) and the written chapters (CareerChapters).
 * Everything here is derived from timeline.json, projects.json and certifications.json; nothing is typed in twice.
 * Time is measured in months from the first month on record (a float, so a mid-month date sits mid-column).
 */

export type Lane = "study" | "work" | "contest" | "project" | "cert";

export const LANES: readonly { key: Lane; label: string }[] = [
  { key: "study", label: "Study" },
  { key: "work", label: "Work" },
  { key: "contest", label: "Contests" },
  { key: "project", label: "Projects" },
  { key: "cert", label: "Certificates" },
];

export interface TrackItem {
  id: string;
  lane: Lane;
  /** Short text drawn on or beside the mark (ranges only). */
  label: string;
  title: string;
  org: string;
  /** Start, in months from the axis origin. */
  from: number;
  /** End of a range, in months; absent for a single date. */
  to?: number;
  /** A range with no end date: still going. */
  current?: boolean;
  dateText: string;
  blurb: string;
  href?: string;
  hrefLabel?: string;
  external?: boolean;
  /** Sub-row of a single date inside its lane, so marks a month or less apart do not sit on top of each other. */
  row?: number;
}

export interface TrackModel {
  /** Month columns, first month on record to the current one. The axis is `steps` months long. */
  steps: number;
  /** Sub-rows each lane needs (at least 1). */
  rows: Record<Lane, number>;
  /** The latest month in which the most lanes overlap: where the page rests, and where the first sweep ends. */
  peak: number;
  /** How many lanes overlap in that month. */
  peakLanes: number;
  monthLabels: string[];
  monthNames: string[];
  years: { label: string; at: number }[];
  items: TrackItem[];
}

export interface Chapter {
  key: string;
  kind: TimelineItem["type"];
  org: string;
  short: string;
  /** Newest first. */
  items: TimelineItem[];
  ongoing: boolean;
}

/** Which items were going on in a month: ranges that overlap it, single dates that fall inside it. */
export function activeIn(items: TrackItem[], month: number) {
  return items.filter((item) => (item.to !== undefined ? item.from < month + 1 && item.to > month : Math.floor(item.from) === month));
}

const short = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const long = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function parse(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}

const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const chapterKey = (item: TimelineItem) => (item.type === "achievement" ? "competitions" : slug(item.short ?? item.organization));

export function getChapters(): Chapter[] {
  const byKey = new Map<string, Chapter>();
  for (const item of timelineData as TimelineItem[]) {
    const key = chapterKey(item);
    const chapter = byKey.get(key) ?? {
      key,
      kind: item.type,
      org: item.type === "achievement" ? "Competitions" : item.organization,
      short: item.type === "achievement" ? "Competitions" : (item.short ?? item.organization),
      items: [],
      ongoing: false,
    };
    chapter.items.push(item);
    if (item.type !== "achievement" && !item.endDate) chapter.ongoing = true;
    byKey.set(key, chapter);
  }
  const chapters = [...byKey.values()];
  for (const chapter of chapters) chapter.items.sort((a, b) => b.startDate.localeCompare(a.startDate));
  // ongoing first, then by the most recent date of the chapter
  const recency = (c: Chapter) => c.items.reduce((max, i) => (max > (i.endDate ?? i.startDate) ? max : (i.endDate ?? i.startDate)), "");
  return chapters.sort((a, b) => Number(b.ongoing) - Number(a.ongoing) || recency(b).localeCompare(recency(a)));
}

export function getTrackModel(now: Date = new Date()): TrackModel {
  const work = timelineData as TimelineItem[];
  const dates = [
    ...work.map((i) => i.startDate),
    ...projectsData.map((p) => p.date),
    ...certifications.map((c) => c.date),
  ].sort();
  const origin = parse(dates[0]);

  const at = (iso: string, endOfDay = false) => {
    const { y, m, d } = parse(iso);
    return (y - origin.y) * 12 + (m - origin.m) + (d - (endOfDay ? 0 : 1)) / daysIn(y, m);
  };

  const today = at(now.toISOString(), false);
  const items: TrackItem[] = [];

  const range = (a: string, b?: string) => (b ? `${short.format(new Date(a))} to ${short.format(new Date(b))}` : `From ${short.format(new Date(a))}`);

  let latest = 0;
  for (const item of work) {
    const lane: Lane = item.type === "education" ? "study" : item.type === "work" ? "work" : "contest";
    const isRange = item.type !== "achievement";
    const key = chapterKey(item);
    const from = at(item.startDate);
    const to = isRange ? (item.endDate ? at(item.endDate, true) : undefined) : undefined;
    latest = Math.max(latest, to ?? from);
    items.push({
      id: item.id,
      lane,
      label: item.type === "work" && item.mode ? `${item.short ?? item.organization}, ${item.mode.toLowerCase()}` : (item.short ?? item.organization),
      title: item.title,
      org: item.organization,
      from,
      to,
      current: isRange && !item.endDate,
      dateText: isRange ? range(item.startDate, item.endDate) : short.format(new Date(item.startDate)),
      blurb: item.description[0] ?? item.metrics?.map((m) => `${m.label} ${m.value}`).join(", ") ?? "",
      href: `#${key}`,
      hrefLabel: "Read the chapter",
    });
  }

  for (const project of projectsData) {
    const from = at(project.date);
    latest = Math.max(latest, from);
    items.push({
      id: project.id,
      lane: "project",
      label: project.title,
      title: project.title,
      org: project.category,
      from,
      dateText: short.format(new Date(project.date)),
      blurb: project.description,
      href: `/projects/${project.id}`,
      hrefLabel: "Open the project",
    });
  }

  for (const cert of certifications) {
    const from = at(cert.date);
    latest = Math.max(latest, from);
    items.push({
      id: `cert-${slug(cert.name)}-${cert.date}`,
      lane: "cert",
      label: cert.name,
      title: cert.name,
      org: cert.issuer,
      from,
      dateText: short.format(new Date(cert.date)),
      blurb: cert.skills?.length ? `Covers ${cert.skills.join(", ")}.` : "",
      href: cert.link || undefined,
      hrefLabel: cert.link ? "Credential" : undefined,
      external: Boolean(cert.link),
    });
  }

  // Open ranges run to the end of the axis: the current month, or the latest dated thing if that is later.
  const steps = Math.max(Math.floor(today), Math.floor(latest)) + 1;
  for (const item of items) if (item.current) item.to = steps;

  // Pack single dates into sub-rows: a mark goes in the first row whose last mark is at least 1.3 months before it
  // (about 29 px on a wide screen, so two marks never share a 24 px target).
  const rows = { study: 1, work: 1, contest: 1, project: 1, cert: 1 } satisfies Record<Lane, number>;
  for (const { key } of LANES) {
    const ends: number[] = [];
    for (const item of items.filter((i) => i.lane === key && i.to === undefined).sort((a, b) => a.from - b.from)) {
      let row = ends.findIndex((end) => item.from - end >= 1.3);
      if (row === -1) row = ends.length;
      ends[row] = item.from;
      item.row = row;
    }
    rows[key] = Math.max(1, ends.length);
  }

  const monthDate = (i: number) => new Date(Date.UTC(origin.y, origin.m - 1 + i, 1));
  const years: TrackModel["years"] = [{ label: String(origin.y), at: 0 }];
  for (let i = 1; i < steps; i++) if (monthDate(i).getUTCMonth() === 0) years.push({ label: String(monthDate(i).getUTCFullYear()), at: i });

  let peak = steps - 1;
  let peakLanes = 0;
  for (let month = 0; month < steps; month++) {
    const lanes = new Set(activeIn(items, month).map((item) => item.lane)).size;
    if (lanes >= peakLanes) {
      peakLanes = lanes;
      peak = month;
    }
  }

  return {
    steps,
    rows,
    peak,
    peakLanes,
    monthLabels: Array.from({ length: steps }, (_, i) => short.format(monthDate(i))),
    monthNames: Array.from({ length: steps }, (_, i) => long.format(monthDate(i))),
    years,
    items,
  };
}
