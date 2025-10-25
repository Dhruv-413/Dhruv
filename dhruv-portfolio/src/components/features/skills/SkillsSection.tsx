"use client";

import { motion, useInView } from "framer-motion";
import skillsData from "@/data/skills.json";
import { useRef, useState } from "react";
import TechIcon from "@/components/ui/TechIcon";
import {
  Code,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Terminal,
  Braces,
  Layers,
  Zap,
  Rocket,
} from "lucide-react";

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "AI/ML": Sparkles,
  Backend: Database,
  Frontend: Code,
  Enterprise: Cpu,
  "Data Science": Database,
  DevOps: Cloud,
};

// Skills code snippet matching Hero.tsx style
const skillsCodeSnippet = `// My Technical Skills
const skills = {
  frontend: {
    frameworks: ["React.js", "Next.js"],
    languages: ["TypeScript", "JavaScript"],
    styling: ["Tailwind CSS"]
  },

  backend: {
    languages: ["Python", "Go"],
    frameworks: ["FastAPI"],
    databases: ["PostgreSQL"],
  },

  aiml: {
    frameworks: ["PyTorch", "TensorFlow"],
    libraries: ["Scikit-learn", "OpenCV"],
    focus: "Deep Learning & CV"
  },

  devops: {
    tools: ["Docker", "Git"],
    platforms: ["GitHub Actions"],
    practices: "CI/CD Automation"
  },

  enterprise: ["SAP ABAP"],
  dataScience: ["Pandas", "NumPy"],

  continuousLearning: true,
  passionDriven: true
};`;

// Calculate stats
const totalTechnologies = skillsData
  .flatMap((cat) => cat.skills)
  .filter((skill, index, self) => self.indexOf(skill) === index).length;

const skillStats = [
  { label: "Technologies", value: `${totalTechnologies}+`, icon: Code },
  { label: "Categories", value: skillsData.length.toString(), icon: Layers },
  { label: "Projects Built", value: "10+", icon: Rocket },
  { label: "Always Learning", value: "∞", icon: Sparkles },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-20"
    >
      {/* Enhanced Animated Background - Matching Hero.tsx */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.05, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Skills Hero Content - Matching Hero.tsx Layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Skills Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Terminal Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4 justify-center lg:justify-start"
              >
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-primary font-mono text-sm">~/skills</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-primary font-mono"
                >
                  _
                </motion.span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Technical Arsenal
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6"
              >
                Full-Stack • AI/ML • DevOps
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-base text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Comprehensive technical expertise across{" "}
                <span className="text-primary font-semibold">
                  {totalTechnologies}+ technologies
                </span>
                , spanning {skillsData.length} domains. From modern web
                frameworks to AI/ML and enterprise software, building{" "}
                <span className="text-primary font-semibold">
                  production-ready
                </span>{" "}
                solutions with best practices.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {skillStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group"
                  >
                    <stat.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-lg font-bold font-mono">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Categories Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {skillsData.map((category, idx) => {
                    const Icon = categoryIcons[category.category] || Code;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all cursor-pointer group"
                        style={{
                          borderColor:
                            activeCategory === category.category
                              ? category.color
                              : undefined,
                        }}
                        onMouseEnter={() =>
                          setActiveCategory(category.category)
                        }
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        <div className="flex items-center gap-2">
                          <div style={{ color: category.color }}>
                            <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-sm font-semibold">
                            {category.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({category.skills.length})
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Code Snippet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    skills.ts
                  </span>
                </div>

                {/* Code Content */}
                <div className="relative">
                  <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto max-h-[600px] custom-scrollbar">
                    <code className="language-typescript">
                      {skillsCodeSnippet}
                    </code>
                  </pre>

                  {/* Gradient Fade at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-card/90 to-transparent pointer-events-none" />
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-t border-border/50 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">● TypeScript</span>
                    <span className="text-primary">UTF-8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-muted-foreground">
                      Production Ready
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detailed Skills Section Below */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        ref={containerRef}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Skills Breakdown
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Detailed overview of technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {skillsData.map((skillCategory, index) => {
            const Icon = categoryIcons[skillCategory.category] || Code;
            const isActive = activeCategory === skillCategory.category;

            return (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                onMouseEnter={() => setActiveCategory(skillCategory.category)}
                onMouseLeave={() => setActiveCategory(null)}
                className="group relative"
              >
                {/* Card Container */}
                <div
                  className={`
                  relative h-full bg-card rounded-xl p-6 border transition-all duration-500
                  ${
                    isActive
                      ? "border-primary shadow-2xl shadow-primary/20 scale-105"
                      : "border-border hover:border-primary/50"
                  }
                `}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                      isActive ? "opacity-10" : "opacity-0"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${skillCategory.color}40, transparent)`,
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

                  {/* Header with Icon */}
                  <div className="relative flex items-center gap-3 mb-6">
                    <motion.div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${skillCategory.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div style={{ color: skillCategory.color }}>
                        <Icon className="h-7 w-7" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1">
                        {skillCategory.category}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Braces className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">
                          {skillCategory.skills.length} technologies
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid with Hover Effects */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skillCategory.skills.map((skill, idx) => {
                      const icon = (
                        <TechIcon name={skill} className="h-4 w-4" />
                      );
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + idx * 0.05,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -3,
                            boxShadow: `0 4px 12px ${skillCategory.color}40`,
                          }}
                          className="group/skill relative"
                        >
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/80 backdrop-blur-sm rounded-lg text-sm font-medium border border-border hover:border-primary/50 transition-all cursor-pointer">
                            <div className="group-hover/skill:scale-110 transition-transform">
                              {icon}
                            </div>
                            <span className="group-hover/skill:text-primary transition-colors">
                              {skill}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Code-style Footer */}
                  <div className="relative pt-4 border-t border-border/50 font-mono text-xs text-muted-foreground">
                    <span className="text-primary">{"// "}</span>
                    <span className="italic">Production-ready stack</span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: skillCategory.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
