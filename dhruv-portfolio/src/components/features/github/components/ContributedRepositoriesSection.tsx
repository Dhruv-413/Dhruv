/**
 * Contributed Repositories Section Component
 * Displays repositories the user has contributed to
 */

import { GitFork, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ContributedRepository } from "@/types/github";
import { ContributedRepoCard } from "./RepoCards";

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

export function ContributedRepositoriesSection({
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
