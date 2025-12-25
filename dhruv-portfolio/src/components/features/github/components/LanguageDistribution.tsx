"use client";

import { motion, useInView } from "framer-motion";
import { BarChart3, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/TechIcon";
import { SITE_CONFIG } from "@/lib/constants";
import type { GitHubStats } from "@/hooks/useGitHub";
import { useRef } from "react";

interface LanguageDistributionProps {
  stats: GitHubStats | null;
  topLanguages: [string, { count: number; color: string }][];
}

export function LanguageDistribution({
  stats,
  topLanguages,
}: LanguageDistributionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col"
    >
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-purple-500/20">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Language Distribution</h2>
            <p className="text-sm text-muted-foreground">
              Most used across {stats?.totalRepos || 0} repositories
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col relative overflow-hidden group">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative space-y-4 flex-1">
          {topLanguages.slice(0, 5).map(([language, data], index) => {
            const percentage = stats?.totalRepos
              ? ((data.count / stats.totalRepos) * 100).toFixed(1)
              : 0;
            return (
              <LanguageBar
                key={language}
                language={language}
                data={data}
                percentage={Number(percentage)}
                index={index}
                isInView={isInView}
              />
            );
          })}
        </div>

        {/* Summary Stats */}
        <SummaryStats stats={stats} topLanguages={topLanguages} />

        {/* GitHub Profile Link */}
        <div className="relative z-10 mt-4">
          <Button
            asChild
            className="w-full group/link bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all"
            size="sm"
          >
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
            >
              <Github className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="font-semibold">View Full Profile</span>
              <ExternalLink
                className="h-4 w-4 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

interface LanguageBarProps {
  language: string;
  data: { count: number; color: string };
  percentage: number;
  index: number;
  isInView: boolean;
}

function LanguageBar({
  language,
  data,
  percentage,
  index,
  isInView,
}: LanguageBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: 0.3 + index * 0.08,
      }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="group/lang cursor-pointer"
    >
      {/* Language Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Language Icon */}
          <div
            className="p-1.5 rounded-lg transition-all group-hover/lang:scale-110"
            style={{ backgroundColor: `${data.color}20` }}
          >
            <TechIcon name={language} className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-base group-hover/lang:text-primary transition-colors">
              {language}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono">
                {data.count} {data.count === 1 ? "repo" : "repos"}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span
            className="text-xl font-bold font-mono transition-all group-hover/lang:scale-110 inline-block"
            style={{ color: data.color }}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden shadow-inner relative">
        <motion.div
          className="h-full relative overflow-hidden rounded-full"
          style={{
            background: `linear-gradient(90deg, ${data.color} 0%, ${data.color}CC 50%, ${data.color}99 100%)`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{
            duration: 1.2,
            delay: 0.4 + index * 0.1,
            ease: "easeOut",
          }}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface SummaryStatsProps {
  stats: GitHubStats | null;
  topLanguages: [string, { count: number; color: string }][];
}

function SummaryStats({ stats, topLanguages }: SummaryStatsProps) {
  const summaryItems = [
    { value: stats?.totalRepos || 0, label: "Repos", color: "primary" },
    { value: topLanguages.length, label: "Languages", color: "purple" },
    { value: stats?.totalStars || 0, label: "Stars", color: "yellow" },
  ];

  const colorMap: Record<string, string> = {
    primary: "from-primary/10 to-primary/5 border-primary/10 text-primary",
    purple:
      "from-purple-500/10 to-purple-500/5 border-purple-500/10 text-purple-500",
    yellow:
      "from-yellow-500/10 to-yellow-500/5 border-yellow-500/10 text-yellow-500",
  };

  return (
    <div className="relative mt-6 pt-6 border-t border-border/30 z-10">
      <div className="grid grid-cols-3 gap-3 text-center">
        {summaryItems.map(({ value, label, color }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`p-3 rounded-xl bg-linear-to-br ${colorMap[color]} transition-all duration-300 border`}
          >
            <div
              className={`text-2xl font-bold font-mono ${colorMap[color]
                .split(" ")
                .pop()}`}
            >
              {value}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
