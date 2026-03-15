/**
 * Schema Module - Re-exports all JSON-LD schemas
 * 
 * This module provides SEO-focused structured data schemas
 * for various pages and content types on the website.
 */

export { getPersonSchema } from "./person";
export { getWebsiteSchema } from "./website";
export { getProjectsListSchema, getProjectSchema } from "./projects";
export { getSkillsSchema } from "./skills";
export { getCareerSchema } from "./career";
export { getContactPageSchema } from "./contact";
export { getBreadcrumbSchema } from "./breadcrumb";

export type { ProjectSchemaInput } from "./projects";
export type { SkillCategoryInput } from "./skills";
export type { ExperienceInput } from "./career";
export type { BreadcrumbItem } from "./breadcrumb";
