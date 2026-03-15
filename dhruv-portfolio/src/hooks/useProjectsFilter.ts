/**
 * Projects Filter Hook
 * Handles filtering logic for projects
 */

import { useMemo } from "react";
import type { Project } from "@/types/project";

export interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
  color: string;
}

// Category definitions with icons and colors
export const categoryFilters: CategoryFilter[] = [
  { id: "All", label: "All", icon: "layers", color: "#3b82f6" },
  { id: "Backend", label: "Backend", icon: "database", color: "#10b981" },
  { id: "Frontend", label: "Frontend", icon: "monitor", color: "#8b5cf6" },
  { id: "AI/ML", label: "AI/ML", icon: "brain", color: "#f59e0b" },
  { id: "Computer Vision", label: "Computer Vision", icon: "eye", color: "#ef4444" },
];

interface UseProjectsFilterResult {
  techFilterOptions: string[];
  technologyCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  filteredProjects: Project[];
  filteredFeatured: Project[];
  filteredOther: Project[];
}

export function useProjectsFilter(
  projects: Project[],
  activeCategory: string,
  activeTechFilter: string
): UseProjectsFilterResult {
  // Get popular technologies for filter buttons (top 6)
  const { techFilterOptions, technologyCounts } = useMemo(() => {
    const counts = projects
      .flatMap((p) => p.technologies)
      .reduce((acc, tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const popular = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([tech]) => tech);

    return { techFilterOptions: ["All", ...popular] as string[], technologyCounts: counts };
  }, [projects]);

  // Get project counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    categoryFilters.forEach((cat) => {
      if (cat.id !== "All") {
        counts[cat.id] = projects.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, [projects]);

  // Filter projects based on active filters
  const { filteredProjects, filteredFeatured, filteredOther } = useMemo(() => {
    let filtered = projects;
    
    // Apply category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    
    // Apply technology filter
    if (activeTechFilter !== "All") {
      filtered = filtered.filter((p) => p.technologies.includes(activeTechFilter));
    }

    return {
      filteredProjects: filtered,
      filteredFeatured: filtered.filter((p) => p.featured),
      filteredOther: filtered.filter((p) => !p.featured),
    };
  }, [projects, activeCategory, activeTechFilter]);

  return {
    techFilterOptions,
    technologyCounts,
    categoryCounts,
    filteredProjects,
    filteredFeatured,
    filteredOther,
  };
}
