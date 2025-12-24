"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeSnippetWindowProps {
  /** Code content to display */
  code: string;
  /** Filename to show in header */
  filename?: string;
  /** Language indicator in status bar */
  language?: string;
  /** Additional className */
  className?: string;
  /** Animation delay */
  animationDelay?: number;
  /** Max height constraint */
  maxHeight?: string;
}

/**
 * Reusable Code Snippet Window component
 * Terminal-style code display with header and status bar
 * Used across: Hero, Skills, GitHub sections
 *
 * @example
 * ```tsx
 * <CodeSnippetWindow
 *   code={`const greeting = "Hello";`}
 *   filename="example.ts"
 *   language="TypeScript"
 * />
 * ```
 */
export function CodeSnippetWindow({
  code,
  filename = "code.ts",
  language = "TypeScript",
  className,
  animationDelay = 0.3,
  maxHeight = "600px",
}: CodeSnippetWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={cn("order-2 lg:order-2", className)}
    >
      <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-muted/50 border-b border-border/50">
          <div className="flex gap-1.5 sm:gap-2">
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"
              aria-hidden="true"
            />
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"
              aria-hidden="true"
            />
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"
              aria-hidden="true"
            />
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground ml-2">
            {filename}
          </span>
        </div>

        {/* Code Content */}
        <div className="relative">
          <pre
            className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto custom-scrollbar"
            style={{ maxHeight }}
          >
            <code className="language-typescript">{code}</code>
          </pre>

          {/* Gradient Fade at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-linear-to-t from-card/90 to-transparent pointer-events-none" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/30 border-t border-border/50 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-green-500">● {language}</span>
            <span className="text-primary hidden sm:inline">UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap className="h-3 w-3 text-yellow-500" aria-hidden="true" />
            <span className="text-muted-foreground hidden sm:inline">
              Production Ready
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CodeSnippetWindow;
