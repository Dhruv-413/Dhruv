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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Single Row Footer - Same height as header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand - Left Side */}
          <div className="flex items-center gap-2">
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
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
            </motion.div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
              <span>© {currentYear}</span>
              <span className="text-primary hidden sm:inline">•</span>
              <span className="bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent font-semibold hidden sm:inline">
                {SITE_CONFIG.name}
              </span>
            </div>
          </div>

          {/* Right Side - Social + Tech Badge */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
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
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
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
                className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                asChild
              >
                <a href={SITE_CONFIG.links.email} aria-label="Send Email">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Tech Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/5 border border-primary/20 rounded-md">
              <Code2 className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
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
                  className="h-8 w-8 rounded-md hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all hover:scale-110 group"
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

      {/* Floating Scroll to Top - Mobile */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 md:hidden z-40"
        >
          <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            className="h-12 w-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </footer>
  );
}
