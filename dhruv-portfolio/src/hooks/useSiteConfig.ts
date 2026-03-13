"use client";

import { SITE_CONFIG } from "@/lib/constants";

/**
 * Hook to access site configuration
 * Provides dependency injection for site configuration
 * This allows for easier testing and flexibility
 */
export function useSiteConfig() {
  return SITE_CONFIG;
}

/**
 * Type for site configuration
 */
export type SiteConfig = typeof SITE_CONFIG;
