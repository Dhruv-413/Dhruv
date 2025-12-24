"use client";

import { motion } from "framer-motion";

export interface ScanLineEffectProps {
  /** Color of the scan line */
  color?: string;
  /** Duration of one scan cycle in seconds */
  duration?: number;
  /** Whether the effect is visible */
  isActive?: boolean;
  /** CSS class for positioning (should include absolute positioning) */
  className?: string;
}

/**
 * Reusable animated scan line effect
 * Creates a horizontal line that animates from top to bottom
 * Used across: StatCard, SkillCards, TimelineCards, GitHub sections
 *
 * @example
 * ```tsx
 * {isActive && <ScanLineEffect color="#3b82f6" />}
 * ```
 */
export function ScanLineEffect({
  color = "#3b82f6",
  duration = 2,
  isActive = true,
  className = "absolute inset-x-0 h-px",
}: ScanLineEffectProps) {
  if (!isActive) return null;

  return (
    <motion.div
      className={className}
      style={{ backgroundColor: `${color}60` }}
      initial={{ top: 0 }}
      animate={{ top: "100%" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
}

export default ScanLineEffect;
