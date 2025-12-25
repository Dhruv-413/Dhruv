"use client";

import { motion, useInView } from "framer-motion";
import {
  GitFork,
  ExternalLink,
  Github,
  Terminal,
  Sparkles,
  Folder,
  Monitor,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import {
  useGitHubUser,
  useGitHubRepos,
  useGitHubStats,
  useGitHubContributions,
  useGitHubContributedRepos,
  type GitHubRepo,
  type ContributedRepository,
} from "@/hooks/useGitHub";
import { useState, useRef, useMemo } from "react";

// Import sub-components
import {
  ContributionHeatmap,
  LanguageDistribution,
  RepositoryCard,
  ContributedRepoCard,
  QuickStats,
} from "./components";

// ============================================================================
// Main Component
// ============================================================================

export function GitHubSection() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const { data: stats } = useGitHubStats();
  const { data: contributions } = useGitHubContributions();
  const { data: contributedRepos } = useGitHubContributedRepos();

  // UI State
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [contributedRepoFilter, setContributedRepoFilter] =
    useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [activeContributedRepo, setActiveContributedRepo] = useState<
    string | null
  >(null);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [showAllContributedRepos, setShowAllContributedRepos] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });

  const isLoading = userLoading || reposLoading;

  // Memoized derived data
  const topRepos = useMemo(
    () =>
      repos
        ?.filter((repo) => !repo.name.includes("Dhruv-413"))
        ?.sort((a, b) => b.stargazerCount - a.stargazerCount),
    [repos]
  );

  const languages = useMemo(
    () =>
      Array.from(
        new Set(
          repos
            ?.map((repo) => repo.language)
            .filter((lang): lang is string => Boolean(lang))
        )
      ).sort(),
    [repos]
  );

  const filterOptions = useMemo(
    () => ["All", ...languages.slice(0, 6)],
    [languages]
  );

  const filteredRepos = useMemo(
    () =>
      activeFilter === "All"
        ? topRepos
        : topRepos?.filter((repo) => repo.language === activeFilter),
    [activeFilter, topRepos]
  );

  const topLanguages = useMemo(
    () =>
      stats?.languages
        ? (Object.entries(stats.languages)
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 5) as [string, { count: number; color: string }][])
        : [],
    [stats]
  );

  // Stats values
  const totalReposCount = user?.publicRepos || 0;
  const totalStarsCount = stats?.totalStars || 0;
  const uniqueLanguagesCount = languages.length;
  const totalCommits = contributions?.totalCommits || 0;
  const totalPRs = contributions?.totalPRs || 0;
  const totalIssues = contributions?.totalIssues || 0;
  const totalReviews = contributions?.totalReviews || 0;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        id="github"
        aria-labelledby="github-heading"
        className="min-h-screen relative overflow-hidden flex items-center"
        ref={heroRef}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Terminal Prompt */}
            <TerminalPrompt path="~/github" />

            {/* Title */}
            <h1
              id="github-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Open Source Journey
              </span>
            </h1>

            {/* Description */}
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

            {/* Quick Stats */}
            <QuickStats
              totalRepos={totalReposCount}
              totalStars={totalStarsCount}
              uniqueLanguages={uniqueLanguagesCount}
              contributions={contributions}
              isInView={isHeroInView}
            />

            {/* Scroll Indicator */}
            <ScrollIndicator isInView={isHeroInView} />
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="pb-12 sm:pb-16 lg:pb-20 relative"
        ref={galleryRef}
        aria-labelledby="contribution-heading"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Mobile Message */}
          <MobileDesktopMessage isInView={isGalleryInView} />

          {/* Desktop: Contribution Heatmap & Language Distribution */}
          <div className="hidden lg:grid lg:grid-cols-[3fr_2fr] gap-8 mb-16">
            <ContributionHeatmap
              contributions={contributions}
              totalCommits={totalCommits}
              totalPRs={totalPRs}
              totalIssues={totalIssues}
              totalReviews={totalReviews}
            />
            <LanguageDistribution stats={stats} topLanguages={topLanguages} />
          </div>

          {/* My Repositories Section */}
          <RepositoriesSection
            filterOptions={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            repos={filteredRepos}
            topRepos={topRepos}
            isInView={isGalleryInView}
            showAll={showAllRepos}
            onToggleShowAll={() => setShowAllRepos(!showAllRepos)}
            activeRepo={activeRepo}
            onRepoHover={setActiveRepo}
            expandedProject={expandedProject}
            onExpandProject={setExpandedProject}
            ownerLogin={user?.login || "Dhruv-413"}
          />

          {/* Contributed Repositories Section */}
          {contributedRepos && contributedRepos.repositories.length > 0 && (
            <ContributedRepositoriesSection
              contributedRepos={contributedRepos}
              isInView={isGalleryInView}
              activeFilter={contributedRepoFilter}
              onFilterChange={setContributedRepoFilter}
              showAll={showAllContributedRepos}
              onToggleShowAll={() =>
                setShowAllContributedRepos(!showAllContributedRepos)
              }
              activeRepo={activeContributedRepo}
              onRepoHover={setActiveContributedRepo}
            />
          )}
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

function LoadingSkeleton() {
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

function TerminalPrompt({ path }: { path: string }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6"
      aria-label="Terminal prompt"
    >
      <Terminal
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary"
        aria-hidden="true"
      />
      <span className="text-primary font-mono text-xs sm:text-sm">{path}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-primary font-mono text-xs sm:text-sm"
        aria-hidden="true"
      >
        _
      </motion.span>
    </div>
  );
}

function ScrollIndicator({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-col items-center gap-2 mt-8 pt-8"
    >
      <span className="text-sm text-muted-foreground font-mono">
        Explore Repositories
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Sparkles className="mt-5 h-5 w-5 text-primary" />
      </motion.div>
    </motion.div>
  );
}

function MobileDesktopMessage({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:hidden mb-12"
    >
      <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Monitor className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            View Detailed Statistics on Desktop
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            For the best experience viewing my contribution heatmap and detailed
            language statistics, please visit on a larger screen or check out my
            GitHub profile directly.
          </p>
          <a
            href={SITE_CONFIG.links.github}
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
  );
}

// ============================================================================
// Repositories Section
// ============================================================================

interface RepositoriesSectionProps {
  filterOptions: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  repos: GitHubRepo[] | undefined;
  topRepos: GitHubRepo[] | undefined;
  isInView: boolean;
  showAll: boolean;
  onToggleShowAll: () => void;
  activeRepo: string | null;
  onRepoHover: (name: string | null) => void;
  expandedProject: string | null;
  onExpandProject: (name: string | null) => void;
  ownerLogin: string;
}

function RepositoriesSection({
  filterOptions,
  activeFilter,
  onFilterChange,
  repos,
  topRepos,
  isInView,
  showAll,
  onToggleShowAll,
  activeRepo,
  onRepoHover,
  expandedProject,
  onExpandProject,
  ownerLogin,
}: RepositoriesSectionProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
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

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
          role="group"
          aria-label="Language filter buttons"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onFilterChange(filter);
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
          <span className="font-mono text-primary">{repos?.length || 0}</span>{" "}
          repositories
        </p>
      </motion.div>

      {/* Repository Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        role="list"
        aria-label="Repository cards"
      >
        {repos?.slice(0, showAll ? undefined : 6).map((repo, index) => (
          <RepositoryCard
            key={repo.name}
            repo={repo}
            ownerLogin={ownerLogin}
            isActive={activeRepo === repo.name}
            onHover={() => onRepoHover(repo.name)}
            onLeave={() => onRepoHover(null)}
            expandedProject={expandedProject}
            onExpandProject={onExpandProject}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* View More Button */}
      {repos && repos.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center mt-8 mb-12"
        >
          <Button
            variant="outline"
            onClick={onToggleShowAll}
            className="group font-mono text-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                View {repos.length - 6} More
              </>
            )}
          </Button>
        </motion.div>
      )}
    </>
  );
}

