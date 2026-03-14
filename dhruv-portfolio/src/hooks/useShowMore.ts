"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook for "show more" pagination
 * Used for repo lists, project lists
 *
 * @example
 * ```tsx
 * const { showAll, toggleShowAll, getVisibleItems } = useShowMore(6);
 * const visibleRepos = getVisibleItems(repos);
 * ```
 */
export function useShowMore(initialLimit: number) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  const getVisibleItems = useCallback(
    <T>(items: T[]): T[] => {
      return showAll ? items : items.slice(0, initialLimit);
    },
    [showAll, initialLimit]
  );

  const hasMore = useCallback(
    <T>(items: T[]): boolean => {
      return items.length > initialLimit;
    },
    [initialLimit]
  );

  const remainingCount = useCallback(
    <T>(items: T[]): number => {
      return Math.max(0, items.length - initialLimit);
    },
    [initialLimit]
  );

  return {
    showAll,
    toggleShowAll,
    getVisibleItems,
    hasMore,
    remainingCount,
    setShowAll,
  };
}
