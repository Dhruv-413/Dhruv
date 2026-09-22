import { FlagshipPair } from "@/components/features/projects/FlagshipPair";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getProjectsListSchema, getBreadcrumbSchema } from "@/lib/schema";
import projectsData from "@/data/projects.json";
import { PageHeader } from "@/components/ui/page-primitives";
import { ProjectsIndex } from "@/components/features/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects | Web Development & AI/ML Portfolio",
  description: `${projectsData.length} projects, oldest first: a hackathon entry, a college minor project, an AI-agent experiment, placement software built for a college, and a food app started with a friend. Built with React, Python, FastAPI, PostgreSQL and computer vision.`,
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
      "Five projects, oldest first: a hackathon entry, a minor project, an AI-agent experiment, placement software for a college, and a food app started with a friend.",
    url: `${SITE_CONFIG.siteUrl}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & AI/ML Projects | Dhruv Gupta",
    description:
      "Five projects, oldest first, from a first hackathon to software built for a college.",
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
        <p>
          Five builds, oldest first: a hackathon entry, a college minor project, an experiment with AI agents,
          software built for my college, and a food app I started with a friend.
        </p>
      </PageHeader>
      <FlagshipPair />
      <ProjectsIndex />
    </>
  );
}
