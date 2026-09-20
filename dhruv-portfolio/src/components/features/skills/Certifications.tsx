import certifications from "@/data/certifications.json";
import { ArrowLink, SectionHead, Tag } from "@/components/ui/page-primitives";

const formatter = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** Certifications as a hairline list (real entries from certifications.json, newest first). Server component. */
export function Certifications() {
  const items = [...certifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section aria-labelledby="certs-title" className="page-shell pb-(--section-pad)">
      <SectionHead index="02" label="Credentials" title="Certifications" id="certs-title" />

      <ol role="list" className="border-b border-border">
        {items.map((cert) => (
          <li key={`${cert.name}-${cert.date}`} data-reveal className="border-t border-border py-6 md:py-8">
            <div className="grid grid-cols-12 items-baseline gap-x-(--gutter) gap-y-3">
              <p className="t-label col-span-12 text-muted-foreground md:col-span-2">
                <time dateTime={cert.date}>{formatter.format(new Date(cert.date))}</time>
              </p>
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight tracking-tight">
                  {cert.name}
                </h3>
                <p className="t-label mt-2 text-muted-foreground">{cert.issuer}</p>
                {cert.skills?.length ? (
                  <ul role="list" className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <li key={skill}>
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {cert.link ? (
                <div className="col-span-12 md:col-span-3 md:text-right">
                  <ArrowLink href={cert.link} external>
                    Credential
                  </ArrowLink>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
