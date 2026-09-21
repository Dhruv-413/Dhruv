import certifications from "@/data/certifications.json";
import { ArrowLink, SectionHead, Tag } from "@/components/ui/page-primitives";

const month = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Certifications (DESIGN.md §5, 2026-09-21): a ledger grouped by year, newest year first. Each year is one hairline row:
 * the year in display type (pinned while its certificates scroll, from md up) with a count, and beside it that year's
 * certificates as tickets, newest first. A ticket has a narrow month stub that fills with the accent on hover, then
 * issuer, name, the skills it covers and a link. Rows, not a fixed grid, so any number of certificates or years fills
 * the page cleanly. Server component.
 */
export function Certifications() {
  const items = [...certifications].sort((a, b) => b.date.localeCompare(a.date));
  if (!items.length) return null;

  const years = [...new Set(items.map((cert) => new Date(cert.date).getUTCFullYear()))];
  const issuers = new Set(items.map((cert) => cert.issuer)).size;

  return (
    <section aria-labelledby="certs-title" className="page-shell pb-(--section-pad)">
      <SectionHead
        index="02"
        label="Credentials"
        title="Certifications"
        aside={`${items.length} certificates, ${issuers} issuers`}
        id="certs-title"
      />

      <ol role="list" className="hairline-grid grid-cols-1">
        {years.map((year) => {
          const ofYear = items.filter((cert) => new Date(cert.date).getUTCFullYear() === year);
          return (
            <li key={year} data-reveal className="grid md:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="border-b border-border p-4 md:border-b-0 md:border-r md:p-6">
                <div className="flex items-baseline justify-between gap-4 md:sticky md:top-24 md:block">
                  <h3 className="t-h2 text-[clamp(2.25rem,5vw,4rem)] leading-none">{year}</h3>
                  <p className="t-label text-muted-foreground md:mt-3">
                    {ofYear.length} {ofYear.length === 1 ? "certificate" : "certificates"}
                  </p>
                </div>
              </div>

              <ol role="list" className="divide-y divide-dashed divide-border">
                {ofYear.map((cert) => {
                  const date = new Date(cert.date);
                  return (
                    <li
                      key={`${cert.name}-${cert.date}`}
                      className="group grid grid-cols-[3.75rem_minmax(0,1fr)] md:grid-cols-[5rem_minmax(0,1fr)_auto]"
                    >
                      <div className="border-r border-dashed border-border p-3 transition-colors duration-(--dur-ui) ease-(--ease-out) group-hover:bg-primary group-hover:text-primary-foreground md:p-4">
                        <time dateTime={cert.date} className="t-label">
                          <span aria-hidden="true">{month.format(date)}</span>
                          <span className="sr-only">{fullDate.format(date)}</span>
                        </time>
                      </div>

                      <div className="p-4 md:p-6">
                        <p className="t-label text-muted-foreground">{cert.issuer}</p>
                        <h4 className="mt-2 text-[clamp(1.125rem,1.8vw,1.625rem)] font-semibold leading-tight tracking-tight">
                          {cert.name}
                        </h4>
                        {cert.skills?.length ? (
                          <ul role="list" className="mt-4 flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                              <li key={skill}>
                                <Tag>{skill}</Tag>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {cert.link ? (
                          <div className="mt-2 md:hidden">
                            <ArrowLink href={cert.link} external>
                              Credential
                            </ArrowLink>
                          </div>
                        ) : null}
                      </div>

                      {cert.link ? (
                        <div className="hidden items-center border-l border-dashed border-border px-6 md:flex">
                          <ArrowLink href={cert.link} external>
                            Credential
                          </ArrowLink>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
