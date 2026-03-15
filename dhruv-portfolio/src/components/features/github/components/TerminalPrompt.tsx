/**
 * Terminal Prompt Component
 * Animated terminal-style prompt for GitHub section header
 */

import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface TerminalPromptProps {
  path: string;
}

export function TerminalPrompt({ path }: TerminalPromptProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6"
      aria-label="Terminal prompt"
    >
      <Terminal
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary"
        aria-hidden="true"
      />
      <span className="text-primary font-mono text-xs sm:text-sm">{path}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-primary font-mono text-xs sm:text-sm"
        aria-hidden="true"
      >
        _
      </motion.span>
    </div>
  );
}
