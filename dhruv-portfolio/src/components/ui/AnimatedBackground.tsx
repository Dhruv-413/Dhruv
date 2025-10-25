"use client";

import { motion } from "framer-motion";

// Fixed seed for consistent particle positions
const FIXED_PARTICLES = [
  { left: 23.5, top: 45.2, duration: 5.2, delay: 1.3 },
  { left: 67.8, top: 12.9, duration: 6.1, delay: 3.7 },
  { left: 12.4, top: 78.6, duration: 4.5, delay: 0.8 },
  { left: 89.3, top: 34.1, duration: 5.8, delay: 2.4 },
  { left: 45.6, top: 91.3, duration: 4.2, delay: 4.1 },
  { left: 78.2, top: 56.7, duration: 6.4, delay: 1.9 },
  { left: 34.1, top: 23.4, duration: 5.1, delay: 3.2 },
  { left: 56.9, top: 67.8, duration: 4.8, delay: 0.5 },
  { left: 91.7, top: 89.2, duration: 5.5, delay: 2.7 },
  { left: 8.3, top: 41.5, duration: 6.2, delay: 4.5 },
  { left: 41.2, top: 15.8, duration: 4.7, delay: 1.6 },
  { left: 72.5, top: 73.1, duration: 5.9, delay: 3.4 },
  { left: 15.9, top: 52.3, duration: 4.4, delay: 2.1 },
  { left: 63.4, top: 8.7, duration: 6.0, delay: 0.9 },
  { left: 29.8, top: 95.4, duration: 5.3, delay: 3.8 },
];

export function AnimatedBackground() {
  return (
    <>
      {/* Base background layer - Deepest layer */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-background via-background to-background" />
      </div>

      {/* Animated gradient layer - Above background, below content */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs - White and barely visible */}
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/3 w-1/2 h-1/2 rounded-full blur-3xl opacity-[0.025]"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles - More subtle */}
        {FIXED_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Corner accents - Very subtle */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/2 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/2 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />

        {/* Noise texture overlay for subtle depth */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
}
