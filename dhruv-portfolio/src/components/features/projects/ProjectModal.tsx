"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-xl shadow-2xl max-w-4xl w-full relative">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 rounded-full"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>

                {/* Navigation buttons */}
                {onPrevious && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous project</span>
                  </Button>
                )}
                {onNext && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next project</span>
                  </Button>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 pr-12">
                        <h2 className="text-3xl font-bold mb-2">
                          {project.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(project.date), "MMMM yyyy")}
                      </div>
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      )}
                      {/* Status badges */}
                      {project.badges?.map((badge, idx) => (
                        <span
                          key={idx}
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
                                ? "inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-full text-xs font-semibold"
                                : ""
                            }
                          `}
                        >
                          {badge.type === "live" && (
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                          {badge.label}: {badge.value}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Long description */}
                  {project.longDescription && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {project.codeSnippet && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="font-mono text-primary">{"</>"}</span>
                        Code Showcase
                      </h3>
                      <div className="code-snippet relative">
                        <div className="absolute top-2 right-2 flex gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <pre className="text-xs sm:text-sm overflow-x-auto pt-6">
                          <code className="text-muted-foreground font-mono">
                            {project.codeSnippet}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-muted/50 rounded-lg border border-border"
                        >
                          <div className="text-2xl font-bold text-primary mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => {
                        const icon = (
                          <TechIcon name={tech} className="h-5 w-5" />
                        );
                        return (
                          <span
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm font-medium"
                          >
                            {icon}
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links - Enhanced CTAs */}
                  {project.links &&
                    (project.links.github ||
                      project.links.live ||
                      project.links.demo) && (
                      <div className="flex gap-3 pt-4 border-t border-border">
                        {project.links.github && (
                          <Button
                            asChild
                            variant="outline"
                            className="group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                          >
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                              View Code
                            </a>
                          </Button>
                        )}
                        {project.links.live && (
                          <Button
                            asChild
                            className="group/btn shadow-lg hover:shadow-primary/50 transition-all"
                          >
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.links.demo && (
                          <Button
                            variant="outline"
                            asChild
                            className="hover:bg-accent hover:text-accent-foreground transition-all"
                          >
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo Video
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
