import { ArrowLink } from "@/components/ui/page-primitives";
import { PlacementDashboardSketch } from "@/components/features/projects/PlacementDashboardSketch";
import { CHOICES, OUTCOMES, SENT_RECORDS } from "@/lib/placement-sample";

/**
 * "What arrives matters" (docs/world-class-plan/stage-1/interaction-script.md), static base layer. A server component
 * with no JavaScript: the choice is a native radio group, and CSS `:has()` shows the outcome of the checked option
 * (`.arrives` rules in globals.css). Browsers without `:has()` show all three outcomes, which is also what print and
 * no-CSS get. The animated version, the live region and focus moves are Stage 3; here a screen reader user finds the
 * result by reading on, straight after the radios.
 */
export function WhatArrives() {
  return (
    <section
      id="what-arrives"
      aria-labelledby="arrives-title"
      className="arrives page-shell border-t border-border py-(--section-pad)"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-12">
        <p className="t-label flex items-center gap-2 text-muted-foreground">
          <span className="mark-plus text-primary" aria-hidden="true" />
          <span aria-hidden="true">[03]</span> Try it
        </p>
        <a
          href="#flagship"
          className="t-label inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors duration-(--dur-ui) hover:text-foreground focus-visible:text-foreground"
        >
          Skip to the work <span aria-hidden="true">↓</span>
        </a>
      </div>

      <h2 id="arrives-title" className="t-h1 max-w-[14ch]">
        What arrives matters
      </h2>
      <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
        A real kind of problem from a portal I helped build, with made-up records.
      </p>

      <div className="hairline-grid mt-10 grid-cols-12 md:mt-14">
        {/* 1. before */}
        <div className="col-span-12 p-5 md:p-8 lg:col-span-5">
          <p className="t-label text-muted-foreground">01</p>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-tight">Five records, one spreadsheet</h3>
          <p className="mt-4 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
            The placement office kept student records by hand. These are samples, not real students.
          </p>
          <ol role="list" className="mt-6 border-t border-border font-mono text-[0.8125rem]">
            {SENT_RECORDS.map((record, i) => (
              <li
                key={i}
                className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-border py-2.5"
              >
                <span className="t-label text-muted-foreground">Record {i + 1}</span>
                <span>{record.name}</span>
                <span className={i === 2 ? "text-primary" : "text-muted-foreground"}>{record.branch}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 2. the snag */}
        <div className="col-span-12 p-5 md:p-8 lg:col-span-7">
          <p className="t-label text-muted-foreground">02</p>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-tight">One record doesn&apos;t match</h3>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
            Record 3 looks like record 2, but its branch says &ldquo;Computer Sci.&rdquo; instead of &ldquo;CSE&rdquo;.
          </p>
          <fieldset className="mt-6">
            <legend className="t-label mb-3 text-foreground">What should happen to record 3?</legend>
            <div className="hairline-grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
              {CHOICES.map((choice) => (
                <label
                  key={choice}
                  className="t-label relative flex min-h-16 cursor-pointer items-center gap-3 bg-background px-4 py-3 text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-card has-checked:bg-foreground has-checked:text-background has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-primary has-checked:has-focus-visible:outline-background"
                >
                  <input type="radio" name="arrives-choice" value={choice} className="peer sr-only" />
                  <span aria-hidden="true" className="size-2.5 shrink-0 border border-current peer-checked:bg-background" />
                  {OUTCOMES[choice].label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* 3. what arrived */}
        <div className="col-span-12 p-5 md:p-8">
          <p className="t-label text-muted-foreground">03</p>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-tight">What the staff see</h3>
          <p className="arrives-empty mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Pick an answer in step 02 to see what arrives.
          </p>

          {CHOICES.map((choice) => (
            <div key={choice} data-outcome={choice} className="mt-6">
              <p className="t-label text-muted-foreground">If you pick: {OUTCOMES[choice].label}</p>
              <div className="mt-4 grid grid-cols-12 items-start gap-x-(--gutter) gap-y-6">
                <PlacementDashboardSketch
                  rows={OUTCOMES[choice].rows}
                  compact
                  caption="Fig. The staff screen, the part I built"
                  className="col-span-12 lg:col-span-7"
                />
                <p className="col-span-12 max-w-[26ch] text-[clamp(1.375rem,2.4vw,2.125rem)] font-medium leading-[1.18] tracking-tight lg:col-span-5">
                  {OUTCOMES[choice].tradeOff}
                </p>
              </div>
            </div>
          ))}

          <table className="mt-10 w-full border-collapse text-left font-mono text-[0.8125rem]">
            <caption className="t-label mb-3 text-left text-muted-foreground">Import result: 5 records sent, all three choices</caption>
            <thead>
              <tr className="t-label border-b border-border text-muted-foreground">
                <th scope="col" className="py-2.5 pr-3 font-normal">Choice</th>
                <th scope="col" className="py-2.5 pr-3 font-normal">Arrived</th>
                <th scope="col" className="py-2.5 pr-3 font-normal">Held</th>
                <th scope="col" className="py-2.5 font-normal">Shown twice</th>
              </tr>
            </thead>
            <tbody>
              {CHOICES.map((choice) => (
                <tr key={choice} data-row={choice} className="border-b border-border">
                  <th scope="row" className="py-2.5 pr-3 font-normal">
                    {OUTCOMES[choice].label}
                    <span className="arrives-pick t-label ml-2 bg-primary px-1.5 text-primary-foreground">Your choice</span>
                  </th>
                  <td className="py-2.5 pr-3">{OUTCOMES[choice].arrived}</td>
                  <td className="py-2.5 pr-3">{OUTCOMES[choice].held}</td>
                  <td className="py-2.5">{OUTCOMES[choice].twice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <details className="group mt-10 border-y border-border">
        <summary className="t-label flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-foreground [&::-webkit-details-marker]:hidden">
          The technical version
          <span aria-hidden="true" className="transition-transform duration-(--dur-ui) group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-6">
          <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
            In the real portal, records came in through a bulk importer my friend built. I built the staff screens
            they landed in. This demo shows the check we should have run at import: normalise known variants (CSE,
            Computer Sci.), match records on a stable ID rather than a name, make retries safe so a failed upload run
            twice doesn&apos;t create duplicates, and compare counts between the sheet and the database. It&apos;s
            the first thing I&apos;d change.
          </p>
          <ArrowLink href="/projects/muj-placement-portal" className="mt-4">
            How we rebuilt the portal and handed it over
          </ArrowLink>
        </div>
      </details>
    </section>
  );
}
