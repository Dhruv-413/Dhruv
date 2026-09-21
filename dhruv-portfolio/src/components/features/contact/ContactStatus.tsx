import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLink } from "@/components/ui/page-primitives";
import { LocalClock } from "./LocalClock";

const { availability, location } = SITE_CONFIG.contact;

/**
 * Three facts a visitor wants before writing: am I reading someone who can answer, how fast, and what time is it there.
 * Availability and reply window are owner-stated constants (lib/constants.ts) with an "as of" month; the clock is real.
 */
export function ContactStatus() {
  const days: number = availability.replyWithinDays;
  return (
    <section aria-label="Availability" className="page-shell">
      <dl className="hairline-grid grid-cols-1 sm:grid-cols-3">
        <div className="fade-up p-5 md:p-6">
          <dt className="t-label text-muted-foreground">Availability</dt>
          <dd className="mt-3">
            <p className="flex items-center gap-3 text-[1.125rem] font-semibold leading-tight tracking-tight">
              <span aria-hidden="true" className="size-2.5 shrink-0 bg-primary" />
              {availability.status}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{availability.detail}</p>
          </dd>
        </div>
        <div className="fade-up p-5 md:p-6" style={{ "--d": "70ms" } as React.CSSProperties}>
          <dt className="t-label text-muted-foreground">Reply window</dt>
          <dd className="mt-3">
            <p className="text-[1.125rem] font-semibold leading-tight tracking-tight">
              Within {days} {days === 1 ? "day" : "days"}
            </p>
            <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">By email, to whatever address you give</p>
          </dd>
        </div>
        <div className="fade-up p-5 md:p-6" style={{ "--d": "140ms" } as React.CSSProperties}>
          <dt className="t-label text-muted-foreground">My time</dt>
          <dd className="mt-3">
            <p className="font-mono text-[1.125rem] font-semibold leading-tight">
              <LocalClock /> {availability.timeZoneLabel}
            </p>
            <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:block">{location}</p>
          </dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6">
        <p className="t-label text-muted-foreground">Status as of {availability.asOf}</p>
        {/* below lg the direct details sit under the form; this puts the quickest route one tap away */}
        <ArrowLink href="#direct" arrow="↓" className="lg:hidden">
          Email and links
        </ArrowLink>
      </div>
    </section>
  );
}
