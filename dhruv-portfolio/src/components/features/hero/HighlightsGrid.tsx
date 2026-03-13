"use client";

import { motion } from "framer-motion";
import { HighlightCard, HighlightCardGrid } from "@/components/ui/HighlightCard";
import { highlights } from "./data/highlights";

interface HighlightsGridProps {
  isInView: boolean;
}

export function HighlightsGrid({ isInView }: HighlightsGridProps) {
  const highlightColors: Record<string, string> = {
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f97316",
    indigo: "#6366f1",
    green: "#10b981",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="min-w-0"
    >
      <div className="mb-4 sm:mb-5">
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-mono">
          <span className="text-primary">{"// "}</span>
          Highlights
        </h3>
      </div>

      <HighlightCardGrid>
        {highlights.map((highlight, index) => {
          const colorKey =
            Object.keys(highlightColors).find((key) =>
              highlight.color.includes(key)
            ) || "blue";

          return (
            <HighlightCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              color={highlightColors[colorKey]}
              isInView={isInView}
              animationDelay={0.7 + index * 0.1}
            />
          );
        })}
      </HighlightCardGrid>
    </motion.div>
  );
}
