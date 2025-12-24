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
import { CATEGORY_COLORS } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
}

export function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS["Full-Stack"];

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
          relative h-full bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border transition-all duration-500 cursor-pointer touch-manipulation active:scale-[0.98]
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
          className={`absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500 ${
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
        <div className="relative flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <motion.div
            className="p-2 sm:p-3 rounded-lg"
            style={{ backgroundColor: colors.bg }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ color: colors.color }}>
              {/* Project-specific icons */}
              {project.id === "crave-connect" && (
                <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              )}
              {project.id === "ecohive" && (
                <Earth className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              )}
              {project.id === "muj-placement-portal" && (
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              )}

              {/* Category fallback icons */}
              {project.id !== "crave-connect" &&
                project.id !== "ecohive" &&
                project.id !== "muj-placement-portal" && (
                  <>
                    {project.category === "AI/ML" && (
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    )}
                    {project.category === "Full-Stack" && (
                      <Database className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    )}
                    {project.category === "Computer Vision" && (
                      <Eye className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    )}
                    {project.category === "Enterprise" && (
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    )}
                  </>
                )}
            </div>
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1 group-hover:text-primary transition-colors truncate">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Braces className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono text-muted-foreground truncate">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="relative text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Metrics/Badges - Show project highlights */}
        {project.badges && project.badges.length > 0 && (
          <div className="relative flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.badges.slice(0, 3).map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md bg-primary/10 border border-primary/20"
              >
                {badge.type === "performance" && (
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                )}
                {badge.type === "live" && (
                  <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500" />
                )}
                {badge.type === "deployed" && (
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-500" />
                )}
                {badge.type === "build" && (
                  <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-500" />
                )}
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-foreground">
                  {badge.value}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack Grid - Matching Skills Card Style */}
        <div className="relative flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies.slice(0, 6).map((tech, idx) => {
            const icon = (
              <TechIcon name={tech} className="h-3 w-3 sm:h-4 sm:w-4" />
            );
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
                className="group/tech relative touch-manipulation"
              >
                <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted/80 backdrop-blur-sm rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-border hover:border-primary/50 transition-all">
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
            <div className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-primary/20">
              <span className="text-primary">
                +{project.technologies.length - 6}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="relative flex flex-row gap-2 mb-3 sm:mb-4">
          {project.links?.live && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group/btn hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all h-9 sm:h-10 touch-manipulation active:scale-95"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                window.open(project.links.live, "_blank");
              }}
            >
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 group-hover/btn:scale-110 transition-transform" />
              <span className="font-mono text-[10px] sm:text-xs">
                Live Demo
              </span>
            </Button>
          )}
          {project.links?.github && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group/btn hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all h-9 sm:h-10 touch-manipulation active:scale-95"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                window.open(project.links.github, "_blank");
              }}
            >
              <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5 group-hover/btn:scale-110 transition-transform" />
              <span className="font-mono text-[10px] sm:text-xs">
                View Code
              </span>
            </Button>
          )}
        </div>

        {/* Code-style Footer - Matching Skills Card */}
        <div className="relative pt-3 sm:pt-4 border-t border-border/50 font-mono text-[10px] sm:text-xs text-muted-foreground">
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
        className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: colors.color }}
      />
    </motion.div>
  );
}
