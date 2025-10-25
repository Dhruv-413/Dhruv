"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ProjectModalProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05), transparent 70%)",
            }}
          />

          {/* Modal Container - Enhanced with glow effect */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-primary/10 max-w-4xl w-full max-h-[90vh] relative flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/20 via-primary/5 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              {/* Fixed Header - Enhanced with animations */}
              <div className="shrink-0 relative border-b border-border/50 bg-card/50 backdrop-blur-sm">
                {/* Close button with enhanced hover */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </motion.div>

                {/* Enhanced Navigation buttons - Moved to Right */}
                <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
                  {onPrevious && (
                    <motion.div
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onPrevious}
                        className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Previous project</span>
                      </Button>
                    </motion.div>
                  )}
                  {onNext && (
                    <motion.div
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNext}
                        className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                        <span className="sr-only">Next project</span>
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Title Section */}
                <div className="p-8 pb-6 pl-16 relative">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold mb-3 pr-32 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground pr-32 leading-relaxed text-base"
                  >
                    {project.description}
                  </motion.p>

                  {/* Enhanced Badges Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3 mt-5 text-sm"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg border border-border/50 text-muted-foreground hover:border-primary/30 transition-colors"
                    >
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-mono text-xs">
                        {format(new Date(project.date), "MMMM yyyy")}
                      </span>
                    </motion.div>
                    {project.badges?.map((badge, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`
                          ${badge.type === "live" ? "badge-live" : ""}
                          ${badge.type === "deployed" ? "badge-deployed" : ""}
                          ${
                            badge.type === "performance"
                              ? "badge-performance"
                              : ""
                          }
                          ${
                            badge.type === "build"
                              ? "inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/10"
                              : ""
                          }
                        `}
                      >
                        {badge.type === "live" && (
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                        )}
                        <span className="font-mono">
                          {badge.label}: {badge.value}
                        </span>
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <div className="p-8 space-y-8">
                  {project.longDescription && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold font-mono">
                          <span className="text-primary">{"// "}</span>About
                        </h3>
                      </div>
                      <div className="pl-7 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/50 to-transparent" />
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {project.longDescription}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced Code Snippet */}
                  {project.codeSnippet && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Code2 className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold font-mono">
                          <span className="text-primary">{"</>"}</span> Code
                          Showcase
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="code-snippet relative rounded-xl overflow-hidden border border-border/50 bg-muted/30 hover:border-primary/30 transition-all duration-300 shadow-lg"
                      >
                        {/* Terminal header */}
                        <div className="bg-muted/50 border-b border-border/50 px-4 py-2 flex items-center justify-between">
                          <div className="flex gap-2">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-3 h-3 rounded-full bg-red-500/70 cursor-pointer"
                            />
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-3 h-3 rounded-full bg-yellow-500/70 cursor-pointer"
                            />
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-3 h-3 rounded-full bg-green-500/70 cursor-pointer"
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            {project.title.toLowerCase().replace(/\s+/g, "-")}
                            .tsx
                          </span>
                        </div>
                        <div className="relative">
                          {/* Line numbers */}
                          <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/20 border-r border-border/30 flex flex-col items-end pr-3 pt-4 text-xs font-mono text-muted-foreground/50">
                            {project.codeSnippet.split("\n").map((_, i) => (
                              <div key={i} className="leading-6">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <pre className="text-xs sm:text-sm overflow-x-auto pl-16 pr-4 py-4">
                            <code className="text-muted-foreground font-mono leading-6">
                              {project.codeSnippet}
                            </code>
                          </pre>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Enhanced Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold font-mono">
                        <span className="text-primary">{"// "}</span>Key Metrics
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group/metric p-5 bg-linear-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/10 relative overflow-hidden"
                        >
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity" />

                          <div className="relative">
                            <div className="text-3xl font-bold text-primary mb-2 font-mono group-hover/metric:scale-110 transition-transform">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                              {metric.label}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse delay-75" />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse delay-150" />
                      </div>
                      <h3 className="text-xl font-bold font-mono">
                        <span className="text-primary">{"// "}</span>Tech Stack
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, idx) => {
                        const icon = (
                          <TechIcon name={tech} className="h-5 w-5" />
                        );
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.9 + idx * 0.03,
                              type: "spring",
                              stiffness: 400,
                            }}
                            whileHover={{ scale: 1.1, y: -3 }}
                            onHoverStart={() => setHoveredTech(tech)}
                            onHoverEnd={() => setHoveredTech(null)}
                            className="group/tech relative"
                          >
                            <span className="flex items-center gap-2 px-4 py-2.5 bg-muted/80 rounded-xl text-sm font-semibold border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/10">
                              <span className="group-hover/tech:scale-110 group-hover/tech:rotate-12 transition-transform">
                                {icon}
                              </span>
                              <span className="group-hover/tech:text-primary transition-colors">
                                {tech}
                              </span>
                            </span>
                            {/* Tooltip */}
                            {hoveredTech === tech && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover border border-border rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-10"
                              >
                                <span className="text-xs font-mono text-popover-foreground">
                                  {tech}
                                </span>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Enhanced CTAs with prominent styling */}
                  {project.links &&
                    (project.links.github ||
                      project.links.live ||
                      project.links.demo) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="pt-6 border-t border-border/50"
                      >
                        <div className="flex flex-col sm:flex-row gap-3">
                          {project.links.live && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1"
                            >
                              <Button
                                asChild
                                size="lg"
                                className="w-full group/btn bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 font-bold text-base"
                              >
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-5 w-5 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                  View Live Demo
                                </a>
                              </Button>
                            </motion.div>
                          )}
                          {project.links.github && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1"
                            >
                              <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-bold text-base shadow-lg"
                              >
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="h-5 w-5 mr-2 group-hover/btn:rotate-12 transition-transform" />
                                  View Source Code
                                </a>
                              </Button>
                            </motion.div>
                          )}
                          {project.links.demo && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="w-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-semibold shadow-lg"
                              >
                                <a
                                  href={project.links.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-5 w-5 mr-2" />
                                  Watch Demo
                                </a>
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
