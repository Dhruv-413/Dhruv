/**
 * Data transformation functions for GitHub API responses
 * Pure functions that transform GraphQL data to public-facing types
 */

import { GitHubGraphQLData } from "@/types/github/graphql";
import {
  GitHubUser,
  GitHubRepo,
  GitHubStats,
  GitHubContributions,
  ContributedRepository,
  ContributionWeek,
} from "@/types/github/public";
import { calculateStreaksFromCalendar } from "./fetcher";

/**
 * Transforms GraphQL user data to public User type
 */
export function transformToUser(
  data: GitHubGraphQLData | undefined
): GitHubUser | null {
  if (!data?.user) return null;

  const user = data.user;
  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    company: user.company,
    location: user.location,
    websiteUrl: user.websiteUrl,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    publicRepos: user.repositories.totalCount,
  };
}

/**
 * Transforms GraphQL repository data to public Repo type
 */
export function transformToRepos(data: GitHubGraphQLData | undefined): GitHubRepo[] {
  if (!data?.user?.repositories?.nodes) return [];

  return data.user.repositories.nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepageUrl: repo.homepageUrl || null,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    language: repo.primaryLanguage?.name || null,
    languageColor: repo.primaryLanguage?.color || null,
    updatedAt: repo.updatedAt,
    topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
  }));
}

/**
 * Transforms repos to aggregated statistics
 */
export function transformToStats(repos: GitHubRepo[]): GitHubStats | null {
  if (!repos || repos.length === 0) return null;

  const stats: GitHubStats = {
    totalStars: 0,
    totalForks: 0,
    totalRepos: repos.length,
    languages: {},
  };

  repos.forEach((repo) => {
    stats.totalStars += repo.stargazerCount;
    stats.totalForks += repo.forkCount;

    if (repo.language) {
      if (!stats.languages[repo.language]) {
        stats.languages[repo.language] = {
          count: 0,
          color: repo.languageColor || "#666",
        };
      }
      stats.languages[repo.language].count++;
    }
  });

  return stats;
}

/**
 * Maps contribution count to a level (0-5) for heatmap visualization
 */
export function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  if (count < 15) return 4;
  return 5;
}

/**
 * Transforms GraphQL contribution data to public Contributions type
 */
export function transformToContributions(
  data: GitHubGraphQLData | undefined
): GitHubContributions | null {
  if (!data?.user) return null;

  const calendar = data.user.contributionsCollection.contributionCalendar;
  const streaks = calculateStreaksFromCalendar(calendar.weeks);

  const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: getContributionLevel(day.contributionCount),
    })),
  }));

  return {
    totalContributions: calendar.totalContributions,
    totalCommits: data.user.contributionsCollection.totalCommitContributions,
    totalPRs: data.user.contributionsCollection.totalPullRequestContributions,
    totalIssues: data.user.contributionsCollection.totalIssueContributions,
    totalReviews:
      data.user.contributionsCollection.totalPullRequestReviewContributions,
    weeks,
    currentStreak: streaks.currentStreak,
    longestStreak: streaks.longestStreak,
  };
}

/**
 * Transforms GraphQL contributed repos to public type
 */
export function transformToContributedRepos(
  data: GitHubGraphQLData | undefined
): { totalCount: number; repositories: ContributedRepository[] } | null {
  if (!data?.user?.repositoriesContributedTo?.nodes) return null;

  return {
    totalCount: data.user.repositoriesContributedTo.totalCount,
    repositories: data.user.repositoriesContributedTo.nodes.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
      url: repo.url,
      description: repo.description,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      updatedAt: repo.updatedAt,
    })),
  };
}
