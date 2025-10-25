"use client";

import { motion } from "framer-motion";

// Generate particles outside component to avoid re-renders
const generateParticles = () =>
  [...Array(15)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  }));

const particles = generateParticles();

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
        {particles.map((particle, i) => (
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
