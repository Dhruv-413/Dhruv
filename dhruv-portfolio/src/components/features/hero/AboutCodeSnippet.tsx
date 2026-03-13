"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { CodeSnippetWindow } from "@/components/ui/CodeSnippetWindow";
import { detailedCodeSnippet } from "./data/codeSnippets";

interface AboutCodeSnippetProps {
  isInView: boolean;
}

export function AboutCodeSnippet({ isInView }: AboutCodeSnippetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="min-w-0"
    >
      <div className="mb-4 sm:mb-5">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h3 className="text-base sm:text-lg md:text-xl font-bold font-mono">
            <span className="text-primary">{"// "}</span>Developer Profile
          </h3>
        </div>
      </div>

      <CodeSnippetWindow
        code={detailedCodeSnippet}
        filename="developer.ts"
        language="TypeScript"
        animationDelay={0}
        maxHeight="500px"
        className="order-0"
      />
    </motion.div>
  );
}
