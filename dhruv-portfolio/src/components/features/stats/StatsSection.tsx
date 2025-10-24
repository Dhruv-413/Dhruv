"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  BarChart3,
  Database,
  Users,
  Trophy,
  FileCheck,
  Code,
} from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  format?: "compact" | "normal";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: Stat[] = [
  {
    label: "Projects Completed",
    value: 20,
    suffix: "+",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    label: "Data Points Processed",
    value: 8000000,
    suffix: "+",
    format: "compact",
    icon: Database,
    color: "text-purple-500",
  },
  {
    label: "Users Served",
    value: 500,
    suffix: "+",
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "Hackathon Achievements",
    value: 3,
    suffix: "",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    label: "Certifications",
    value: 4,
    suffix: "",
    icon: FileCheck,
    color: "text-red-500",
  },
  {
    label: "Lines of Code",
    value: 50000,
    suffix: "+",
    format: "compact",
    icon: Code,
    color: "text-cyan-500",
  },
];

function formatNumber(value: number, format?: "compact" | "normal"): string {
  if (format === "compact") {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
  }
  return value.toLocaleString();
}

function AnimatedCounter({
  value,
  format,
  suffix,
}: {
  value: number;
  format?: "compact" | "normal";
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          formatNumber(Math.floor(latest), format) + suffix;
      }
    });
  }, [springValue, format, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Impact by Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quantifiable achievements and metrics that demonstrate the scale and
            impact of my work across various projects and domains.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden"
              >
                <div className="bg-card border border-border rounded-xl p-6 text-center h-full flex flex-col items-center justify-center relative group hover:border-primary/50 transition-all">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className={`mb-4 ${stat.color}`}>
                    <Icon className="h-12 w-12 mx-auto" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    <AnimatedCounter
                      value={stat.value}
                      format={stat.format}
                      suffix={stat.suffix}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
