"use client";

import { useState, useCallback } from "react";

export interface TooltipPosition {
  x: number;
  y: number;
}

export interface TooltipData<T = unknown> {
  data: T;
  position: TooltipPosition;
}

/**
 * Custom hook for managing tooltip state and positioning
 * Used for contribution heatmap tooltips and other hover tooltips
 *
 * @example
 * ```tsx
 * const { tooltip, showTooltip, hideTooltip } = useTooltip<{ date: string; count: number }>();
 *
 * <div
 *   onMouseEnter={(e) => showTooltip({ date: "2024-01-01", count: 5 }, e)}
 *   onMouseLeave={hideTooltip}
 * />
 *
 * {tooltip && <Tooltip data={tooltip.data} position={tooltip.position} />}
 * ```
 */
export function useTooltip<T>() {
  const [tooltip, setTooltip] = useState<TooltipData<T> | null>(null);

  const showTooltip = useCallback(
    (
      data: T,
      event: React.MouseEvent | React.FocusEvent,
      options?: {
        tooltipWidth?: number;
        offset?: number;
      }
    ) => {
      const { tooltipWidth = 220, offset = 10 } = options || {};
      const rect = event.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let xPos = rect.right + offset;

      // Flip to left side if tooltip would overflow viewport
      if (xPos + tooltipWidth > viewportWidth) {
        xPos = rect.left - tooltipWidth - offset;
      }

      setTooltip({
        data,
        position: {
          x: xPos,
          y: rect.top + rect.height / 2,
        },
      });
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  return {
    tooltip,
    showTooltip,
    hideTooltip,
    isVisible: tooltip !== null,
  };
}

/**
 * Custom hook for managing disclosure/toggle state
 * Used for expand/collapse, modals, dropdowns
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDisclosure();
 * ```
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle, setIsOpen };
}

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
