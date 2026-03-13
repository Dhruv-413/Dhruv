"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function HeroSocialLinks() {
  const siteConfig = useSiteConfig();
  return (
    <motion.div
      className="flex justify-center lg:justify-start gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="touch-manipulation"
      >
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2 touch-manipulation"
        >
          <Github className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-xs sm:text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
            GitHub
          </span>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="touch-manipulation"
      >
        <Link
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2 touch-manipulation"
        >
          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-xs sm:text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
            LinkedIn
          </span>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
