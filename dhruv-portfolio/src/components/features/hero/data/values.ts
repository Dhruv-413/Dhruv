import { Target, Lightbulb, Coffee, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ValueWithFooter extends Value {
  footer: string;
}

export const values: ValueWithFooter[] = [
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Focused on delivering measurable results and exceeding expectations",
    footer: "results_driven",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solver",
    description: "Innovative approaches to complex technical challenges",
    footer: "innovative_thinker",
  },
  {
    icon: Coffee,
    title: "Continuous Learner",
    description: "Always exploring new technologies and best practices",
    footer: "always_learning",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative mindset with strong communication skills",
    footer: "collaborative_spirit",
  },
];
