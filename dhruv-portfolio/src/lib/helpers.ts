/**
 * Reusable utility functions following DRY principle
 * 
 * This file re-exports all utilities from the utils/ directory
 * for backward compatibility. New code should import directly from
 * specific utility modules (e.g., @/lib/utils/colors, @/lib/utils/dates, etc.)
 */

// Re-export all utilities from utils/ directory
export * from "./utils/index";
