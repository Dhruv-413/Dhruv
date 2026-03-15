/**
 * Repositories Section Component
 * Displays user's own GitHub repositories with filtering
 */

import { Folder, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { GitHubRepo } from "@/types/github";
import { RepositoryCard } from "./RepoCards";

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

export function RepositoriesSection({
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

        {(!repos || repos.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No repositories found.</p>
          </div>
        )}
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
