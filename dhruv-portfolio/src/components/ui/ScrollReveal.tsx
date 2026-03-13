"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // FIXED: Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // FIXED: Use static values to avoid stale closures
  // The direction offsets are static - no need for window check in useMemo
  const directions = useMemo(
    () => ({
      up: { y: 40 },
      down: { y: -40 },
      left: { x: 40 },
      right: { x: -40 },
    }),
    []
  );

  // If reduced motion is preferred, just render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
