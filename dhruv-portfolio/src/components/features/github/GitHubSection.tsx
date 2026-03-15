"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import {
  useGitHubUser,
  useGitHubRepos,
  useGitHubStats,
  useGitHubContributions,
  useGitHubContributedRepos,
} from "@/hooks/useGitHub";

// Import sub-components
import {
  ContributionHeatmap,
  LanguageDistribution,
  QuickStats,
  LoadingSkeleton,
  ErrorFallback,
  TerminalPrompt,
  MobileDesktopMessage,
  RepositoriesSection,
  ContributedRepositoriesSection,
} from "./components";

// ============================================================================
// Main Component
// ============================================================================

export function GitHubSection() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErrorObj,
  } = useGitHubUser();
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

  // FIX: Use useInView with fallback to ensure animations trigger on direct navigation
  // The issue was that on SSR, useInView might detect elements as "not in view" initially
  // and with once:true, they never animate. Adding a small delay or using fallback fixes this.
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "-100px",
  });

  // Fallback: If not in view after a short delay, trigger animations anyway
  // This fixes the issue where direct navigation to /github doesn't show components
  const [forceAnimate, setForceAnimate] = useState(false);

  useEffect(() => {
    // Faster fallback - 500ms is enough for initial render to complete
    const timer = setTimeout(() => setForceAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Use fallback animation state when useInView hasn't triggered
  const heroShouldAnimate = isHeroInView || forceAnimate;
  const galleryShouldAnimate = isGalleryInView || forceAnimate;

  const isLoading = userLoading || reposLoading;

  // Memoized derived data
  const topRepos = useMemo(
    () =>
      repos
        ?.filter((repo) => !repo.name.includes("Dhruv-413"))
        ?.sort((a, b) => b.stargazerCount - a.stargazerCount),
    [repos],
  );

  const languages = useMemo(
    () =>
      Array.from(
        new Set(
          repos
            ?.map((repo) => repo.language)
            .filter((lang): lang is string => Boolean(lang)),
        ),
      ).sort(),
    [repos],
  );

  const filterOptions = useMemo(
    () => ["All", ...languages.slice(0, 6)],
    [languages],
  );

  const filteredRepos = useMemo(
    () =>
      activeFilter === "All"
        ? topRepos
        : topRepos?.filter((repo) => repo.language === activeFilter),
    [activeFilter, topRepos],
  );

  const topLanguages = useMemo(
    () =>
      stats?.languages
        ? (Object.entries(stats.languages)
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 5) as [string, { count: number; color: string }][])
        : [],
    [stats],
  );

  // Stats values - with fallbacks for missing data
  const totalReposCount = user?.publicRepos ?? 0;
  const totalStarsCount = stats?.totalStars ?? 0;
  const uniqueLanguagesCount = languages.length;
  const totalCommits = contributions?.totalCommits ?? 0;
  const totalPRs = contributions?.totalPRs ?? 0;
  const totalIssues = contributions?.totalIssues ?? 0;
  const totalReviews = contributions?.totalReviews ?? 0;

  // Show error state with fallback if there's an error but we have some data
  const hasError = userError || userErrorObj;
  const hasData = user && (repos?.length ?? 0) > 0;

  // Show loading skeleton while fetching
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // If there's an error but we have no data, show error state
  if (hasError && !hasData) {
    return (
      <ErrorFallback
        error={userErrorObj}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Always render content - even with partial data or errors (we have fallbacks for missing data)
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
            animate={heroShouldAnimate ? { opacity: 1, y: 0 } : {}}
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
              isInView={heroShouldAnimate}
            />

            {/* Scroll Indicator - Using ui component */}
            <ScrollIndicator
              isInView={heroShouldAnimate}
              text="Explore Repositories"
              className="mt-0 pt-0"
            />
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
          <MobileDesktopMessage isInView={galleryShouldAnimate} />

          {/* Desktop: Contribution Heatmap & Language Distribution - Only on true desktops (1536px+) */}
          <div className="hidden 2xl:grid 2xl:grid-cols-[7fr_3fr] gap-8 mb-16">
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
            isInView={galleryShouldAnimate}
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
              isInView={galleryShouldAnimate}
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
