/**
 * Public-facing types for GitHub data
 * These types are used by components throughout the application
 */

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
  homepageUrl: string | null;
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

/**
 * Combined GitHub data type for the main hook
 */
export interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  stats: GitHubStats | null;
  contributions: GitHubContributions | null;
  contributedRepos: {
    totalCount: number;
    repositories: ContributedRepository[];
  } | null;
}
