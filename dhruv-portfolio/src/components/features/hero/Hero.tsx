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
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";
import { useGitHubUser, useGitHubStats } from "@/hooks/useGitHub";

const codeSnippet = `const developer = {
  name: "Dhruv Gupta",
  role: "Full-Stack Developer",
  specialization: ["AI/ML", "Web Dev"],
  status: "Available for Work",

  build: async () => {
    const skills = await this.learn();
    const projects = await this.create(skills);
    return this.deploy(projects);
  }
};

developer.build();`;

const detailedCodeSnippet = `// About Me
const developer = {
  name: "Dhruv Gupta",
  role: "Full-Stack Developer & AI/ML Engineer",
  location: "Jaipur, India",
  education: "B.Tech CSE @ Manipal University",
  experience: ["Ex-ONGC Intern"],

  passion: [
    "Building scalable solutions",
    "AI/ML innovations",
    "Full Stack Development"
  ],

  currentFocus: "Enterprise Software & AI",
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
      className="relative min-h-screen overflow-hidden pt-16 pb-20"
    >
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
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
                className="text-sm sm:text-base md:text-lg text-muted-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CS Student @ Manipal University Jaipur | Ex-ONGC Intern
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
                className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 justify-center lg:justify-start"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                  <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-mono">
                    {stats?.totalRepos || "10"}+ Projects
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                  <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-mono">
                    {stats?.totalStars || "20+"} Git Star
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/15 transition-all">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-mono text-primary font-semibold">
                    Available
                  </span>
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
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
                    className="group shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all font-semibold w-full sm:w-auto"
                  >
                    <Link href="/projects">
                      <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      View My Work
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
                    className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-semibold w-full sm:w-auto"
                  >
                    <a href="/Dhruv_resume.pdf" download>
                      <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
                      Download Resume
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
                    className="group transition-all font-semibold w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Get in Touch
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
                >
                  <Link
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2"
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
                >
                  <Link
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 sm:p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2"
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

              {/* Code Snippet Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="w-full max-w-md"
              >
                <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-muted/50 border-b border-border/50">
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground ml-2">
                      developer.ts
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="relative">
                    <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto max-h-[300px] sm:max-h-[350px] custom-scrollbar">
                      <code className="text-muted-foreground">
                        {codeSnippet}
                      </code>
                    </pre>

                    {/* Fade effect at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-linear-to-t from-card/90 to-transparent pointer-events-none" />
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/30 border-t border-border/50 text-[10px] sm:text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-muted-foreground">Ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">TypeScript</span>
                      <span className="text-muted-foreground">UTF-8</span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16"
        >
          {aboutStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeStatIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setActiveStatIndex(index)}
                onMouseLeave={() => setActiveStatIndex(null)}
                className="group"
              >
                <div className={`relative p-3 sm:p-4 md:p-6 text-center bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "border-primary shadow-2xl shadow-white/15"
                    : "border-border hover:border-primary/50"
                }`}>
                  {/* Animated Gradient Background */}
                  <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500 ${
                    isActive ? "opacity-10" : "opacity-0"
                  }`} style={{ background: "linear-gradient(135deg, var(--primary) 0%, transparent 60%)" }} />

                  {/* Scan Line Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 h-px bg-primary/40"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  <div className="relative flex flex-col items-center">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <motion.div
                        className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                      </motion.div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-primary mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Highlights & Detailed Code Snippet Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Detailed Code Snippet - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="px-2 sm:px-0"
          >
            <div className="mb-4 sm:mb-5">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-mono">
                  <span className="text-primary">{"// "}</span>Developer Profile
                </h3>
              </div>
            </div>

            <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-muted/50 border-b border-border/50">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-muted-foreground ml-2">
                  developer.ts
                </span>
              </div>

              {/* Code Content */}
              <div className="relative">
                <pre className="px-5 py-5 sm:px-6 sm:py-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto max-h-[400px] sm:max-h-[500px] custom-scrollbar">
                  <code className="text-muted-foreground">
                    {detailedCodeSnippet}
                  </code>
                </pre>

                {/* Fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-linear-to-t from-card/90 to-transparent pointer-events-none" />
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-2 sm:py-2.5 bg-muted/30 border-t border-border/50 text-[10px] sm:text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-muted-foreground">Ready</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-muted-foreground">TypeScript</span>
                  <span className="hidden sm:inline text-muted-foreground">
                    UTF-8
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-3 sm:space-y-4 px-2 sm:px-0"
          >
            <div className="mb-4 sm:mb-5">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-mono">
                <span className="text-primary">{"// "}</span>
                Highlights
              </h3>
            </div>

            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative"
                >
                  <div className="relative p-4 sm:p-5 bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div
                      className="absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-500 opacity-0 group-hover:opacity-10"
                      style={{ background: `linear-gradient(135deg, ${highlight.color.includes('blue') ? '#3b82f6' : highlight.color.includes('purple') ? '#a855f7' : highlight.color.includes('orange') ? '#f97316' : highlight.color.includes('indigo') ? '#6366f1' : '#10b981'}40, transparent)` }}
                    />

                    {/* Subtle scan line on hover */}
                    <motion.div
                      className="absolute inset-x-0 h-px bg-primary/30 opacity-0 group-hover:opacity-100"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative flex items-start gap-3 sm:gap-4">
                      <motion.div
                        className="p-2 sm:p-2.5 rounded-lg bg-primary/10 shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                          {highlight.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top-Right Corner Accent */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: highlight.color.includes('blue') ? '#3b82f6' : highlight.color.includes('purple') ? '#a855f7' : highlight.color.includes('orange') ? '#f97316' : highlight.color.includes('indigo') ? '#6366f1' : '#10b981' }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Core Values Section */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isActive = activeValueIndex === index;
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
                  whileHover={{ y: -10, scale: 1.02 }}
                  onMouseEnter={() => setActiveValueIndex(index)}
                  onMouseLeave={() => setActiveValueIndex(null)}
                  className="group relative"
                >
                  <div className={`relative p-4 sm:p-5 md:p-6 text-center h-full bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "border-primary shadow-2xl shadow-white/15"
                      : "border-border hover:border-primary/50"
                  }`}>
                    {/* Scan Line Effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-x-0 h-px bg-primary/40"
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <div className="relative">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <motion.div
                          className="p-3 sm:p-3.5 md:p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                        </motion.div>
                      </div>
                      <h4 className="font-bold mb-2 text-base sm:text-lg transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Top-Right Corner Accent */}
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 bg-primary ${
                      isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
                    }`}
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
