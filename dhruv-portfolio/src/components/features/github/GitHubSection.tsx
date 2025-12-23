"use client";

import { motion, useInView } from "framer-motion";
import {
  GitFork,
  Star,
  GitCommit,
  Code2,
  ExternalLink,
  Github,
  Terminal,
  Rocket,
  Activity,
  Sparkles,
  Eye,
  Clock,
  BarChart3,
  Folder,
  Flame,
  Award,
  Calendar,
  Monitor,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGitHubUser,
  useGitHubRepos,
  useGitHubStats,
  useGitHubContributions,
  useGitHubContributedRepos,
  type ContributionDay,
  type ContributedRepository,
} from "@/hooks/useGitHub";
import { formatDistanceToNow } from "date-fns";
import { useState, useRef } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

// Card color palette matching skill/project cards for consistent visual design
const cardColors = [
  { color: "#a855f7", bg: "#a855f720" }, // Purple
  { color: "#3b82f6", bg: "#3b82f620" }, // Blue
  { color: "#10b981", bg: "#10b98120" }, // Green
  { color: "#f59e0b", bg: "#f59e0b20" }, // Amber
  { color: "#ec4899", bg: "#ec489920" }, // Pink
  { color: "#06b6d4", bg: "#06b6d420" }, // Cyan
  { color: "#8b5cf6", bg: "#8b5cf620" }, // Violet
  { color: "#f97316", bg: "#f9731620" }, // Orange
];

// Get consistent color based on repo name using hash
const getRepoColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return cardColors[Math.abs(hash) % cardColors.length];
};

