"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { values } from "./data/values";

interface CoreValuesProps {
  isInView: boolean;
}

export function CoreValues({ isInView }: CoreValuesProps) {
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  return (
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
                  <span className="italic">{value.footer}</span>
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
  );
}
