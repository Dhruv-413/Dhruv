"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface FilterButtonsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  icon?: LucideIcon;
  label?: string;
  getCounts?: (filter: string) => number;
  animated?: boolean;
}

export const FilterButtons = memo(function FilterButtons({
  filters,
  activeFilter,
  onFilterChange,
  icon: Icon,
  label,
  getCounts,
  animated = true,
}: FilterButtonsProps) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      {(Icon || label) && (
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />}
          {label && (
            <span className="text-xs sm:text-sm font-mono text-muted-foreground">
              {label}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pb-2">
        {filters.map((filter, index) => (
          <motion.button
            key={filter}
            initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
            animate={animated ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-xs sm:text-sm transition-all border touch-manipulation active:scale-95 whitespace-nowrap shrink-0 ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            {filter}
            {getCounts && (
              <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs opacity-70">
                ({getCounts(filter)})
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});
