import { Briefcase, GraduationCap, Award, Code, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const highlights: Highlight[] = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description: "Interned at ONGC on enterprise SAP solutions",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in Computer Science from Manipal University Jaipur",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Top 50 at SAP India Hackfest (2000+ participants)",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Code,
    title: "Technical Skills",
    description: "Full-stack development with modern web technologies",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Interests",
    description: "AI/ML and innovative tech solutions",
    color: "from-green-500 to-emerald-500",
  },
];
