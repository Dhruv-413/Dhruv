"use client";

import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Clock,
  ExternalLink,
  Rocket,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getColorFromString } from "@/lib/helpers";

export interface RepoCardProps {
  /** Repository name */
  name: string;
  /** Repository description */
  description: string | null;
  /** Repository URL */
  url: string;
  /** Star count */
  stargazerCount: number;
  /** Fork count */
  forkCount: number;
  /** Primary language */
  language: string | null;
  /** Language color */
  languageColor: string | null;
  /** Last update time */
  updatedAt: string;
  /** Topics/tags */
  topics?: string[];
  /** Owner/organization name */
  owner?: string;
  /** Whether the card is currently active/hovered */
  isActive?: boolean;
  /** Callback when mouse enters */
  onMouseEnter?: () => void;
  /** Callback when mouse leaves */
  onMouseLeave?: () => void;
  /** Animation delay */
  animationDelay?: number;
  /** Whether the section is in view */
  isInView?: boolean;
  /** Whether to show expanded topics */
  showAllTopics?: boolean;
  /** Callback to toggle topics expansion */
  onToggleTopics?: () => void;
  /** Additional className */
  className?: string;
  /** Variant style */
  variant?: "default" | "contributed";
}

/**
 * Reusable Repository Card component
 * Used in GitHubSection for both owned and contributed repositories
 */
export function RepoCard({
  name,
  description,
  url,
  stargazerCount,
  forkCount,
  language,
  languageColor,
  updatedAt,
  topics = [],
  owner,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  animationDelay = 0,
  isInView = true,
  showAllTopics = false,
  onToggleTopics,
  className,
  variant = "default",
}: RepoCardProps) {
  const repoColor = getColorFromString(name);
  const isDeployed = topics?.includes("deployed") || topics?.includes("live");

  const displayedTopics = showAllTopics ? topics : topics.slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: animationDelay }}
      whileHover={{ scale: 1.02, y: -4 }}
      role="listitem"
      className={cn("group relative", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        className={cn(
          "p-5 h-full bg-card border transition-all duration-500 flex flex-col relative overflow-hidden",
          variant === "contributed" && "bg-card/50 backdrop-blur-sm",
          isActive
            ? "border-primary shadow-2xl shadow-white/15"
            : "border-border/50 hover:shadow-xl hover:shadow-white/10"
        )}
      >
        {/* Animated Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-opacity duration-500",
            isActive ? "opacity-15" : "opacity-0 group-hover:opacity-10"
          )}
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
        {isDeployed && variant === "default" && (
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
            {owner && (
              <div className="text-xs text-muted-foreground font-mono truncate">
                {owner}
              </div>
            )}
            <h3 className="font-bold text-base transition-colors truncate">
              {name}
            </h3>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="relative text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Topics/Tags */}
        {topics.length > 0 && (
          <div className="relative mb-4">
            <div className="flex flex-wrap gap-1.5">
              {displayedTopics.map((topic) => (
                <motion.span
                  key={topic}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-2 py-1 text-[10px] font-mono rounded-md transition-all cursor-default border bg-primary/10 text-muted-foreground border-border/50 hover:border-primary/40"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
            {topics.length > 4 && onToggleTopics && (
              <button
                onClick={onToggleTopics}
                className="text-[10px] font-mono mt-2 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showAllTopics ? "Show fewer topics" : "Show all topics"
                }
              >
                {showAllTopics ? (
                  "Show less"
                ) : (
                  <>
                    +{topics.length - 4} more
                    <motion.span
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3 mb-3">
          {language && (
            <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1.5 rounded-lg">
              <div
                className="w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-card ring-border/50"
                style={{ backgroundColor: languageColor || "#666" }}
              />
              <span className="font-mono text-[11px] font-medium">
                {language}
              </span>
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

        {/* Updated Time */}
        <div className="relative flex items-center gap-1.5 text-[10px] text-muted-foreground mb-3">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>Updated</span>
          <time dateTime={updatedAt} className="font-mono">
            {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
          </time>
        </div>

        {/* CTA Buttons */}
        <div className="relative flex gap-2 mb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            aria-label={`View ${name} source code on GitHub`}
          >
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "w-full text-xs group/btn transition-all",
                isActive && "border-primary/50 hover:bg-primary/5"
              )}
            >
              <Github className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
              View Code
            </Button>
          </a>
          {variant === "default" &&
            (isDeployed ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                aria-label={`Open ${name} live demo`}
              >
                <Button
                  size="sm"
                  className="w-full text-xs group/btn shadow-lg bg-primary hover:bg-primary/90 shadow-primary/20"
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
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                aria-label={`View ${name} details`}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "w-full text-xs transition-all",
                    isActive && "border-primary/30"
                  )}
                >
                  <ExternalLink
                    className="h-3.5 w-3.5 mr-1.5"
                    aria-hidden="true"
                  />
                  Details
                </Button>
              </a>
            ))}
          {variant === "contributed" && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full text-xs transition-all",
                  isActive && "border-primary/50 hover:bg-primary/5"
                )}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Repository
              </Button>
            </a>
          )}
        </div>

        {/* Code-style Footer */}
        <div className="relative pt-3 border-t border-border/50 font-mono text-[10px] text-muted-foreground">
          <span style={{ color: repoColor }}>{"// "}</span>
          <span className="italic">
            {language ? `Built with ${language}` : "Open source project"}
          </span>
        </div>
      </Card>

      {/* Top-Right Corner Accent */}
      <div
        className={cn(
          "absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300",
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        )}
        style={{ backgroundColor: repoColor }}
      />
    </motion.article>
  );
}
