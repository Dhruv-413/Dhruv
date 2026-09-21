import projects from "@/data/projects.json";
import { addDays } from "./calendar";
import { HIDDEN_REPOS, displayName } from "./names";
import type {
  CollabRow,
  DayRepo,
  GitHubData,
  LanguageRow,
  LanguageShare,
  LedgerPeriod,
  RepoRow,
  RhythmData,
} from "./types";

/**
 * Raw API shapes -> the curated model. This file is the privacy gate: it is the only place raw GitHub data is read,
 * and a repository that is private (or not fetched from a PUBLIC connection) never becomes a RepoRow, a commit,
 * a log line or a collaboration. Private work is reduced to `restrictedContributionsCount`.
 */

// ---- raw shapes (only what the queries ask for) -------------------------------------------------------------------

interface RawCalendar {
  totalContributions: number;
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
}
interface RawCollection {
  restrictedContributionsCount: number;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: RawCalendar;
}
interface RawRepo {
  nameWithOwner: string;
  url: string;
  description: string | null;
  createdAt: string;
  pushedAt: string;
  isPrivate: boolean;
  isFork: boolean;
  licenseInfo: { spdxId: string | null } | null;
  languages: { edges: ({ size: number; node: { name: string } } | null)[] } | null;
  repositoryTopics: { nodes: ({ topic: { name: string } } | null)[] } | null;
  defaultBranchRef: {
    target: {
      history?: {
        totalCount: number;
        nodes: ({ committedDate: string } | null)[];
      };
    } | null;
  } | null;
}
export interface RawProfile {
  user: {
    id: string;
    login: string;
    url: string;
    createdAt: string;
    contributionsCollection: RawCollection & {
      contributionYears: number[];
      commitContributionsByRepository: ({
        repository: { nameWithOwner: string; isPrivate: boolean };
        contributions: { totalCount: number; nodes: ({ occurredAt: string; commitCount: number } | null)[] };
      } | null)[];
    };
  } | null;
}
export interface RawDetail {
  user:
    | ({
        pinnedItems: { nodes: (RawRepo | null)[] };
        repositories: { nodes: (RawRepo | null)[] };
        repositoriesContributedTo: {
          nodes: ({ nameWithOwner: string; url: string; description: string | null; pushedAt: string; isPrivate: boolean; primaryLanguage: { name: string } | null } | null)[];
        };
        pullRequests: {
          nodes: ({ title: string; url: string; state: string; merged: boolean; createdAt: string; repository: { nameWithOwner: string; isPrivate: boolean } } | null)[];
        };
        issues: {
          nodes: ({ title: string; url: string; state: string; createdAt: string; repository: { nameWithOwner: string; isPrivate: boolean } } | null)[];
        };
      } & Record<string, unknown>)
    | null;
}

// ---- helpers ------------------------------------------------------------------------------------------------------

/** Commit times are bucketed in IST (no daylight saving, so a fixed offset is exact). The owner is in India. */
const IST_MS = 19_800_000;
function inIst(iso: string) {
  const d = new Date(Date.parse(iso) + IST_MS);
  return { day: d.toISOString().slice(0, 10), weekday: (d.getUTCDay() + 6) % 7, hour: d.getUTCHours() };
}

const compact = <T>(list: (T | null | undefined)[] | undefined): T[] => (list ?? []).filter((x): x is T => x != null);

/** Fill a calendar out to one entry per day between its first and last date. */
function expandDays(calendar: RawCalendar): { start: string; days: number[] } {
  const counts = new Map<string, number>();
  for (const week of calendar.weeks) for (const day of week.contributionDays) counts.set(day.date, day.contributionCount);
  const dates = [...counts.keys()].sort();
  if (!dates.length) return { start: "1970-01-01", days: [] };
  const start = dates[0];
  const last = dates[dates.length - 1];
  const days: number[] = [];
  for (let day = start; day <= last; day = addDays(day, 1)) days.push(counts.get(day) ?? 0);
  return { start, days };
}

