"use client";

import { useQuery } from "@tanstack/react-query";
import * as React from "react";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Dhruv-413";

// ============================================================================
// GraphQL Response Types
// ============================================================================

interface GraphQLLanguage {
  name: string;
  color: string;
}

interface GraphQLLanguageEdge {
  size: number;
  node: GraphQLLanguage;
}

interface GraphQLTopic {
  topic: {
    name: string;
  };
}

interface GraphQLRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: GraphQLLanguage | null;
  languages: {
    edges: GraphQLLanguageEdge[];
  };
  updatedAt: string;
  repositoryTopics: {
    nodes: GraphQLTopic[];
  };
}

interface GraphQLContributedRepository {
  name: string;
  owner: {
    login: string;
  };
  url: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: GraphQLLanguage | null;
  updatedAt: string;
}

interface GraphQLContributionDay {
  contributionCount: number;
  date: string;
}

interface GraphQLContributionWeek {
  contributionDays: GraphQLContributionDay[];
}

interface GraphQLContributionCalendar {
  totalContributions: number;
  weeks: GraphQLContributionWeek[];
}

interface GitHubGraphQLData {
  user: {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    company: string | null;
    location: string | null;
    websiteUrl: string | null;
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: GraphQLRepository[];
    };
    contributionsCollection: {
      contributionCalendar: GraphQLContributionCalendar;
      restrictedContributionsCount: number;
      totalCommitContributions: number;
      totalIssueContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
      nodes: GraphQLContributedRepository[];
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
  };
}

// ============================================================================
// Public Types for Components
// ============================================================================

export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string | null;
  location: string | null;
  websiteUrl: string | null;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  language: string | null;
  languageColor: string | null;
  updatedAt: string;
  topics: string[];
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: { [key: string]: { count: number; color: string } };
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubContributions {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  weeks: ContributionWeek[];
  currentStreak: number;
  longestStreak: number;
}

export interface ContributedRepository {
  name: string;
  owner: string;
  url: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  language: string | null;
  languageColor: string | null;
  updatedAt: string;
}

// ============================================================================
// GraphQL Query
// ============================================================================

const graphqlHeaders: HeadersInit = GITHUB_TOKEN
  ? {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    }
  : {
      "Content-Type": "application/json",
    };

async function fetchGitHubGraphQLData(): Promise<GitHubGraphQLData> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        bio
        company
        location
        websiteUrl
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
            updatedAt
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          restrictedContributionsCount
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
        }
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
          nodes {
            name
            owner {
              login
            }
            url
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            updatedAt
          }
        }
        pullRequests {
          totalCount
        }
        issues {
          totalCount
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: graphqlHeaders,
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub GraphQL data");
  }

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("GraphQL query failed");
  }

  return result.data;
}

// ============================================================================
// Utility Functions - Optimized
// ============================================================================

