"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FilterButtonProps {
  /** The filter label text */
  label: string;
  /** Whether this filter is currently active */
  isActive?: boolean;
  /** Optional count to display (e.g., number of items matching filter) */
  count?: number;
  /** Click handler */
  onClick?: () => void;
  /** Animation delay for staggered entrance */
  animationDelay?: number;
  /** Whether the filter is in view (for entrance animation) */
  isInView?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Reusable Filter Button component
 * Used across: Projects (technology filters), GitHub (repo filters), Skills (category filters)
 *
 * @example
 * ```tsx
 * <FilterButton
 *   label="React"
 *   isActive={activeFilter === "React"}
 *   count={5}
 *   onClick={() => setActiveFilter("React")}
 * />
 * ```
 */
export function FilterButton({
  label,
  isActive = false,
  count,
  onClick,
  animationDelay = 0,
  isInView = true,
  className,
}: FilterButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: animationDelay }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-xs sm:text-sm transition-all border touch-manipulation active:scale-95 whitespace-nowrap shrink-0",
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
          : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
        className
      )}
      aria-pressed={isActive}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs opacity-70">
          ({count})
        </span>
      )}
    </motion.button>
  );
}

/**
 * Filter Button Group container for consistent layout
 */
export function FilterButtonGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2 sm:gap-3 pb-2",
        className
      )}
      role="group"
      aria-label="Filter options"
    >
      {children}
    </div>
  );
}

export default FilterButton;
