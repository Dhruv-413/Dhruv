/**
 * Technology Filters Component
 * Displays filter buttons for project technologies
 */

import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { FilterButton, FilterButtonGroup } from "@/components/ui/FilterButton";

interface TechFiltersProps {
  filters: string[];
  activeFilter: string;
  counts: Record<string, number>;
  onFilterChange: (filter: string) => void;
  onClear: () => void;
  isInView: boolean;
}

export function TechFilters({
  filters,
  activeFilter,
  counts,
  onFilterChange,
  onClear,
  isInView,
}: TechFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-xs sm:text-sm font-mono text-muted-foreground">
          Filter by Technology:
        </span>
        <button
          onClick={onClear}
          className="text-xs text-primary hover:underline ml-2"
        >
          (Clear)
        </button>
      </div>
      <FilterButtonGroup>
        {filters.map((filter, index) => (
          <FilterButton
            key={filter}
            label={filter}
            isActive={activeFilter === filter}
            count={filter !== "All" ? counts[filter] : undefined}
            onClick={() => onFilterChange(filter)}
            animationDelay={0.1 + index * 0.05}
            isInView={isInView}
          />
        ))}
      </FilterButtonGroup>
    </motion.div>
  );
}
