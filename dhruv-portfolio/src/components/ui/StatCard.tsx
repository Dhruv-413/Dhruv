"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
  fill?: boolean;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

/**
 * Reusable StatCard component following DRY principle
 * Used across: Hero, Projects, Skills, Timeline, GitHub sections
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  color = "#3b82f6",
  fill = false,
  isActive = false,
  onMouseEnter,
  onMouseLeave,
  className,
  size = "md",
  ariaLabel,
}: StatCardProps) {
  const sizeClasses = {
    sm: {
      container: "p-2 sm:p-3",
      icon: "h-4 w-4 sm:h-5 sm:w-5",
      iconWrapper: "p-1.5 sm:p-2",
      value: "text-lg sm:text-xl",
      label: "text-[9px] sm:text-[10px]",
      accent: "w-5 h-5 sm:w-6 sm:h-6",
    },
    md: {
      container: "p-3 sm:p-4",
      icon: "h-5 w-5 sm:h-6 sm:w-6",
      iconWrapper: "p-2 sm:p-2.5",
      value: "text-xl sm:text-2xl",
      label: "text-[10px] sm:text-xs",
      accent: "w-6 h-6 sm:w-8 sm:h-8",
    },
    lg: {
      container: "p-4 sm:p-5",
      icon: "h-6 w-6 sm:h-7 sm:w-7",
      iconWrapper: "p-2.5 sm:p-3",
      value: "text-2xl sm:text-3xl",
      label: "text-xs sm:text-sm",
      accent: "w-7 h-7 sm:w-9 sm:h-9",
    },
  };

  const sizes = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn("group relative", className)}
    >
      <div
        className={cn(
          "relative bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300",
          sizes.container,
          isActive
            ? "border-primary shadow-2xl shadow-white/15"
            : "border-border/50 hover:border-primary/30"
        )}
        role="listitem"
        aria-label={ariaLabel || `${value} ${label}`}
      >
        {/* Animated Gradient Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-opacity duration-500",
            isActive ? "opacity-15" : "opacity-0 group-hover:opacity-10"
          )}
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, transparent 60%)`,
          }}
        />

        {/* Scan Line Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ backgroundColor: `${color}60` }}
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className="relative flex flex-col items-center gap-1.5 sm:gap-2">
          <motion.div
            className={cn("rounded-lg transition-colors", sizes.iconWrapper)}
            style={{ backgroundColor: `${color}20` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon
              className={cn(sizes.icon, fill && "fill-current")}
              style={{ color }}
              aria-hidden="true"
            />
          </motion.div>
          <div className="text-center">
            <div className={cn("font-bold font-mono", sizes.value)}>
              {value}
            </div>
            <div className={cn("text-muted-foreground", sizes.label)}>
              {label}
            </div>
          </div>
        </div>
      </div>

      {/* Top-Right Corner Accent */}
      <div
        className={cn(
          "absolute -top-1 -right-1 rounded-full blur-xl transition-opacity duration-300",
          sizes.accent,
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        )}
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/**
 * StatCard Grid wrapper for consistent layout
 */
export function StatCardGrid({
  children,
  columns = 4,
  className,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}) {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div
      className={cn("grid gap-3 sm:gap-4", gridClasses[columns], className)}
      role="list"
    >
      {children}
    </div>
  );
}
