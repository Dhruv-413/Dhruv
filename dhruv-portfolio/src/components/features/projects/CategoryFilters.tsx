/**
 * Category Filters Component
 * Displays filter buttons for project categories
 */

import { Layers, Database, Monitor, Brain, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { CategoryFilter } from "@/hooks/useProjectsFilter";

interface CategoryFiltersProps {
  categories: CategoryFilter[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
  isInView: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  layers: Layers,
  database: Database,
  monitor: Monitor,
  brain: Brain,
  eye: Eye,
};

export function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  isInView,
}: CategoryFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-xs sm:text-sm font-mono text-muted-foreground">
          Filter by Category:
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon];
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 + index * 0.05 }}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border transition-all touch-manipulation ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {Icon && (
                <Icon 
                  className="h-4 w-4" 
                  style={{ color: isActive ? category.color : undefined }} 
                />
              )}
              <span className="text-xs sm:text-sm font-medium">{category.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-primary/20" : "bg-muted"
              }`}>
                {categoryCounts[category.id]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
