"use client";

import { motion, useInView } from "framer-motion";
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

  // Responsive animation values - smaller movements on mobile
  const directions = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const offset = isMobile ? 20 : 40; // Reduced offset for mobile

    return {
      up: { y: offset },
      down: { y: -offset },
      left: { x: offset },
      right: { x: -offset },
    };
  }, []);

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
