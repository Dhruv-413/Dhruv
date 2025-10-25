"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect } from "react";
import { useGitHubUser } from "@/hooks/useGitHub";

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

developer.build(); // 🚀`;

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const { data: user } = useGitHubUser();

  const roles = [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "React Specialist",
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
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
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono">10+ Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono">2+ Years Exp</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
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
                  <Link href="#projects">
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
                  <Link href="#contact">
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
                    <span className="text-7xl font-bold text-primary">DG</span>
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
                    developer.js
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
    </section>
  );
}
