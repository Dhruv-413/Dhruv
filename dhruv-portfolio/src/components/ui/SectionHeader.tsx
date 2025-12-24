"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  /** Terminal prompt path (e.g., "~/projects") */
  terminalPath: string;
  /** Main title text */
  title: string;
  /** Optional description text */
  description?: React.ReactNode;
  /** Whether the section is in view (for animations) */
  isInView?: boolean;
  /** Additional className for customization */
  className?: string;
  /** Animation delay offset */
  animationDelay?: number;
  /** Title heading level for accessibility */
  headingId?: string;
}

/**
 * Reusable Section Header with Terminal Prompt
 * Used across: Hero, Projects, Skills, Timeline, GitHub sections
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   terminalPath="~/projects"
 *   title="Building the Future"
 *   description={<>A curated collection of <span className="text-primary">projects</span></>}
 *   isInView={isInView}
 * />
 * ```
 */
export function SectionHeader({
  terminalPath,
  title,
  description,
  isInView = true,
  className,
  animationDelay = 0,
  headingId,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-4xl mx-auto text-center", className)}>
      {/* Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: animationDelay }}
        className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center"
        aria-label="Terminal prompt"
      >
        <Terminal
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary"
          aria-hidden="true"
        />
        <span className="text-primary font-mono text-xs sm:text-sm">
          {terminalPath}
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-primary font-mono text-xs sm:text-sm"
          aria-hidden="true"
        >
          _
        </motion.span>
      </motion.div>

      {/* Title */}
      <motion.h1
        id={headingId}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: animationDelay + 0.1 }}
      >
        <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/**
 * Smaller section header for sub-sections
 */
export function SubSectionHeader({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-purple-500/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
