"use client";

import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Zap,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Terminal,
  Shield,
  GitBranch,
  Activity,
  Target,
} from "lucide-react";
import { TimelineItem } from "@/types/experience";
import timelineData from "@/data/timeline.json";
import { format } from "date-fns";
import { useState, useRef } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { Card } from "@/components/ui/card";

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Trophy,
};

// Stats calculation
const timeline = timelineData as TimelineItem[];

// Reverse chronological order: Education → Achievements → Work
const sortedTimeline = [...timeline].sort((a, b) => {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
});

const workExperiences = timeline.filter((item) => item.type === "work").length;
const achievements = timeline.filter(
  (item) => item.type === "achievement"
).length;

const technicalBadges = [
  { label: "Production Ready", icon: Shield, color: "text-green-500" },
  { label: "CI/CD Automated", icon: GitBranch, color: "text-purple-500" },
  { label: "8M+ Data Points", icon: Activity, color: "text-orange-500" },
  { label: "40% Faster", icon: Target, color: "text-pink-500" },
  { label: "SAP Certified", icon: Award, color: "text-amber-500" },
]; // Stats calculation

const experienceStats = [
  {
    label: "Education",
    value: "B.Tech",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
    description: "Manipal University",
  },
  {
    label: "Work Experience",
    value: `${workExperiences}`,
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    description: "Professional role",
  },
  {
    label: "Achievements",
    value: `${achievements}+`,
    icon: Trophy,
    color: "from-amber-500 to-orange-500",
    description: "National recognitions",
  },
  {
    label: "Data point processed",
    value: "8M+",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    description: "Data points processed",
  },
];

export function TimelineSection() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-12 sm:pb-16 md:pb-20"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Hero Section - Centered Layout (Like Skills/Projects) */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          {/* Terminal Prompt */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center"
          >
            <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm">
              ~/experience
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary font-mono text-xs sm:text-sm"
            >
              _
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Career Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2"
          >
            From{" "}
            <span className="text-primary font-semibold">
              Computer Science Education
            </span>{" "}
            to{" "}
            <span className="text-primary font-semibold">
              National Recognition
            </span>{" "}
            and{" "}
            <span className="text-primary font-semibold">
              Enterprise Impact at ONGC
            </span>
            . A chronological journey showcasing continuous growth, technical
            excellence, and measurable real-world contributions.
          </motion.p>

          {/* Stats Grid - Matching Projects Page Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            {experienceStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-3 sm:p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-1.5 sm:gap-2"
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-primary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-center text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </Card>
              );
            })}
          </motion.div>
        </div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-4"
            >
              <GitBranch className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-mono text-primary">
                Journey Timeline
              </span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Interactive Career Path
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Follow my journey through code, achievements, and innovation.{" "}
              <span className="text-primary">
                Click to explore code snippets
              </span>{" "}
              and technical details.
            </p>

            {/* Technical Credibility Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2">
              {technicalBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full"
                  >
                    <Icon
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${badge.color}`}
                    />
                    <span className="text-[10px] sm:text-xs font-mono text-foreground/80">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative space-y-4 sm:space-y-6">
            {/* Vertical Line */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-purple-500 to-accent" />

            {sortedTimeline.map((item, index) => {
              const Icon = iconMap[item.type];
              const isExpanded = expandedItems.has(item.id);
              const hasMetrics = item.metrics && item.metrics.length > 0;
              const isExpandable = hasMetrics; // Items with metrics can expand
              const isAchievement = item.type === "achievement"; // Achievements show only start date

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="relative pl-14 sm:pl-20 md:pl-24"
                >
                  {/* Icon Marker */}
                  <motion.div
                    className="absolute left-0 sm:left-1 md:left-2 top-0"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className={`
                      w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                      border-4 border-background shadow-lg
                      ${
                        item.type === "work"
                          ? "bg-blue-500"
                          : item.type === "education"
                          ? "bg-purple-500"
                          : "bg-amber-500"
                      }
                    `}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => isExpandable && toggleItem(item.id)}
                    className={`
                      group relative bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6
                      transition-all duration-500 overflow-hidden touch-manipulation
                      ${isExpandable ? "cursor-pointer" : ""}
                      ${
                        isExpanded
                          ? "border-primary shadow-2xl shadow-primary/20"
                          : "border-border hover:border-primary/50 hover:shadow-xl"
                      }
                    `}
                  >
                    {/* Scan Line Effect - Only for ONGC when expanded */}
                    {isExpanded && isExpandable && (
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

                    {/* Background Gradient */}
                    <div
                      className={`
                      absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity
                      ${
                        item.type === "work"
                          ? "bg-linear-to-br from-blue-500 to-cyan-500"
                          : item.type === "education"
                          ? "bg-linear-to-br from-purple-500 to-pink-500"
                          : "bg-linear-to-br from-amber-500 to-orange-500"
                      }
                    `}
                    />

                    {/* Content */}
                    <div className="relative">
                      {/* Header */}
                      <div className="mb-3 sm:mb-4">
                        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                          </motion.div>
                        </div>

                        <p className="text-primary font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                          <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                          {item.organization}
                        </p>

                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                            <span className="font-mono">
                              {format(new Date(item.startDate), "MMM yyyy")}
                              {!isAchievement &&
                                item.endDate &&
                                ` - ${format(
                                  new Date(item.endDate),
                                  "MMM yyyy"
                                )}`}
                              {!isAchievement && !item.endDate && " - Present"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent shrink-0" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        {item.description.map((desc, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              delay: 0.9 + index * 0.1 + idx * 0.05,
                            }}
                            className="text-xs sm:text-sm md:text-base text-foreground/90 flex items-start gap-2 sm:gap-3"
                          >
                            <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 shrink-0" />
                            <span>{desc}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Expandable Metrics */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {item.metrics && item.metrics.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4 pt-2">
                            {item.metrics.map((metric, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={
                                  isExpanded
                                    ? { scale: 1, opacity: 1 }
                                    : { scale: 0.8, opacity: 0 }
                                }
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group/metric bg-muted/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-border hover:border-primary/50 transition-all touch-manipulation"
                              >
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 font-mono">
                                  {metric.value}
                                </div>
                                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium">
                                  {metric.label}
                                </div>

                                {/* Metric Icon */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover/metric:opacity-100 transition-opacity">
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {item.tags.map((tag, idx) => {
                          const icon = (
                            <TechIcon
                              name={tag}
                              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                            />
                          );
                          return (
                            <motion.div
                              key={idx}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={isInView ? { scale: 1, opacity: 1 } : {}}
                              transition={{
                                delay: 1 + index * 0.1 + idx * 0.03,
                                type: "spring",
                                stiffness: 200,
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="group/tag touch-manipulation"
                            >
                              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-muted/80 backdrop-blur-sm rounded-md sm:rounded-lg text-[10px] sm:text-xs md:text-sm font-medium border border-border hover:border-primary/50 transition-all">
                                <div className="group-hover/tag:scale-110 transition-transform">
                                  {icon}
                                </div>
                                <span className="group-hover/tag:text-primary transition-colors">
                                  {tag}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Expand Indicator - Only for ONGC */}
                      {isExpandable && hasMetrics && (
                        <div className="text-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                            {isExpanded ? (
                              <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                                <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                Click to collapse metrics
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                                <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                Click to view impact metrics
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
