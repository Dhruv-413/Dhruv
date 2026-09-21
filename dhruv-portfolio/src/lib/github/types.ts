/**
 * The curated GitHub model the /github page renders. Everything here is public by construction:
 * `model.ts` is the only place raw API data is read, and it drops private repositories (names, commit
 * messages, URLs) before anything reaches a component. Private work survives only as counts.
 */

/** How many public commits landed in one repository on a day. Only the count: commit messages and hashes are never fetched or shown. */
export interface DayRepo {
  /** owner/name (for the link) */
  repo: string;
  /** Display title, e.g. "Eye Gaze Tracking". */
  title: string;
  n: number;
}

/** A span of the contribution calendar: the rolling last 12 months, or one calendar year. */
export interface LedgerPeriod {
  /** "12m" or the four-digit year. */
  key: string;
  label: string;
  /** First day (YYYY-MM-DD) of `days`. */
  start: string;
  /** Contributions per day from `start`, one entry per calendar day. Levels are derived on the client. */
  days: number[];
  total: number;
  /** Contributions made in private repositories. A count only; nothing else about them is ever fetched into the page. */
  private: number;
  /** Public mix (private work is not broken down by GitHub). */
  commits: number;
  pullRequests: number;
  issues: number;
  reviews: number;
}

export interface GitHubLedger {
  periods: LedgerPeriod[];
  /** Public commits per repository, keyed by day (YYYY-MM-DD, IST), for the day readout. Biggest first. */
  reposByDay: Record<string, DayRepo[]>;
  /** The latest day (YYYY-MM-DD) with any contribution, public or private. */
  lastActive: string | null;
}

export interface RhythmData {
  /** [weekday Mon..Sun][hour 0..23] public commit counts in IST. */
  grid: number[][];
  total: number;
  peak: { weekday: number; hour: number; count: number } | null;
  /** Commits per weekday, Mon..Sun. */
  weekdayTotals: number[];
}

export interface LanguageShare {
  name: string;
  /** 0..100 */
  share: number;
}

export interface RepoRow {
  /** owner/name */
  fullName: string;
  name: string;
  /** Display title: the case study's title when there is one, else the sanitised slug. */
  title: string;
  owner: string;
  mine: boolean;
  pinned: boolean;
  url: string;
  description: string | null;
  createdAt: string;
  pushedAt: string;
  /** My commits on the default branch. */
  commits: number;
  license: string | null;
  topics: string[];
  languages: LanguageShare[];
  /** My default-branch commits per calendar month (IST), one entry per month of the shared axis, oldest first. */
  months: number[];
  caseStudy: { id: string; title: string } | null;
}

export interface LanguageRow {
  name: string;
  share: number;
  repos: number;
}

export interface CollabRow {
  fullName: string;
  /** Sanitised display title of the repository. */
  title: string;
  owner: string;
  url: string;
  description: string | null;
  language: string | null;
  /** My commits there in the last 12 months (0 when only PRs / issues / reviews). */
  commits: number;
  /** My commits per month over the 12 months ending with the snapshot month, oldest first. */
  months: number[];
  /** Pull requests and issues I opened there (public repos only). */
  contributions: { kind: "PR" | "Issue"; title: string; url: string; state: "open" | "merged" | "closed"; at: string }[];
  pushedAt: string;
}

export interface GitHubData {
  login: string;
  profileUrl: string;
  joinedAt: string;
  /** ISO, UTC: when this snapshot was taken. */
  asOf: string;
  ledger: GitHubLedger;
  rhythm: RhythmData;
  repos: RepoRow[];
  languages: LanguageRow[];
  collaborations: CollabRow[];
  /** The shared axis of the repo month calendars: the month of the first repo's creation up to now. */
  axis: { from: string; to: string };
  lastPush: { repo: string; at: string; url: string } | null;
  /** Public commits fetched and the number of public repos they came from. */
  publicCommits: number;
  publicRepos: number;
}
