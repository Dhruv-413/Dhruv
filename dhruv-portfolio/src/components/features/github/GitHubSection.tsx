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
  Filter,
  Sparkles,
  Eye,
  Clock,
  BarChart3,
  FileCode,
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
              className="flex items-center justify-center gap-2 mb-6"
              aria-label="Terminal prompt"
            >
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-primary font-mono text-sm">~/github</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono"
                aria-hidden="true"
              >
                _
              </motion.span>
            </div>

            {/* Title - MATCHING PROJECTS GRADIENT */}
            <h1
              id="github-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
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
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto"
              role="list"
              aria-label="GitHub statistics"
            >
              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono"
                      aria-label={`${totalReposCount} repositories`}
                    >
                      {totalReposCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Repositories
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono"
                      aria-label={`${totalStarsCount} total stars`}
                    >
                      {totalStarsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Stars
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono"
                      aria-label={`${uniqueLanguagesCount} programming languages`}
                    >
                      {uniqueLanguagesCount}+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Languages
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <GitCommit className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono"
                      aria-label={`${
                        contributions?.totalContributions || 0
                      } total contributions`}
                    >
                      {contributions?.totalContributions || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Contributions
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Flame className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono text-orange-500"
                      aria-label={`${
                        contributions?.currentStreak || 0
                      } day current streak`}
                    >
                      {contributions?.currentStreak || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Day Streak
                    </div>
                  </div>
                </motion.div>
              </Card>

              <Card
                className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                role="listitem"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold font-mono text-yellow-500"
                      aria-label={`${
                        contributions?.longestStreak || 0
                      } days longest streak`}
                    >
                      {contributions?.longestStreak || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
        className="py-20 relative"
        ref={galleryRef}
        aria-labelledby="repositories-heading"
      >
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 id="repositories-heading" className="text-2xl font-bold">
                Filter by Language
              </h2>
            </div>

            <div
              className="flex flex-wrap justify-center gap-2"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
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

          {/* Repository Grid - Matching Projects layout with Progressive Disclosure */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            role="list"
            aria-label="Repository cards"
          >
            {filteredRepos?.slice(0, 12).map((repo, index) => (
              <motion.article
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                role="listitem"
              >
                <Card className="p-4 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group flex flex-col relative overflow-hidden">
                  {/* Deployment Badge - Best Practice */}
                  {(repo.topics?.includes("deployed") ||
                    repo.topics?.includes("live")) && (
                    <div className="absolute top-0 right-0 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0"
                        aria-hidden="true"
                      >
                        <FileCode className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 ml-2">
                      <span
                        className="flex items-center gap-1"
                        aria-label={`${repo.stargazerCount} stars`}
                      >
                        <Star className="h-3.5 w-3.5" aria-hidden="true" />
                        {repo.stargazerCount}
                      </span>
                      <span
                        className="flex items-center gap-1"
                        aria-label={`${repo.forkCount} forks`}
                      >
                        <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                        {repo.forkCount}
                      </span>
                    </div>
                  </div>

                  {/* Topics/Tags with Progressive Disclosure */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mb-4 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {(expandedProject === repo.name
                          ? repo.topics
                          : repo.topics.slice(0, 4)
                        ).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary rounded h-fit hover:bg-primary/20 transition-colors cursor-default"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      {repo.topics.length > 4 &&
                        expandedProject !== repo.name && (
                          <button
                            onClick={() => setExpandedProject(repo.name)}
                            className="text-[10px] text-primary hover:text-primary/80 font-mono mt-1.5 flex items-center gap-1 transition-colors"
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
                            className="text-[10px] text-primary hover:text-primary/80 font-mono mt-1.5 transition-colors"
                            aria-label="Show fewer topics"
                          >
                            Show less
                          </button>
                        )}
                    </div>
                  )}

                  {/* Footer with Language Badge */}
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground border-t border-border/50 pt-3 mb-3">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded">
                        <TechIcon
                          name={repo.language}
                          className="h-3.5 w-3.5"
                        />
                        <span className="font-medium">{repo.language}</span>
                      </span>
                    )}
                    <span
                      className="flex items-center gap-1"
                      title={new Date(repo.updatedAt).toLocaleDateString()}
                    >
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <time dateTime={repo.updatedAt}>
                        {formatDistanceToNow(new Date(repo.updatedAt), {
                          addSuffix: true,
                        })}
                      </time>
                    </span>
                  </div>

                  {/* CTA Buttons - Prominent CTAs Best Practice */}
                  <div className="flex gap-2">
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
                        className="w-full text-xs group/btn hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <Github className="h-3 w-3 mr-1.5" aria-hidden="true" />
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
                          className="w-full text-xs group/btn bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <ExternalLink
                            className="h-3 w-3 mr-1.5"
                            aria-hidden="true"
                          />
                          Live Demo
                          <Rocket
                            className="h-3 w-3 ml-1.5 opacity-0 group-hover/btn:opacity-100 transition-opacity"
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
                          variant="ghost"
                          className="w-full text-xs hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <Eye className="h-3 w-3 mr-1.5" aria-hidden="true" />
                          Details
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>

          {/* Mobile Message: View on Web */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:hidden mt-16 mb-12"
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
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 mt-16 mb-12">
            {/* Contribution Heatmap Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 ml-8">
                  <Calendar
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="contribution-heading" className="text-2xl font-bold">
                    Contribution Activity
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  365-day commit history
                </p>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col relative">
                {contributions && contributions.weeks.length > 0 ? (
                  <div className="flex-1 flex flex-col">
                    {/* Heatmap */}
                    <div
                      className="overflow-x-auto mb-4 flex-1 flex items-center relative"
                      aria-label="Contribution heatmap"
                    >
                      <div className="flex gap-0.5 mx-auto">
                        {contributions.weeks.map((week, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="flex flex-col gap-0.5"
                            role="group"
                          >
                            {week.days.map(
                              (day: ContributionDay, dayIndex: number) => {
                                const greenColors = [
                                  "bg-muted hover:bg-muted/80",
                                  "bg-green-500/20 hover:bg-green-500/30",
                                  "bg-green-500/40 hover:bg-green-500/50",
                                  "bg-green-500/60 hover:bg-green-500/70",
                                  "bg-green-500/80 hover:bg-green-500/90",
                                  "bg-green-500 hover:bg-green-600",
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
                                      delay: 0.4 + weekIndex * 0.003,
                                    }}
                                    whileHover={{ scale: 1.8, zIndex: 10 }}
                                    onMouseEnter={(e) => {
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      const tooltipWidth = 220; // Approximate tooltip width
                                      const viewportWidth = window.innerWidth;

                                      // Calculate x position - offset to the right of the dot
                                      let xPos = rect.right + 10;

                                      // If tooltip would go off right edge, show on left side
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
                                    className={`w-2.5 h-2.5 rounded-sm ${
                                      greenColors[day.level]
                                    } cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1`}
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
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4">
                      <span className="font-mono">Less</span>
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
                      <span className="font-mono">More</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
                      <div className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="text-xl font-bold font-mono text-primary">
                          {contributions.totalContributions}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                          Total
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-green-500/5 hover:bg-green-500/10 transition-colors">
                        <div className="text-xl font-bold font-mono text-green-500">
                          {totalCommits}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                          Commits
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 transition-colors">
                        <div className="text-xl font-bold font-mono text-orange-500">
                          {contributions.currentStreak}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                          Day Streak
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                        <div className="text-xl font-bold font-mono text-yellow-500">
                          {contributions.longestStreak}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">
                          Best Streak
                        </div>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    {contributions && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="text-center p-2 rounded bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
                          <div className="text-base font-bold font-mono text-purple-500">
                            {totalPRs}
                          </div>
                          <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">
                            PRs
                          </div>
                        </div>
                        <div className="text-center p-2 rounded bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                          <div className="text-base font-bold font-mono text-blue-500">
                            {totalIssues}
                          </div>
                          <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">
                            Issues
                          </div>
                        </div>
                        <div className="text-center p-2 rounded bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                          <div className="text-base font-bold font-mono text-cyan-500">
                            {totalReviews}
                          </div>
                          <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">
                            Reviews
                          </div>
                        </div>
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

            {/* Top 5 Languages Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isGalleryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 id="languages-heading" className="text-2xl font-bold">
                    Top 4 Languages
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Most used across {stats?.totalRepos || 0} repositories
                </p>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col">
                <div className="space-y-5 flex-1">
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
                          delay: 0.5 + index * 0.08,
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="group cursor-pointer"
                      >
                        {/* Language Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-5 h-5 rounded-full ring-2 ring-offset-2 ring-offset-card ring-primary/20 group-hover:ring-primary/40 transition-all shadow-lg"
                              style={{ backgroundColor: data.color }}
                              aria-hidden="true"
                            />
                            <span className="font-bold text-lg group-hover:text-primary transition-colors">
                              {language}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground font-mono bg-muted/50 group-hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors">
                              {data.count} {data.count === 1 ? "repo" : "repos"}
                            </span>
                            <span className="text-2xl font-bold font-mono text-primary group-hover:scale-110 transition-transform min-w-16 text-right">
                              {percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner relative">
                          <motion.div
                            className="h-full relative overflow-hidden"
                            style={{
                              background: `linear-gradient(90deg, ${data.color} 0%, ${data.color}DD 50%, ${data.color}AA 100%)`,
                            }}
                            initial={{ width: 0 }}
                            animate={
                              isGalleryInView ? { width: `${percentage}%` } : {}
                            }
                            transition={{
                              duration: 1.2,
                              delay: 0.6 + index * 0.1,
                              ease: "easeOut",
                            }}
                          >
                            {/* Shine Effect */}
                            <motion.div
                              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
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

                          {/* Percentage Label Inside Bar */}
                          {parseFloat(percentage as string) > 15 && (
                            <span className="absolute inset-0 flex items-center px-3 text-xs font-bold text-white drop-shadow-md">
                              {language}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="text-2xl font-bold font-mono text-primary">
                        {stats?.totalRepos || 0}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                        Total Repos
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="text-2xl font-bold font-mono text-primary">
                        {topLanguages.length}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wide">
                        Languages
                      </div>
                    </div>
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
                      className="w-full group/link bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
