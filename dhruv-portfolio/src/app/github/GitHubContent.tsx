import { SITE_CONFIG } from "@/lib/constants";
import type { GitHubData } from "@/lib/github/types";
import { ArrowLink, PageHeader, SectionHead } from "@/components/ui/page-primitives";
import { GitHubLedger } from "@/components/features/github/GitHubLedger";
import { Rhythm } from "@/components/features/github/Rhythm";
import { Repositories } from "@/components/features/github/Repositories";
import { Collaborations } from "@/components/features/github/Collaborations";

// JSON-LD structured data for GitHub page
const githubPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin, SITE_CONFIG.links.twitter],
  },
  name: "GitHub Activity",
  description: "Open source contributions, repository statistics, and coding activity",
  url: `${SITE_CONFIG.siteUrl}/github`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.siteUrl },
    { "@type": "ListItem", position: 2, name: "GitHub", item: `${SITE_CONFIG.siteUrl}/github` },
  ],
};

const number = new Intl.NumberFormat("en-US");
const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const dayUtc = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const clock = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });

/** Designed fallback for a missing token or a GitHub outage: nothing invented, and a way out. */
function Unavailable() {
  return (
    <div className="page-shell py-(--section-pad)">
      <div className="border border-border p-6 md:p-10">
        <p className="t-label text-primary">Feed unavailable</p>
        <p className="t-h2 mt-3">GitHub data is not loading right now.</p>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
          This page is built from the GitHub API and refreshed hourly. It could not be reached, so nothing is shown rather than something out of date. The profile is always current.
        </p>
        <div className="mt-8">
          <ArrowLink href={SITE_CONFIG.links.github} external>
            Open GitHub profile
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}

export function GitHubContent({ data }: { data: GitHubData | null }) {
  const twelveMonths = data?.ledger.periods[0];
  const pulse: [string, string, React.ReactNode?][] = data
    ? [
        [
          "Last push, any branch",
          data.lastPush ? day.format(new Date(data.lastPush.at)) : "None",
          data.lastPush ? (
            <a href={data.lastPush.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
              {data.lastPush.repo}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : undefined,
        ],
        [
          "Last active",
          data.ledger.lastActive ? dayUtc.format(new Date(`${data.ledger.lastActive}T00:00:00Z`)) : "None",
          "any contribution, public or private",
        ],
        ["On GitHub since", monthYear.format(new Date(data.joinedAt)), `@${data.login}`],
        ["Snapshot", clock.format(new Date(data.asOf)), `${day.format(new Date(data.asOf))}, IST. Refreshed hourly`],
      ]
    : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(githubPageSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />

      <PageHeader index="05" label="Open source" title="GitHub">
        {data && twelveMonths ? (
          <p>
            {number.format(data.publicCommits)} commits on default branches across {data.publicRepos} public repositories since {new Date(data.joinedAt).getUTCFullYear()}. Another{" "}
            {number.format(twelveMonths.private)} contributions in the last year sit in private ones: counted here, never named.
          </p>
        ) : (
          <p>Activity and repositories, pulled from the GitHub API.</p>
        )}
      </PageHeader>

      {!data ? (
        <Unavailable />
      ) : (
        <>
          <section aria-labelledby="gh-ledger" className="page-shell py-(--section-pad)">
            <SectionHead index="01" label="Activity" title="Ledger" id="gh-ledger" aside="Hover, drag or tap a square" />
            <dl className="mb-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-6 lg:grid-cols-4">
              {pulse.map(([label, value, note]) => (
                <div key={label}>
                  <dt className="t-label text-muted-foreground">{label}</dt>
                  <dd className="mt-2 font-mono text-[1.0625rem] tabular-nums md:text-xl">{value}</dd>
                  {note ? <dd className="t-label mt-1 break-words text-muted-foreground normal-case tracking-normal">{note}</dd> : null}
                </div>
              ))}
            </dl>
            <GitHubLedger periods={data.ledger.periods} reposByDay={data.ledger.reposByDay} />
          </section>

          {data.rhythm.total ? (
            <section aria-labelledby="gh-rhythm" className="page-shell pb-(--section-pad)">
              <SectionHead index="02" label="Public commits" title="Rhythm" id="gh-rhythm" aside="Weekday by hour, IST" />
              <Rhythm rhythm={data.rhythm} />
            </section>
          ) : null}

          {data.repos.length ? (
            <section aria-labelledby="gh-repos" className="page-shell pb-(--section-pad)">
              <SectionHead index="03" label="Public work" title="Repositories" id="gh-repos" aside={`${data.repos.length} public`} />
              <Repositories repos={data.repos} languages={data.languages} axis={data.axis} />
            </section>
          ) : null}

          {data.collaborations.length ? (
            <section aria-labelledby="gh-collab" className="page-shell pb-(--section-pad)">
              <SectionHead index="04" label="Collaborations" title="With others" id="gh-collab" aside="Repos I do not own" />
              <Collaborations rows={data.collaborations} asOf={data.asOf} />
            </section>
          ) : null}

          <section className="page-shell pb-(--section-pad)">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border pt-6">
              <p className="t-label max-w-[70ch] text-muted-foreground normal-case tracking-normal">
                Source: the GitHub GraphQL API, one server-side request an hour. Commits are those on each repository&apos;s default branch, which is also what GitHub counts as a contribution, so work on other branches shows up in Last push but not here. Private repositories contribute counts only; their names, commits and code are never shown.
              </p>
              <ArrowLink href={data.profileUrl} external>
                Open @{data.login} on GitHub
              </ArrowLink>
            </div>
          </section>
        </>
      )}
    </>
  );
}
