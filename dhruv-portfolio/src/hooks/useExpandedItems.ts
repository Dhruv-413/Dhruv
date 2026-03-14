"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook for managing expanded items in a list
 * Used for topic expansion in repo cards, accordion items
 *
 * @example
 * ```tsx
 * const { expandedItems, toggleExpanded, isExpanded, collapseAll } = useExpandedItems();
 * ```
 */
export function useExpandedItems<T extends string = string>() {
  const [expandedItems, setExpandedItems] = useState<Set<T>>(new Set());

  const toggleExpanded = useCallback((id: T) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (id: T) => expandedItems.has(id),
    [expandedItems]
  );

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  const expandAll = useCallback((ids: T[]) => {
    setExpandedItems(new Set(ids));
  }, []);

  return {
    expandedItems,
    toggleExpanded,
    isExpanded,
    collapseAll,
    expandAll,
  };
}
