/**
 * Page Animation Sequences Hook
 * 
 * Provides staggered animation configurations for cohesive page entrance effects.
 * Designed to work with Framer Motion for smooth, orchestrated animations.
 */

import { useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

/**
 * Animation configuration for a single element
 */
export interface AnimationConfig {
  delay: number;
  duration: number;
  stagger?: number;
}

/**
 * Collection of animation configs for a section
 */
export interface SectionAnimations {
  [key: string]: AnimationConfig;
}

/**
 * All animation sequences for the page
 */
export interface PageAnimationSequence {
  hero: SectionAnimations;
  about: SectionAnimations;
  gallery: SectionAnimations;
}

/**
 * Default animation sequence configuration
 */
export const pageLoadSequence: PageAnimationSequence = {
  hero: {
    title: { delay: 0, duration: 0.6 },
    subtitle: { delay: 0.15, duration: 0.5 },
    stats: { delay: 0.3, duration: 0.5 },
    cta: { delay: 0.45, duration: 0.4 },
    scrollIndicator: { delay: 0.6, duration: 0.3 },
    socialLinks: { delay: 0.5, duration: 0.4 },
  },
  about: {
    container: { delay: 0.2, duration: 0.5 },
    codeSnippet: { delay: 0.3, duration: 0.5 },
    highlights: { delay: 0.4, duration: 0.5 },
    values: { delay: 0.5, duration: 0.5 },
  },
  gallery: {
    filters: { delay: 0.1, duration: 0.4 },
    cards: { delay: 0.2, duration: 0.5, stagger: 0.05 },
  },
};

/**
 * Hook to get animation configuration
 * Returns optimized animations based on reduced motion preference
 */
export function usePageAnimations() {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Get animation config for a specific element
   */
  const getAnimationConfig = useMemo(
    () =>
      (section: keyof PageAnimationSequence, element: string): AnimationConfig => {
        const config = pageLoadSequence[section]?.[element];
        if (!config) {
          return { delay: 0, duration: 0.5 };
        }

        // Reduce delays and increase durations for accessibility
        if (shouldReduceMotion) {
          return {
            delay: 0,
            duration: Math.max(config.duration, 0.3),
            stagger: config.stagger ? 0 : undefined,
          };
        }

        return config;
      },
    [shouldReduceMotion]
  );

  /**
   * Get hero section animations
   */
  const heroAnimations = useMemo(
    () => ({
      title: getAnimationConfig("hero", "title"),
      subtitle: getAnimationConfig("hero", "subtitle"),
      stats: getAnimationConfig("hero", "stats"),
      cta: getAnimationConfig("hero", "cta"),
      scrollIndicator: getAnimationConfig("hero", "scrollIndicator"),
      socialLinks: getAnimationConfig("hero", "socialLinks"),
    }),
    [getAnimationConfig]
  );

  /**
   * Get about section animations
   */
  const aboutAnimations = useMemo(
    () => ({
      container: getAnimationConfig("about", "container"),
      codeSnippet: getAnimationConfig("about", "codeSnippet"),
      highlights: getAnimationConfig("about", "highlights"),
      values: getAnimationConfig("about", "values"),
    }),
    [getAnimationConfig]
  );

  /**
   * Get gallery section animations
   */
  const galleryAnimations = useMemo(
    () => ({
      filters: getAnimationConfig("gallery", "filters"),
      cards: getAnimationConfig("gallery", "cards"),
    }),
    [getAnimationConfig]
  );

  /**
   * Create motion variants for an element
   */
  const createVariants = useMemo(
    () =>
      (config: AnimationConfig): Variants => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: config.duration,
            delay: config.delay,
            ease: "easeOut" as const,
          },
        },
      }),
    []
  );

  /**
   * Create staggered variants for list items
   */
  const createStaggeredVariants = useMemo(
    () =>
      (config: AnimationConfig): Variants => ({
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: config.duration,
            delay: config.delay + (config.stagger ?? 0) * i,
            ease: "easeOut" as const,
          },
        }),
      }),
    []
  );

  return {
    // Animation configs
    heroAnimations,
    aboutAnimations,
    galleryAnimations,
    // Variant creators
    createVariants,
    createStaggeredVariants,
    // Helper to get specific config
    getAnimationConfig,
    // Reduced motion preference
    shouldReduceMotion,
  };
}
