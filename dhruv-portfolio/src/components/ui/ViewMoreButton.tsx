"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";

interface ViewMoreButtonProps {
  expanded: boolean;
  onToggle: () => void;
  remainingCount: number;
  animated?: boolean;
}

export function ViewMoreButton({
  expanded,
  onToggle,
  remainingCount,
  animated = true,
}: ViewMoreButtonProps) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 10 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex justify-center mt-8"
    >
      <Button
        variant="outline"
        onClick={onToggle}
        className="group font-mono text-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
      >
        {expanded ? (
          <>
            <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
            View {remainingCount} More
          </>
        )}
      </Button>
    </motion.div>
  );
}
