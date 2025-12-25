"use client";

import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Code,
  Mail,
  Download,
  ArrowDown,
  Terminal,
  Code2,
  ExternalLink,
  Play,
  Star as StarIcon,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Target,
  Lightbulb,
  Coffee,
  Rocket,
  Book,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CodeSnippetWindow } from "@/components/ui/CodeSnippetWindow";
import {
  HighlightCard,
  HighlightCardGrid,
} from "@/components/ui/HighlightCard";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";
import { useGitHubUser, useGitHubStats } from "@/hooks/useGitHub";

const codeSnippet = `const developer = {
  name: "Dhruv Gupta",
  role: "Full-Stack Developer",
  specialization: ["AI/ML", "Web"],
  status: "Available",

  build: async () => {
    const skills = await this.learn();
    const projects = this.create(skills);
    return this.deploy(projects);
  }
};

developer.build();`;

const detailedCodeSnippet = `// About Me
const developer = {
  name: "Dhruv Gupta",
  role: "Full-Stack Dev & AI/ML",
  location: "Jaipur, India",
  education: "B.Tech CSE @ MUJ",
  experience: ["Ex-ONGC Intern"],

  passion: [
    "Scalable solutions",
    "AI/ML innovations",
    "Full Stack Dev"
  ],

  currentFocus: "Enterprise & AI",
  availableForWork: true
};

export default developer;`;

const highlights = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description: "Interned at ONGC on enterprise SAP solutions",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in Computer Science from Manipal University Jaipur",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Top 50 at SAP India Hackfest (2000+ participants)",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Code,
    title: "Technical Skills",
    description: "Full-stack development with modern web technologies",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Interests",
    description: "AI/ML and innovative tech solutions",
    color: "from-green-500 to-emerald-500",
  },
];

const values = [
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Focused on delivering measurable results and exceeding expectations",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solver",
    description: "Innovative approaches to complex technical challenges",
  },
  {
    icon: Coffee,
    title: "Continuous Learner",
    description: "Always exploring new technologies and best practices",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborative mindset with strong communication skills",
  },
];