function period(key: string, label: string, collection: RawCollection): LedgerPeriod {
  const { start, days } = expandDays(collection.contributionCalendar);
  return {
    key,
    label,
    start,
    days,
    total: collection.contributionCalendar.totalContributions,
    private: collection.restrictedContributionsCount,
    commits: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issues: collection.totalIssueContributions,
    reviews: collection.totalPullRequestReviewContributions,
  };
}

function languagesOf(repo: RawRepo): { name: string; size: number }[] {
  return compact(repo.languages?.edges).map((e) => ({ name: e.node.name, size: e.size }));
}

function shares(list: { name: string; size: number }[], keep: number): LanguageShare[] {
  const total = list.reduce((sum, l) => sum + l.size, 0);
  if (!total) return [];
  const top = list.slice(0, keep).map((l) => ({ name: l.name, share: Math.round((l.size / total) * 100) })).filter((l) => l.share >= 1);
  const rest = 100 - top.reduce((sum, l) => sum + l.share, 0);
  return rest >= 1 ? [...top, { name: "Other", share: rest }] : top;
}

const caseStudyByRepo = new Map(
  projects.flatMap((p) => {
    const github = (p.links as { github?: string } | undefined)?.github;
    return github ? [[github.replace("https://github.com/", "").toLowerCase(), { id: p.id, title: p.title, description: p.description }] as const] : [];
  }),
);

/** Links come from the API; only https://github.com/ URLs are ever rendered as hrefs. */
const isGitHubUrl = (url: string | null | undefined): url is string => typeof url === "string" && url.startsWith("https://github.com/");

// ---- the model ----------------------------------------------------------------------------------------------------

