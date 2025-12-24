/**
 * Reusable Animation Variants for Framer Motion
 * DRY principle: Define once, use everywhere
 */

import { Variants } from "framer-motion";

// ============================================================================
// Fade Animations
// ============================================================================

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

// ============================================================================
// Scale Animations
// ============================================================================

// Scale fade in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Scale in with spring
export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// ============================================================================
// Stagger Animations
// ============================================================================

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

// Fast stagger container
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

// ============================================================================
// Card & Hover Animations
// ============================================================================

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

// Card hover with lift
export const cardHoverLift = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Stat card hover
export const statCardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// Slide Animations
// ============================================================================

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

// Slide in from left
export const slideInFromLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Slide in from right
export const slideInFromRight: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// ============================================================================
// Common Transition Configs
// ============================================================================

export const transitions = {
  default: { duration: 0.3, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  slow: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  fast: { duration: 0.2, ease: "easeOut" },
  smooth: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

// ============================================================================
// Continuous/Loop Animations
// ============================================================================

// Icon float animation
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

// Cursor blink (for terminal prompts)
export const cursorBlink = {
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

// Scroll indicator bounce
export const scrollBounce = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

// Sparkle animation
export const sparkle = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

// ============================================================================
// Scan Line Animation (for cards)
// ============================================================================

export const scanLine: Variants = {
  initial: { top: 0 },
  animate: {
    top: "100%",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================================================
// Progress Bar Animation
// ============================================================================

export const progressBar = (percentage: number, delay = 0): Variants => ({
  hidden: { width: 0 },
  visible: {
    width: `${percentage}%`,
    transition: {
      duration: 1.2,
      delay,
      ease: "easeOut",
    },
  },
});

// Shine effect for progress bars
export const shineEffect = {
  animate: {
    x: ["-100%", "200%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// Heatmap Cell Animation
// ============================================================================

export const heatmapCell = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      delay,
    },
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create staggered animation delay
 */
export const getStaggerDelay = (
  index: number,
  base = 0.1,
  offset = 0
): number => offset + index * base;

/**
 * Create cascade animation for lists
 */
export const createCascadeVariants = (
  baseDelay = 0,
  staggerDelay = 0.05
): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: baseDelay + i * staggerDelay,
      type: "spring",
      stiffness: 100,
    },
  }),
});