// ============================================================================
// Contributed Repositories Section
// ============================================================================

interface ContributedRepositoriesSectionProps {
  contributedRepos: {
    totalCount: number;
    repositories: ContributedRepository[];
  };
  isInView: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showAll: boolean;
  onToggleShowAll: () => void;
  activeRepo: string | null;
  onRepoHover: (url: string | null) => void;
}

function ContributedRepositoriesSection({
  contributedRepos,
  isInView,
  activeFilter,
  onFilterChange,
  showAll,
  onToggleShowAll,
  activeRepo,
  onRepoHover,
}: ContributedRepositoriesSectionProps) {
  const filteredContribRepos = contributedRepos.repositories.filter(
    (repo) => activeFilter === "All" || repo.language === activeFilter
  );

  const languageOptions = Array.from(
    new Set(
      contributedRepos.repositories
        .map((r) => r.language)
        .filter((lang): lang is string => Boolean(lang))
    )
  ).slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 px-2">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="p-2 sm:p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-blue-300/20">
            <GitFork className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Open Source Contributions
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          <span className="text-primary font-semibold">
            {contributedRepos.totalCount}
          </span>{" "}
          repositories across GitHub — Active participation in open source
          community
        </p>
      </div>

      {/* Language Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl mx-auto"
      >
        <Button
          variant={activeFilter === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("All")}
          className={`font-mono text-xs transition-all ${
            activeFilter === "All"
              ? "shadow-lg shadow-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          All ({contributedRepos.repositories.length})
        </Button>
        {languageOptions.map((lang) => {
          const count = contributedRepos.repositories.filter(
            (r) => r.language === lang
          ).length;
          return (
            <Button
              key={lang}
              variant={activeFilter === lang ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(lang)}
              className={`font-mono text-xs transition-all ${
                activeFilter === lang
                  ? "shadow-lg shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              {lang} ({count})
            </Button>
          );
        })}
      </motion.div>

      {/* Contributed Repositories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {filteredContribRepos
          .slice(0, showAll ? undefined : 6)
          .map((repo, index) => (
            <ContributedRepoCard
              key={repo.url}
              repo={repo}
              isActive={activeRepo === repo.url}
              onHover={() => onRepoHover(repo.url)}
              onLeave={() => onRepoHover(null)}
              index={index}
              isInView={isInView}
            />
          ))}
      </div>

      {/* View More Button */}
      {filteredContribRepos.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <Button
            variant="outline"
            onClick={onToggleShowAll}
            className="group font-mono text-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                View {filteredContribRepos.length - 6} More
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
