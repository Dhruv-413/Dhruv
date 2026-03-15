"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { HeroStats } from "./HeroStats";
import { HeroCTA } from "./HeroCTA";
import { HeroSocialLinks } from "./HeroSocialLinks";
import { usePageAnimations } from "@/hooks/usePageAnimations";

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
  const shouldReduceMotion = useReducedMotion();
  const { heroAnimations, createVariants } = usePageAnimations();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create variants using the animation sequence
  const titleVariants = createVariants(heroAnimations.title);
  const subtitleVariants = createVariants(heroAnimations.subtitle);
  const statsVariants = createVariants(heroAnimations.stats);
  const ctaVariants = createVariants(heroAnimations.cta);
  const socialVariants = createVariants(heroAnimations.socialLinks);

  return (
    <div className="text-center lg:text-left order-2 lg:order-1 min-w-0 overflow-hidden">
      {/* Terminal Prompt */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={subtitleVariants}
        className="flex items-center gap-2 mb-3 sm:mb-4 justify-center lg:justify-start"
      >
        <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-primary font-mono text-xs sm:text-sm">
          ~/portfolio
        </span>
        <motion.span
          animate={{ opacity: shouldReduceMotion ? 1 : [1, 0, 1] }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
          className="text-primary font-mono text-xs sm:text-sm"
        >
          _
        </motion.span>
      </motion.div>

      {/* Greeting */}
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="text-muted-foreground text-base sm:text-lg mb-2 sm:mb-3 pl-2"
      >
        Hi, I&apos;m
      </motion.p>

      {/* Name - Title */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent pl-2"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Dhruv Gupta
      </motion.h1>

      {/* Rotating Role */}
      <motion.div
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 h-12 sm:h-14 pl-2"
      >
        <motion.h2
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary pl-2"
        >
          {roles[currentRole]}
        </motion.h2>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-3 wrap-break-word pl-2"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="hidden sm:inline">
          SAP Analyst Intern @Deloitte | Ex-ONGC Intern
        </span>
        <span className="sm:hidden">CS @ MUJ | Ex-ONGC Intern</span>
      </motion.p>

      <motion.p
        className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed pl-2"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        Building{" "}
        <span className="text-primary font-semibold">production-ready</span>{" "}
        solutions with modern web technologies, AI/ML, and enterprise software.
        Passionate about creating{" "}
        <span className="text-primary font-semibold">scalable</span> and{" "}
        <span className="text-primary font-semibold">innovative</span>{" "}
        applications.
      </motion.p>

      {/* Quick Stats - using animation sequence */}
      <motion.div variants={statsVariants} initial="hidden" animate="visible">
        <HeroStats stats={stats} />
      </motion.div>

      {/* CTA Buttons - using animation sequence */}
      <motion.div variants={ctaVariants} initial="hidden" animate="visible">
        <HeroCTA />
      </motion.div>

      {/* Social Links - using animation sequence */}
      <motion.div variants={socialVariants} initial="hidden" animate="visible">
        <HeroSocialLinks />
      </motion.div>
    </div>
  );
}