export function buildData(profile: RawProfile, detail: RawDetail, now: Date): GitHubData {
  const user = profile.user;
  const more = detail.user;
  if (!user || !more) throw new Error("no such user");
  const login = user.login;
  const isMine = (fullName: string) => fullName.toLowerCase().startsWith(`${login.toLowerCase()}/`);
  // a case study's title beats the sanitised slug ("Crave Connect", "EcoHive"); everything else is capitalised from the slug
  const titleOf = (fullName: string) => caseStudyByRepo.get(fullName.toLowerCase())?.title ?? displayName(fullName.split("/")[1], login);

  // Calendar periods: the rolling 12 months, then each calendar year, newest first.
  const periods: LedgerPeriod[] = [period("12m", "Last 12 months", user.contributionsCollection)];
  for (const year of user.contributionsCollection.contributionYears) {
    const collection = more[`y${year}`] as RawCollection | null | undefined;
    if (collection) periods.push(period(String(year), String(year), collection));
  }
  const recent = periods[0];
  const lastActiveIndex = recent.days.findLastIndex((n) => n > 0);
  const lastActive = lastActiveIndex >= 0 ? addDays(recent.start, lastActiveIndex) : null;

  // Public repositories only: pinned first (they may belong to someone else), then everything I own, by last push.
  const seen = new Set<string>();
  const publicRepos: { repo: RawRepo; pinned: boolean }[] = [];
  const take = (repo: RawRepo | null, pinned: boolean) => {
    // fail closed: only an explicit `isPrivate: false` is public
    if (!repo || repo.isPrivate !== false || (repo.isFork && !pinned) || !isGitHubUrl(repo.url)) return;
    if (HIDDEN_REPOS.has(repo.nameWithOwner.toLowerCase())) return; // hidden on purpose: never listed, counted or charted
    if (seen.has(repo.nameWithOwner)) return;
    seen.add(repo.nameWithOwner);
    publicRepos.push({ repo, pinned });
  };
  for (const repo of more.pinnedItems.nodes) take(repo, true);
  for (const repo of more.repositories.nodes) take(repo, false);

  // Every public commit of mine on a default branch (up to 100 per repo). Only WHEN it happened is kept: no message, no hash.
  const entries: { repo: string; day: string; weekday: number; hour: number }[] = [];
  for (const { repo } of publicRepos) {
    for (const node of compact(repo.defaultBranchRef?.target?.history?.nodes)) {
      entries.push({ repo: repo.nameWithOwner, ...inIst(node.committedDate) });
    }
  }

  const reposByDay: Record<string, DayRepo[]> = {};
  for (const e of entries) {
    const list = (reposByDay[e.day] ??= []);
    const hit = list.find((r) => r.repo === e.repo);
    if (hit) hit.n++;
    else list.push({ repo: e.repo, title: titleOf(e.repo), n: 1 });
  }
  for (const list of Object.values(reposByDay)) list.sort((a, b) => b.n - a.n);

  const grid = Array.from({ length: 7 }, () => Array<number>(24).fill(0));
  const weekdayTotals = Array<number>(7).fill(0);
  for (const e of entries) {
    grid[e.weekday][e.hour]++;
    weekdayTotals[e.weekday]++;
  }
  let peak: RhythmData["peak"] = null;
  grid.forEach((row, weekday) =>
    row.forEach((count, hour) => {
      if (count > (peak?.count ?? 0)) peak = { weekday, hour, count };
    }),
  );
  const rhythm: RhythmData = { grid, total: entries.length, peak, weekdayTotals };

  // Repo month calendars share one axis (the month the first repo was created -> this month), so they are comparable.
  const nowMs = now.getTime();
  const fromMs = Math.min(...publicRepos.map(({ repo }) => Date.parse(repo.createdAt)), nowMs - 86_400_000);
  const monthIndex = (ms: number) => new Date(ms).getUTCFullYear() * 12 + new Date(ms).getUTCMonth();
  const firstMonth = monthIndex(fromMs);
  const monthCount = monthIndex(nowMs) - firstMonth + 1;

  const repos: RepoRow[] = publicRepos.map(({ repo, pinned }) => {
    const history = repo.defaultBranchRef?.target?.history;
    const study = caseStudyByRepo.get(repo.nameWithOwner.toLowerCase());
    const months = Array<number>(monthCount).fill(0);
    for (const node of compact(history?.nodes)) {
      const [year, month] = inIst(node.committedDate).day.split("-").map(Number);
      const i = year * 12 + (month - 1) - firstMonth;
      if (i >= 0 && i < monthCount) months[i]++;
    }
    const spdx = repo.licenseInfo?.spdxId;
    const mine = isMine(repo.nameWithOwner);
    return {
      fullName: repo.nameWithOwner,
      name: repo.nameWithOwner.split("/")[1],
      title: titleOf(repo.nameWithOwner),
      owner: repo.nameWithOwner.split("/")[0],
      mine,
      pinned,
      url: repo.url,
      description: repo.description?.trim() || study?.description || null,
      createdAt: repo.createdAt,
      pushedAt: repo.pushedAt,
      commits: history?.totalCount ?? 0,
      license: spdx && spdx !== "NOASSERTION" ? spdx : null,
      topics: compact(repo.repositoryTopics?.nodes).map((n) => n.topic.name),
      languages: shares(languagesOf(repo), 4),
      months,
      caseStudy: study ? { id: study.id, title: study.title } : null,
    };
  });
  // pinned first (API order), then by last push
  repos.sort((a, b) => Number(b.pinned) - Number(a.pinned) || (a.pinned ? 0 : b.pushedAt.localeCompare(a.pushedAt)));

  // Languages by bytes over the repos I own (a team project I only helped with would skew it).
  const bytes = new Map<string, { size: number; repos: number }>();
  for (const { repo } of publicRepos) {
    if (!isMine(repo.nameWithOwner)) continue;
    for (const { name, size } of languagesOf(repo)) {
      const entry = bytes.get(name) ?? { size: 0, repos: 0 };
      entry.size += size;
      entry.repos += 1;
      bytes.set(name, entry);
    }
  }
  const totalBytes = [...bytes.values()].reduce((sum, e) => sum + e.size, 0) || 1;
  const languages: LanguageRow[] = [...bytes.entries()]
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 6)
    .map(([name, e]) => ({ name, share: Math.max(1, Math.round((e.size / totalBytes) * 100)), repos: e.repos }));

  // Collaborations: public repos that are not mine and not already listed above.
  const commits12m = new Map(
    compact(user.contributionsCollection.commitContributionsByRepository)
      .filter((c) => c.repository.isPrivate === false)
      .map((c) => [c.repository.nameWithOwner, c.contributions.totalCount] as const),
  );
  // my commits per month over the 12 months ending this month, per public repo (dates and counts only)
  const nowIst = inIst(now.toISOString()).day.split("-").map(Number);
  const nowMonth = nowIst[0] * 12 + nowIst[1] - 1;
  const months12 = new Map<string, number[]>();
  for (const c of compact(user.contributionsCollection.commitContributionsByRepository)) {
    if (c.repository.isPrivate !== false) continue;
    const series = Array<number>(12).fill(0);
    for (const node of compact(c.contributions.nodes)) {
      const [year, month] = inIst(node.occurredAt).day.split("-").map(Number);
      const i = 11 - (nowMonth - (year * 12 + month - 1));
      if (i >= 0 && i < 12) series[i] += node.commitCount;
    }
    months12.set(c.repository.nameWithOwner, series);
  }
  const prs = compact(more.pullRequests.nodes).filter((pr) => pr.repository.isPrivate === false && isGitHubUrl(pr.url));
  const issues = compact(more.issues.nodes).filter((issue) => issue.repository.isPrivate === false && isGitHubUrl(issue.url));
  const collaborations: CollabRow[] = compact(more.repositoriesContributedTo.nodes)
    .filter((r) => r.isPrivate === false && isGitHubUrl(r.url) && !isMine(r.nameWithOwner) && !seen.has(r.nameWithOwner) && !HIDDEN_REPOS.has(r.nameWithOwner.toLowerCase()))
    .slice(0, 6)
    .map((r) => ({
      fullName: r.nameWithOwner,
      title: titleOf(r.nameWithOwner),
      owner: r.nameWithOwner.split("/")[0],
      url: r.url,
      description: r.description?.trim() || null,
      language: r.primaryLanguage?.name ?? null,
      commits: commits12m.get(r.nameWithOwner) ?? 0,
      months: months12.get(r.nameWithOwner) ?? Array<number>(12).fill(0),
      contributions: [
        ...prs
          .filter((pr) => pr.repository.nameWithOwner === r.nameWithOwner)
          .map((pr) => ({ kind: "PR" as const, title: pr.title, url: pr.url, at: pr.createdAt, state: pr.merged ? ("merged" as const) : pr.state === "OPEN" ? ("open" as const) : ("closed" as const) })),
        ...issues
          .filter((issue) => issue.repository.nameWithOwner === r.nameWithOwner)
          .map((issue) => ({ kind: "Issue" as const, title: issue.title, url: issue.url, at: issue.createdAt, state: issue.state === "OPEN" ? ("open" as const) : ("closed" as const) })),
      ]
        .sort((a, b) => b.at.localeCompare(a.at))
        .slice(0, 3),
      pushedAt: r.pushedAt,
    }));

  const mineRepos = publicRepos.filter(({ repo }) => isMine(repo.nameWithOwner)).map(({ repo }) => repo);
  const latest = mineRepos.reduce<RawRepo | null>((a, b) => (!a || b.pushedAt > a.pushedAt ? b : a), null);

  return {
    login,
    profileUrl: isGitHubUrl(user.url) ? user.url : `https://github.com/${login}`,
    joinedAt: user.createdAt,
    asOf: now.toISOString(),
    ledger: { periods, reposByDay, lastActive },
    rhythm,
    repos,
    languages,
    collaborations,
    axis: { from: new Date(fromMs).toISOString(), to: now.toISOString() },
    lastPush: latest ? { repo: latest.nameWithOwner, at: latest.pushedAt, url: latest.url } : null,
    // the lede says "commits across N public repositories": only repos I own (a pinned team repo would inflate both)
    publicCommits: repos.filter((repo) => repo.mine).reduce((sum, repo) => sum + repo.commits, 0),
    publicRepos: repos.filter((repo) => repo.mine).length,
  };
}
