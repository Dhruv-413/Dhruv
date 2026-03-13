import { Briefcase, Rocket, Code2, Book } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const aboutStats: Stat[] = [
  { label: "Intern Experience", value: "3 Months", icon: Briefcase, color: "#3b82f6" },
  { label: "Projects Completed", value: "7+", icon: Rocket, color: "#8b5cf6" },
  { label: "Technologies Learned", value: "10+", icon: Code2, color: "#f59e0b" },
  { label: "Certifications", value: "5+", icon: Book, color: "#10b981" },
];
