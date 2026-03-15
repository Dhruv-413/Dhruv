/**
 * JSON-LD Structured Data Schemas for SEO
 * 
 * This module provides backward-compatible imports from the modular schema files.
 * For new code, prefer importing directly from ./schema/ submodules.
 * 
 * @example
 * // New way (preferred):
 * import { getPersonSchema } from '@/lib/schema';
 * 
 * // Old way (still works):
 * import { getPersonSchema } from '@/lib/schema';
 */

export { getPersonSchema } from "./schema/person";
export { getWebsiteSchema } from "./schema/website";
export { getProjectsListSchema, getProjectSchema } from "./schema/projects";
export { getSkillsSchema } from "./schema/skills";
export { getCareerSchema } from "./schema/career";
export { getContactPageSchema } from "./schema/contact";
export { getBreadcrumbSchema } from "./schema/breadcrumb";

export type { ProjectSchemaInput } from "./schema/projects";
export type { SkillCategoryInput } from "./schema/skills";
export type { ExperienceInput } from "./schema/career";
export type { BreadcrumbItem } from "./schema/breadcrumb";
