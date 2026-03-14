/**
 * Date and text utility functions
 */

/**
 * Format a date to a readable string
 */
export function formatDate(
  date: string | Date,
  format: "short" | "long" = "short"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
