import "server-only";
import { buildData, type RawDetail, type RawProfile } from "./model";
import { PROFILE_QUERY, buildDetailQuery } from "./query";
import type { GitHubData } from "./types";

/**
 * Server-only loader for /github. The token stays here: this module is imported by a server component and
 * nothing in it reaches the client bundle. Rendering is cached by the page's `revalidate` (1 hour).
 */

const ENDPOINT = "https://api.github.com/graphql";
const DEFAULT_LOGIN = "Dhruv-413";
// GitHub logins: alphanumerics and single hyphens, 1-39 characters. The value is sent as a GraphQL variable, never interpolated.
const LOGIN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

async function post<T>(token: string, query: string, variables: Record<string, string>): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json", "User-Agent": "dhruv-portfolio" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(9000),
  });
  if (!response.ok) throw new Error(`GitHub API answered ${response.status}`);
  const json = (await response.json()) as { data?: T; errors?: { type?: string }[] };
  if (!json.data) throw new Error("GitHub API returned no data");
  // Partial answers are fine (one alias failing should not blank the page); only error *types* are logged.
  if (json.errors?.length) console.warn("GitHub API partial errors:", json.errors.map((e) => e.type ?? "unknown").join(", "));
  return json.data;
}

/**
 * Returns the curated model, or `null` when the feed cannot be built at all (no token, bad login, unknown user).
 *
 * Transient failures (a GitHub 5xx, a timeout, a malformed answer) depend on when they happen:
 * - while building or in dev they return `null`, so an outage never fails a deploy and the page shows its fallback;
 * - in production at request time they are rethrown, because Next keeps serving the last good page when an hourly
 *   regeneration throws (a `null` here would replace that page with "unavailable" for up to an hour).
 */
export async function loadGitHub(): Promise<GitHubData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GitHub feed: GITHUB_TOKEN is not set, so /github renders its unavailable state.");
    return null;
  }
  const login = (process.env.GITHUB_USERNAME || DEFAULT_LOGIN).trim();
  if (!LOGIN.test(login)) {
    console.warn("GitHub feed: GITHUB_USERNAME is not a valid GitHub login, so /github renders its unavailable state.");
    return null;
  }
  const failSoft = process.env.NEXT_PHASE === "phase-production-build" || process.env.NODE_ENV !== "production";

  try {
    const now = new Date();
    const profile = await post<RawProfile>(token, PROFILE_QUERY, { login });
    if (!profile.user) return null;
    const detail = await post<RawDetail>(token, buildDetailQuery(profile.user.contributionsCollection.contributionYears, now), {
      login,
      id: profile.user.id,
    });
    return buildData(profile, detail, now);
  } catch (error) {
    console.error("GitHub feed unavailable:", error instanceof Error ? error.message : "unknown error");
    if (failSoft) return null;
    throw error;
  }
}
