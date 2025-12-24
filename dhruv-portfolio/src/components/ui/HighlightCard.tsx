"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScanLineEffect } from "./ScanLineEffect";

export interface HighlightCardProps {
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Gradient color (hex or color name) */
  color?: string;
  /** Whether the card is in view */
  isInView?: boolean;
  /** Animation delay */
  animationDelay?: number;
  /** Additional className */
  className?: string;
}

/**
 * Reusable Highlight Card component
 * Used for feature highlights, achievements, and skill summaries
 *
 * @example
 * ```tsx
 * <HighlightCard
 *   icon={Briefcase}
 *   title="Professional Experience"
 *   description="5+ years in software development"
 *   color="#3b82f6"
 *   animationDelay={0.1}
 * />
 * ```
 */
export function HighlightCard({
  icon: Icon,
  title,
  description,
  color = "#3b82f6",
  isInView = true,
  animationDelay = 0,
  className,
}: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: animationDelay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn("group relative", className)}
    >
      <div className="relative p-4 sm:p-5 bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 overflow-hidden">
        {/* Animated Gradient Background */}
        <div
          className="absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-10"
          style={{
            background: `linear-gradient(135deg, ${color}40, transparent)`,
          }}
        />

        {/* Scan line on hover */}
        <ScanLineEffect
          color={color}
          isActive={false}
          className="group-hover:opacity-100 opacity-0"
        />

        <div className="relative flex items-start gap-3 sm:gap-4">
          <motion.div
            className="p-2 sm:p-2.5 rounded-lg bg-primary/10 shrink-0"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Top-Right Corner Accent */}
      <div
        className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/**
 * Grid wrapper for highlight cards
 */
export function HighlightCardGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>{children}</div>
  );
}

export default HighlightCard;
