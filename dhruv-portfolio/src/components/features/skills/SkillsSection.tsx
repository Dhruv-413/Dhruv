"use client";

import { motion, useInView } from "framer-motion";
import skillsData from "@/data/skills.json";
import certificationsData from "@/data/certifications.json";
import { useRef, useState } from "react";
import TechIcon from "@/components/ui/TechIcon";
import { CodeSnippetWindow } from "@/components/ui/CodeSnippetWindow";
import { CategoryCard, CategoryCardFooter } from "@/components/ui/CategoryCard";
import { Badge, BadgeGroup } from "@/components/ui/Badge";
import {
  Code,
  Sparkles,
  Cpu,
  Database,
  Cloud,
  Terminal,
  Braces,
  Layers,
  Rocket,
  Award,
  ExternalLink,
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

// Memoized stats calculation
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
      className="relative min-h-screen overflow-hidden pt-16 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Skills Hero Content - Matching Hero.tsx Layout */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Skills Content */}
            <div className="text-center lg:text-left order-1 lg:order-1">
              {/* Terminal Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 justify-center lg:justify-start"
              >
                <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-primary font-mono text-xs sm:text-sm">
                  ~/skills
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
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
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-4 sm:mb-6"
              >
                Full-Stack • AI/ML • DevOps
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 lg:px-0"
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
                className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8"
              >
                {skillStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group touch-manipulation active:scale-95"
                  >
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-base sm:text-lg font-bold font-mono">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">
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
                className="mb-6 sm:mb-8 lg:mb-0"
              >
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                  {skillsData.map((category, idx) => {
                    const Icon = categoryIcons[category.category] || Code;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/50 transition-all cursor-pointer group touch-manipulation active:scale-95"
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
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div style={{ color: category.color }}>
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold">
                            {category.category}
                          </span>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">
                            ({category.skills.length})
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Code Snippet using reusable component */}
            <CodeSnippetWindow
              code={skillsCodeSnippet}
              filename="skills.ts"
              language="TypeScript"
              maxHeight="600px"
            />
          </div>
        </div>
      </div>

      {/* Detailed Skills Section Below */}
      <div
        className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        ref={containerRef}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Skills Breakdown
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Detailed overview of technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid using CategoryCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {skillsData.map((skillCategory, index) => {
            const Icon = categoryIcons[skillCategory.category] || Code;
            const isActive = activeCategory === skillCategory.category;

            return (
              <CategoryCard
                key={skillCategory.category}
                title={skillCategory.category}
                color={skillCategory.color}
                icon={Icon}
                itemCount={skillCategory.skills.length}
                isActive={isActive}
                isInView={isInView}
                animationDelay={index * 0.1}
                onMouseEnter={() => setActiveCategory(skillCategory.category)}
                onMouseLeave={() => setActiveCategory(null)}
                footer={<CategoryCardFooter />}
              >
                {/* Skills Grid with Hover Effects */}
                <BadgeGroup className="mb-3 sm:mb-4">
                  {skillCategory.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      label={skill}
                      icon={
                        <TechIcon
                          name={skill}
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        />
                      }
                      variant="tech"
                      clickable
                      isInView={isInView}
                      animationDelay={index * 0.1 + idx * 0.05}
                      color={skillCategory.color}
                    />
                  ))}
                </BadgeGroup>
              </CategoryCard>
            );
          })}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          {/* Certifications Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 justify-center">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-primary font-mono text-xs sm:text-sm">
                ~/certifications
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-primary font-mono text-xs sm:text-sm"
              >
                _
              </motion.span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
              Certifications & Credentials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Professional certifications validating expertise in AI/ML, Data
              Science, and Software Engineering
            </p>
          </div>

          {/* Certifications Grid - Styled Like Skill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
            {certificationsData.map((cert, index) => {
              // Use consistent purple accent color for ALL certificates
              const certColor = "#8b5cf6";

              // Format date consistently to avoid hydration mismatch
              const dateObj = new Date(cert.date);
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const formattedDate = `${
                months[dateObj.getMonth()]
              } ${dateObj.getFullYear()}`;

              return (
                <motion.a
                  key={cert.credentialId}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="group relative touch-manipulation block"
                >
                  {/* Card Container - Matching Skill Card Style */}
                  <div className="relative h-full bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border transition-all duration-500 active:scale-[0.98] border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105">
                    {/* Animated Background - Like Skill Cards */}
                    <div
                      className="absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-10"
                      style={{
                        background: `linear-gradient(135deg, ${certColor}40, transparent)`,
                      }}
                    />

                    {/* Scan Line Effect - Like Skill Cards */}
                    <motion.div
                      className="absolute inset-x-0 h-px bg-primary/50 opacity-0 group-hover:opacity-100"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Header with Icon - Matching Skill Card Style */}
                    <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6">
                      <motion.div
                        className="p-2 sm:p-2.5 lg:p-3 rounded-lg shrink-0"
                        style={{ backgroundColor: `${certColor}20` }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Award
                          className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                          style={{ color: certColor }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg sm:text-xl mb-0.5 sm:mb-1 truncate group-hover:text-primary transition-colors">
                          {cert.issuer}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Braces className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
                          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Name */}
                    <div className="relative mb-3 sm:mb-4">
                      <p className="text-sm sm:text-base text-foreground/90 line-clamp-2 group-hover:text-foreground transition-colors">
                        {cert.name}
                      </p>
                    </div>

                    {/* Skills Tags - Styled Like Skill Card Tags */}
                    <div className="relative flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {cert.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.1 + idx * 0.05,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -3,
                            boxShadow: `0 4px 12px ${certColor}40`,
                          }}
                          className="group/skill relative touch-manipulation"
                        >
                          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 lg:px-3 py-1.5 sm:py-2 bg-muted/80 backdrop-blur-sm rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-border hover:border-primary/50 transition-all cursor-pointer active:scale-95">
                            <span className="group-hover/skill:text-primary transition-colors truncate">
                              {skill}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Code-style Footer - Matching Skill Cards */}
                    <div className="relative flex items-center justify-between pt-3 sm:pt-4 border-t border-border/50 font-mono text-[10px] sm:text-xs text-muted-foreground">
                      <div>
                        <span className="text-primary">{"// "}</span>
                        <span className="italic">Verified Credential</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        <span>View</span>
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent - Like Skill Cards */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: certColor }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
