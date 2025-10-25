"use client";

import { useQuery } from "@tanstack/react-query";

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
// Utility Functions
// ============================================================================

function calculateStreaksFromCalendar(weeks: GraphQLContributionWeek[]): {
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
// Derived Hooks (GraphQL-only - Extract specific data from main query)
// ============================================================================

export function useGitHubUser() {
  const { data } = useGitHubGraphQL();

  return useQuery({
    queryKey: ["github-user", data],
    queryFn: () => {
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
      } as GitHubUser;
    },
    enabled: !!data,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGitHubRepos() {
  const { data } = useGitHubGraphQL();

  return useQuery({
    queryKey: ["github-repos", data],
    queryFn: () => {
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
    },
    enabled: !!data,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGitHubStats() {
  const { data: repos } = useGitHubRepos();

  return useQuery({
    queryKey: ["github-stats", repos],
    queryFn: () => {
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
    },
    enabled: !!repos && repos.length > 0,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGitHubContributions() {
  const { data } = useGitHubGraphQL();

  return useQuery({
    queryKey: ["github-contributions", data],
    queryFn: () => {
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
    },
    enabled: !!data,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGitHubContributedRepos() {
  const { data } = useGitHubGraphQL();

  return useQuery({
    queryKey: ["github-contributed-repos", data],
    queryFn: () => {
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
    },
    enabled: !!data,
    staleTime: 1000 * 60 * 60,
  });
}
