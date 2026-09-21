import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLink } from "@/components/ui/page-primitives";
import { CopyEmail } from "./CopyEmail";

const { contact, links } = SITE_CONFIG;

/** Direct routes, each with what it is best for, so nobody has to guess which door to knock on. Server component; only Copy is client. */
export function ContactDetails() {
  return (
    <aside id="direct" aria-labelledby="direct-heading" className="col-span-12 scroll-mt-24 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
      <h2 id="direct-heading" className="t-label mb-6 flex items-center gap-2 text-muted-foreground">
        <span className="mark-plus text-primary" aria-hidden="true" />
        Or reach me directly
      </h2>

      <dl className="hairline-grid grid-cols-1">
        <div className="p-5">
          <dt className="t-label text-muted-foreground">Email</dt>
          <dd className="mt-2">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <a
                href={links.email}
                className="inline-flex min-h-11 items-center break-all font-mono text-sm transition-colors duration-(--dur-ui) hover:text-primary focus-visible:text-primary"
              >
                {contact.email}
              </a>
              <CopyEmail email={contact.email} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Best for roles, projects and anything that needs more than a line.</p>
          </dd>
        </div>

        <div className="p-5">
          <dt className="t-label text-muted-foreground">Resume</dt>
          <dd className="mt-1">
            <a
              href="/Dhruv_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="t-label inline-flex min-h-11 items-center gap-2 border-b border-transparent text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:text-primary"
            >
              Open PDF <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="text-sm leading-relaxed text-muted-foreground">The full CV as a PDF, for when you need to forward it.</p>
          </dd>
        </div>

        <div className="p-5">
          <dt className="t-label text-muted-foreground">LinkedIn</dt>
          <dd className="mt-1">
            <ArrowLink href={links.linkedin} external>
              Dhruv Gupta
            </ArrowLink>
            <p className="text-sm leading-relaxed text-muted-foreground">Best for introductions and recruiters.</p>
          </dd>
        </div>

        <div className="p-5">
          <dt className="t-label text-muted-foreground">GitHub</dt>
          <dd className="mt-1">
            <ArrowLink href={links.github} external>
              Dhruv-413
            </ArrowLink>
            <p className="text-sm leading-relaxed text-muted-foreground">Best for code, and for seeing what I am building right now.</p>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
