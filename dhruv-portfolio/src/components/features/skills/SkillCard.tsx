/**
 * Skill Category Card Component
 * A card component for displaying skill categories
 */

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SkillCardProps {
  title: string;
  color: string;
  icon: LucideIcon;
  itemCount: number;
  isActive: boolean;
  isInView: boolean;
  animationDelay: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

export function SkillCard({
  title,
  color,
  icon: Icon,
  itemCount,
  isActive,
  isInView,
  animationDelay,
  onMouseEnter,
  onMouseLeave,
  children,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: animationDelay }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        className={`p-4 sm:p-5 h-full transition-all duration-300 ${
          isActive
            ? "border-primary shadow-lg shadow-primary/10"
            : "border-border/50 hover:border-primary/30"
        }`}
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${color}10 0%, transparent 50%)`
            : undefined
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} />
            </div>
            <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
          </div>
          <span 
            className="text-xs px-2 py-1 rounded-full font-mono"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {itemCount}
          </span>
        </div>

        {/* Children (Badges) */}
        {children}

        {/* Footer */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <span style={{ color }}>{"//"}</span>
          <span className="italic">Click to filter projects</span>
        </div>
      </Card>
    </motion.div>
  );
}
