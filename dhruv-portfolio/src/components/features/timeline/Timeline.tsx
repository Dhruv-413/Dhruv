import timelineData from "@/data/timeline.json";
import type { TimelineItem } from "@/types/experience";
import { Tag } from "@/components/ui/page-primitives";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

const TYPE_LABEL: Record<TimelineItem["type"], string> = {
  work: "Work",
  education: "Education",
  achievement: "Achievement",
};

/** "Jun 2025 - Aug 2025", "From Jan 2026" (no end date on a job/course), or a single date for one-off achievements. */
function formatRange(item: TimelineItem): string {
  const start = month.format(new Date(item.startDate));
  if (item.endDate) return `${start} - ${month.format(new Date(item.endDate))}`;
  return item.type === "achievement" ? start : `From ${start}`;
}

/**
 * Career as a chronological ledger (DESIGN.md §4.9, slice 3): hairline rows, sticky date column, real entries only.
 * Server component, newest first. Copy comes verbatim from timeline.json; edit the data, not this file.
 */
export function Timeline() {
  const items = ([...timelineData] as TimelineItem[]).sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <section aria-label="Career timeline" className="page-shell pb-(--section-pad)">
      <ol role="list" className="border-b border-border">
        {items.map((item) => (
          <li key={item.id} data-reveal className="border-t border-border py-8 md:py-12">
            <article className="grid grid-cols-12 gap-x-(--gutter) gap-y-5">
              <header className="col-span-12 md:sticky md:top-24 md:col-span-3 md:self-start">
                <p className="t-label flex items-center gap-2 text-muted-foreground">
                  {item.type === "work" ? <span className="size-1.5 bg-primary" aria-hidden="true" /> : null}
                  {TYPE_LABEL[item.type]}
                </p>
                <p className="t-label mt-2 text-foreground">
                  <time dateTime={item.startDate}>{formatRange(item)}</time>
                </p>
              </header>

              <div className="col-span-12 md:col-span-9">
                <h2 className="text-[clamp(1.6rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">
                  {item.title}
                </h2>
                <p className="t-label mt-3 text-muted-foreground">
                  {item.organization}
                  {item.location ? <span> / {item.location}</span> : null}
                </p>

                {item.description?.length ? (
                  <ul role="list" className="mt-6 max-w-[62ch] space-y-3 text-[1.0625rem] leading-relaxed">
                    {item.description.map((line) => (
                      <li key={line} className="border-l border-border pl-4">
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.metrics?.length ? (
                  <dl className="hairline-grid mt-8 max-w-2xl grid-cols-1 sm:grid-cols-3">
                    {item.metrics.map((metric) => (
                      <div key={metric.label} className="p-4">
                        <dt className="t-label text-muted-foreground">{metric.label}</dt>
                        <dd className="t-h2 mt-2 text-primary">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {item.tags?.length ? (
                  <ul role="list" className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
