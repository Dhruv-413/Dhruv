"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchGitHubGraphQLData } from "@/lib/github/fetcher";
import {
  transformToUser,
  transformToRepos,
  transformToStats,
  transformToContributions,
  transformToContributedRepos,
} from "@/lib/github/transformers";
import { GitHubData } from "@/types/github/public";

// ============================================================================
// Main Query Hook - Single Query Pattern
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
// Derived Hooks - Using useMemo for efficient data transformation
// ============================================================================

/**
 * Hook to get GitHub user data
 * Uses useMemo to derive data from the main query without creating nested queries
 */
export function useGitHubUser() {
  const query = useGitHubGraphQL();

  const data = useMemo(() => transformToUser(query.data), [query.data]);

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to get GitHub repositories
 * Uses useMemo to derive data from the main query without creating nested queries
 */
export function useGitHubRepos() {
  const query = useGitHubGraphQL();

  const data = useMemo(() => transformToRepos(query.data), [query.data]);

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to get GitHub statistics
 * Uses useMemo to derive data from repos without creating nested queries
 */
export function useGitHubStats() {
  const query = useGitHubGraphQL();

  const repos = useMemo(() => transformToRepos(query.data), [query.data]);

  const data = useMemo(() => transformToStats(repos), [repos]);

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to get GitHub contributions
 * Uses useMemo to derive data from the main query without creating nested queries
 */
export function useGitHubContributions() {
  const query = useGitHubGraphQL();

  const data = useMemo(
    () => transformToContributions(query.data),
    [query.data]
  );

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook to get contributed repositories
 * Uses useMemo to derive data from the main query without creating nested queries
 */
export function useGitHubContributedRepos() {
  const query = useGitHubGraphQL();

  const data = useMemo(
    () => transformToContributedRepos(query.data),
    [query.data]
  );

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

// ============================================================================
// Combined Hook - Get all GitHub data in one call
// ============================================================================

/**
 * Combined hook to get all GitHub data at once
 * More efficient than calling individual hooks when you need multiple data types
 */
export function useGitHubData() {
  const query = useGitHubGraphQL();

  const data = useMemo<GitHubData>(() => {
    const repos = transformToRepos(query.data);
    return {
      user: transformToUser(query.data),
      repos,
      stats: transformToStats(repos),
      contributions: transformToContributions(query.data),
      contributedRepos: transformToContributedRepos(query.data),
    };
  }, [query.data]);

  return {
    data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
