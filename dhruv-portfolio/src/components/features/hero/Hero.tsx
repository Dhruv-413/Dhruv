"use client";

import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  Terminal,
  Code2,
  Sparkles,
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
import { Card } from "@/components/ui/card";
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
  location: "Jaipur, India 🇮🇳",
  education: "B.Tech CSE @ Manipal University",
  experience: ["Ex-ONGC Intern"],

  passion: [
    "Building scalable solutions",
    "AI/ML innovations",
    "Open source contributions"
  ],

  currentFocus: "Enterprise Software & AI",
  availableForWork: true
};

export default developer;`;

const highlights = [
  {
    icon: Briefcase,
    title: "Professional Experience",
    description:
      "Interned at ONGC, working on enterprise solutions and SAP implementations",
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
    description: "SAP India Hackfest Top 50 from 2000+ entries",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Passionate about AI/ML and cutting-edge web technologies",
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
  { label: "Years of Experience", value: "1", icon: Briefcase },
  { label: "Projects Completed", value: "7", icon: Rocket },
  { label: "Technologies Learned", value: "15+", icon: Code2 },
  { label: "Certifications", value: "5+", icon: Book },
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
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
      {/* Enhanced Animated Background */}
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

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Terminal Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4 justify-center lg:justify-start"
              >
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-primary font-mono text-sm">
                  ~/portfolio
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-primary font-mono"
                >
                  _
                </motion.span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-lg mb-3"
              >
                Hi, I&apos;m
              </motion.p>

              {/* Name */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
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
                className="text-lg text-muted-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                CS Student @ Manipal University Jaipur | Ex-ONGC Intern
              </motion.p>

              <motion.p
                className="text-base text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
                className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                  <Code2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">
                    {stats?.totalRepos || "7"} Projects
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                  <StarIcon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">
                    {stats?.totalStars || "20+"} Stars
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                  <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono">1 Years Exp</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/15 transition-all">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-primary font-semibold">
                    Available
                  </span>
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="group shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all font-semibold"
                  >
                    <Link href="/projects">
                      <Play className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      View My Work
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-semibold"
                  >
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                      Download Resume
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group transition-all font-semibold"
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Get in Touch
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center lg:justify-start gap-4"
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
                    className="group p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2"
                  >
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
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
                    className="group p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all inline-flex items-center gap-2"
                  >
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
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
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
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
                <Card className="p-0 overflow-hidden border-border/50 hover:border-primary/30 transition-all bg-card/50 backdrop-blur-sm">
                  {/* Terminal Header */}
                  <div className="bg-muted/50 border-b border-border/50 px-4 py-2 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      developer.ts
                    </span>
                  </div>

                  {/* Code Content */}
                  <pre className="p-4 text-xs sm:text-sm overflow-x-auto">
                    <code className="text-muted-foreground font-mono leading-relaxed">
                      {codeSnippet}
                    </code>
                  </pre>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 1.5, repeat: Infinity },
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              Scroll to explore
            </span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* About Content Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {aboutStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-6 text-center hover:border-primary/30 transition-all group bg-card/50 backdrop-blur-sm">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold font-mono text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Highlights & Detailed Code Snippet Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Detailed Code Snippet - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold font-mono">
                  <span className="text-primary">{"// "}</span>Developer Profile
                </h3>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="code-snippet relative rounded-xl overflow-hidden border border-border/50 bg-muted/30 hover:border-primary/30 transition-all duration-300 shadow-lg"
            >
              {/* Terminal Header */}
              <div className="bg-muted/50 border-b border-border/50 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  developer.ts
                </span>
              </div>

              {/* Code Content with Line Numbers */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/20 border-r border-border/30 flex flex-col items-end pr-3 pt-4 text-xs font-mono text-muted-foreground/50">
                  {detailedCodeSnippet.split("\n").map((_, i) => (
                    <div key={i} className="leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="text-sm overflow-x-auto pl-16 pr-4 py-4">
                  <code className="text-muted-foreground font-mono leading-6">
                    {detailedCodeSnippet}
                  </code>
                </pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
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
                  whileHover={{ x: 5 }}
                >
                  <Card className="p-5 hover:border-primary/30 transition-all group bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg bg-linear-to-br ${highlight.color} bg-opacity-10 shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </Card>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                >
                  <Card className="p-6 text-center h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all group bg-card/50 backdrop-blur-sm">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-bold mb-2 text-lg group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
