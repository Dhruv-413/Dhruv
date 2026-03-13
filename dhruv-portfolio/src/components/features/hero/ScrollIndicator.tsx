"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{
        opacity: { delay: 1.2 },
        y: { duration: 1.5, repeat: Infinity },
      }}
    >
      <div className="flex flex-col items-center mt-8 pt-8">
        <span className="text-xs font-mono text-muted-foreground">
          Scroll to explore
        </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </motion.div>
  );
}