const aboutStats = [
  { label: "Intern Experience", value: "3 Months", icon: Briefcase },
  { label: "Projects Completed", value: "7+", icon: Rocket },
  { label: "Technologies Learned", value: "10+", icon: Code2 },
  { label: "Certifications", value: "5+", icon: Book },
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [activeStatIndex, setActiveStatIndex] = useState<number | null>(null);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);
  const { data: user } = useGitHubUser();
  const { data: stats } = useGitHubStats();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const roles = [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "React Developer",
    "Python Developer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden pt-16 pb-20"
    >
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 min-w-0 overflow-hidden">
              {/* Terminal Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-3 sm:mb-4 justify-center lg:justify-start"
              >
                <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-primary font-mono text-xs sm:text-sm">
                  ~/portfolio
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-primary font-mono text-xs sm:text-sm"
                >
                  _
                </motion.span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-base sm:text-lg mb-2 sm:mb-3"
              >
                Hi, I&apos;m
              </motion.p>

              {/* Name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dhruv Gupta
              </motion.h1>

              {/* Rotating Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 h-12 sm:h-14"
              >
                <motion.h2
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary"
                >
                  {roles[currentRole]}
                </motion.h2>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-3 wrap-break-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="hidden sm:inline">
                  CS Student @ Manipal University Jaipur | Ex-ONGC Intern
                </span>
                <span className="sm:hidden">CS @ MUJ | Ex-ONGC Intern</span>
              </motion.p>

              <motion.p
                className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Building{" "}
                <span className="text-primary font-semibold">
                  production-ready
                </span>{" "}
                solutions with modern web technologies, AI/ML, and enterprise
                software. Passionate about creating{" "}
                <span className="text-primary font-semibold">scalable</span> and{" "}
                <span className="text-primary font-semibold">innovative</span>{" "}
                applications.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 justify-center lg:justify-start max-w-full overflow-hidden"
              >
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group touch-manipulation active:scale-95">
                  <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-mono whitespace-nowrap">
                    {stats?.totalRepos || "9"}+ Projects
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group touch-manipulation active:scale-95">
                  <StarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-primary group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-mono whitespace-nowrap">
                    {stats?.totalStars || "1"} Star
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/15 transition-all touch-manipulation active:scale-95">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-mono text-primary font-semibold whitespace-nowrap">
                    Available
                  </span>
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="cta-buttons-container flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    asChild
                    className="cta-btn group shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all font-semibold w-full sm:w-auto"
                  >
                    <Link href="/projects">
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      <span className="cta-text-full">View My Work</span>
                      <span className="cta-text-compact hidden">Projects</span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="cta-btn group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-semibold w-full sm:w-auto"
                  >
                    <a href="/Dhruv_resume.pdf" download>
                      <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
                      <span className="cta-text-full">Download Resume</span>
                      <span className="cta-text-compact hidden">Resume</span>
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="cta-btn group transition-all font-semibold w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="cta-text-full">Get in Touch</span>
                      <span className="cta-text-compact hidden">Contact</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center lg:justify-start gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="touch-manipulation"
                >
                  <Link
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2 touch-manipulation"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      GitHub
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="touch-manipulation"
                >
                  <Link
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2 touch-manipulation"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      LinkedIn
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="flex flex-col items-center order-1 lg:order-2">
              {/* Profile Image */}
              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                {/* Animated Border Effect */}
                <motion.div
                  className="absolute -inset-4 bg-linear-to-r from-primary via-purple-500 to-accent rounded-full blur-2xl opacity-30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="Dhruv Gupta"
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-7xl font-bold text-primary">
                        DG
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="bg-card border-2 border-primary px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-mono font-semibold">
                        Open to Work
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Code Snippet Card - Hidden on phones and portrait tablets, visible on landscape tablets and desktops */}
              <div className="w-full max-w-full sm:max-w-md mx-auto lg:mx-0 hidden lg:block">
                <CodeSnippetWindow
                  code={codeSnippet}
                  filename="developer.ts"
                  language="TypeScript"
                  animationDelay={0.9}
                  maxHeight="350px"
                  className="order-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile to save space */}
        <motion.div
          className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 1.5, repeat: Infinity },
          }}
        >
          <div className="flex flex-col items-center mt-8 pt-8">
            <span className="text-xs font-mono text-muted-foreground">
              Scroll to explore
            </span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* About Content Section */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Stats Dashboard - Unified Elegant Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 max-w-4xl mx-auto"
        >
          {aboutStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeStatIndex === index;
            const statColors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"];
            const statColor = statColors[index] || "#3b82f6";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setActiveStatIndex(index)}
                onMouseLeave={() => setActiveStatIndex(null)}
                className="group relative touch-manipulation"
              >
                <div
                  className={`relative p-3 sm:p-4 md:p-5 text-center bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 h-full ${
                    isActive
                      ? "border-primary shadow-2xl shadow-white/15"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {/* Animated Gradient Background */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                      isActive
                        ? "opacity-15"
                        : "opacity-0 group-hover:opacity-10"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${statColor}40 0%, transparent 60%)`,
                    }}
                  />

                  {/* Scan Line Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 h-px"
                      style={{ backgroundColor: `${statColor}60` }}
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <div className="relative flex flex-col items-center gap-2">
                    <motion.div
                      className="p-2 sm:p-2.5 rounded-lg transition-colors"
                      style={{ backgroundColor: `${statColor}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        style={{ color: statColor }}
                      />
                    </motion.div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Top-Right Corner Accent */}
                <div
                  className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
                    isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
                  }`}
                  style={{ backgroundColor: statColor }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Highlights & Detailed Code Snippet Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 overflow-hidden">
          {/* Detailed Code Snippet - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="min-w-0"
          >
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-mono">
                  <span className="text-primary">{"// "}</span>Developer Profile
                </h3>
              </div>
            </div>

            <CodeSnippetWindow
              code={detailedCodeSnippet}
              filename="developer.ts"
              language="TypeScript"
              animationDelay={0}
              maxHeight="500px"
              className="order-0"
            />
          </motion.div>

          {/* Highlights - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="min-w-0"
          >
            <div className="mb-4 sm:mb-5">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-mono">
                <span className="text-primary">{"// "}</span>
                Highlights
              </h3>
            </div>

            <HighlightCardGrid>
              {highlights.map((highlight, index) => {
                const highlightColors: Record<string, string> = {
                  blue: "#3b82f6",
                  purple: "#a855f7",
                  orange: "#f97316",
                  indigo: "#6366f1",
                  green: "#10b981",
                };
                const colorKey =
                  Object.keys(highlightColors).find((key) =>
                    highlight.color.includes(key)
                  ) || "blue";

                return (
                  <HighlightCard
                    key={index}
                    icon={highlight.icon}
                    title={highlight.title}
                    description={highlight.description}
                    color={highlightColors[colorKey]}
                    isInView={isInView}
                    animationDelay={0.7 + index * 0.1}
                  />
                );
              })}
            </HighlightCardGrid>
          </motion.div>
        </div>

        {/* Core Values Section - Unified Elegant Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-primary/50 to-primary max-w-xs" />
              <h3 className="text-2xl font-bold font-mono">
                <span className="text-primary">{"// "}</span>Core Values
              </h3>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-primary/50 to-primary max-w-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isActive = activeValueIndex === index;
              const valueColors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"];
              const valueColor = valueColors[index] || "#3b82f6";
              const footerTexts = [
                "results_driven",
                "innovative_thinker",
                "always_learning",
                "collaborative_spirit",
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setActiveValueIndex(index)}
                  onMouseLeave={() => setActiveValueIndex(null)}
                  className="group relative touch-manipulation"
                >
                  <div
                    className={`relative p-4 sm:p-5 md:p-6 text-center h-full bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 flex flex-col ${
                      isActive
                        ? "border-primary shadow-2xl shadow-white/15"
                        : "border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {/* Animated Gradient Background */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                        isActive
                          ? "opacity-15"
                          : "opacity-0 group-hover:opacity-10"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${valueColor}40 0%, transparent 60%)`,
                      }}
                    />

                    {/* Scan Line Effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-x-0 h-px"
                        style={{ backgroundColor: `${valueColor}60` }}
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}

                    <div className="relative flex-1">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <motion.div
                          className="p-3 sm:p-3.5 rounded-lg transition-colors"
                          style={{ backgroundColor: `${valueColor}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            style={{ color: valueColor }}
                          />
                        </motion.div>
                      </div>
                      <h4 className="font-bold mb-2 text-base sm:text-lg transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Code-style Footer */}
                    <div className="relative pt-3 mt-3 border-t border-border/50 font-mono text-[10px] text-muted-foreground">
                      <span style={{ color: valueColor }}>{"// "}</span>
                      <span className="italic">{footerTexts[index]}</span>
                    </div>
                  </div>

                  {/* Top-Right Corner Accent */}
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
                      isActive
                        ? "opacity-60"
                        : "opacity-0 group-hover:opacity-40"
                    }`}
                    style={{ backgroundColor: valueColor }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
