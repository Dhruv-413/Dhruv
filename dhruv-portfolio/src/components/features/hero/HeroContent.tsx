"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { HeroStats } from "./HeroStats";
import { HeroCTA } from "./HeroCTA";
import { HeroSocialLinks } from "./HeroSocialLinks";

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "React Developer",
  "Python Developer",
];

interface HeroContentProps {
  stats?: {
    totalRepos?: number;
    totalStars?: number;
  };
}

export function HeroContent({ stats }: HeroContentProps) {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center lg:text-left order-2 lg:order-1 min-w-0 overflow-hidden">
      {/* Terminal Prompt */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-3 sm:mb-4 justify-center lg:justify-start"
      >
        <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-primary font-mono text-xs sm:text-sm">
          ~/portfolio
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-primary font-mono text-xs sm:text-sm"
        >
          _
        </motion.span>
      </motion.div>

      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-muted-foreground text-base sm:text-lg mb-2 sm:mb-3"
      >
        Hi, I&apos;m
      </motion.p>

      {/* Name */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Dhruv Gupta
      </motion.h1>

      {/* Rotating Role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 h-12 sm:h-14"
      >
        <motion.h2
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary"
        >
          {roles[currentRole]}
        </motion.h2>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-3 wrap-break-word"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="hidden sm:inline">
          CS Student @ Manipal University Jaipur | Ex-ONGC Intern
        </span>
        <span className="sm:hidden">CS @ MUJ | Ex-ONGC Intern</span>
      </motion.p>

      <motion.p
        className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Building{" "}
        <span className="text-primary font-semibold">
          production-ready
        </span>{" "}
        solutions with modern web technologies, AI/ML, and enterprise
        software. Passionate about creating{" "}
        <span className="text-primary font-semibold">scalable</span> and{" "}
        <span className="text-primary font-semibold">innovative</span>{" "}
        applications.
      </motion.p>

      {/* Quick Stats */}
      <HeroStats stats={stats} />

      {/* CTA Buttons */}
      <HeroCTA />

      {/* Social Links */}
      <HeroSocialLinks />
    </div>
  );
}
