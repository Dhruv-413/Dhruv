/**
 * Color utility functions
 * Consistent color palette for cards and UI elements
 */

/**
 * Consistent color palette for cards and UI elements
 * Used across: GitHubSection, SkillsSection, ProjectsSection
 */
export const CARD_COLORS = [
  "#8b5cf6", // Violet
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#f97316", // Orange
] as const;

/**
 * Category-specific colors for consistent theming
 */
export const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "AI/ML": { color: "#a855f7", bg: "#a855f720" },
  "Full-Stack": { color: "#3b82f6", bg: "#3b82f620" },
  "Computer Vision": { color: "#10b981", bg: "#10b98120" },
  Enterprise: { color: "#f59e0b", bg: "#f59e0b20" },
  work: { color: "#3b82f6", bg: "#3b82f620" },
  education: { color: "#a855f7", bg: "#a855f720" },
  achievement: { color: "#f59e0b", bg: "#f59e0b20" },
} as const;

/**
 * Get a consistent color based on a string (hash-based)
 * Used for repository cards, skill cards, etc.
 */
export function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_COLORS[Math.abs(hash) % CARD_COLORS.length];
}

/**
 * Get category colors with fallback
 */
export function getCategoryColors(category: string): {
  color: string;
  bg: string;
} {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS["Full-Stack"];
}
