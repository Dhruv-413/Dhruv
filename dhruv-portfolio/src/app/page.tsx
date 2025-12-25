import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";
import { getPersonSchema, getWebsiteSchema } from "@/lib/schema";

// Lazy load Hero component for better initial page load
const Hero = dynamic(
  () =>
    import("@/components/features/hero/Hero").then((mod) => ({
      default: mod.Hero,
    })),
  {
    loading: () => <LoadingSkeleton variant="page" />,
    ssr: true,
  }
);

// Enhanced metadata for homepage
export const metadata: Metadata = {
  title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer Portfolio",
  description:
    "Dhruv Gupta is a Full Stack Developer and AI/ML Engineer specializing in React, Next.js, Python, and enterprise software. View projects, skills, and professional experience. Ex-ONGC Intern, B.Tech CS at Manipal University.",
  keywords: [
    "Dhruv Gupta",
    "Full Stack Developer",
    "AI/ML Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Web Developer Portfolio",
    "Software Engineer India",
    "Manipal University Student",
    "ONGC Intern",
    "TypeScript",
    "FastAPI",
    "Machine Learning",
    "Computer Vision",
  ],
  openGraph: {
    title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer",
    description:
      "Full Stack Developer and AI/ML Engineer building production-ready web applications. Explore my projects, skills, and professional journey.",
    url: SITE_CONFIG.siteUrl,
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: "Dhruv Gupta - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer",
    description:
      "Full Stack Developer and AI/ML Engineer building production-ready web applications.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-home.jpg`],
  },
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
};

export default function Home() {
  // Generate JSON-LD structured data
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />

      <AnimatedBackground />
      <Suspense fallback={<LoadingSkeleton variant="page" />}>
        <Hero />
      </Suspense>
    </>
  );
}
