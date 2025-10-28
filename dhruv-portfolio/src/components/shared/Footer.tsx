"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUp, Terminal, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-card/30 backdrop-blur-sm border-t border-primary/10 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] opacity-40"
        aria-hidden="true"
      />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
        {/* Single Row Footer - Responsive height and layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-3 sm:py-0 sm:h-16 lg:h-20">
          {/* Brand - Left Side */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Terminal
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary"
                aria-hidden="true"
              />
            </motion.div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
              <span>© {currentYear}</span>
              <span className="text-primary">•</span>
              <span className="bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent font-semibold">
                {SITE_CONFIG.name}
              </span>
            </div>
          </div>

          {/* Right Side - Social + Tech Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 active:scale-95"
                asChild
              >
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 active:scale-95"
                asChild
              >
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 active:scale-95"
                asChild
              >
                <a href={SITE_CONFIG.links.email} aria-label="Send Email">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Tech Badge */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-primary/5 border border-primary/20 rounded-md">
              <Code2 className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                Next.js
              </span>
            </div>

            {/* Scroll to Top - Desktop */}
            {showScrollTop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="hidden md:block"
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollToTop}
                  className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all hover:scale-110 active:scale-95 group"
                  aria-label="Scroll to top"
                >
                  <ArrowUp
                    className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top - Mobile & Tablet */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:hidden z-40"
        >
          <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className="h-11 w-11 sm:h-12 sm:w-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </footer>
  );
}
