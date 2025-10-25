"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Database,
  Search,
  Zap,
  Users,
  Target,
  Clock,
  Award,
  Container,
  Eye,
  Video,
  Crosshair,
  Trophy,
  ArrowUpRight,
} from "lucide-react";
import { Project } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/ui/TechIcon";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  database: Database,
  search: Search,
  users: Users,
  "shield-check": Target,
  clock: Clock,
  target: Target,
  zap: Zap,
  eye: Eye,
  video: Video,
  crosshair: Crosshair,
  trophy: Trophy,
  award: Award,
  container: Container,
};

const getIcon = (iconName?: string) => {
  if (!iconName) return Database;
  return iconMap[iconName] || Database;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    "AI/ML": {
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/5",
      text: "text-purple-500",
    },
    "Full-Stack": {
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/5",
      text: "text-blue-500",
    },
    "Computer Vision": {
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-500/5",
      text: "text-green-500",
    },
    Enterprise: {
      gradient: "from-orange-500 to-yellow-500",
      bg: "bg-orange-500/5",
      text: "text-orange-500",
    },
  };

  const colors =
    categoryColors[project.category] || categoryColors["Full-Stack"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer h-full group"
    >
      <Card className="p-6 h-full flex flex-col hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden bg-card backdrop-blur-sm">
        {/* Animated gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Category gradient line with animation */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${colors.gradient}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Hover glow effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Title and description */}
          <div className="mt-2 mb-4">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
              {project.title}
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </motion.div>
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Status badges only */}
            {project.badges && project.badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {project.badges.slice(0, 3).map((badge, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.4 }}
                    className={`
                      ${badge.type === "live" ? "badge-live" : ""}
                      ${badge.type === "deployed" ? "badge-deployed" : ""}
                      ${badge.type === "performance" ? "badge-performance" : ""}
                      ${
                        badge.type === "build"
                          ? "inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded-md text-xs font-semibold"
                          : ""
                      }
                    `}
                  >
                    {badge.type === "live" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                    {badge.value}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Metrics with hover animation */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.slice(0, 3).map((metric, idx) => {
              const Icon = getIcon(metric.icon);
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group/metric"
                >
                  <div className="text-center p-2.5 bg-muted/50 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/80 transition-all">
                    <Icon className="h-4 w-4 mx-auto mb-1 text-primary group-hover/metric:scale-110 transition-transform" />
                    <div className="text-sm font-bold font-mono">
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate uppercase tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tech stack with staggered animation */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-border group-hover:bg-primary/20 transition-colors" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Tech Stack
              </span>
              <div className="h-px flex-1 bg-border group-hover:bg-primary/20 transition-colors" />
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, idx) => {
                const icon = <TechIcon name={tech} className="h-4 w-4" />;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.05 + 0.5,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="group/tech"
                  >
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/80 rounded-lg hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all"
                      title={tech}
                    >
                      <div className="group-hover/tech:scale-110 group-hover/tech:rotate-12 transition-transform">
                        {icon}
                      </div>
                      <span className="text-xs font-medium group-hover/tech:text-primary transition-colors">
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
              {project.technologies.length > 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center px-2.5 py-1.5 bg-muted/50 text-xs rounded-lg font-mono text-muted-foreground border border-dashed border-border"
                >
                  +{project.technologies.length - 5}
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          {project.links && (project.links.github || project.links.live) && (
            <motion.div
              className="flex gap-2 mt-auto pt-4 border-t border-border group-hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {project.links.github && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-semibold"
                >
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </a>
                </Button>
              )}
              {project.links.live && (
                <Button
                  size="sm"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 group/btn bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold"
                >
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Demo
                  </a>
                </Button>
              )}
            </motion.div>
          )}

          {/* Subtle "Click to view" hint */}
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs font-mono text-primary/60">
              Click for details →
            </span>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className={`absolute -bottom-10 -right-10 w-20 h-20 bg-linear-to-tl ${colors.gradient} opacity-10 rounded-full blur-xl`}
          />
        </div>
      </Card>
    </motion.div>
  );
}
