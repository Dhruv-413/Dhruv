/**
 * The two GraphQL documents behind /github (DESIGN.md §5, 2026-09-21).
 *
 * Round 1 is small and returns what round 2 needs: the user's node id (commit history is filtered by author id)
 * and `contributionYears` (which drives the per-year calendar aliases, so nothing goes stale in January).
 * Round 2 does the heavy lifting in one request. Cost is a few points of the 5,000/hour budget, once an hour.
 *
 * Deliberately NOT queried: `topRepositories`, and any per-repo contribution list without a privacy filter.
 * Those return private repository names to a token with `repo` scope. `model.ts` still re-checks `isPrivate`.
 */

export const PROFILE_QUERY = /* GraphQL */ `
  query Profile($login: String!) {
    user(login: $login) {
      id
      login
      url
      createdAt
      contributionsCollection {
        contributionYears
        restrictedContributionsCount
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks { contributionDays { contributionCount date } }
        }
        commitContributionsByRepository(maxRepositories: 25) {
          repository { nameWithOwner isPrivate }
          contributions(first: 100, orderBy: { field: OCCURRED_AT, direction: DESC }) { totalCount nodes { occurredAt commitCount } }
        }
      }
    }
  }
`;

const REPO_FIELDS = /* GraphQL */ `
  fragment RepoFields on Repository {
    nameWithOwner
    url
    description
    createdAt
    pushedAt
    isPrivate
    isFork
    licenseInfo { spdxId }
    languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
      edges { size node { name } }
    }
    repositoryTopics(first: 6) { nodes { topic { name } } }
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 100, author: { id: $id }) {
            totalCount
            nodes { committedDate }
          }
        }
      }
    }
  }
`;

/** A calendar year as an aliased `contributionsCollection`. Windows are in IST so the days match the profile's calendar. */
function yearAlias(year: number, now: Date): string {
  if (!Number.isInteger(year) || year < 2008 || year > 2100) throw new Error("bad year");
  const from = `${year}-01-01T00:00:00+05:30`;
  const yearEnd = Date.parse(`${year}-12-31T23:59:59+05:30`);
  const to = new Date(Math.min(yearEnd, now.getTime())).toISOString();
  return `
    y${year}: contributionsCollection(from: "${from}", to: "${to}") {
      restrictedContributionsCount
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionCount date } }
      }
    }`;
}

export function buildDetailQuery(years: number[], now: Date): string {
  return /* GraphQL */ `
    ${REPO_FIELDS}
    query Detail($login: String!, $id: ID!) {
      user(login: $login) {
        pinnedItems(first: 6, types: [REPOSITORY]) { nodes { ...RepoFields } }
        repositories(
          first: 30
          ownerAffiliations: OWNER
          privacy: PUBLIC
          isFork: false
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) { nodes { ...RepoFields } }
        repositoriesContributedTo(
          first: 12
          privacy: PUBLIC
          includeUserRepositories: false
          contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, PULL_REQUEST_REVIEW]
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes { nameWithOwner url description pushedAt isPrivate primaryLanguage { name } }
        }
        pullRequests(first: 40, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes { title url state merged createdAt repository { nameWithOwner isPrivate } }
        }
        issues(first: 40, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes { title url state createdAt repository { nameWithOwner isPrivate } }
        }
        ${years.map((year) => yearAlias(year, now)).join("\n")}
      }
    }
  `;
}
