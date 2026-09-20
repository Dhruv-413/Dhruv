import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getSkillsSchema, getBreadcrumbSchema } from "@/lib/schema";
import skillsData from "@/data/skills.json";
import { PageHeader } from "@/components/ui/page-primitives";
import { SkillsMatrix } from "@/components/features/skills/SkillsMatrix";
import { Certifications } from "@/components/features/skills/Certifications";

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
  },
  twitter: {
    card: "summary_large_image",
    title: `Technical Skills | ${totalTechnologies}+ Technologies`,
    description:
      "Comprehensive technical expertise across Full Stack Development, AI/ML, DevOps, and Enterprise Software.",
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

      <PageHeader index="03" label="Skills" title="Skills">
        <p>Languages, frameworks and tools, grouped by area, with the courses behind them.</p>
      </PageHeader>
      <SkillsMatrix />
      <Certifications />
    </>
  );
}
