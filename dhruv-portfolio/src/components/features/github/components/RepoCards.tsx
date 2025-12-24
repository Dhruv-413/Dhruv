"use client";

import { motion } from "framer-motion";
import {
  GitFork,
  Star,
  Github,
  ExternalLink,
  Clock,
  Rocket,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GitHubRepo, ContributedRepository } from "@/hooks/useGitHub";
import { formatDistanceToNow } from "date-fns";
import { getColorFromString } from "@/lib/helpers";

// ============================================================================
// Shared Types
// ============================================================================

interface BaseRepoCardProps {
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
  isInView: boolean;
}

// ============================================================================
// Repository Card (for own repos)
// ============================================================================

interface RepositoryCardProps extends BaseRepoCardProps {
  repo: GitHubRepo;
  ownerLogin: string;
  expandedProject: string | null;
  onExpandProject: (name: string | null) => void;
}

export function RepositoryCard({
  repo,
  ownerLogin,
  isActive,
  onHover,
  onLeave,
  expandedProject,
  onExpandProject,
  index,
  isInView,
}: RepositoryCardProps) {
  const repoColor = getColorFromString(repo.name);
  // Use homepageUrl to determine if repo has a live site
  const hasLiveUrl = Boolean(
    repo.homepageUrl && repo.homepageUrl.trim() !== ""
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      role="listitem"
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card
        className={`p-5 h-full bg-card border transition-all duration-500 flex flex-col relative overflow-hidden ${
          isActive
            ? "border-primary shadow-2xl shadow-white/15"
            : "border-border/50 hover:shadow-xl hover:shadow-white/10"
        }`}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isActive ? "opacity-15" : "opacity-0 group-hover:opacity-10"
          }`}
          style={{
            background: `linear-gradient(135deg, ${repoColor}40 0%, transparent 60%)`,
          }}
        />

        {/* Scan Line Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ backgroundColor: `${repoColor}80` }}
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Deployment Badge */}
        {hasLiveUrl && (
          <div className="absolute top-0 right-0 bg-linear-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1.5 shadow-lg z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        )}

        {/* Owner & Repo Name */}
        <div className="relative flex items-start gap-3 mb-3">
          <motion.div
            className="p-2 rounded-lg transition-colors shrink-0"
            style={{ backgroundColor: `${repoColor}20` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Github className="h-4 w-4" style={{ color: repoColor }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground font-mono truncate">
              {ownerLogin}
            </div>
            <h3 className="font-bold text-base transition-colors truncate">
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

        {/* Topics/Tags with Progressive Disclosure */}
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
                  className="px-2 py-1 text-[10px] font-mono rounded-md transition-all cursor-default border bg-primary/10 text-muted-foreground border-border/50 hover:border-primary/40"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
            {repo.topics.length > 4 && expandedProject !== repo.name && (
              <button
                onClick={() => onExpandProject(repo.name)}
                className="text-[10px] font-mono mt-2 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
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
            {expandedProject === repo.name && repo.topics.length > 4 && (
              <button
                onClick={() => onExpandProject(null)}
                className="text-[10px] font-mono mt-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Show fewer topics"
              >
                Show less
              </button>
            )}
          </div>
        )}

        {/* Stats Row */}
        <RepoStats
          language={repo.language}
          languageColor={repo.languageColor}
          stargazerCount={repo.stargazerCount}
          forkCount={repo.forkCount}
        />

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

        {/* CTA Buttons */}
        <RepoButtons
          repoUrl={repo.url}
          repoName={repo.name}
          homepageUrl={repo.homepageUrl}
          isActive={isActive}
        />

        {/* Code-style Footer */}
        <div className="relative pt-3 border-t border-border/50 font-mono text-[10px] text-muted-foreground">
          <span style={{ color: repoColor }}>{"// "}</span>
          <span className="italic">
            {repo.language
              ? `Built with ${repo.language}`
              : "Open source project"}
          </span>
        </div>
      </Card>

      {/* Top-Right Corner Accent */}
      <div
        className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ backgroundColor: repoColor }}
      />
    </motion.article>
  );
}

// ============================================================================
// Contributed Repository Card
// ============================================================================

interface ContributedRepoCardProps extends BaseRepoCardProps {
  repo: ContributedRepository;
}

export function ContributedRepoCard({
  repo,
  isActive,
  onHover,
  onLeave,
  index,
  isInView,
}: ContributedRepoCardProps) {
  const repoColor = getColorFromString(repo.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.3,
        delay: 0.55 + index * 0.05,
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card
        className={`p-5 bg-card/50 backdrop-blur-sm transition-all duration-300 h-full flex flex-col relative overflow-hidden ${
          isActive
            ? "border-primary shadow-2xl shadow-white/15"
            : "border-border/50 hover:shadow-xl hover:shadow-white/10"
        }`}
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isActive ? "opacity-15" : "opacity-0 group-hover:opacity-10"
          }`}
          style={{
            background: `linear-gradient(135deg, ${repoColor}40 0%, transparent 60%)`,
          }}
        />

        {/* Scan Line Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ backgroundColor: `${repoColor}80` }}
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Owner & Repo Name */}
        <div className="relative flex items-start gap-3 mb-3">
          <motion.div
            className="p-2 rounded-lg transition-colors shrink-0"
            style={{ backgroundColor: `${repoColor}20` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Github className="h-4 w-4" style={{ color: repoColor }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground font-mono truncate">
              {repo.owner}
            </div>
            <h3 className="font-bold text-base truncate transition-colors">
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
        <RepoStats
          language={repo.language}
          languageColor={repo.languageColor}
          stargazerCount={repo.stargazerCount}
          forkCount={repo.forkCount}
        />

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
            className={`w-full group/btn text-xs transition-all ${
              isActive ? "border-primary/50 hover:bg-primary/5" : ""
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            View Repository
          </Button>
        </a>
      </Card>

      {/* Top-Right Corner Accent */}
      <div
        className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ backgroundColor: repoColor }}
      />
    </motion.div>
  );
}

// ============================================================================
// Shared Sub-Components
// ============================================================================

interface RepoStatsProps {
  language: string | null;
  languageColor: string | null;
  stargazerCount: number;
  forkCount: number;
}

function RepoStats({
  language,
  languageColor,
  stargazerCount,
  forkCount,
}: RepoStatsProps) {
  return (
    <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3 mb-3">
      {language && (
        <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg">
          <div
            className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-card ring-border/50"
            style={{
              backgroundColor: languageColor || "#666",
            }}
          />
          <span className="font-mono text-[11px] font-medium">{language}</span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
          <Star className="h-3.5 w-3.5" />
          <span className="font-mono font-medium">{stargazerCount}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
          <GitFork className="h-3.5 w-3.5" />
          <span className="font-mono font-medium">{forkCount}</span>
        </div>
      </div>
    </div>
  );
}

interface RepoButtonsProps {
  repoUrl: string;
  repoName: string;
  homepageUrl: string | null;
  isActive: boolean;
}

function RepoButtons({
  repoUrl,
  repoName,
  homepageUrl,
  isActive,
}: RepoButtonsProps) {
  const hasLiveUrl = Boolean(homepageUrl && homepageUrl.trim() !== "");

  return (
    <div className="relative flex gap-2 mb-3">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={hasLiveUrl ? "flex-1" : "w-full"}
        aria-label={`View ${repoName} source code on GitHub`}
      >
        <Button
          size="sm"
          variant="outline"
          className={`w-full text-xs group/btn transition-all ${
            isActive ? "border-primary/50 hover:bg-primary/5" : ""
          }`}
        >
          <Github className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
          Code
        </Button>
      </a>
      {hasLiveUrl && (
        <a
          href={homepageUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          aria-label={`Open ${repoName} live site`}
        >
          <Button
            size="sm"
            className="w-full text-xs group/btn shadow-lg bg-primary hover:bg-primary/90 shadow-primary/20"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Live
            <Rocket
              className="h-3 w-3 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </Button>
        </a>
      )}
    </div>
  );
}
