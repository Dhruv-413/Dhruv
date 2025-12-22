"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Database,
  Target,
  Braces,
  Zap,
  Eye,
  UtensilsCrossed,
  Earth,
  Briefcase,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import TechIcon from "@/components/ui/TechIcon";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
}

export function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  const categoryColors: Record<string, { color: string; bg: string }> = {
    "AI/ML": { color: "#a855f7", bg: "#a855f720" },
    "Full-Stack": { color: "#3b82f6", bg: "#3b82f620" },
    "Computer Vision": { color: "#10b981", bg: "#10b98120" },
    Enterprise: { color: "#f59e0b", bg: "#f59e0b20" },
  };

  const colors =
    categoryColors[project.category] || categoryColors["Full-Stack"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="group relative h-full"
    >
      {/* Card Container - Matching Skills Card Style */}
      <div
        className={`
          relative h-full bg-card rounded-xl p-6 border transition-all duration-500 cursor-pointer
          ${
            isActive
              ? "border-primary shadow-2xl shadow-primary/20 scale-105"
              : "border-border hover:border-primary/50"
          }
        `}
        onClick={onClick}
      >
        {/* Animated Background */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isActive ? "opacity-10" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(135deg, ${colors.color}40, transparent)`,
          }}
        />

        {/* Scan Line Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-x-0 h-px bg-primary/50"
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Header with Icon - Matching Skills Card */}
        <div className="relative flex items-center gap-3 mb-4">
          <motion.div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.bg }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ color: colors.color }}>
              {/* Project-specific icons */}
              {project.id === "crave-connect" && (
                <UtensilsCrossed className="h-7 w-7" />
              )}
              {project.id === "ecohive" && <Earth className="h-7 w-7" />}
              {project.id === "muj-placement-portal" && (
                <Briefcase className="h-7 w-7" />
              )}

              {/* Category fallback icons */}
              {project.id !== "crave-connect" &&
                project.id !== "ecohive" &&
                project.id !== "muj-placement-portal" && (
                  <>
                    {project.category === "AI/ML" && (
                      <Zap className="h-7 w-7" />
                    )}
                    {project.category === "Full-Stack" && (
                      <Database className="h-7 w-7" />
                    )}
                    {project.category === "Computer Vision" && (
                      <Eye className="h-7 w-7" />
                    )}
                    {project.category === "Enterprise" && (
                      <Target className="h-7 w-7" />
                    )}
                  </>
                )}
            </div>
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <Braces className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="relative text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Metrics/Badges - Show project highlights */}
        {project.badges && project.badges.length > 0 && (
          <div className="relative flex flex-wrap gap-2 mb-4">
            {project.badges.slice(0, 3).map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-primary/10 border border-primary/20"
              >
                {badge.type === "performance" && (
                  <TrendingUp className="h-3 w-3 text-primary" />
                )}
                {badge.type === "live" && (
                  <Zap className="h-3 w-3 text-green-500" />
                )}
                {badge.type === "deployed" && (
                  <Users className="h-3 w-3 text-blue-500" />
                )}
                {badge.type === "build" && (
                  <Award className="h-3 w-3 text-purple-500" />
                )}
                <span className="text-xs font-mono font-semibold text-foreground">
                  {badge.value}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack Grid - Matching Skills Card Style */}
        <div className="relative flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 6).map((tech, idx) => {
            const icon = <TechIcon name={tech} className="h-4 w-4" />;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + idx * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  boxShadow: `0 4px 12px ${colors.color}40`,
                }}
                className="group/tech relative"
              >
                <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/80 backdrop-blur-sm rounded-lg text-sm font-medium border border-border hover:border-primary/50 transition-all">
                  <div className="group-hover/tech:scale-110 transition-transform">
                    {icon}
                  </div>
                  <span className="group-hover/tech:text-primary transition-colors">
                    {tech}
                  </span>
                </div>
              </motion.div>
            );
          })}
          {project.technologies.length > 6 && (
            <div className="flex items-center px-3 py-2 bg-primary/5 rounded-lg text-sm font-medium border border-primary/20">
              <span className="text-primary">
                +{project.technologies.length - 6}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="relative flex gap-2 mb-4">
          {project.links?.live && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group/btn hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              window.open(project.links.live, "_blank");
              }}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
              <span className="font-mono text-xs">Live Demo</span>
            </Button>
          )}
          {project.links?.github && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group/btn hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                window.open(project.links.github, "_blank");
              }}
            >
              <Github className="h-3.5 w-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
              <span className="font-mono text-xs">View Code</span>
            </Button>
          )}
        </div>

        {/* Code-style Footer - Matching Skills Card */}
        <div className="relative pt-4 border-t border-border/50 font-mono text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary">{"// "}</span>
              <span className="italic">Click for details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accent - Matching Skills Card */}
      <div
        className="absolute -top-1 -right-1 w-8 h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: colors.color }}
      />
    </motion.div>
  );
}
