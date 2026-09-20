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
  title: "Skills | Data Engineering, Cloud, Full Stack & AI/ML",
  description: `${totalTechnologies} skills across data engineering (Databricks, Apache Spark), cloud (Azure), backend, frontend and AI/ML, with the projects that used each and the certifications behind them.`,
  keywords: [
    "technical skills",
    "Azure",
    "Databricks",
    "Apache Spark",
    "data lakehouse",
    "data engineering",
    "data migration",
    "Python developer",
    "React skills",
    "Next.js developer",
    "TypeScript",
    "AI/ML skills",
    "computer vision",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "SAP ABAP",
    "Power BI",
    "Dhruv Gupta skills",
  ],
  openGraph: {
    title: `Skills | Data, Cloud, Full Stack and AI/ML | Dhruv Gupta`,
    description:
      "Data engineering, cloud, full stack and AI/ML: what I work with, which of my projects used it, and the certifications behind it.",
    url: `${SITE_CONFIG.siteUrl}/skills`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Data, Cloud, Full Stack and AI/ML",
    description:
      "Data engineering, cloud, full stack and AI/ML: what I work with and the projects that used it.",
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
        <p>
          What I work with, newest first: the cloud and data tools from my internship at Deloitte, then the stack I
          have built projects with, and the certifications behind it.
        </p>
      </PageHeader>
      <SkillsMatrix />
      <Certifications />
    </>
  );
}
