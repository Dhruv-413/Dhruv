"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Braces } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5"
          : "bg-background/60 backdrop-blur-md border-b border-border/50"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent"
        initial={{ width: "0%", left: "50%" }}
        animate={{
          width: isScrolled ? "100%" : "0%",
          left: isScrolled ? "0%" : "50%",
        }}
        transition={{ duration: 0.6 }}
      />

      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo*/}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home - Dhruv Gupta Portfolio"
          >
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold font-mono bg-linear-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity pl-20">
                {"<DG />"}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono hidden sm:block pl-20">
                {"> Learner"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item, index) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium font-mono transition-all duration-300 rounded-md group ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {/* Terminal prompt indicator for active */}
                    {active && (
                      <motion.span
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-primary font-mono text-xs"
                        layoutId="terminalPrompt"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      >
                        {">"}
                      </motion.span>
                    )}

                    <span className={active ? "pl-2" : ""}>{item.label}</span>

                    {/* Animated underline */}
                    {active && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-purple-400 to-accent rounded-full"
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover effect */}
                    {!active && (
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                        whileHover={{ scale: 1.05 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Social Links - Desktop Only */}
            <div className="hidden lg:flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                asChild
              >
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                asChild
              >
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                asChild
              >
                <a href={SITE_CONFIG.links.email} aria-label="Send Email">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-md hover:bg-primary/10 hover:text-primary transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-4 space-y-2 border-t border-border/50 mt-2">
                {/* Navigation Links */}
                {NAV_ITEMS.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={`flex items-center gap-2 w-full px-4 py-3 rounded-md text-base font-medium font-mono transition-all ${
                          active
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && (
                          <Braces className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span>
                          {active ? "> " : ""}
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Social Links */}
                <motion.div
                  className="pt-4 border-t border-border/50 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-xs text-muted-foreground font-mono mb-3 px-4">
                    {"// Connect"}
                  </p>
                  <div className="flex gap-2 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 font-mono hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                      asChild
                    >
                      <a
                        href={SITE_CONFIG.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                      >
                        <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 font-mono hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                      asChild
                    >
                      <a
                        href={SITE_CONFIG.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
