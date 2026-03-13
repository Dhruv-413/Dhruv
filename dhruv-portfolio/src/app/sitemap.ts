import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import projectsData from "@/data/projects.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.siteUrl;

  // Static pages with proper URLs
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/github`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic project pages
  // FIXED: Added note about fragment URLs
  // SEO RECOMMENDATION: For better indexing, create individual project pages at /projects/[id]
  // Current implementation uses fragments which may not be indexed properly
  const projectPages: MetadataRoute.Sitemap = projectsData.map((project) => ({
    // NOTE: Fragment URLs (#project-id) are not ideal for SEO
    // They work for single-page navigation but search engines may not index them
    // For production, consider: url: `${baseUrl}/projects/${project.id}`
    url: `${baseUrl}/projects#${project.id}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
