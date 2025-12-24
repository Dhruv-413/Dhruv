"use client";

import { motion } from "framer-motion";
import { Folder, Star, Code2, GitCommit, Flame, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { GitHubContributions } from "@/hooks/useGitHub";

interface QuickStatsProps {
  totalRepos: number;
  totalStars: number;
  uniqueLanguages: number;
  contributions: GitHubContributions | null;
  isInView: boolean;
}

interface StatCardData {
  icon: React.ElementType;
  value: number | string;
  label: string;
  ariaLabel: string;
  colorClass?: string;
}

export function QuickStats({
  totalRepos,
  totalStars,
  uniqueLanguages,
  contributions,
  isInView,
}: QuickStatsProps) {
  const stats: StatCardData[] = [
    {
      icon: Folder,
      value: totalRepos,
      label: "Repositories",
      ariaLabel: `${totalRepos} repositories`,
    },
    {
      icon: Star,
      value: totalStars,
      label: "Total Stars",
      ariaLabel: `${totalStars} total stars`,
    },
    {
      icon: Code2,
      value: `${uniqueLanguages}+`,
      label: "Languages",
      ariaLabel: `${uniqueLanguages} programming languages`,
    },
    {
      icon: GitCommit,
      value: contributions?.totalContributions || 0,
      label: "Contributions",
      ariaLabel: `${
        contributions?.totalContributions || 0
      } total contributions`,
    },
    {
      icon: Flame,
      value: contributions?.currentStreak || 0,
      label: "Day Streak",
      ariaLabel: `${contributions?.currentStreak || 0} day current streak`,
      colorClass: "text-orange-500",
    },
    {
      icon: Award,
      value: contributions?.longestStreak || 0,
      label: "Longest Streak",
      ariaLabel: `${contributions?.longestStreak || 0} days longest streak`,
      colorClass: "text-yellow-500",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-6xl mx-auto px-2"
      role="list"
      aria-label="GitHub statistics"
    >
      {stats.map((stat) => (
        <QuickStatCard key={stat.label} {...stat} isInView={isInView} />
      ))}
    </div>
  );
}

interface QuickStatCardProps extends StatCardData {
  isInView: boolean;
}

function QuickStatCard({
  icon: Icon,
  value,
  label,
  ariaLabel,
  colorClass,
}: QuickStatCardProps) {
  const isSpecialIcon = Icon === Star;

  return (
    <Card
      className="p-3 sm:p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group touch-manipulation active:scale-95"
      role="listitem"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex flex-col items-center gap-1.5 sm:gap-2"
      >
        <div
          className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
          aria-hidden="true"
        >
          <Icon
            className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass || "text-primary"} ${
              isSpecialIcon ? "fill-primary" : ""
            }`}
          />
        </div>
        <div className="text-center">
          <div
            className={`text-xl sm:text-2xl font-bold font-mono ${
              colorClass || ""
            }`}
            aria-label={ariaLabel}
          >
            {value}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            {label}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
