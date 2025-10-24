"use client";

import { motion, useInView } from "framer-motion";
import skillsData from "@/data/skills.json";
import { useRef } from "react";
import TechIcon from "@/components/ui/TechIcon";
import { Code, Sparkles, Cpu, Database, Cloud, Zap } from "lucide-react";
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

  return (
    <section
      id="skills"
      className="py-20 bg-linear-to-b from-background via-card/30 to-background"
    >
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-primary">Tech Stack</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Skills & Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive overview of my technical proficiency across
              different domains, backed by real-world projects and continuous
              learning.
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid - Modern Card Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((skillCategory, index) => {
            const Icon = categoryIcons[skillCategory.category] || Code;
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
                className="group"
              >
                <div className="relative h-full bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${skillCategory.color}20, transparent)`,
                    }}
                  />

                  {/* Icon & Category Header */}
                  <div className="relative flex items-center gap-3 mb-4">
                    <div
                      className="p-3 rounded-lg transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: `${skillCategory.color}20` }}
                    >
                      <div style={{ color: skillCategory.color }}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {skillCategory.category}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs font-mono text-muted-foreground">
                          Proficiency
                        </div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: skillCategory.color }}
                        >
                          {skillCategory.proficiency}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="relative w-full bg-muted rounded-full h-2 mb-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${skillCategory.proficiency}%` }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1 + 0.3,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: skillCategory.color }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill, idx) => {
                      const icon = (
                        <TechIcon name={skill} className="h-4 w-4" />
                      );
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + idx * 0.05 + 0.5,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-md text-sm font-medium border border-transparent hover:border-primary/30 transition-all cursor-default"
                        >
                          {icon}
                          <span>{skill}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Showcase - Icon Grid */}
        <ScrollReveal delay={0.3}>
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-purple-500/5 to-accent/5 rounded-2xl blur-3xl" />

            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Technologies I Work With
                </h3>
                <p className="text-muted-foreground text-sm">
                  Hover over each technology to see it in action
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {skillsData
                  .flatMap((cat) => cat.skills)
                  .map((skill, idx) => {
                    const icon = <TechIcon name={skill} className="h-6 w-6" />;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: idx * 0.03,
                        }}
                        whileHover={{
                          scale: 1.15,
                          y: -5,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative"
                      >
                        <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10">
                          <div className="group-hover:rotate-12 transition-transform duration-300">
                            {icon}
                          </div>
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {skill}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Banner */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Technologies",
                value: skillsData.flatMap((c) => c.skills).length,
                icon: Code,
              },
              { label: "Categories", value: skillsData.length, icon: Cpu },
              {
                label: "Avg Proficiency",
                value: `${Math.round(
                  skillsData.reduce((acc, s) => acc + s.proficiency, 0) /
                    skillsData.length
                )}%`,
                icon: Zap,
              },
              { label: "Years Experience", value: "2+", icon: Sparkles },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.8 }}
                className="text-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all group"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold mb-1 gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
