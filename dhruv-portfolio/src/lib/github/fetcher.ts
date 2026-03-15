/**
 * GitHub data fetching utilities
 * Handles fetching data from the internal API route
 */

import { GitHubGraphQLData, GraphQLContributionWeek, GraphQLContributionDay } from "@/types/github/graphql";

const API_ROUTE = "/api/github";

/**
 * Fetches GitHub GraphQL data from the internal API route
 * The token is handled server-side, so no auth headers needed here
 */
export async function fetchGitHubGraphQLData(): Promise<GitHubGraphQLData> {
  const response = await fetch(API_ROUTE, {
    method: "GET",
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("GitHub API error:", response.status, errorData);
    throw new Error(errorData.error || `Failed to fetch GitHub data: ${response.status}`);
  }

  const data = await response.json();

  // Return a structure that allows fallback UI instead of throwing
  if (!data || !data.user) {
    console.warn("GitHub API returned invalid data:", data);
    return {
      user: {
        login: "",
        name: "",
        avatarUrl: "",
        bio: "",
        company: null,
        location: null,
        websiteUrl: null,
        followers: { totalCount: 0 },
        following: { totalCount: 0 },
        repositories: { totalCount: 0, nodes: [] },
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 0,
            weeks: []
          },
          restrictedContributionsCount: 0,
          totalCommitContributions: 0,
          totalIssueContributions: 0,
          totalPullRequestContributions: 0,
          totalPullRequestReviewContributions: 0
        },
        repositoriesContributedTo: { totalCount: 0, nodes: [] },
        pullRequests: { totalCount: 0 },
        issues: { totalCount: 0 }
      }
    } as GitHubGraphQLData;
  }

  return data;
}

/**
 * Calculates current and longest streaks from contribution calendar
 */
export function calculateStreaksFromCalendar(weeks: GraphQLContributionWeek[]): {
  currentStreak: number;
  longestStreak: number;
} {
  const allDays: GraphQLContributionDay[] = [];
  weeks.forEach((week) => {
    allDays.push(...week.contributionDays);
  });

  allDays.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(today);
  for (const day of allDays) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate.getTime() === checkDate.getTime()) {
      if (day.contributionCount > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        if (dayDate.getTime() === today.getTime()) {
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  tempStreak = 0;
  let prevDate: Date | null = null;

  const sortedDays = [...allDays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const day of sortedDays) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (day.contributionCount > 0) {
      if (prevDate) {
        const expectedDate = new Date(prevDate);
        expectedDate.setDate(expectedDate.getDate() + 1);

        if (dayDate.getTime() === expectedDate.getTime()) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      prevDate = dayDate;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
      prevDate = null;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
}
