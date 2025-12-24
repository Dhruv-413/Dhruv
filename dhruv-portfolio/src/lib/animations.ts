/**
 * Reusable Animation Variants for Framer Motion
 * DRY principle: Define once, use everywhere
 * Optimized with additional common patterns
 */

import { Variants } from "framer-motion";

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

// Scale fade in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Scale fade in (subtle)
export const scaleInSubtle: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger item (child of stagger container)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Card hover animation
export const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Slide in from bottom
export const slideInFromBottom: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Common transition configs
export const transitions = {
  default: { duration: 0.3, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  slow: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  fast: { duration: 0.2, ease: "easeOut" },
};

// Icon animation
export const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate on hover
export const rotateOnHover = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// ============================================================================
// Utility Functions for Dynamic Animations
// ============================================================================

/**
 * Create a stagger delay based on index
 */
export function getStaggerDelay(index: number, baseDelay: number = 0.1): number {
  return baseDelay + index * 0.05;
}

/**
 * Create transition config with custom duration and delay
 */
export function createTransition(duration: number = 0.3, delay: number = 0) {
  return {
    duration,
    delay,
    ease: "easeOut",
  };
}

/**
 * Hover effect with lift and scale
 */
export const hoverLift = {
  y: -4,
  scale: 1.02,
  transition: { duration: 0.2 },
};

/**
 * Tap effect for buttons
 */
export const tapScale = {
  scale: 0.95,
};

