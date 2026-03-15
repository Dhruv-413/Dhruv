"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useGitHubUser, useGitHubStats } from "@/hooks/useGitHub";
import { HeroContent } from "./HeroContent";
import { ProfileImage } from "./ProfileImage";
import { HeroCodeSnippet } from "./HeroCodeSnippet";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

// Lazy load below-the-fold components - load client-side only for better initial render
const StatsDashboard = dynamic(
  () => import("./StatsDashboard").then((mod) => mod.StatsDashboard),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse bg-muted rounded-lg" />
    ),
  }
);

const AboutCodeSnippet = dynamic(
  () => import("./AboutCodeSnippet").then((mod) => mod.AboutCodeSnippet),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse bg-muted rounded-lg" />
    ),
  }
);

const HighlightsGrid = dynamic(
  () => import("./HighlightsGrid").then((mod) => mod.HighlightsGrid),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse bg-muted rounded-lg" />
    ),
  }
);

const CoreValues = dynamic(
  () => import("./CoreValues").then((mod) => mod.CoreValues),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 animate-pulse bg-muted rounded-lg" />
    ),
  }
);

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Defer GitHub data loading - show skeleton until client-side hydration
  const [showGitHubData, setShowGitHubData] = useState(false);
  const { data: user } = useGitHubUser();
  const { data: stats } = useGitHubStats();

  // Defer GitHub data display until after initial mount
  useEffect(() => {
    // Small delay to allow initial render to complete
    const timer = setTimeout(() => {
      setShowGitHubData(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while GitHub data is loading
  const isLoading = !showGitHubData;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden pt-16 pb-20"
    >
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Main Content */}
            <HeroContent stats={isLoading ? undefined : stats ?? undefined} />

            {/* Right Column - Visual Element */}
            <div className="flex flex-col items-center order-1 lg:order-2">
              <ProfileImage avatarUrl={isLoading ? undefined : user?.avatarUrl} />
              <HeroCodeSnippet />
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </div>

      {/* About Content Section */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <StatsDashboard isInView={isInView} />

        {/* Highlights & Detailed Code Snippet Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 overflow-hidden">
          <AboutCodeSnippet isInView={isInView} />
          <HighlightsGrid isInView={isInView} />
        </div>

        <CoreValues isInView={isInView} />
      </div>
    </section>
  );
}