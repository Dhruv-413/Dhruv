/**
 * Project Stats Hook
 * Calculates statistics for projects
 */

import { useMemo } from "react";
import { Code2, Folder, Sparkles, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectStat {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color: string;
  fill?: boolean;
}

export function useProjectStats(projects: Project[]): ProjectStat[] {
  return useMemo(() => {
    const totalProjects = projects.length;
    const featuredCount = projects.filter((p) => p.featured).length;
    const uniqueTechnologies = new Set(projects.flatMap((p) => p.technologies))
      .size;

    return [
      {
        icon: Folder as LucideIcon,
        value: totalProjects,
        label: "Projects",
        color: "#3b82f6",
      },
      {
        icon: Code2 as LucideIcon,
        value: `${uniqueTechnologies}+`,
        label: "Technologies",
        color: "#8b5cf6",
      },
      {
        icon: Star as LucideIcon,
        value: featuredCount,
        label: "Featured",
        color: "#f59e0b",
        fill: true,
      },
      { icon: Sparkles as LucideIcon, value: "100%", label: "Production", color: "#10b981" },
    ];
  }, [projects]);
}
