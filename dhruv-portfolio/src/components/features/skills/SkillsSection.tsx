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
  GitBranch,
  Layers,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export function SkillsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[14px_24px] opacity-20" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Header with Terminal Effect */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-primary/20 rounded-full mb-6 backdrop-blur-sm">
              <Terminal className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-mono text-primary">~/skills</span>
              <span className="w-2 h-4 bg-primary animate-pulse" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text">
              Technical Arsenal
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive technical expertise across modern development stacks
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Category Cards - No Proficiency Bars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                onHoverStart={() => setActiveCategory(skillCategory.category)}
                onHoverEnd={() => setActiveCategory(null)}
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

        {/* Technology Grid - Interactive Showcase */}
        <ScrollReveal delay={0.3}>
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-purple-500/5 to-accent/5 rounded-3xl blur-3xl" />

            <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                  <h3 className="text-3xl font-bold gradient-text">
                    Complete Tech Stack
                  </h3>
                </div>
                <p className="text-muted-foreground font-mono text-sm">
                  <span className="text-green-500">✓</span> Click to interact •
                  Hover for details
                </p>
              </div>

              {/* Filterable Tech Grid */}
              <div className="flex flex-wrap justify-center gap-3">
                {skillsData
                  .flatMap((cat) => cat.skills)
                  .filter((skill, index, self) => self.indexOf(skill) === index) // Remove duplicates
                  .map((skill, idx) => {
                    const icon = <TechIcon name={skill} className="h-6 w-6" />;
                    const category = skillsData.find((cat) =>
                      cat.skills.includes(skill)
                    );

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={
                          isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                        }
                        transition={{
                          duration: 0.5,
                          delay: idx * 0.02,
                          type: "spring",
                          stiffness: 150,
                        }}
                        whileHover={{
                          scale: 1.2,
                          y: -8,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="group/tech relative"
                      >
                        <div className="flex items-center gap-2 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border rounded-xl hover:border-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
                          <div className="group-hover/tech:rotate-12 group-hover/tech:scale-110 transition-transform duration-300">
                            {icon}
                          </div>
                          <span className="text-sm font-semibold group-hover/tech:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>

                        {/* Enhanced Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono rounded-lg opacity-0 group-hover/tech:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-primary/20">
                          <div className="font-bold">{skill}</div>
                          {category && (
                            <div className="text-primary-foreground/80 text-[10px]">
                              {category.category}
                            </div>
                          )}
                          {/* Arrow */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Dashboard with Code Theme */}
        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Technologies",
                value: skillsData
                  .flatMap((c) => c.skills)
                  .filter((s, i, arr) => arr.indexOf(s) === i).length,
                icon: Code,
                color: "#3b82f6",
                prefix: "const total =",
              },
              {
                label: "Domains",
                value: skillsData.length,
                icon: Layers,
                color: "#8b5cf6",
                prefix: "let domains =",
              },
              {
                label: "Projects",
                value: "10+",
                icon: GitBranch,
                color: "#10b981",
                prefix: "var projects =",
              },
              {
                label: "Experience",
                value: "1+ yrs",
                icon: Sparkles,
                color: "#f59e0b",
                prefix: "const exp =",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.8 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 10px 30px ${stat.color}20`,
                }}
                className="relative group/stat"
              >
                <div className="text-center p-6 bg-card/90 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all overflow-hidden">
                  {/* Animated Background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/stat:opacity-5 transition-opacity"
                    style={{ backgroundColor: stat.color }}
                  />

                  <stat.icon
                    className="h-10 w-10 mx-auto mb-4 group-hover/stat:scale-125 transition-transform duration-300"
                    style={{ color: stat.color }}
                  />

                  {/* Code-style prefix */}
                  <div className="text-xs font-mono text-muted-foreground mb-2">
                    {stat.prefix}
                  </div>

                  <div
                    className="text-4xl font-bold mb-2 font-mono"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>

                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>

                  {/* Semicolon decoration */}
                  <div className="text-primary/50 font-mono text-lg mt-1">
                    ;
                  </div>
                </div>

                {/* Corner glow */}
                <div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover/stat:opacity-50 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Code Snippet Preview - Easter Egg */}
        <ScrollReveal delay={0.7}>
          <motion.div
            className="mt-16 relative group/code cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-auto">
                  skills.config.ts
                </span>
              </div>

              <div className="font-mono text-sm space-y-1">
                <div>
                  <span className="text-purple-500">export</span>{" "}
                  <span className="text-blue-500">const</span>{" "}
                  <span className="text-yellow-500">skillCategories</span> ={" "}
                  {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-green-500">frontend</span>: [
                  <span className="text-orange-500">
                    React, Next.js, TypeScript
                  </span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-green-500">backend</span>: [
                  <span className="text-orange-500">Node.js, Python, Java</span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-green-500">aiml</span>: [
                  <span className="text-orange-500">
                    TensorFlow, PyTorch, OpenCV
                  </span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-green-500">cloud</span>: [
                  <span className="text-orange-500">
                    AWS, Docker, Kubernetes
                  </span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-red-500">passion</span>:{" "}
                  <span className="text-primary">Infinite</span> 💫
                </div>
                <div>{"};"}</div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
