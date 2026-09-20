import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getPersonSchema, getWebsiteSchema } from "@/lib/schema";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { Ticker } from "@/components/features/about/Ticker";
import { AboutSection } from "@/components/features/about/AboutSection";

// Enhanced metadata for homepage
export const metadata: Metadata = {
  // absolute: the root title template would otherwise append the name a second time
  title: { absolute: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer Portfolio" },
  description:
    "Dhruv Gupta is a Full Stack Developer and AI/ML Engineer specializing in React, Next.js, Python, and enterprise software. Data Modernization and Migration Intern at Deloitte, B.Tech CS graduate of Manipal University Jaipur, and weekend contributor to the family B2B sourcing business Beaumonde.",
  keywords: [
    "Dhruv Gupta",
    "Full Stack Developer",
    "AI/ML Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Web Developer Portfolio",
    "Software Engineer India",
    "Manipal University Jaipur",
    "Deloitte Intern",
    "Data Modernization",
    "Data Migration",
    "TypeScript",
    "FastAPI",
    "Machine Learning",
    "Computer Vision",
  ],
  openGraph: {
    title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer",
    description:
      "Full Stack Developer and AI/ML Engineer. Data Modernization and Migration Intern at Deloitte. Explore my projects, skills, and career.",
    url: SITE_CONFIG.siteUrl,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer",
    description:
      "Full Stack Developer and AI/ML Engineer building production-ready web applications.",
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

      <HeroSection />
      <Ticker />
      <AboutSection />
    </>
  );
}