export function GitHubSection() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const { data: stats } = useGitHubStats();
  const { data: contributions } = useGitHubContributions();
  const { data: contributedRepos } = useGitHubContributedRepos();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [contributedRepoFilter, setContributedRepoFilter] =
    useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Refs for scroll animations - Matching Projects page pattern
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });

  const isLoading = userLoading || reposLoading;

  // Get top repositories by stars
  const topRepos = repos
    ?.filter((repo) => !repo.name.includes("Dhruv-413")) // Filter out profile repo
    ?.sort((a, b) => b.stargazerCount - a.stargazerCount);

  // Get unique languages for filtering - Progressive disclosure pattern
  const languages = Array.from(
    new Set(
      repos
        ?.map((repo) => repo.language)
        .filter((lang): lang is string => Boolean(lang))
    )
  ).sort();

  const filterOptions = ["All", ...languages.slice(0, 6)];

  // Filter repos by language - Interactive filtering
  const filteredRepos =
    activeFilter === "All"
      ? topRepos
      : topRepos?.filter((repo) => repo.language === activeFilter);

  // Get top languages with enhanced stats from GraphQL
  const topLanguages = stats?.languages
    ? Object.entries(stats.languages)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 5)
    : [];

  // Calculate total repos count for filtered view
  const totalReposCount = user?.publicRepos || 0;
  const totalStarsCount = stats?.totalStars || 0;
  const uniqueLanguagesCount = languages.length;

  // Use GraphQL data for all stats
  const totalCommits = contributions?.totalCommits || 0;
  const totalPRs = contributions?.totalPRs || 0;
  const totalIssues = contributions?.totalIssues || 0;
  const totalReviews = contributions?.totalReviews || 0;
  if (isLoading) {
    return (
      <section
        id="github"
        className="min-h-screen relative overflow-hidden flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-muted rounded w-96 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-[500px] mx-auto"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero-Style Introduction Section - MATCHING PROJECTS PAGE */}
      <section
        id="github"
        aria-labelledby="github-heading"
        className="min-h-screen relative overflow-hidden flex items-center"
        ref={heroRef}
      >
        <div className="container mx-auto px-4">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Terminal Prompt - Tech-forward aesthetic */}
            <div
              className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6"
              aria-label="Terminal prompt"
            >
              <Terminal
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary"
                aria-hidden="true"
              />
              <span className="text-primary font-mono text-xs sm:text-sm">
                ~/github
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono text-xs sm:text-sm"
                aria-hidden="true"
              >
                _
              </motion.span>
            </div>

            {/* Title - MATCHING PROJECTS GRADIENT */}
            <h1
              id="github-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Open Source Journey
              </span>
            </h1>

            {/* Description - Showcasing technical credibility */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              Real-time statistics from my{" "}
              <span className="text-primary font-semibold">GitHub profile</span>{" "}
              showcasing{" "}
              <span className="text-primary font-semibold">
                {totalReposCount} repositories
              </span>
              ,{" "}
              <span className="text-primary font-semibold">
                {totalStarsCount} stars earned
              </span>
              , and contributions across{" "}
              <span className="text-primary font-semibold">
                {uniqueLanguagesCount}+ programming languages
              </span>
              . Each project demonstrates consistent development practices and
              code quality standards.
            </p>

            {/* Quick Stats - MATCHING PROJECTS CARD DESIGN */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-6xl mx-auto px-2"
              role="list"
              aria-label="GitHub statistics"
            >
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
                    <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      aria-label={`${totalReposCount} repositories`}
                    >
                      {totalReposCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Repositories
                    </div>
                  </div>
                </motion.div>
              </Card>

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
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary fill-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      aria-label={`${totalStarsCount} total stars`}
                    >
                      {totalStarsCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Total Stars
                    </div>
                  </div>
                </motion.div>
              </Card>

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
                    <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      aria-label={`${uniqueLanguagesCount} programming languages`}
                    >
                      {uniqueLanguagesCount}+
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Languages
                    </div>
                  </div>
                </motion.div>
              </Card>

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
                    <GitCommit className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      aria-label={`${
                        contributions?.totalContributions || 0
                      } total contributions`}
                    >
                      {contributions?.totalContributions || 0}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Contributions
                    </div>
                  </div>
                </motion.div>
              </Card>

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
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono text-orange-500"
                      aria-label={`${
                        contributions?.currentStreak || 0
                      } day current streak`}
                    >
                      {contributions?.currentStreak || 0}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Day Streak
                    </div>
                  </div>
                </motion.div>
              </Card>

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
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono text-yellow-500"
                      aria-label={`${
                        contributions?.longestStreak || 0
                      } days longest streak`}
                    >
                      {contributions?.longestStreak || 0}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      Longest Streak
                    </div>
                  </div>
                </motion.div>
              </Card>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground font-mono">
                Explore Repositories
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Repository Gallery Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 relative"
        ref={galleryRef}
        aria-labelledby="contribution-heading"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Mobile Message: View on Web - Shown First on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:hidden mb-12"
          >
            <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Monitor
                      className="h-8 w-8 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  View Detailed Statistics on Desktop
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  For the best experience viewing my contribution heatmap and
                  detailed language statistics, please visit on a larger screen
                  or check out my GitHub profile directly.
                </p>
                <a
                  href={`https://github.com/${user?.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label="View GitHub profile"
                >
                  <Button
                    size="lg"
                    className="group/link bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Github className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span className="font-semibold">Visit GitHub Profile</span>
                    <ExternalLink
                      className="h-5 w-5 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Side-by-Side Layout: Contribution Activity & Top 5 Languages - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-[3fr_2fr] gap-8 mb-16">
            {/* Contribution Heatmap Visualization - Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Section Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20">
                    <Activity className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h2
                      id="contribution-heading"
                      className="text-2xl font-bold"
                    >
                      Contribution Activity
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      365-day commit history & statistics
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col relative overflow-hidden group">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {contributions && contributions.weeks.length > 0 ? (
                  <div className="relative flex-1 flex flex-col">
                    {/* Activity Summary Bar */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-mono">
                          {new Date(
                            contributions.weeks[0]?.days[0]?.date || ""
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          - Present
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-semibold text-green-500">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Heatmap */}
                    <div
                      className="overflow-x-auto mb-4 flex-1 flex items-center relative"
                      aria-label="Contribution heatmap"
                    >
                      <div className="flex gap-[3px] mx-auto">
                        {contributions.weeks.map((week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="flex flex-col gap-[3px]"
                            role="group"
                          >
                            {week.days.map(
                              (day: ContributionDay, dayIndex: number) => {
                                const greenColors = [
                                  "bg-muted/60 hover:bg-muted",
                                  "bg-green-500/25 hover:bg-green-500/35",
                                  "bg-green-500/45 hover:bg-green-500/55",
                                  "bg-green-500/65 hover:bg-green-500/75",
                                  "bg-green-500/85 hover:bg-green-500/95",
                                  "bg-green-500 hover:bg-green-400",
                                ];
                                return (
                                  <motion.button
                                    key={`${weekIndex}-${dayIndex}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={
                                      isGalleryInView
                                        ? { opacity: 1, scale: 1 }
                                        : {}
                                    }
                                    transition={{
                                      duration: 0.2,
                                      delay: 0.2 + weekIndex * 0.003,
                                    }}
                                    whileHover={{ scale: 1.6, zIndex: 10 }}
                                    onMouseEnter={(e) => {
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      const tooltipWidth = 220;
                                      const viewportWidth = window.innerWidth;

                                      let xPos = rect.right + 10;

                                      if (xPos + tooltipWidth > viewportWidth) {
                                        xPos = rect.left - tooltipWidth - 10;
                                      }

                                      setHoveredDay({
                                        date: day.date,
                                        count: day.count,
                                        x: xPos,
                                        y: rect.top + rect.height / 2,
                                      });
                                    }}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    onFocus={(e) => {
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      const tooltipWidth = 220;
                                      const viewportWidth = window.innerWidth;

                                      let xPos = rect.right + 10;

                                      if (xPos + tooltipWidth > viewportWidth) {
                                        xPos = rect.left - tooltipWidth - 10;
                                      }

                                      setHoveredDay({
                                        date: day.date,
                                        count: day.count,
                                        x: xPos,
                                        y: rect.top + rect.height / 2,
                                      });
                                    }}
                                    onBlur={() => setHoveredDay(null)}
                                    className={`w-[11px] h-[11px] rounded-sm ${
                                      greenColors[day.level]
                                    } cursor-pointer transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}
                                    aria-label={`${day.count} contributions on ${day.date}`}
                                    title={`${day.date}: ${day.count} contributions`}
                                  />
                                );
                              }
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-4">
                      <span className="font-mono text-[10px]">Less</span>
                      <div className="flex items-center gap-1">
                        {[0, 1, 2, 3, 4, 5].map((level) => {
                          const greenColors = [
                            "bg-muted/60",
                            "bg-green-500/25",
                            "bg-green-500/45",
                            "bg-green-500/65",
                            "bg-green-500/85",
                            "bg-green-500",
                          ];
                          return (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-sm ${greenColors[level]}`}
                            />
                          );
                        })}
                      </div>
                      <span className="font-mono text-[10px]">More</span>
                    </div>

                    {/* Primary Stats Grid - Enhanced */}
                    <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/30">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-center p-3 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-all duration-300 border border-primary/10"
                      >
                        <div className="text-2xl font-bold font-mono text-primary">
                          {contributions.totalContributions}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                          Total
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-center p-3 rounded-xl bg-linear-to-br from-green-500/10 to-green-500/5 hover:from-green-500/15 hover:to-green-500/10 transition-all duration-300 border border-green-500/10"
                      >
                        <div className="text-2xl font-bold font-mono text-green-500">
                          {totalCommits}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                          Commits
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-center p-3 rounded-xl bg-linear-to-br from-orange-500/10 to-orange-500/5 hover:from-orange-500/15 hover:to-orange-500/10 transition-all duration-300 border border-orange-500/10"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="text-2xl font-bold font-mono text-orange-500">
                            {contributions.currentStreak}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                          Streak
                        </div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-center p-3 rounded-xl bg-linear-to-br from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/15 hover:to-yellow-500/10 transition-all duration-300 border border-yellow-500/10"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-2xl font-bold font-mono text-yellow-500">
                            {contributions.longestStreak}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                          Best
                        </div>
                      </motion.div>
                    </div>

                    {/* Activity Type Breakdown - Enhanced */}
                    {contributions && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 transition-all border border-purple-500/10"
                        >
                          <div className="p-1.5 rounded-md bg-purple-500/20">
                            <GitCommit className="h-3.5 w-3.5 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-sm font-bold font-mono text-purple-500">
                              {totalPRs}
                            </div>
                            <div className="text-[9px] text-muted-foreground font-medium">
                              Pull Requests
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-all border border-blue-500/10"
                        >
                          <div className="p-1.5 rounded-md bg-blue-500/20">
                            <Activity className="h-3.5 w-3.5 text-blue-500" />
                          </div>
                          <div>
                            <div className="text-sm font-bold font-mono text-blue-500">
                              {totalIssues}
                            </div>
                            <div className="text-[9px] text-muted-foreground font-medium">
                              Issues
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-all border border-cyan-500/10"
                        >
                          <div className="p-1.5 rounded-md bg-cyan-500/20">
                            <Eye className="h-3.5 w-3.5 text-cyan-500" />
                          </div>
                          <div>
                            <div className="text-sm font-bold font-mono text-cyan-500">
                              {totalReviews}
                            </div>
                            <div className="text-[9px] text-muted-foreground font-medium">
                              Reviews
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8 flex-1 flex items-center justify-center">
                    <div>
                      <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Loading contribution data...</p>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Floating Tooltip - Portal-like rendering outside Card */}
            {hoveredDay && (
              <div
                className="fixed pointer-events-none"
                style={{
                  left: `${hoveredDay.x}px`,
                  top: `${hoveredDay.y}px`,
                  transform: "translateY(-50%)",
                  zIndex: 9999,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="bg-card/95 backdrop-blur-md border-2 border-primary/40 rounded-lg shadow-2xl shadow-primary/20 p-3 w-[220px]"
                >
                  <div className="text-sm font-mono">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-primary font-bold text-2xl tabular-nums">
                        {hoveredDay.count}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        contribution{hoveredDay.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="text-foreground font-semibold text-xs border-t border-border/50 pt-2 mt-1">
                      {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Top 5 Languages Distribution - Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
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
                    <h2 id="languages-heading" className="text-2xl font-bold">
                      Language Distribution
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Most used across {stats?.totalRepos || 0} repositories
                    </p>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col relative overflow-hidden group">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-4 flex-1">
                  {topLanguages.slice(0, 5).map(([language, data], index) => {
                    const percentage = stats?.totalRepos
                      ? ((data.count / stats.totalRepos) * 100).toFixed(1)
                      : 0;
                    return (
                      <motion.div
                        key={language}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
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
                                  {data.count}{" "}
                                  {data.count === 1 ? "repo" : "repos"}
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

                        {/* Progress Bar - Enhanced */}
                        <div className="h-3 bg-muted/50 rounded-full overflow-hidden shadow-inner relative">
                          <motion.div
                            className="h-full relative overflow-hidden rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${data.color} 0%, ${data.color}CC 50%, ${data.color}99 100%)`,
                            }}
                            initial={{ width: 0 }}
                            animate={
                              isGalleryInView ? { width: `${percentage}%` } : {}
                            }
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
                  })}
                </div>

                {/* Summary Stats - Enhanced */}
                <div className="relative mt-6 pt-6 border-t border-border/30">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 transition-all duration-300 border border-primary/10"
                    >
                      <div className="text-2xl font-bold font-mono text-primary">
                        {stats?.totalRepos || 0}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                        Repos
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 rounded-xl bg-linear-to-br from-purple-500/10 to-purple-500/5 transition-all duration-300 border border-purple-500/10"
                    >
                      <div className="text-2xl font-bold font-mono text-purple-500">
                        {topLanguages.length}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                        Languages
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 rounded-xl bg-linear-to-br from-yellow-500/10 to-yellow-500/5 transition-all duration-300 border border-yellow-500/10"
                    >
                      <div className="text-2xl font-bold font-mono text-yellow-500">
                        {stats?.totalStars || 0}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
                        Stars
                      </div>
                    </motion.div>
                  </div>

                  {/* GitHub Profile Link */}
                  <a
                    href={`https://github.com/${user?.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block"
                    aria-label="View GitHub profile"
                  >
                    <Button
                      className="w-full group/link bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all"
                      size="sm"
                    >
                      <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span className="font-semibold">View Full Profile</span>
                      <ExternalLink
                        className="h-4 w-4 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* My Repositories Section - Now Below Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8 sm:mb-12 px-2"
          >
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="p-2 sm:p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-purple-500/20">
                <Folder className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2
                id="repositories-heading"
                className="text-xl sm:text-2xl font-bold"
              >
                My Repositories
              </h2>
            </div>

            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
              role="group"
              aria-label="Language filter buttons"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFilter(filter);
                    }
                  }}
                  aria-pressed={activeFilter === filter}
                  aria-label={`Filter repositories by ${filter}`}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 touch-manipulation active:scale-95 ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {filter}
                  {filter !== "All" && (
                    <span className="ml-2 text-xs opacity-70">
                      ({topRepos?.filter((r) => r.language === filter).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Showing{" "}
              <span className="font-mono text-primary">
                {filteredRepos?.length || 0}
              </span>{" "}
              repositories
            </p>
          </motion.div>

          {/* Repository Grid - Enhanced Design Matching Skill/Project Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
            role="list"
            aria-label="Repository cards"
          >
            {filteredRepos?.slice(0, 12).map((repo, index) => {
              const repoColor = getRepoColor(repo.name);
              const isActive = activeRepo === repo.name;

              return (
                <motion.article
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  role="listitem"
                  className="group"
                  onMouseEnter={() => setActiveRepo(repo.name)}
                  onMouseLeave={() => setActiveRepo(null)}
                >
                  <Card
                    className={`p-5 h-full bg-card border transition-all duration-500 flex flex-col relative overflow-hidden ${
                      isActive
                        ? "shadow-2xl"
                        : "border-border/50 hover:shadow-xl"
                    }`}
                    style={{
                      borderColor: isActive ? repoColor.color : undefined,
                      boxShadow: isActive
                        ? `0 25px 50px -12px ${repoColor.color}30`
                        : undefined,
                    }}
                  >
                    {/* Scan Line Effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-x-0 h-px"
                        style={{ backgroundColor: `${repoColor.color}80` }}
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}

                    {/* Animated Background Gradient */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${repoColor.color}15, transparent 50%, ${repoColor.color}08)`,
                      }}
                    />

                    {/* Corner Accent Blur */}
                    <div
                      className={`absolute -top-2 -right-2 w-12 h-12 rounded-full blur-xl transition-opacity duration-500 ${
                        isActive ? "opacity-60" : "opacity-0"
                      }`}
                      style={{ backgroundColor: repoColor.color }}
                    />

                    {/* Deployment Badge */}
                    {(repo.topics?.includes("deployed") ||
                      repo.topics?.includes("live")) && (
                      <div className="absolute top-0 right-0 bg-linear-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1.5 shadow-lg z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        LIVE
                      </div>
                    )}

                    {/* Owner & Repo Name with Colored Icon */}
                    <div className="relative flex items-start gap-3 mb-3">
                      <motion.div
                        className="p-2 rounded-lg transition-colors shrink-0"
                        style={{ backgroundColor: repoColor.bg }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Github
                          className="h-4 w-4"
                          style={{ color: repoColor.color }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {user?.login || "Dhruv-413"}
                        </div>
                        <h3
                          className="font-bold text-base transition-colors truncate"
                          style={{
                            color: isActive ? repoColor.color : undefined,
                          }}
                        >
                          {repo.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    {repo.description && (
                      <p className="relative text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {repo.description}
                      </p>
                    )}

                    {/* Topics/Tags with Progressive Disclosure - Enhanced with repo color */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="relative mb-4 flex-1">
                        <div className="flex flex-wrap gap-1.5">
                          {(expandedProject === repo.name
                            ? repo.topics
                            : repo.topics.slice(0, 4)
                          ).map((topic) => (
                            <motion.span
                              key={topic}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-2 py-1 text-[10px] font-mono rounded-md transition-all cursor-default border"
                              style={{
                                backgroundColor: repoColor.bg,
                                color: repoColor.color,
                                borderColor: `${repoColor.color}40`,
                              }}
                            >
                              {topic}
                            </motion.span>
                          ))}
                        </div>
                        {repo.topics.length > 4 &&
                          expandedProject !== repo.name && (
                            <button
                              onClick={() => setExpandedProject(repo.name)}
                              className="text-[10px] font-mono mt-2 flex items-center gap-1 transition-colors hover:opacity-80"
                              style={{ color: repoColor.color }}
                              aria-label="Show all topics"
                            >
                              +{repo.topics.length - 4} more
                              <motion.span
                                animate={{ x: [0, 2, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </button>
                          )}
                        {expandedProject === repo.name &&
                          repo.topics.length > 4 && (
                            <button
                              onClick={() => setExpandedProject(null)}
                              className="text-[10px] font-mono mt-2 transition-colors hover:opacity-80"
                              style={{ color: repoColor.color }}
                              aria-label="Show fewer topics"
                            >
                              Show less
                            </button>
                          )}
                      </div>
                    )}

                    {/* Stats Row - Enhanced Design */}
                    <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3 mb-3">
                      {repo.language && (
                        <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg">
                          <div
                            className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-card ring-border/50"
                            style={{
                              backgroundColor: repo.languageColor || "#666",
                            }}
                          />
                          <span className="font-mono text-[11px] font-medium">
                            {repo.language}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                          <Star className="h-3.5 w-3.5" />
                          <span className="font-mono font-medium">
                            {repo.stargazerCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <GitFork className="h-3.5 w-3.5" />
                          <span className="font-mono font-medium">
                            {repo.forkCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Updated Time */}
                    <div className="relative flex items-center gap-1.5 text-[10px] text-muted-foreground mb-3">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <span>Updated</span>
                      <time dateTime={repo.updatedAt} className="font-mono">
                        {formatDistanceToNow(new Date(repo.updatedAt), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>

                    {/* CTA Buttons with repo color accents */}
                    <div className="relative flex gap-2 mb-3">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        aria-label={`View ${repo.name} source code on GitHub`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs group/btn transition-all"
                          style={{
                            borderColor: isActive ? repoColor.color : undefined,
                            color: isActive ? repoColor.color : undefined,
                          }}
                        >
                          <Github
                            className="h-3.5 w-3.5 mr-1.5"
                            aria-hidden="true"
                          />
                          View Code
                        </Button>
                      </a>
                      {repo.topics?.includes("deployed") ||
                      repo.topics?.includes("live") ? (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          aria-label={`Open ${repo.name} live demo`}
                        >
                          <Button
                            size="sm"
                            className="w-full text-xs group/btn shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${repoColor.color}, ${repoColor.color}cc)`,
                              boxShadow: `0 4px 14px ${repoColor.color}40`,
                            }}
                          >
                            <ExternalLink
                              className="h-3.5 w-3.5 mr-1.5"
                              aria-hidden="true"
                            />
                            Live Demo
                            <Rocket
                              className="h-3 w-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                              aria-hidden="true"
                            />
                          </Button>
                        </a>
                      ) : (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          aria-label={`View ${repo.name} details`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs transition-all"
                            style={{
                              borderColor: isActive
                                ? `${repoColor.color}60`
                                : undefined,
                            }}
                          >
                            <ExternalLink
                              className="h-3.5 w-3.5 mr-1.5"
                              aria-hidden="true"
                            />
                            Details
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Code-style Footer - Like Skills cards */}
                    <div className="relative pt-3 border-t border-border/50 font-mono text-[10px] text-muted-foreground">
                      <span style={{ color: repoColor.color }}>{"// "}</span>
                      <span className="italic">
                        {repo.language
                          ? `Built with ${repo.language}`
                          : "Open source project"}
                      </span>
                    </div>
                  </Card>
                </motion.article>
              );
            })}
          </div>

          {/* Repositories Contributed To Section - Enhanced Design */}
          {contributedRepos &&
            contributedRepos.repositories &&
            contributedRepos.repositories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-16"
              >
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-8 px-2">
                  <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-blue-300/20">
                      <GitFork className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h2
                      id="repositories-heading"
                      className="text-xl sm:text-2xl font-bold"
                    >
                      Open Source Contributions
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    <span className="text-primary font-semibold">
                      {contributedRepos.totalCount}
                    </span>{" "}
                    repositories across GitHub — Active participation in open
                    source community
                  </p>
                </div>

                {/* Language Filter for Contributed Repos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto"
                >
                  <Button
                    variant={
                      contributedRepoFilter === "All" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setContributedRepoFilter("All")}
                    className={`font-mono text-xs transition-all ${
                      contributedRepoFilter === "All"
                        ? "shadow-lg shadow-primary/20"
                        : "hover:border-primary/50"
                    }`}
                  >
                    All ({contributedRepos.repositories.length})
                  </Button>
                  {Array.from(
                    new Set(
                      contributedRepos.repositories
                        .map((r) => r.language)
                        .filter((lang): lang is string => Boolean(lang))
                    )
                  )
                    .slice(0, 6)
                    .map((lang) => {
                      const count = contributedRepos.repositories.filter(
                        (r) => r.language === lang
                      ).length;
                      return (
                        <Button
                          key={lang}
                          variant={
                            contributedRepoFilter === lang
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setContributedRepoFilter(lang)}
                          className={`font-mono text-xs transition-all ${
                            contributedRepoFilter === lang
                              ? "shadow-lg shadow-primary/20"
                              : "hover:border-primary/50"
                          }`}
                        >
                          {lang} ({count})
                        </Button>
                      );
                    })}
                </motion.div>

                {/* Contributed Repositories Grid - Enhanced to Match My Repos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
                  {contributedRepos.repositories
                    .filter(
                      (repo) =>
                        contributedRepoFilter === "All" ||
                        repo.language === contributedRepoFilter
                    )
                    .slice(0, 12)
                    .map((repo: ContributedRepository, index) => (
                      <motion.div
                        key={repo.url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.55 + index * 0.05,
                        }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group"
                      >
                        <Card className="p-5 bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                          {/* Animated Background Gradient on Hover */}
                          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Owner & Repo Name */}
                          <div className="relative flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors shrink-0">
                              <Github className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-muted-foreground font-mono truncate">
                                {repo.owner}
                              </div>
                              <h3 className="font-bold text-base truncate group-hover:text-blue-500 transition-colors">
                                {repo.name}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          {repo.description && (
                            <p className="relative text-xs text-muted-foreground line-clamp-2 mb-3 flex-1 leading-relaxed">
                              {repo.description}
                            </p>
                          )}

                          {/* Stats Row */}
                          <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3 mb-3">
                            {repo.language && (
                              <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg">
                                <div
                                  className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-card ring-border/50"
                                  style={{
                                    backgroundColor:
                                      repo.languageColor || "#666",
                                  }}
                                />
                                <span className="font-mono text-[11px] font-medium">
                                  {repo.language}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                <Star className="h-3.5 w-3.5" />
                                <span className="font-mono font-medium">
                                  {repo.stargazerCount}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                <GitFork className="h-3.5 w-3.5" />
                                <span className="font-mono font-medium">
                                  {repo.forkCount}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* View Button */}
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full group/btn text-xs hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-500 transition-all"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              View Repository
                            </Button>
                          </a>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
        </div>
      </section>
    </>
  );
}
