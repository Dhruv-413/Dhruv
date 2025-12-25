import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";
import { getProjectsListSchema, getBreadcrumbSchema } from "@/lib/schema";
import projectsData from "@/data/projects.json";

// Lazy load ProjectsSection for better performance
const ProjectsSection = dynamic(
  () =>
    import("@/components/features/projects/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="projects" />,
    ssr: true,
  }
);

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
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: "Web Development Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & AI/ML Projects | Dhruv Gupta",
    description:
      "Explore production-ready projects including REST APIs, web applications, and AI/ML solutions.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-projects.jpg`],
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

      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="projects" />}>
          <ProjectsSection />
        </Suspense>
      </div>
    </>
  );
}
