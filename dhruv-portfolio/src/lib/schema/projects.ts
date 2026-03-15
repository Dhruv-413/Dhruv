/**
 * Projects Schema for SEO
 * Generates JSON-LD structured data for Projects/Portfolio
 */

import { SITE_CONFIG } from "../constants";

export interface ProjectSchemaInput {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  date: string;
  links?: { github?: string; live?: string };
  images?: string[];
}

/**
 * Portfolio/ItemList Schema for Projects
 */
export function getProjectsListSchema(
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    date: string;
    links?: { github?: string; live?: string };
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Projects Portfolio",
    description: `Collection of ${projects.length} web development and AI/ML projects by ${SITE_CONFIG.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
        name: project.title,
        description: project.description,
        url:
          project.links?.live ||
          `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        author: {
          "@type": "Person",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.siteUrl,
        },
        datePublished: project.date,
        programmingLanguage: project.technologies,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    })),
  };
}

/**
 * Individual Project Schema
 */
export function getProjectSchema(project: ProjectSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    image: project.images?.[0] || SITE_CONFIG.ogImage,
    url: project.links?.live || `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
    },
    datePublished: project.date,
    programmingLanguage: project.technologies,
    codeRepository: project.links?.github,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
