"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook for managing active item state (hover, selection)
 * Used for StatCards, RepoCards, filter buttons
 *
 * @example
 * ```tsx
 * const { activeIndex, setActiveIndex, clearActive, isActive } = useActiveIndex();
 *
 * {items.map((item, idx) => (
 *   <Card
 *     isActive={isActive(idx)}
 *     onMouseEnter={() => setActiveIndex(idx)}
 *     onMouseLeave={clearActive}
 *   />
 * ))}
 * ```
 */
export function useActiveIndex<T extends string | number = number>() {
  const [activeIndex, setActiveIndex] = useState<T | null>(null);

  const clearActive = useCallback(() => setActiveIndex(null), []);

  const isActive = useCallback(
    (index: T) => activeIndex === index,
    [activeIndex]
  );

  return { activeIndex, setActiveIndex, clearActive, isActive };
}
