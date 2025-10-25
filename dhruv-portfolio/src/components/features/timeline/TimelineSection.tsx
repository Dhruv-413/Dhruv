"use client";

import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Zap,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Terminal,
  Code2,
  GitBranch,
  Check,
  Activity,
  Shield,
  Target,
} from "lucide-react";
import { TimelineItem } from "@/types/experience";
import timelineData from "@/data/timeline.json";
import { format } from "date-fns";
import { useState, useRef } from "react";
import { TechIcon } from "@/components/ui/TechIcon";
import { Card } from "@/components/ui/card";

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Trophy,
};

// Code snippets for timeline items
const codeSnippets: Record<
  string,
  { language: string; code: string; title: string }
> = {
  "ongc-2025": {
    language: "python",
    title: "FAISS Vector Search Implementation",
    code: `# Preprocessing 8M+ data points with FAISS
import faiss
import torch
from transformers import AutoTokenizer, AutoModel

def process_well_data(data_points):
    """Process oil well data with vector embeddings"""
    model = AutoModel.from_pretrained('bert-base-uncased')
    tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

    # Create FAISS index for 8M+ vectors
    dimension = 768
    index = faiss.IndexFlatL2(dimension)

    # Process in batches for efficiency
    batch_size = 1000
    for i in range(0, len(data_points), batch_size):
        batch = data_points[i:i+batch_size]
        embeddings = get_embeddings(batch, model, tokenizer)
        index.add(embeddings)

    return index  # 40% time reduction achieved

# Result: Reduced manual reporting time by 40%`,
  },
  "sap-hackfest": {
    language: "javascript",
    title: "SAP CAP Service Architecture",
    code: `// National Finalist Solution - SAP Hackfest
// CAP Service with OData V4
service InventoryService {
  entity Products as projection on db.Products;
  entity Suppliers as projection on db.Suppliers;

  // Custom action for real-time analytics
  action analyzeInventory(
    productId: UUID
  ) returns {
    stockLevel: Integer;
    reorderPoint: Integer;
    predictedDemand: Decimal;
  };
}

// Event-driven architecture
@on('UPDATE', Products)
async function onProductUpdate(req) {
  const { quantity, reorderPoint } = req.data;
  if (quantity < reorderPoint) {
    await this.emit('StockAlert', { product: req.data });
  }
}`,
  },
  "icpc-regionalist": {
    language: "cpp",
    title: "Competitive Programming - ICPC Solution",
    code: `// ICPC Regionalist - Graph Algorithm Optimization
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Optimized Dijkstra with Priority Queue
    vector<int> shortestPath(int V, vector<vector<pair<int,int>>>& adj) {
        vector<int> dist(V, INT_MAX);
        priority_queue<pair<int,int>,
                       vector<pair<int,int>>,
                       greater<pair<int,int>>> pq;

        dist[0] = 0;
        pq.push({0, 0});

        while(!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if(d > dist[u]) continue;

            for(auto [v, w] : adj[u]) {
                if(dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        return dist;
    }
};`,
  },
};

// Technical badges for credibility
const technicalBadges = [
  { label: "Production Ready", icon: Shield, color: "text-green-500" },
  { label: "95% Test Coverage", icon: Check, color: "text-blue-500" },
  { label: "CI/CD Automated", icon: GitBranch, color: "text-purple-500" },
  { label: "8M+ Data Points", icon: Activity, color: "text-orange-500" },
  { label: "40% Faster", icon: Target, color: "text-pink-500" },
  { label: "SAP Certified", icon: Award, color: "text-amber-500" },
];

// Stats calculation
const timeline = timelineData as TimelineItem[];

// Reverse chronological order: Education → Achievements → Work
const sortedTimeline = [...timeline].sort((a, b) => {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
});

const workExperiences = timeline.filter((item) => item.type === "work").length;
const achievements = timeline.filter(
  (item) => item.type === "achievement"
).length;

