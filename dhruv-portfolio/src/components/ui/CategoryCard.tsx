"use client";

import { motion } from "framer-motion";
import { Braces } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScanLineEffect } from "./ScanLineEffect";

export interface CategoryCardProps {
  /** Card title */
  title: string;
  /** Category color (hex) */
  color?: string;
  /** Icon to display - accepts any React component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Number of items in category */
  itemCount?: number;
  /** Whether the card is currently active/hovered */
  isActive?: boolean;
  /** Whether the card is in view for animations */
  isInView?: boolean;
  /** Animation delay */
  animationDelay?: number;
  /** Hover handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Children content (skills, technologies, etc.) */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Reusable Category Card component
 * Used across: Skills section (skill categories), Timeline (type cards)
 *
 * @example
 * ```tsx
 * <CategoryCard
 *   title="Frontend"
 *   color="#3b82f6"
 *   icon={Code}
 *   itemCount={5}
 *   isActive={activeCategory === "Frontend"}
 * >
 *   <SkillBadges skills={["React", "Next.js"]} />
 * </CategoryCard>
 * ```
 */
export function CategoryCard({
  title,
  color = "#3b82f6",
  icon: Icon,
  itemCount,
  isActive = false,
  isInView = true,
  animationDelay = 0,
  onMouseEnter,
  onMouseLeave,
  children,
  footer,
  className,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn("group relative touch-manipulation", className)}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative h-full bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border transition-all duration-500 active:scale-[0.98]",
          isActive
            ? "border-primary shadow-2xl shadow-primary/20 scale-105"
            : "border-border hover:border-primary/50"
        )}
      >
        {/* Animated Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500",
            isActive ? "opacity-10" : "opacity-0"
          )}
          style={{
            background: `linear-gradient(135deg, ${color}40, transparent)`,
          }}
        />

        {/* Scan Line Effect */}
        <ScanLineEffect color={color} isActive={isActive} />

        {/* Header with Icon */}
        <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
          {Icon && (
            <motion.div
              className="p-2 sm:p-2.5 lg:p-3 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ color }}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
            </motion.div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-xl mb-0.5 sm:mb-1 truncate">
              {title}
            </h3>
            {itemCount !== undefined && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Braces className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                  {itemCount} technologies
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="relative pt-3 sm:pt-4 border-t border-border/50 font-mono text-[10px] sm:text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div
        className={cn(
          "absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity",
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-100"
        )}
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/**
 * Code-style footer content
 */
export function CategoryCardFooter({ text }: { text?: string }) {
  return (
    <>
      <span className="text-primary">{"// "}</span>
      <span className="italic">{text || "Production-ready stack"}</span>
    </>
  );
}

export default CategoryCard;
