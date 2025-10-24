"use client";

import { useQuery } from "@tanstack/react-query";

const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Dhruv-413";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  location: string;
  blog: string;
  company: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  contributions: number;
  languages: { [key: string]: number };
}

const headers: HeadersInit = GITHUB_TOKEN
  ? {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    }
  : {
      Accept: "application/vnd.github.v3+json",
    };

async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    headers,
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user");
  }

  return response.json();
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }

  return response.json();
}

async function calculateGitHubStats(repos: GitHubRepo[]): Promise<GitHubStats> {
  const stats: GitHubStats = {
    totalStars: 0,
    totalForks: 0,
    totalRepos: repos.length,
    contributions: 0,
    languages: {},
  };

  repos.forEach((repo) => {
    stats.totalStars += repo.stargazers_count;
    stats.totalForks += repo.forks_count;

    if (repo.language) {
      stats.languages[repo.language] =
        (stats.languages[repo.language] || 0) + 1;
    }
  });

  return stats;
}

export function useGitHubUser() {
  return useQuery({
    queryKey: ["github-user"],
    queryFn: fetchGitHubUser,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function useGitHubRepos() {
  return useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function useGitHubStats() {
  const { data: repos } = useGitHubRepos();

  return useQuery({
    queryKey: ["github-stats", repos],
    queryFn: () => {
      if (!repos) return null;
      return calculateGitHubStats(repos);
    },
    enabled: !!repos,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export type { GitHubUser, GitHubRepo, GitHubStats };
