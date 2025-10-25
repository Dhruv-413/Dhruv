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
  Shield,
  Check,
  Rocket,
  GitBranch,
  Activity,
  Filter,
  Sparkles,
  Target,
  Zap,
  Eye,
  Clock,
  BarChart3,
  FileCode,
  Folder,
  Flame,
  Award,
  TrendingUp,
  Calendar,
  type LucideIcon,
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

// Technical credibility badges - Portfolio best practice
const techBadges = [
  {
    label: "CI/CD Pipeline",
    icon: GitBranch,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Well Documented",
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Production Ready",
    icon: Check,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Active Development",
    icon: Activity,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Test Coverage",
    icon: Target,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Performance Optimized",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export function GitHubSection() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const { data: stats } = useGitHubStats();
  const { data: contributions } = useGitHubContributions();
  const { data: contributedRepos } = useGitHubContributedRepos();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [contributedRepoFilter, setContributedRepoFilter] =
    useState<string>("All");

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
        className="min-h-screen relative overflow-hidden flex items-center"
        ref={heroRef}
      >
        {/* Animated Background - EXACT MATCH TO PROJECTS */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.03, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-primary/80 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        </div>

        <div className="container mx-auto px-4">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Terminal Prompt - Tech-forward aesthetic */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-primary font-mono text-sm">~/github</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono"
              >
                _
              </motion.span>
            </div>

            {/* Title - MATCHING PROJECTS GRADIENT */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Open Source Journey
              </span>
            </h1>

            {/* Description - Showcasing technical credibility */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono">
                      {totalReposCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Repositories
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono">
                      {totalStarsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Stars
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono">
                      {uniqueLanguagesCount}+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Languages
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GitCommit className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono">
                      {contributions?.totalContributions || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Contributions
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-orange-500">
                      {contributions?.currentStreak || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Day Streak
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-yellow-500">
                      {contributions?.longestStreak || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Longest Streak
                    </div>
                  </div>
                </motion.div>
              </Card>
            </div>

            {/* Technical Credibility Badges - Portfolio best practice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {techBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`flex items-center gap-2 px-3 py-1.5 ${badge.bg} backdrop-blur-sm border border-border/50 rounded-full`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${badge.color}`} />
                    <span className="text-xs font-mono text-foreground/80">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

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
      <section className="py-20 relative" ref={galleryRef}>
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Filter by Language</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
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

          {/* Repository Grid - Matching Projects layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredRepos?.slice(0, 12).map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="p-4 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                        <FileCode className="h-4 w-4 text-primary" />
                      </div>
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 ml-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stargazerCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forkCount}
                      </span>
                    </div>
                  </div>

                  {/* Topics/Tags - Replacing description */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded h-fit"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground h-fit">
                          +{repo.topics.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground border-t border-border/50 pt-3 mb-3">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <TechIcon
                          name={repo.language}
                          className="h-3.5 w-3.5"
                        />
                        <span className="font-medium">{repo.language}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(repo.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  {/* CTA Buttons - Prominent Live Demo & View Code */}
                  <div className="flex gap-2">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs group/btn"
                      >
                        <Github className="h-3 w-3 mr-1.5" />
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
                      >
                        <Button
                          size="sm"
                          className="w-full text-xs group/btn bg-primary hover:bg-primary/90"
                        >
                          <ExternalLink className="h-3 w-3 mr-1.5" />
                          Live Demo
                          <Rocket className="h-3 w-3 ml-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </Button>
                      </a>
                    ) : (
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1.5" />
                          Details
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contribution Heatmap Visualization - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 mb-12"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-3xl font-bold">Contribution Activity</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Past year commit history with detailed metrics
              </p>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm h-full">
              {contributions && contributions.weeks.length > 0 ? (
                <div className="overflow-x-auto">
                  <div className="flex gap-[3px] min-w-[600px]">
                    {contributions.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {week.days.map(
                          (day: ContributionDay, dayIndex: number) => {
                            const greenColors = [
                              "bg-muted",
                              "bg-green-500/20",
                              "bg-green-500/40",
                              "bg-green-500/60",
                              "bg-green-500/80",
                              "bg-green-500",
                            ];
                            return (
                              <motion.div
                                key={`${weekIndex}-${dayIndex}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={
                                  isGalleryInView
                                    ? { opacity: 1, scale: 1 }
                                    : {}
                                }
                                transition={{
                                  duration: 0.2,
                                  delay: 0.4 + weekIndex * 0.005,
                                }}
                                whileHover={{ scale: 1.5, zIndex: 10 }}
                                className={`w-3 h-3 rounded-sm ${
                                  greenColors[day.level]
                                } cursor-pointer transition-all`}
                                title={`${day.date}: ${day.count} contributions`}
                              />
                            );
                          }
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map((level) => {
                        const greenColors = [
                          "bg-muted",
                          "bg-green-500/20",
                          "bg-green-500/40",
                          "bg-green-500/60",
                          "bg-green-500/80",
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
                    <span>More</span>
                  </div>

                  {/* Enhanced Contribution Stats with GraphQL data */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold font-mono text-primary">
                          {contributions.totalContributions}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Total
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-mono text-green-500">
                          {totalCommits}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Commits
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-mono text-orange-500">
                          {contributions.currentStreak}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Current Streak
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-mono text-yellow-500">
                          {contributions.longestStreak}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Best Streak
                        </div>
                      </div>
                    </div>

                    {/* Additional stats from GraphQL */}
                    {contributions && (
                      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                        <div className="p-3 rounded-lg bg-purple-500/10">
                          <div className="text-lg font-bold font-mono text-purple-500">
                            {totalPRs}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Pull Requests
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                          <div className="text-lg font-bold font-mono text-blue-500">
                            {totalIssues}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Issues
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-cyan-500/10">
                          <div className="text-lg font-bold font-mono text-cyan-500">
                            {totalReviews}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1">
                            Reviews
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Loading contribution data...</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Language Distribution - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="text-3xl font-bold">Top 5 Languages</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Most used programming languages across all repositories
              </p>
            </div>

            <Card className="p-8 bg-card/50 backdrop-blur-sm max-w-4xl mx-auto">
              <div className="space-y-6">
                {topLanguages.map(([language, data], index) => {
                  const percentage = stats?.totalRepos
                    ? ((data.count / stats.totalRepos) * 100).toFixed(1)
                    : 0;
                  return (
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + index * 0.05,
                      }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-card ring-primary/20"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="font-semibold text-base">
                            {language}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground font-mono bg-muted px-3 py-1 rounded-full">
                            {data.count} {data.count === 1 ? "repo" : "repos"}
                          </span>
                          <span className="text-lg font-bold font-mono text-primary min-w-[3.5rem] text-right">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          className="h-full transition-all relative"
                          style={{
                            background: `linear-gradient(90deg, ${data.color} 0%, ${data.color}CC 50%, ${data.color}99 100%)`,
                          }}
                          initial={{ width: 0 }}
                          animate={
                            isGalleryInView ? { width: `${percentage}%` } : {}
                          }
                          transition={{
                            duration: 1,
                            delay: 0.6 + index * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* GitHub Profile CTA */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10 ring-2 ring-primary/20">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {user?.name || user?.login}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        @{user?.login}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://github.com/${user?.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="group/btn" size="lg">
                      <GitCommit className="h-4 w-4 mr-2" />
                      View Full GitHub Profile
                      <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Repositories Contributed To Section */}
          {contributedRepos &&
            contributedRepos.repositories &&
            contributedRepos.repositories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-16"
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GitFork className="h-5 w-5 text-primary" />
                    <h2 className="text-3xl font-bold">
                      Repositories I&apos;ve Contributed To
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {contributedRepos.totalCount} repositories across GitHub -
                    Open source collaboration and community engagement
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
                    className="font-mono text-xs"
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
                          className="font-mono text-xs"
                        >
                          {lang} ({count})
                        </Button>
                      );
                    })}
                </motion.div>

                {/* Contributed Repositories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                      >
                        <Card className="p-5 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all h-full group">
                          <div className="flex flex-col h-full">
                            {/* Owner & Repo Name */}
                            <div className="flex items-start gap-2 mb-3">
                              <Github className="h-4 w-4 text-primary mt-1 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted-foreground truncate">
                                  {repo.owner}
                                </div>
                                <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                  {repo.name}
                                </h3>
                              </div>
                            </div>

                            {/* Description */}
                            {repo.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                                {repo.description}
                              </p>
                            )}

                            {/* Stats */}
                            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground mb-3">
                              {repo.language && (
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{
                                      backgroundColor:
                                        repo.languageColor || "#666",
                                    }}
                                  />
                                  <span className="font-mono text-[11px]">
                                    {repo.language}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  <span className="font-mono">
                                    {repo.stargazerCount}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <GitFork className="h-3 w-3" />
                                  <span className="font-mono">
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
                              className="w-full"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full group/btn text-xs"
                              >
                                <ExternalLink className="h-3 w-3 mr-1.5" />
                                View Repository
                              </Button>
                            </a>
                          </div>
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
