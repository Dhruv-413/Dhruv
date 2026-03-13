"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useGitHubUser, useGitHubStats } from "@/hooks/useGitHub";
import { HeroContent } from "./HeroContent";
import { ProfileImage } from "./ProfileImage";
import { HeroCodeSnippet } from "./HeroCodeSnippet";
import { ScrollIndicator } from "./ScrollIndicator";
import { StatsDashboard } from "./StatsDashboard";
import { AboutCodeSnippet } from "./AboutCodeSnippet";
import { HighlightsGrid } from "./HighlightsGrid";
import { CoreValues } from "./CoreValues";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { data: user } = useGitHubUser();
  const { data: stats } = useGitHubStats();

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
            <HeroContent stats={stats ?? undefined} />

            {/* Right Column - Visual Element */}
            <div className="flex flex-col items-center order-1 lg:order-2">
              <ProfileImage avatarUrl={user?.avatarUrl} />
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
