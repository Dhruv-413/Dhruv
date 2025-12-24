"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface BadgeProps {
  /** Badge text */
  label: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Badge color (hex) */
  color?: string;
  /** Badge variant */
  variant?: "default" | "outline" | "pill" | "tech";
  /** Whether the badge is clickable */
  clickable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Whether the badge is in view for animations */
  isInView?: boolean;
  /** Animation delay */
  animationDelay?: number;
  /** Additional className */
  className?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

/**
 * Reusable Badge/Chip component
 * Used across: Skills (technology badges), Projects (tech stack), Timeline (tech used)
 *
 * @example
 * ```tsx
 * <Badge label="React" icon={<ReactIcon />} variant="tech" />
 * <Badge label="Featured" variant="pill" color="#f59e0b" />
 * ```
 */
export function Badge({
  label,
  icon,
  color,
  variant = "default",
  clickable = false,
  onClick,
  isInView = true,
  animationDelay = 0,
  className,
  ariaLabel,
}: BadgeProps) {
  const variantClasses = {
    default:
      "px-2 sm:px-2.5 py-1 sm:py-1.5 bg-muted/80 backdrop-blur-sm rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-border hover:border-primary/50",
    outline:
      "px-2.5 sm:px-3 py-1 sm:py-1.5 bg-transparent rounded-full text-xs sm:text-sm font-medium border border-border/50 hover:border-primary/30",
    pill: "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium",
    tech: "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 lg:px-3 py-1.5 sm:py-2 bg-muted/80 backdrop-blur-sm rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-border hover:border-primary/50",
  };

  const Component = clickable ? motion.button : motion.div;

  return (
    <Component
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.3,
        delay: animationDelay,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={
        clickable
          ? {
              scale: 1.1,
              y: -3,
              boxShadow: color ? `0 4px 12px ${color}40` : undefined,
            }
          : undefined
      }
      onClick={onClick}
      className={cn(
        "transition-all",
        variantClasses[variant],
        clickable && "cursor-pointer touch-manipulation active:scale-95",
        className
      )}
      style={
        variant === "pill" && color
          ? { backgroundColor: `${color}20`, color }
          : undefined
      }
      role={clickable ? "button" : undefined}
      aria-label={ariaLabel || label}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0",
            clickable && "group-hover/skill:scale-110 transition-transform"
          )}
        >
          {icon}
        </span>
      )}
      <span
        className={cn(
          clickable && "group-hover/skill:text-primary transition-colors",
          variant === "tech" && "truncate"
        )}
      >
        {label}
      </span>
    </Component>
  );
}

/**
 * Badge Group container
 */
export function BadgeGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap gap-1.5 sm:gap-2", className)}
      role="list"
    >
      {children}
    </div>
  );
}

/**
 * Technical Credibility Badge - smaller variant
 */
export interface CredibilityBadgeProps {
  label: string;
  icon: LucideIcon;
  color?: string;
  isInView?: boolean;
  animationDelay?: number;
  className?: string;
}

export function CredibilityBadge({
  label,
  icon: Icon,
  color = "text-primary",
  isInView = true,
  animationDelay = 0,
  className,
}: CredibilityBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: animationDelay }}
      whileHover={{ scale: 1.1, y: -2 }}
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full",
        className
      )}
    >
      <Icon className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", color)} />
      <span className="text-[10px] sm:text-xs font-mono text-foreground/80">
        {label}
      </span>
    </motion.div>
  );
}

export default Badge;
