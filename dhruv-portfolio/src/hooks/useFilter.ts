"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook for filter state management
 * Used for language/technology filters across sections
 *
 * @example
 * ```tsx
 * const { activeFilter, setActiveFilter, isActiveFilter } = useFilter("All");
 * ```
 */
export function useFilter<T extends string = string>(initialFilter: T) {
  const [activeFilter, setActiveFilter] = useState<T>(initialFilter);

  const isActiveFilter = useCallback(
    (filter: T) => activeFilter === filter,
    [activeFilter]
  );

  const resetFilter = useCallback(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  return {
    activeFilter,
    setActiveFilter,
    isActiveFilter,
    resetFilter,
  };
}
