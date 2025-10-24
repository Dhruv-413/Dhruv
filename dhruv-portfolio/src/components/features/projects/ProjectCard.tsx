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
} from "lucide-react";
import { Project } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/ui/TechIcon";

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
  const categoryColors = {
    "AI/ML": "from-purple-500 to-pink-500",
    "Full-Stack": "from-blue-500 to-cyan-500",
    "Computer Vision": "from-green-500 to-emerald-500",
    Enterprise: "from-orange-500 to-yellow-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <Card className="p-6 h-full flex flex-col hover:border-primary/50 transition-colors relative overflow-hidden group">
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              Featured
            </span>
          </div>
        )}

        {/* Category gradient line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${
            categoryColors[project.category]
          }`}
        />

        <div className="mt-2 mb-4">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {project.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Category badge */}
            <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md">
              {project.category}
            </span>

            {/* Status badges */}
            {project.badges?.map((badge, idx) => (
              <span
                key={idx}
                className={`
                  ${badge.type === "live" ? "badge-live" : ""}
                  ${badge.type === "deployed" ? "badge-deployed" : ""}
                  ${badge.type === "performance" ? "badge-performance" : ""}
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
                {badge.value}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {project.metrics.slice(0, 3).map((metric, idx) => {
            const Icon = getIcon(metric.icon);
            return (
              <div
                key={idx}
                className="text-center p-2 bg-card/50 rounded-lg border border-border hover-glow"
              >
                <Icon className="h-4 w-4 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">{metric.value}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 5).map((tech, idx) => {
            const icon = <TechIcon name={tech} className="h-4 w-4" />;
            return (
              <div
                key={idx}
                className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                title={tech}
              >
                {icon}
                <span className="text-xs text-muted-foreground">{tech}</span>
              </div>
            );
          })}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Links - Enhanced CTAs */}
        {project.links && (project.links.github || project.links.live) && (
          <div className="flex gap-2 pt-4 border-t border-border">
            {project.links.github && (
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
                className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
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
                className="flex-1 group/btn bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all"
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
          </div>
        )}
      </Card>
    </motion.div>
  );
}