function calculateStreaksFromCalendar(weeks: GraphQLContributionWeek[]): {
  currentStreak: number;
  longestStreak: number;
} {
  // Flatten all days once
  const allDays = weeks.flatMap((week) => week.contributionDays);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak (most recent days first)
  let currentStreak = 0;
  let checkDate = new Date(today);

  // Sort once for current streak calculation (descending)
  const sortedDesc = allDays
    .map(day => ({ ...day, timestamp: new Date(day.date).getTime() }))
    .sort((a, b) => b.timestamp - a.timestamp);

  for (const day of sortedDesc) {
    const dayTimestamp = new Date(day.date).setHours(0, 0, 0, 0);

    if (dayTimestamp === checkDate.getTime()) {
      if (day.contributionCount > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dayTimestamp !== today.getTime()) {
        // If we hit a day with no contributions (and it's not today), stop
        break;
      } else {
        // If today has no contributions, continue checking yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }
  }

  // Calculate longest streak using pre-sorted ascending data
  let longestStreak = 0;
  let tempStreak = 0;
  let prevTimestamp: number | null = null;

  // Sort once for longest streak calculation (ascending)
  const sortedAsc = sortedDesc.reverse();

  for (const day of sortedAsc) {
    if (day.contributionCount > 0) {
      const dayTimestamp = day.timestamp;

      if (prevTimestamp !== null) {
        const expectedTimestamp: number = prevTimestamp + 86400000; // Add 1 day in ms

        if (dayTimestamp === expectedTimestamp) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      prevTimestamp = dayTimestamp;
    } else if (tempStreak > 0) {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 0;
      prevTimestamp = null;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
}

// ============================================================================
// Main Hook
// ============================================================================

export function useGitHubGraphQL() {
  return useQuery({
    queryKey: ["github-graphql"],
    queryFn: fetchGitHubGraphQLData,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// ============================================================================
// Optimized Derived Hooks - Use useMemo instead of nested queries
// ============================================================================

export function useGitHubUser() {
  const { data, isLoading, error } = useGitHubGraphQL();

  const user = React.useMemo(() => {
    if (!data?.user) return null;

    const u = data.user;
    return {
      login: u.login,
      name: u.name,
      avatarUrl: u.avatarUrl,
      bio: u.bio,
      company: u.company,
      location: u.location,
      websiteUrl: u.websiteUrl,
      followers: u.followers.totalCount,
      following: u.following.totalCount,
      publicRepos: u.repositories.totalCount,
    } as GitHubUser;
  }, [data]);

  return { data: user, isLoading, error };
}

export function useGitHubRepos() {
  const { data, isLoading, error } = useGitHubGraphQL();

  const repos = React.useMemo(() => {
    if (!data?.user?.repositories?.nodes) return [];

    return data.user.repositories.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      updatedAt: repo.updatedAt,
      topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
    })) as GitHubRepo[];
  }, [data]);

  return { data: repos, isLoading, error };
}

export function useGitHubStats() {
  const { data: repos, isLoading } = useGitHubRepos();

  const stats = React.useMemo(() => {
    if (!repos || repos.length === 0) return null;

    const result: GitHubStats = {
      totalStars: 0,
      totalForks: 0,
      totalRepos: repos.length,
      languages: {},
    };

    repos.forEach((repo) => {
      result.totalStars += repo.stargazerCount;
      result.totalForks += repo.forkCount;

      if (repo.language) {
        if (!result.languages[repo.language]) {
          result.languages[repo.language] = {
            count: 0,
            color: repo.languageColor || "#666",
          };
        }
        result.languages[repo.language].count++;
      }
    });

    return result;
  }, [repos]);

  return { data: stats, isLoading };
}

export function useGitHubContributions() {
  const { data, isLoading, error } = useGitHubGraphQL();

  const contributions = React.useMemo(() => {
    if (!data?.user) return null;

    const calendar = data.user.contributionsCollection.contributionCalendar;
    const streaks = calculateStreaksFromCalendar(calendar.weeks);

    const weeks: ContributionWeek[] = calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level:
          day.contributionCount === 0
            ? 0
            : day.contributionCount < 3
            ? 1
            : day.contributionCount < 6
            ? 2
            : day.contributionCount < 10
            ? 3
            : day.contributionCount < 15
            ? 4
            : 5,
      })),
    }));

    return {
      totalContributions: calendar.totalContributions,
      totalCommits:
        data.user.contributionsCollection.totalCommitContributions,
      totalPRs:
        data.user.contributionsCollection.totalPullRequestContributions,
      totalIssues: data.user.contributionsCollection.totalIssueContributions,
      totalReviews:
        data.user.contributionsCollection.totalPullRequestReviewContributions,
      weeks,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
    } as GitHubContributions;
  }, [data]);

  return { data: contributions, isLoading, error };
}

export function useGitHubContributedRepos() {
  const { data, isLoading, error } = useGitHubGraphQL();

  const contributedRepos = React.useMemo(() => {
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
      })) as ContributedRepository[],
    };
  }, [data]);

  return { data: contributedRepos, isLoading, error };
}
