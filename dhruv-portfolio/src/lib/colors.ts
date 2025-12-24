/**
 * Color utilities for consistent theming across components
 */

// Card color palette for consistent visual design
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
 * Get consistent color based on string using hash
 */
export function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_COLORS[Math.abs(hash) % CARD_COLORS.length];
}

/**
 * Create gradient string for backgrounds
 */
export function createGradient(color: string, opacity: number = 40): string {
  return `linear-gradient(135deg, ${color}${opacity} 0%, transparent 60%)`;
}
