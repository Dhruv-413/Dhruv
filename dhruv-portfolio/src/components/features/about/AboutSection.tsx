import type { CSSProperties } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/page-primitives";
import { WeekStrip } from "./WeekStrip";
import { MigrationFigure } from "./MigrationFigure";

const { currentRole, venture } = SITE_CONFIG.person;

// Owner-stated facts (2026-09-20). Keep this to what is true and short; the words light up one by one on scroll.
const STATEMENT = `Weekdays, I move data from old systems to new ones as an intern at ${currentRole.organization}. Weekends, I work in ${venture.name}, my family's B2B sourcing business. The rest of the time, I build software.`;
const ACCENT = new Set([`${currentRole.organization}.`, `${venture.name},`]);

// From timeline.json (education, ONGC, SAP India Hackfest). Numbers are readouts, not headlines (DESIGN.md §2).
const BEFORE = [
  {
    term: "2026 / Degree",
    value: "B.Tech CS",
    detail: "Finished at Manipal University Jaipur with a CGPA of 8.24.",
  },
  {
    term: "2025 / ONGC",
    value: "SAP ABAP",
    detail: "Summer intern: helped build a small part of an oil well management system, and worked with its data.",
  },
  {
    term: "2024 / SAP India Hackfest",
    value: "Top 50",
    detail: "of 2000+ entries nationwide. Built EcoHive with a team of 5.",
  },
] as const;

/**
 * Home, below the hero (the nav's "About"). One idea per block, in plain sentences: who I am this week, what the
 * two jobs are, what connects them, what came before. Server component; only the week strip is a client island.
 */
export function AboutSection() {
  const words = STATEMENT.split(" ");
  const last = words.length - 1;

  return (
    <section id="about" aria-labelledby="about-title" className="page-shell py-(--section-pad)">
      <p className="t-label mb-8 flex items-center gap-2 text-muted-foreground md:mb-12">
        <span className="mark-plus text-primary" aria-hidden="true" />
        <span aria-hidden="true">[02]</span> About
      </p>
      <h2 id="about-title" className="sr-only">
        About Dhruv
      </h2>

      <div className="grid grid-cols-12 items-end gap-x-(--gutter)">
        <p className="t-statement scrub col-span-12 max-w-[28ch] lg:col-span-8">
          {words.map((word, i) => (
            <span
              key={i}
              className={cn("scrub-word", ACCENT.has(word) && "text-primary")}
              style={{ "--w": last ? i / last : 0 } as CSSProperties}
            >
              {word}
              {i < last ? " " : ""}
            </span>
          ))}
        </p>
        {/* fills the space beside the statement on desktop: the sentence, drawn */}
        <MigrationFigure className="hidden lg:col-span-4 lg:block" />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-x-(--gutter) gap-y-14 md:mt-24 lg:items-start">
        <div className="col-span-12 lg:col-span-7 lg:row-start-1">
          <WeekStrip />
          <p className="sr-only">
            Monday to Friday at {currentRole.organization}. Saturday and Sunday at {venture.name}.
          </p>
        </div>

        <div className="col-span-12 flex flex-col gap-10 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <article data-reveal className="border-t border-foreground pt-5">
            <p className="t-label text-muted-foreground">Monday to Friday</p>
            <h3 className="t-h2 mt-3">{currentRole.organization}</h3>
            <p className="mt-2 text-lg font-medium">{currentRole.title}</p>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              Companies keep running on old systems. Data modernization and migration means moving their data into
              newer ones and making sure nothing is lost on the way.
            </p>
          </article>

          <article data-reveal className="border-t border-primary pt-5">
            <p className="t-label text-muted-foreground">Saturday and Sunday</p>
            <h3 className="t-h2 mt-3">{venture.name}</h3>
            <p className="mt-2 text-lg font-medium">Family B2B sourcing business</p>
            <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
              B2B sourcing means helping one business find and buy what it needs from another. It is my family&apos;s
              business, and I contribute on weekends.
            </p>
          </article>
        </div>

        {/* under the week strip on desktop, beside the Beaumonde lane; after the lanes on mobile */}
        <div data-reveal className="col-span-12 lg:col-span-7 lg:row-start-2 lg:self-end">
          <p className="t-label text-muted-foreground">What connects them</p>
          <p className="mt-4 max-w-[30ch] text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-tight">
            Both come down to the same thing: getting something from where it is to where it is needed, without
            losing it on the way.
          </p>
        </div>
      </div>

      <div className="mt-20 md:mt-32">
        <div className="mb-6 flex items-baseline justify-between gap-6">
          <h3 className="t-label text-muted-foreground">Before this</h3>
          <ArrowLink href="/career">Full timeline</ArrowLink>
        </div>
        <dl className="hairline-grid grid-cols-1 md:grid-cols-3">
          {BEFORE.map(({ term, value, detail }) => (
            <div key={term} data-reveal className="p-5 md:p-7">
              <dt className="t-label text-muted-foreground">{term}</dt>
              <dd className="t-h2 mt-4 text-primary">{value}</dd>
              <dd className="mt-3 max-w-[34ch] text-[1.0625rem] leading-snug">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
