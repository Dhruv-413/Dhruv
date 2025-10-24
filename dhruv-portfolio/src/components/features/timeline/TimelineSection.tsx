"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react";
import { TimelineItem } from "@/types/experience";
import timelineData from "@/data/timeline.json";
import { format } from "date-fns";
import { useState } from "react";

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Trophy,
};

export function TimelineSection() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const timeline = timelineData as TimelineItem[];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Experience & Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey, educational background, and notable
            achievements in competitive programming and hackathons.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = iconMap[item.type];
              const isExpanded = expandedItems.has(item.id);
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Icon */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-4 border-background">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${
                      isLeft ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleItem(item.id)}
                      className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-primary font-semibold mb-2">
                          {item.organization}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(item.startDate), "MMM yyyy")}
                            {item.endDate &&
                              ` - ${format(
                                new Date(item.endDate),
                                "MMM yyyy"
                              )}`}
                            {!item.endDate && " - Present"}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start"
                          >
                            <span className="text-primary mr-2">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Metrics */}
                      {isExpanded &&
                        item.metrics &&
                        item.metrics.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-3 gap-4 mb-4"
                          >
                            {item.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className="bg-muted/50 rounded-lg p-3 text-center"
                              >
                                <div className="text-lg font-bold text-primary">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expand indicator */}
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="text-center mt-4">
                          <span className="text-xs text-muted-foreground">
                            {isExpanded
                              ? "Click to collapse"
                              : "Click to expand"}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
