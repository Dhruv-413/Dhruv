"use client";

import { motion, useInView } from "framer-motion";
import { Activity, Calendar, GitCommit, Flame, Award, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { GitHubContributions, ContributionDay } from "@/hooks/useGitHub";
import { useState, useRef } from "react";

// Contribution level colors - Green theme
const CONTRIBUTION_COLORS = [
  "bg-muted/60 hover:bg-muted",
  "bg-green-500/25 hover:bg-green-500/35",
  "bg-green-500/45 hover:bg-green-500/55",
  "bg-green-500/65 hover:bg-green-500/75",
  "bg-green-500/85 hover:bg-green-500/95",
  "bg-green-500 hover:bg-green-400",
];

interface ContributionHeatmapProps {
  contributions: GitHubContributions | null;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
}

interface HoveredDay {
  date: string;
  count: number;
  x: number;
  y: number;
}

export function ContributionHeatmap({
  contributions,
  totalCommits,
  totalPRs,
  totalIssues,
  totalReviews,
}: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HoveredDay | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDayHover = (
    e: React.MouseEvent | React.FocusEvent,
    day: ContributionDay
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 220;
    const viewportWidth = window.innerWidth;

    let xPos = rect.right + 10;
    if (xPos + tooltipWidth > viewportWidth) {
      xPos = rect.left - tooltipWidth - 10;
    }

    setHoveredDay({
      date: day.date,
      count: day.count,
      x: xPos,
      y: rect.top + rect.height / 2,
    });
  };

  if (!contributions || contributions.weeks.length === 0) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 flex-1">
        <div className="text-center text-muted-foreground py-8 flex items-center justify-center">
          <div>
            <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Loading contribution data...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-col"
    >
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-green-500/20 to-emerald-500/20">
            <Activity className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Contribution Activity</h2>
            <p className="text-sm text-muted-foreground">
              365-day commit history & statistics
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 flex-1 flex flex-col relative overflow-hidden group">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex-1 flex flex-col">
          {/* Activity Summary Bar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-mono">
                {new Date(
                  contributions.weeks[0]?.days[0]?.date || ""
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                - Present
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-500">
                Active
              </span>
            </div>
          </div>

          {/* Heatmap */}
          <div
            className="overflow-x-auto mb-4 flex-1 flex items-center relative"
            aria-label="Contribution heatmap"
          >
            <div className="flex gap-[3px] mx-auto">
              {contributions.weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col gap-[3px]"
                  role="group"
                >
                  {week.days.map((day: ContributionDay, dayIndex: number) => (
                    <motion.button
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: 0.2 + weekIndex * 0.003,
                      }}
                      whileHover={{ scale: 1.6, zIndex: 10 }}
                      onMouseEnter={(e) => handleDayHover(e, day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onFocus={(e) => handleDayHover(e, day)}
                      onBlur={() => setHoveredDay(null)}
                      className={`w-[11px] h-[11px] rounded-sm ${
                        CONTRIBUTION_COLORS[day.level]
                      } cursor-pointer transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}
                      aria-label={`${day.count} contributions on ${day.date}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-4">
            <span className="font-mono text-[10px]">Less</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${
                    CONTRIBUTION_COLORS[level].split(" ")[0]
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px]">More</span>
          </div>

          {/* Primary Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/30">
            <StatBox
              value={contributions.totalContributions}
              label="Total"
              colorClass="primary"
            />
            <StatBox value={totalCommits} label="Commits" colorClass="green" />
            <StatBox
              value={contributions.currentStreak}
              label="Streak"
              colorClass="orange"
              icon={Flame}
            />
            <StatBox
              value={contributions.longestStreak}
              label="Best"
              colorClass="yellow"
              icon={Award}
            />
          </div>

          {/* Activity Type Breakdown */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <ActivityTypeBox
              icon={GitCommit}
              value={totalPRs}
              label="Pull Requests"
              colorClass="purple"
            />
            <ActivityTypeBox
              icon={Activity}
              value={totalIssues}
              label="Issues"
              colorClass="blue"
            />
            <ActivityTypeBox
              icon={Eye}
              value={totalReviews}
              label="Reviews"
              colorClass="cyan"
            />
          </div>
        </div>
      </Card>

      {/* Floating Tooltip */}
      {hoveredDay && <HeatmapTooltip hoveredDay={hoveredDay} />}
    </motion.div>
  );
}

// Sub-components for DRY
interface StatBoxProps {
  value: number;
  label: string;
  colorClass: "primary" | "green" | "orange" | "yellow";
  icon?: React.ElementType;
}

function StatBox({ value, label, colorClass, icon: Icon }: StatBoxProps) {
  const colorMap = {
    primary:
      "from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 border-primary/10 text-primary",
    green:
      "from-green-500/10 to-green-500/5 hover:from-green-500/15 hover:to-green-500/10 border-green-500/10 text-green-500",
    orange:
      "from-orange-500/10 to-orange-500/5 hover:from-orange-500/15 hover:to-orange-500/10 border-orange-500/10 text-orange-500",
    yellow:
      "from-yellow-500/10 to-yellow-500/5 hover:from-yellow-500/15 hover:to-yellow-500/10 border-yellow-500/10 text-yellow-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`text-center p-3 rounded-xl bg-linear-to-br ${colorMap[colorClass]} transition-all duration-300 border`}
    >
      <div className="flex items-center justify-center gap-1">
        {Icon && (
          <Icon
            className={`h-4 w-4 ${colorMap[colorClass].split(" ").pop()}`}
          />
        )}
        <span
          className={`text-2xl font-bold font-mono ${colorMap[colorClass]
            .split(" ")
            .pop()}`}
        >
          {value}
        </span>
      </div>
      <div className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

interface ActivityTypeBoxProps {
  icon: React.ElementType;
  value: number;
  label: string;
  colorClass: "purple" | "blue" | "cyan";
}

function ActivityTypeBox({
  icon: Icon,
  value,
  label,
  colorClass,
}: ActivityTypeBoxProps) {
  const colorMap = {
    purple:
      "bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 bg-purple-500/20 text-purple-500",
    blue: "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 bg-blue-500/20 text-blue-500",
    cyan: "bg-cyan-500/5 hover:bg-cyan-500/10 border-cyan-500/10 bg-cyan-500/20 text-cyan-500",
  };

  const bgColors = colorMap[colorClass].split(" ");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`flex items-center gap-2 p-2.5 rounded-lg transition-all border ${bgColors[0]} ${bgColors[1]} ${bgColors[2]}`}
    >
      <div className={`p-1.5 rounded-md ${bgColors[3]}`}>
        <Icon className={`h-3.5 w-3.5 ${bgColors[4]}`} />
      </div>
      <div>
        <div className={`text-sm font-bold font-mono ${bgColors[4]}`}>
          {value}
        </div>
        <div className="text-[9px] text-muted-foreground font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function HeatmapTooltip({ hoveredDay }: { hoveredDay: HoveredDay }) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: `${hoveredDay.x}px`,
        top: `${hoveredDay.y}px`,
        transform: "translateY(-50%)",
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.15 }}
        className="bg-card/95 backdrop-blur-md border-2 border-primary/40 rounded-lg shadow-2xl shadow-primary/20 p-3 w-[220px]"
      >
        <div className="text-sm font-mono">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-primary font-bold text-2xl tabular-nums">
              {hoveredDay.count}
            </span>
            <span className="text-muted-foreground text-xs">
              contribution{hoveredDay.count !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="text-foreground font-semibold text-xs border-t border-border/50 pt-2 mt-1">
            {new Date(hoveredDay.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
