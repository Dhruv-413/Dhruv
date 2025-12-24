import { useState, useCallback } from "react";

interface TooltipPosition {
  x: number;
  y: number;
}

interface TooltipData<T> {
  data: T;
  position: TooltipPosition;
}

export function useTooltip<T>() {
  const [tooltip, setTooltip] = useState<TooltipData<T> | null>(null);

  const showTooltip = useCallback(
    (data: T, element: HTMLElement, tooltipWidth: number = 220) => {
      const rect = element.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let xPos = rect.right + 10;

      // Position tooltip on left side if it would overflow viewport
      if (xPos + tooltipWidth > viewportWidth) {
        xPos = rect.left - tooltipWidth - 10;
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

  return { tooltip, showTooltip, hideTooltip };
}
