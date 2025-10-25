"use client";

import { motion, useInView } from "framer-motion";
import {
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Zap,
  Target,
  Lightbulb,
  Coffee,
  Terminal,
  Rocket,
  Book,
  Users,
} from "lucide-react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

const codeSnippet = `// About Me
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

const stats = [
  { label: "Years of Experience", value: "2+", icon: Briefcase },
  { label: "Projects Completed", value: "10+", icon: Rocket },
  { label: "Technologies Mastered", value: "20+", icon: Code2 },
  { label: "Certifications", value: "5+", icon: Book },
];

export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/80 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="text-primary font-mono text-sm">~/about</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary font-mono"
            >
              _
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-3xl leading-relaxed"
          >
            A passionate developer dedicated to building impactful solutions
            that merge{" "}
            <span className="text-primary font-semibold">innovation</span> with{" "}
            <span className="text-primary font-semibold">practicality</span>.
            Specialized in modern web technologies and AI/ML implementations.
          </motion.p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Code Snippet - Left Side */}
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

              {/* Code Content */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/20 border-r border-border/30 flex flex-col items-end pr-3 pt-4 text-xs font-mono text-muted-foreground/50">
                  {codeSnippet.split("\n").map((_, i) => (
                    <div key={i} className="leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="text-sm overflow-x-auto pl-16 pr-4 py-4">
                  <code className="text-muted-foreground font-mono leading-6">
                    {codeSnippet}
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

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
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

        {/* Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16"
        >
          <Card className="p-8 md:p-12 bg-linear-to-br from-card/50 to-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                My Developer Journey
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                From learning Python basics to building enterprise-scale
                applications, my journey has been driven by curiosity and a
                commitment to excellence. With experience spanning{" "}
                <span className="text-primary font-semibold">
                  Full-Stack Development
                </span>
                , <span className="text-primary font-semibold">AI/ML</span>, and{" "}
                <span className="text-primary font-semibold">
                  Enterprise Software
                </span>
                , I bring a unique blend of technical expertise and creative
                problem-solving to every project.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm font-mono">
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
                  2+ Years Experience
                </span>
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
                  10+ Projects
                </span>
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
                  Available for Work
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
