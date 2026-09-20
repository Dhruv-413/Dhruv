import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getCareerSchema, getBreadcrumbSchema } from "@/lib/schema";
import timelineData from "@/data/timeline.json";
import { PageHeader } from "@/components/ui/page-primitives";
import { Timeline } from "@/components/features/timeline/Timeline";

export const metadata: Metadata = {
  title: "Career Journey | Professional Experience & Education",
  description:
    "Explore Dhruv Gupta's career journey: Data Modernization and Migration Intern at Deloitte, summer internship at ONGC (Oil and Natural Gas Corporation), B.Tech in Computer Science at Manipal University Jaipur, and achievements like SAP India Hackfest Top 50 and Adobe GenSolve qualifier.",
  keywords: [
    "career journey",
    "professional experience",
    "Deloitte internship",
    "ONGC internship",
    "Manipal University Jaipur",
    "B.Tech Computer Science",
    "SAP India Hackfest",
    "Adobe GenSolve",
    "software engineer career",
    "developer experience",
    "work experience",
    "education background",
    "Dhruv Gupta career",
  ],
  openGraph: {
    title: "Career Journey | Dhruv Gupta - Full Stack Developer",
    description:
      "From a Computer Science degree at Manipal University Jaipur to ONGC and Deloitte. Explore achievements, work experience, and professional growth.",
    url: `${SITE_CONFIG.siteUrl}/career`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Journey | Dhruv Gupta",
    description:
      "From a Computer Science degree to ONGC and Deloitte. Explore achievements, work experience, and professional growth.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/career`,
  },
};

export default function CareerPage() {
  // Generate JSON-LD structured data
  const careerSchema = getCareerSchema(
    timelineData.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      organization: item.organization,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description ?? [],
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.siteUrl },
    { name: "Career", url: `${SITE_CONFIG.siteUrl}/career` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(careerSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader index="04" label="Career" title="Career" rule={false}>
        <p>Work, study and competitions, newest first.</p>
      </PageHeader>
      <Timeline />
    </>
  );
}
