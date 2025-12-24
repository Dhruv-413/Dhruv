"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScrollIndicatorProps {
  /** Text to display above the arrow */
  text?: string;
  /** Target element ID to scroll to */
  targetId?: string;
  /** Whether the indicator is in view for animations */
  isInView?: boolean;
  /** Animation delay */
  animationDelay?: number;
  /** Additional className */
  className?: string;
}

/**
 * Reusable Scroll Indicator component
 * Animated bouncing arrow with optional text
 * Used across: Hero, Projects, GitHub sections
 *
 * @example
 * ```tsx
 * <ScrollIndicator
 *   text="Scroll to explore"
 *   targetId="project-gallery"
 *   isInView={isInView}
 * />
 * ```
 */
export function ScrollIndicator({
  text = "Scroll to explore",
  targetId,
  isInView = true,
  animationDelay = 1,
  className,
}: ScrollIndicatorProps) {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: animationDelay }}
      className={cn(
        "hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
        onClick={handleClick}
        aria-label={`Scroll down to ${targetId || "next section"}`}
        type="button"
      >
        <span className="text-xs font-mono">{text}</span>
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

export default ScrollIndicator;
