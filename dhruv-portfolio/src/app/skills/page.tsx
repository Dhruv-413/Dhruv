import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";
import { getSkillsSchema, getBreadcrumbSchema } from "@/lib/schema";
import skillsData from "@/data/skills.json";

const SkillsSection = dynamic(
  () =>
    import("@/components/features/skills/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="skills" />,
    ssr: true,
  }
);

// Calculate total technologies for metadata
const totalTechnologies = skillsData
  .flatMap((cat) => cat.skills)
  .filter((skill, index, self) => self.indexOf(skill) === index).length;

export const metadata: Metadata = {
  title: "Technical Skills | Full Stack & AI/ML Expertise",
  description: `Comprehensive technical skills across ${totalTechnologies}+ technologies including React, Next.js, Python, TypeScript, FastAPI, PyTorch, TensorFlow, PostgreSQL, Docker, and SAP ABAP. Full Stack Development, AI/ML, and Enterprise Software expertise.`,
  keywords: [
    "technical skills",
    "React skills",
    "Next.js developer",
    "Python developer",
    "TypeScript expertise",
    "AI/ML skills",
    "machine learning",
    "computer vision",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "SAP ABAP",
    "full stack development skills",
    "web development expertise",
    "Dhruv Gupta skills",
  ],
  openGraph: {
    title: `Technical Skills | ${totalTechnologies}+ Technologies | Dhruv Gupta`,
    description:
      "Comprehensive technical expertise across Full Stack Development, AI/ML, DevOps, and Enterprise Software. View detailed skill breakdown and proficiency levels.",
    url: `${SITE_CONFIG.siteUrl}/skills`,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-skills.jpg`,
        width: 1200,
        height: 630,
        alt: "Technical Skills - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Technical Skills | ${totalTechnologies}+ Technologies`,
    description:
      "Comprehensive technical expertise across Full Stack Development, AI/ML, DevOps, and Enterprise Software.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-skills.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/skills`,
  },
};

export default function SkillsPage() {
  // Generate JSON-LD structured data
  const skillsSchema = getSkillsSchema(
    skillsData.map((cat) => ({
      category: cat.category,
      skills: cat.skills,
      proficiency: cat.proficiency,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.siteUrl },
    { name: "Skills", url: `${SITE_CONFIG.siteUrl}/skills` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(skillsSchema).replace(/</g, "\\u003c"),
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
        <Suspense fallback={<LoadingSkeleton variant="skills" />}>
          <SkillsSection />
        </Suspense>
      </div>
    </>
  );
}
