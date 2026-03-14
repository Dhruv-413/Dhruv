/**
 * GraphQL response types from GitHub API
 * These types match the response from our internal /api/github route
 */

export interface GraphQLLanguage {
  name: string;
  color: string;
}

export interface GraphQLLanguageEdge {
  size: number;
  node: GraphQLLanguage;
}

export interface GraphQLTopic {
  topic: {
    name: string;
  };
}

export interface GraphQLRepository {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
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

export interface GraphQLContributedRepository {
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

export interface GraphQLContributionDay {
  contributionCount: number;
  date: string;
}

export interface GraphQLContributionWeek {
  contributionDays: GraphQLContributionDay[];
}

export interface GraphQLContributionCalendar {
  totalContributions: number;
  weeks: GraphQLContributionWeek[];
}

export interface GitHubGraphQLData {
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
