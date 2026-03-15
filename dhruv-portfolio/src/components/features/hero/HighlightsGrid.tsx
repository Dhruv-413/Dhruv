"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { highlights } from "./data/highlights";
import type { LucideIcon } from "lucide-react";

interface HighlightsGridProps {
  isInView: boolean;
}

const highlightColors: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#a855f7",
  orange: "#f97316",
  indigo: "#6366f1",
  green: "#10b981",
};

export function HighlightsGrid({ isInView }: HighlightsGridProps) {
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

      <div className="grid grid-cols-1 gap-3 sm:gap-6 pr-2">
        {highlights.map((highlight, index) => {
          const colorKey =
            Object.keys(highlightColors).find((key) =>
              highlight.color.includes(key),
            ) || "blue";
          const color = highlightColors[colorKey];
          const Icon = highlight.icon as LucideIcon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors h-full">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    {Icon && <Icon className="h-4 w-4" style={{ color }} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
