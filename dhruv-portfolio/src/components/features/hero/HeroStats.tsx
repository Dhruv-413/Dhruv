"use client";

import { motion } from "framer-motion";
import { Code2, Star as StarIcon } from "lucide-react";

interface HeroStatsProps {
  stats?: {
    totalRepos?: number;
    totalStars?: number;
  };
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <motion.div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 justify-center lg:justify-start max-w-full overflow-hidden pl-2">
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group touch-manipulation active:scale-95">
        <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-mono whitespace-nowrap">
          {stats?.totalRepos}+ Projects
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group touch-manipulation active:scale-95">
        <StarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-mono whitespace-nowrap">
          {stats?.totalStars} Star
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/15 transition-all touch-manipulation active:scale-95">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
        <span className="text-[10px] sm:text-xs md:text-sm font-mono text-primary font-semibold whitespace-nowrap">
          Available
        </span>
      </div>
    </motion.div>
  );
}
