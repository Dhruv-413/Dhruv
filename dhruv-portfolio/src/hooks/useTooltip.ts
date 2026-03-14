"use client";

import { useState, useCallback } from "react";

/**
 * Position for tooltip relative to trigger element
 */
export type TooltipPosition = 
  | "top" 
  | "top-start" 
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

/**
 * Data for tooltip content and positioning
 */
export interface TooltipData {
  content: string;
  position?: TooltipPosition;
}

/**
 * Custom hook for managing tooltip state
 * Used for showing/hiding tooltips with positioning
 *
 * @example
 * ```tsx
 * const { 
 *   tooltip, 
 *   showTooltip, 
 *   hideTooltip, 
 *   updateTooltip 
 * } = useTooltip();
 * ```
 */
export function useTooltip(initialData?: TooltipData) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(initialData || null);

  const showTooltip = useCallback((content: string, position: TooltipPosition = "top") => {
    setTooltip({ content, position });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  const updateTooltip = useCallback((data: TooltipData) => {
    setTooltip(data);
  }, []);

  return {
    tooltip,
    showTooltip,
    hideTooltip,
    updateTooltip,
    isTooltipVisible: tooltip !== null,
  };
}
