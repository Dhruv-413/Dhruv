import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getProjectsListSchema, getBreadcrumbSchema } from "@/lib/schema";
import projectsData from "@/data/projects.json";
import { PageHeader } from "@/components/ui/page-primitives";
import { ProjectsIndex } from "@/components/features/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects | Web Development & AI/ML Portfolio",
  description: `Explore ${projectsData.length}+ production-ready projects showcasing Full-Stack Development, AI/ML solutions, and enterprise applications. Built with React, Next.js, Python, FastAPI, and modern technologies.`,
  keywords: [
    "web development projects",
    "React projects",
    "Next.js portfolio",
    "Python projects",
    "AI/ML projects",
    "full stack applications",
    "TypeScript projects",
    "FastAPI projects",
    "computer vision",
    "machine learning",
    "open source projects",
    "Dhruv Gupta projects",
  ],
  openGraph: {
    title: "Web Development & AI/ML Projects | Dhruv Gupta Portfolio",
    description:
      "Explore production-ready projects including REST APIs, web applications, and AI/ML solutions. Each project demonstrates modern development practices and real-world impact.",
    url: `${SITE_CONFIG.siteUrl}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & AI/ML Projects | Dhruv Gupta",
    description:
      "Explore production-ready projects including REST APIs, web applications, and AI/ML solutions.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/projects`,
  },
};

export default function ProjectsPage() {
  // Generate JSON-LD structured data
  const projectsSchema = getProjectsListSchema(
    projectsData.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      date: p.date,
      links: p.links,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.siteUrl },
    { name: "Projects", url: `${SITE_CONFIG.siteUrl}/projects` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader index="02" label="Work" title="Projects">
        <p>Backend, full-stack, computer vision and AI/ML work. Open one for the details.</p>
      </PageHeader>
      <ProjectsIndex />
    </>
  );
}
