"use client";

import { useGitHubData } from "@/hooks/useGitHub";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLink, SectionHead } from "@/components/ui/page-primitives";
import { Heatmap } from "./Heatmap";

const number = new Intl.NumberFormat("en-US");
const updated = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const INITIAL_REPOS = 8;

/** Placeholder with the same silhouette as the loaded page, so nothing jumps when data arrives. */
function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="page-shell py-(--section-pad)">
      <span className="sr-only">Loading GitHub activity</span>
      <div className="hairline-grid mb-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-6" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="p-5">
            <div className="h-3 w-20 animate-pulse bg-muted" />
            <div className="mt-4 h-8 w-16 animate-pulse bg-muted" />
          </div>
        ))}
      </div>
      <div className="grid grid-flow-col gap-[3px] overflow-hidden" style={{ gridTemplateRows: "repeat(7, auto)" }} aria-hidden="true">
        {Array.from({ length: 53 * 7 }, (_, i) => (
          <div key={i} className="aspect-square w-3 animate-pulse bg-muted" style={{ animationDelay: `${(i % 53) * 30}ms` }} />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="page-shell py-(--section-pad)">
      <div role="alert" className="border border-border p-6 md:p-10">
        <p className="t-label text-primary">Request failed</p>
        <p className="t-h2 mt-3">GitHub data is unavailable right now.</p>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
          The live feed could not be reached. Try again, or read the profile on GitHub directly.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={onRetry}
            className="t-label inline-flex h-12 items-center gap-2 border border-primary bg-primary px-5 text-primary-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Retry <span aria-hidden="true">↻</span>
          </button>
          <ArrowLink href={SITE_CONFIG.links.github} external>
            Open GitHub profile
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}

function RepoRow({
  name,
  description,
  url,
  language,
  updatedAt,
  owner,
}: {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  updatedAt: string;
  owner?: string;
}) {
  return (
    <li data-reveal>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-12 items-baseline gap-x-(--gutter) gap-y-2 border-t border-border px-2 py-6 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:px-4 md:py-7"
      >
        <span className="col-span-12 md:col-span-6">
          <span className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight tracking-tight">
            {owner ? `${owner}/` : ""}
            {name}
          </span>
          {description ? (
            <span className="mt-2 block max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
              {description}
            </span>
          ) : null}
        </span>
        <span className="t-label col-span-6 text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70 md:col-span-3">
          {language ?? "No language"}
        </span>
        <span className="t-label col-span-6 text-right md:col-span-3">
          <time dateTime={updatedAt}>{updated.format(new Date(updatedAt))}</time> <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>
    </li>
  );
}

/**
 * Live GitHub activity. Client island: data comes from /api/github through the existing TanStack Query hook.
 * Designed states: loading (same silhouette), error (retry + profile link), and loaded. Numbers are readouts,
 * not headlines (DESIGN.md §2/§4.7): no stars or followers.
 */
export function GitHubView() {
  const { data, isLoading, isError, refetch } = useGitHubData();

  if (isLoading) return <LoadingState />;
  // The fetcher falls back to an all-zero payload when the API answers without a user; treat that as "no data".
  const isEmpty = !data.contributions || (data.contributions.weeks.length === 0 && data.repos.length === 0);
  if (isError || isEmpty || !data.contributions) return <ErrorState onRetry={() => void refetch()} />;

  const { contributions, stats, repos, contributedRepos } = data;
  const readouts = [
    ["Contributions", contributions.totalContributions],
    ["Commits", contributions.totalCommits],
    ["Pull requests", contributions.totalPRs],
    ["Repositories", stats?.totalRepos ?? repos.length],
    ["Current streak", contributions.currentStreak],
    ["Longest streak", contributions.longestStreak],
  ] as const;

  const languages = Object.entries(stats?.languages ?? {})
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 6);
  const languageTotal = languages.reduce((sum, [, value]) => sum + value.count, 0) || 1;

  const sortedRepos = [...repos].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const visibleRepos = sortedRepos.slice(0, INITIAL_REPOS);
  const hiddenRepos = sortedRepos.slice(INITIAL_REPOS);
  const otherRepos = contributedRepos?.repositories ?? [];

  return (
    <>
      <section aria-labelledby="gh-activity" className="page-shell py-(--section-pad)">
        <SectionHead index="01" label="Activity" title="Last 12 months" id="gh-activity" />

        <dl className="hairline-grid mb-14 grid-cols-2 md:mb-20 md:grid-cols-3 lg:grid-cols-6">
          {readouts.map(([label, value]) => (
            <div key={label} className="p-5">
              <dt className="t-label text-muted-foreground">{label}</dt>
              <dd className="mt-3 font-mono text-2xl tabular-nums md:text-3xl">{number.format(value)}</dd>
            </div>
          ))}
        </dl>

        <Heatmap weeks={contributions.weeks} total={contributions.totalContributions} />
      </section>

      {languages.length ? (
        <section aria-labelledby="gh-languages" className="page-shell pb-(--section-pad)">
          <SectionHead index="02" label="Languages" title="By repository" id="gh-languages" />
          <ul role="list" className="border-b border-border">
            {languages.map(([name, value], i) => {
              const share = Math.round((value.count / languageTotal) * 100);
              return (
                <li key={name} className="grid grid-cols-12 items-center gap-x-(--gutter) gap-y-2 border-t border-border py-4">
                  <span className="col-span-6 text-[1.0625rem] md:col-span-3">{name}</span>
                  <span className="t-label col-span-6 text-right text-muted-foreground md:order-last md:col-span-2">
                    {value.count} {value.count === 1 ? "repo" : "repos"} / {share}%
                  </span>
                  <span className="col-span-12 h-2 bg-foreground/8 md:col-span-7" aria-hidden="true">
                    <span className={`block h-full ${i === 0 ? "bg-primary" : "bg-foreground/60"}`} style={{ width: `${share}%` }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {sortedRepos.length ? (
        <section aria-labelledby="gh-repos" className="page-shell pb-(--section-pad)">
          <SectionHead index="03" label="Repositories" title="Recently updated" id="gh-repos" />
          <ul role="list" className="border-b border-border">
            {visibleRepos.map((repo) => (
              <RepoRow key={repo.url} {...repo} />
            ))}
          </ul>
          {hiddenRepos.length ? (
            <details className="group mt-6">
              <summary className="t-label inline-flex min-h-11 cursor-pointer list-none items-center gap-2 border border-input px-4 transition-colors duration-(--dur-ui) hover:border-foreground">
                <span className="group-open:hidden">Show {hiddenRepos.length} more</span>
                <span className="hidden group-open:inline">Show fewer</span>
              </summary>
              <ul role="list" className="mt-6 border-b border-border">
                {hiddenRepos.map((repo) => (
                  <RepoRow key={repo.url} {...repo} />
                ))}
              </ul>
            </details>
          ) : null}
        </section>
      ) : null}

      {otherRepos.length ? (
        <section aria-labelledby="gh-contrib" className="page-shell pb-(--section-pad)">
          <SectionHead index="04" label="Contributions" title="Other projects" id="gh-contrib" />
          <ul role="list" className="border-b border-border">
            {otherRepos.slice(0, INITIAL_REPOS).map((repo) => (
              <RepoRow key={repo.url} {...repo} />
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
