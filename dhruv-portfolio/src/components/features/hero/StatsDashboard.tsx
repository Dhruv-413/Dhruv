"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { aboutStats } from "./data/stats";

interface StatsDashboardProps {
  isInView: boolean;
}

export function StatsDashboard({ isInView }: StatsDashboardProps) {
  const [activeStatIndex, setActiveStatIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 max-w-4xl mx-auto"
    >
      {aboutStats.map((stat, index) => {
        const Icon = stat.icon;
        const isActive = activeStatIndex === index;
        const statColor = stat.color;

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
  );
}
