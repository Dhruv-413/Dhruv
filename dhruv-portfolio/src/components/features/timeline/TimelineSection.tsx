"use client";

import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Code,
  Zap,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart3,
} from "lucide-react";
import { TimelineItem } from "@/types/experience";
import timelineData from "@/data/timeline.json";
import { format } from "date-fns";
import { useState, useRef } from "react";
import { TechIcon } from "@/components/ui/TechIcon";

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Trophy,
}; // Stats calculation
const timeline = timelineData as TimelineItem[];
const workExperiences = timeline.filter((item) => item.type === "work").length;
const achievements = timeline.filter(
  (item) => item.type === "achievement"
).length;
const totalTechnologies = Array.from(
  new Set(timeline.flatMap((item) => item.tags))
).length;

const experienceStats = [
  {
    label: "Work Experience",
    value: `${workExperiences}`,
    icon: Briefcase,
    color: "#3b82f6",
    description: "Professional roles",
  },
  {
    label: "Achievements",
    value: `${achievements}`,
    icon: Trophy,
    color: "#f59e0b",
    description: "National recognitions",
  },
  {
    label: "Technologies",
    value: `${totalTechnologies}+`,
    icon: Code,
    color: "#8b5cf6",
    description: "Tools & frameworks",
  },
  {
    label: "Impact",
    value: "8M+",
    icon: TrendingUp,
    color: "#10b981",
    description: "Data points processed",
  },
];

export function TimelineSection() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<
    "all" | "work" | "education" | "achievement"
  >("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleItem = (id: string) => {
    // Only allow ONGC intern to expand (it has metrics)
    if (id !== "ongc-2025") return;

    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredTimeline =
    activeFilter === "all"
      ? timeline
      : timeline.filter((item) => item.type === activeFilter);

  const filterCategories = [
    { id: "all", label: "All", icon: Target, count: timeline.length },
    {
      id: "work",
      label: "Work",
      icon: Briefcase,
      count: timeline.filter((t) => t.type === "work").length,
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      count: timeline.filter((t) => t.type === "education").length,
    },
    {
      id: "achievement",
      label: "Achievements",
      icon: Trophy,
      count: timeline.filter((t) => t.type === "achievement").length,
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-20"
    >
      {/* Animated Background - Hero.tsx Style */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--primary-rgb, 99, 102, 241), 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(var(--primary-rgb, 99, 102, 241), 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section - Centered Single Column (No Code Snippet) */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          {/* Terminal Prompt */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 justify-center"
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              ~/experience
            </span>
            <span className="w-2 h-4 bg-primary animate-pulse ml-1" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Career Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-mono mb-6"
          >
            Work • Education • Achievements
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            From processing{" "}
            <span className="text-primary font-semibold">8M+ data points</span>{" "}
            at ONGC to achieving{" "}
            <span className="text-accent font-semibold">Top 50/2000+</span> in
            national hackathons. A timeline of{" "}
            <span className="text-purple-500 font-semibold">
              continuous growth
            </span>
            , learning, and impact.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {experienceStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon
                      className="h-6 w-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div
                    className="text-3xl font-bold font-mono"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground/80">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {stat.description}
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {filterCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeFilter === category.id;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setActiveFilter(
                      category.id as
                        | "all"
                        | "work"
                        | "education"
                        | "achievement"
                    )
                  }
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm
                    transition-all duration-300 border backdrop-blur-sm
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                        : "bg-card/50 text-muted-foreground border-border hover:border-primary/50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span
                    className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                  >
                    {category.count}
                  </span>
                </motion.button>
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
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
            >
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-primary">
                Timeline View
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Timeline
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my professional journey, education, and achievements.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative space-y-6">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-purple-500 to-accent" />

            {filteredTimeline.map((item, index) => {
              const Icon = iconMap[item.type];
              const isExpanded = expandedItems.has(item.id);
              const hasMetrics = item.metrics && item.metrics.length > 0;
              const isExpandable = item.id === "ongc-2025"; // Only ONGC can expand

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
                  className="relative pl-20 md:pl-24"
                >
                  {/* Icon Marker */}
                  <motion.div
                    className="absolute left-0 md:left-2 top-0"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center
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
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => isExpandable && toggleItem(item.id)}
                    className={`
                      group relative bg-card border rounded-2xl p-6
                      transition-all duration-500 overflow-hidden
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
                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                        </div>

                        <p className="text-primary font-semibold text-lg mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          {item.organization}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-mono">
                              {format(new Date(item.startDate), "MMM yyyy")}
                              {item.endDate &&
                                ` - ${format(
                                  new Date(item.endDate),
                                  "MMM yyyy"
                                )}`}
                              {!item.endDate && " - Present"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              delay: 0.9 + index * 0.1 + idx * 0.05,
                            }}
                            className="text-sm md:text-base text-foreground/90 flex items-start gap-3"
                          >
                            <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
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
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pt-2">
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
                                className="relative group/metric bg-muted/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border hover:border-primary/50 transition-all"
                              >
                                <div className="text-2xl md:text-3xl font-bold text-primary mb-1 font-mono">
                                  {metric.value}
                                </div>
                                <div className="text-xs md:text-sm text-muted-foreground font-medium">
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
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => {
                          const icon = (
                            <TechIcon name={tag} className="h-3 w-3" />
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
                              className="group/tag"
                            >
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/80 backdrop-blur-sm rounded-lg text-xs md:text-sm font-medium border border-border hover:border-primary/50 transition-all">
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
                        <div className="text-center mt-4 pt-4 border-t border-border/50">
                          <span className="text-xs font-mono text-muted-foreground">
                            {isExpanded ? (
                              <span className="flex items-center justify-center gap-2">
                                <ChevronUp className="h-3 w-3" />
                                Click to collapse metrics
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <ChevronDown className="h-3 w-3" />
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