const experienceStats = [
  {
    label: "Education",
    value: "B.Tech",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500",
    description: "Manipal University",
  },
  {
    label: "Work Experience",
    value: `${workExperiences}`,
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    description: "Professional role",
  },
  {
    label: "Achievements",
    value: `${achievements}+`,
    icon: Trophy,
    color: "from-amber-500 to-orange-500",
    description: "National recognitions",
  },
  {
    label: "Impact",
    value: "8M+",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    description: "Data points processed",
  },
];

export function TimelineSection() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-20"
    >
      {/* Animated Background - Matching Projects Page */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs - Same as Projects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-primary/80 rounded-full blur-3xl"
        />

        {/* Grid Pattern - Same as Projects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section - Centered Layout (Like Skills/Projects) */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          {/* Terminal Prompt */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 justify-center"
          >
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-primary font-mono text-sm">~/experience</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary font-mono"
            >
              _
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Career Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            From{" "}
            <span className="text-primary font-semibold">
              Computer Science Education
            </span>{" "}
            to{" "}
            <span className="text-primary font-semibold">
              National Recognition
            </span>{" "}
            and{" "}
            <span className="text-primary font-semibold">
              Enterprise Impact at ONGC
            </span>
            . A chronological journey showcasing continuous growth, technical
            excellence, and measurable real-world contributions.
          </motion.p>

          {/* Stats Grid - Matching Projects Page Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto"
          >
            {experienceStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold font-mono text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-center text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                </Card>
              );
            })}
          </motion.div>
        </div>

        {/* Interactive Curved Timeline - S-Shape: Left→Right→Curve→Right→Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
            >
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-primary">
                Journey Timeline
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Career Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow my journey through code, achievements, and innovation.{" "}
              <span className="text-primary">
                Click to explore code snippets
              </span>{" "}
              and technical details.
            </p>

            {/* Technical Credibility Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {technicalBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full"
                  >
                    <Icon className={`h-3.5 w-3.5 ${badge.color}`} />
                    <span className="text-xs font-mono text-foreground/80">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Vertical Timeline - Top to Bottom with Alternating Sides */}
          <div className="relative max-w-6xl mx-auto hidden md:block px-4">
            {/* Central Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5">
              <motion.div
                className="h-full w-full bg-linear-to-b from-primary via-accent to-primary rounded-full"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-24 py-12">
              {sortedTimeline.map((item, index) => {
                const Icon = iconMap[item.type];
                const isExpanded = expandedItems.has(item.id);
                const hasMetrics = item.metrics && item.metrics.length > 0;
                const isExpandable = hasMetrics || codeSnippets[item.id];
                const isAchievement = item.type === "achievement";
                const codeSnippet = codeSnippets[item.id];

                // Alternate sides: even index = left, odd index = right
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 1 + index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="relative"
                  >
                    <div
                      className={`flex items-center gap-8 ${
                        isLeft ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Card - Takes up half width */}
                      <div className="w-1/2">
                        <motion.div
                          whileHover={{ scale: 1.02, y: -4 }}
                          onClick={() => isExpandable && toggleItem(item.id)}
                          className={`
                            group relative bg-card/95 backdrop-blur-sm border rounded-2xl p-6
                            transition-all duration-500 overflow-hidden
                            ${isExpandable ? "cursor-pointer" : ""}
                            ${
                              isExpanded
                                ? "border-primary shadow-2xl shadow-primary/30 ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50 hover:shadow-xl"
                            }
                          `}
                        >
                          {/* Terminal Scan Line Effect when expanded */}
                          {isExpanded && (
                            <motion.div
                              className="absolute inset-x-0 h-0.5 bg-primary/50 shadow-lg shadow-primary/50"
                              initial={{ top: 0 }}
                              animate={{ top: "100%" }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          )}

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="mb-4">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                  {item.title}
                                </h3>
                                {isExpandable && (
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown className="h-5 w-5 text-primary" />
                                  </motion.div>
                                )}
                              </div>

                              <p className="text-primary font-semibold text-sm flex items-center gap-2 mb-2">
                                <Award className="h-3.5 w-3.5" />
                                {item.organization}
                              </p>

                              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-primary" />
                                  <span className="font-mono">
                                    {format(
                                      new Date(item.startDate),
                                      "MMM yyyy"
                                    )}
                                    {!isAchievement &&
                                      item.endDate &&
                                      ` - ${format(
                                        new Date(item.endDate),
                                        "MMM yyyy"
                                      )}`}
                                    {!isAchievement &&
                                      !item.endDate &&
                                      " - Present"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 text-accent" />
                                  <span>{item.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Description - Progressive Disclosure */}
                            <ul className="space-y-1.5 mb-3">
                              {item.description.slice(0, 2).map((desc, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-foreground/90 flex items-start gap-2"
                                >
                                  <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Expandable Section: Code Snippets + Metrics */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: isExpanded ? "auto" : 0,
                                opacity: isExpanded ? 1 : 0,
                              }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              {/* Remaining descriptions */}
                              {item.description.length > 2 && (
                                <ul className="space-y-1.5 mb-4">
                                  {item.description
                                    .slice(2)
                                    .map((desc, idx) => (
                                      <li
                                        key={idx + 2}
                                        className="text-xs text-foreground/90 flex items-start gap-2"
                                      >
                                        <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                        <span>{desc}</span>
                                      </li>
                                    ))}
                                </ul>
                              )}

                              {/* Code Snippet - Syntax Highlighted */}
                              {codeSnippet && (
                                <div className="mb-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Terminal className="h-3.5 w-3.5 text-green-500" />
                                    <h4 className="text-xs font-mono text-primary">
                                      {codeSnippet.title}
                                    </h4>
                                    <div className="flex gap-1.5 ml-auto">
                                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    </div>
                                  </div>

                                  {/* Terminal-style Code Block */}
                                  <div className="relative">
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/20 rounded text-[10px] font-mono text-primary">
                                      {codeSnippet.language}
                                    </div>
                                    <motion.pre
                                      initial={{ opacity: 0 }}
                                      animate={
                                        isExpanded
                                          ? { opacity: 1 }
                                          : { opacity: 0 }
                                      }
                                      transition={{ delay: 0.2 }}
                                      className="bg-black/90 border border-primary/30 rounded-lg p-3 overflow-x-auto max-h-64"
                                    >
                                      <code className="text-[10px] leading-relaxed font-mono text-green-400">
                                        {codeSnippet.code}
                                      </code>
                                    </motion.pre>
                                  </div>
                                </div>
                              )}

                              {/* Impact Metrics */}
                              {hasMetrics && (
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                  {item.metrics!.map((metric, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={
                                        isExpanded
                                          ? { scale: 1, opacity: 1 }
                                          : { scale: 0.8, opacity: 0 }
                                      }
                                      transition={{ delay: 0.3 + idx * 0.1 }}
                                      className="bg-muted/50 backdrop-blur rounded-lg p-2 text-center border border-primary/20"
                                    >
                                      <div className="text-lg font-bold text-primary mb-0.5 font-mono">
                                        {metric.value}
                                      </div>
                                      <div className="text-[10px] text-muted-foreground leading-tight">
                                        {metric.label}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </motion.div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {item.tags.slice(0, 4).map((tag, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ scale: 0 }}
                                  animate={isInView ? { scale: 1 } : {}}
                                  transition={{
                                    delay: 1.4 + index * 0.2 + idx * 0.03,
                                    type: "spring",
                                  }}
                                  whileHover={{ scale: 1.05, y: -1 }}
                                >
                                  <div className="flex items-center gap-1 px-2 py-1 bg-muted/80 rounded-md text-[10px] font-medium border border-border hover:border-primary/50 transition-all">
                                    <TechIcon
                                      name={tag}
                                      className="h-2.5 w-2.5"
                                    />
                                    <span>{tag}</span>
                                  </div>
                                </motion.div>
                              ))}
                              {item.tags.length > 4 && (
                                <div className="px-2 py-1 bg-muted/60 rounded-md text-[10px] text-muted-foreground">
                                  +{item.tags.length - 4}
                                </div>
                              )}
                            </div>

                            {/* Expand Indicator */}
                            {isExpandable && (
                              <div className="text-center pt-2 border-t border-border/50">
                                <span className="text-[10px] font-mono text-muted-foreground flex items-center justify-center gap-1.5">
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="h-3 w-3" />
                                      Collapse{" "}
                                      {codeSnippet
                                        ? "code & metrics"
                                        : "details"}
                                    </>
                                  ) : (
                                    <>
                                      <Code2 className="h-3 w-3" />
                                      View{" "}
                                      {codeSnippet
                                        ? "code & metrics"
                                        : "details"}
                                    </>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>

                      {/* Central Icon Marker */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="relative"
                        >
                          <div
                            className={`
                              w-16 h-16 rounded-full flex items-center justify-center
                              border-4 border-background shadow-2xl relative z-20
                              ${
                                item.type === "work"
                                  ? "bg-blue-500"
                                  : item.type === "education"
                                  ? "bg-purple-500"
                                  : "bg-amber-500"
                              }
                            `}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>

                          {/* Pulse Effect */}
                          <motion.div
                            className={`absolute inset-0 rounded-full ${
                              item.type === "work"
                                ? "bg-blue-500"
                                : item.type === "education"
                                ? "bg-purple-500"
                                : "bg-amber-500"
                            }`}
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{
                              scale: [1, 2, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>

                        {/* Connecting Line to Card */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-linear-to-r ${
                            isLeft
                              ? "right-full from-primary/50 to-transparent"
                              : "left-full from-transparent to-primary/50"
                          }`}
                        />
                      </div>

                      {/* Empty space on other side */}
                      <div className="w-1/2" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Vertical Timeline (Fallback) */}
          <div className="md:hidden space-y-6">
            <div className="relative">
              {/* Vertical gradient line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-accent to-primary" />

              {sortedTimeline.map((item, index) => {
                const Icon = iconMap[item.type];
                const isExpanded = expandedItems.has(item.id);
                const hasMetrics = item.metrics && item.metrics.length > 0;
                const isExpandable = hasMetrics || codeSnippets[item.id];
                const isAchievement = item.type === "achievement";
                const codeSnippet = codeSnippets[item.id];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="relative pl-20 mb-8"
                  >
                    {/* Icon */}
                    <div
                      className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${
                        item.type === "work"
                          ? "bg-blue-500"
                          : item.type === "education"
                          ? "bg-purple-500"
                          : "bg-amber-500"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Card - Same structure as desktop */}
                    <Card
                      onClick={() => isExpandable && toggleItem(item.id)}
                      className={`p-6 ${isExpandable ? "cursor-pointer" : ""} ${
                        isExpanded ? "border-primary shadow-lg" : ""
                      }`}
                    >
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-primary font-semibold text-sm mb-2">
                        {item.organization}
                      </p>
                      <div className="text-xs text-muted-foreground mb-3">
                        {format(new Date(item.startDate), "MMM yyyy")}
                        {!isAchievement &&
                          item.endDate &&
                          ` - ${format(new Date(item.endDate), "MMM yyyy")}`}
                      </div>

                      <ul className="space-y-1 text-sm mb-3">
                        {item.description.map((desc, idx) => (
                          <li key={idx} className="flex gap-2">
                            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {/* Expandable content */}
                      <motion.div
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        {codeSnippet && (
                          <pre className="bg-black/90 rounded p-3 overflow-x-auto mb-3 text-xs">
                            <code className="text-green-400 font-mono">
                              {codeSnippet.code}
                            </code>
                          </pre>
                        )}
                        {hasMetrics && (
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            {item.metrics!.map((m, i) => (
                              <div
                                key={i}
                                className="bg-muted rounded p-2 text-center"
                              >
                                <div className="font-bold text-primary text-sm">
                                  {m.value}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                          >
                            <TechIcon name={tag} className="h-3 w-3" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
