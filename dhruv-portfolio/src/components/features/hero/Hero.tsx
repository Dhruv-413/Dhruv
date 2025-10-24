"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useEffect } from "react";
import { useGitHubUser } from "@/hooks/useGitHub";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { data: user } = useGitHubUser();

  // Generate particles using useState with function initializer to avoid setState in effect
  const [particles] = useState<
    Array<{
      x: number;
      y: number;
      x2: number;
      y2: number;
      duration: number;
    }>
  >(() => {
    if (typeof window === "undefined") return [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    return [...Array(20)].map(() => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        x2: x + (Math.random() > 0.5 ? 200 : -200),
        y2: y + (Math.random() > 0.5 ? 200 : -200),
        duration: Math.random() * 10 + 10,
      };
    });
  });

  useEffect(() => {
    const raf =
      typeof window !== "undefined"
        ? window.requestAnimationFrame(() => setMounted(true))
        : 0;
    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20">
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Particles - only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: [particle.x, particle.x2],
                y: [particle.y, particle.y2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary via-purple-500 to-accent rounded-full blur-lg opacity-50" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
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
                    <span className="text-6xl font-bold text-primary">DG</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-lg mb-2">Hi, I&apos;m</p>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Dhruv Gupta
            </motion.h1>

            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TypewriterEffectSmooth
                words={[
                  { text: "Full", className: "text-primary" },
                  { text: "Stack", className: "text-primary" },
                  { text: "Developer", className: "text-foreground" },
                  { text: "|", className: "text-muted-foreground" },
                  { text: "AI/ML", className: "text-accent" },
                  { text: "Enthusiast", className: "text-accent" },
                ]}
                className="text-2xl sm:text-3xl lg:text-4xl"
              />
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              CS Student @ Manipal University Jaipur | Ex-ONGC Intern
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about building innovative solutions with modern
              technologies. Specialized in Full-Stack Development, AI/ML, and
              Enterprise Software with hands-on experience in Python, React,
              Next.js, and SAP.
            </motion.p>

            {/* CTA Buttons - Enhanced */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/projects";
                }}
                className="group relative overflow-hidden shadow-lg hover:shadow-primary/50 transition-all"
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center space-x-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>

              <Link
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>

              <Link href={SITE_CONFIG.links.email} className="group">
                <motion.div
                  className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 1 },
                y: { duration: 1.5, repeat: Infinity },
              }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
