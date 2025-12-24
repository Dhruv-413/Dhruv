"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color: string;
  fill?: boolean;
  index?: number;
  animated?: boolean;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  color,
  fill = false,
  index = 0,
  animated = true,
}: StatCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="group relative"
    >
      <div
        className={`relative p-3 sm:p-4 bg-card/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 ${
          isActive
            ? "border-primary shadow-2xl shadow-white/15"
            : "border-border/50 hover:border-primary/30"
        }`}
      >
        {/* Animated Gradient Background */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
            isActive ? "opacity-15" : "opacity-0 group-hover:opacity-10"
          }`}
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, transparent 60%)`,
          }}
        />

        {/* Scan Line Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ backgroundColor: `${color}60` }}
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <div className="relative flex flex-col items-center gap-1.5 sm:gap-2">
          <motion.div
            className="p-2 sm:p-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: `${color}20` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon
              className={`h-5 w-5 sm:h-6 sm:w-6 ${fill ? "fill-current" : ""}`}
              style={{ color }}
            />
          </motion.div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono">
              {value}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              {label}
            </div>
          </div>
        </div>
      </div>

      {/* Top-Right Corner Accent */}
      <div
        className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full blur-xl transition-opacity duration-300 ${
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}
