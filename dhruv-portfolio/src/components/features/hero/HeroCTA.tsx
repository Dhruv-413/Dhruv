"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Download, Mail } from "lucide-react";

export function HeroCTA() {
  return (
    <div className="cta-buttons-container flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pl-2 sm:mb-8">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto"
      >
        <Button
          size="lg"
          asChild
          className="cta-btn group shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all font-semibold w-full sm:w-auto"
        >
          <Link href="/projects">
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            <span className="cta-text-full">View My Work</span>
            <span className="cta-text-compact hidden">Projects</span>
          </Link>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto"
      >
        <Button
          size="lg"
          variant="outline"
          asChild
          className="cta-btn group dark:hover:bg-primary/90 dark:hover:text-primary-foreground dark:hover:border-primary/90 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all font-semibold w-full sm:w-auto"
        >
          <a href="/Dhruv_resume.pdf" download>
            <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
            <span className="cta-text-full">Download Resume</span>
            <span className="cta-text-compact hidden">Resume</span>
          </a>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto"
      >
        <Button
          size="lg"
          variant="outline"
          asChild
          className="cta-btn group transition-all font-semibold w-full sm:w-auto"
        >
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="cta-text-full">Get in Touch</span>
            <span className="cta-text-compact hidden">Contact</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
