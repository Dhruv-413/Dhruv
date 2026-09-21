import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getCareerSchema, getBreadcrumbSchema } from "@/lib/schema";
import { getTrackModel } from "@/lib/career";
import timelineData from "@/data/timeline.json";
import { PageHeader } from "@/components/ui/page-primitives";
import { CareerTrack } from "@/components/features/career/CareerTrack";
import { CareerChapters } from "@/components/features/career/CareerChapters";

// The time line ends at the current month, so refresh the static page once a day.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Career | Deloitte, ONGC and a B.Tech in Computer Science",
  description:
    "Dhruv Gupta's career on one time line: Deloitte (SAP analyst intern, then Data Modernization and Migration intern), an SAP ABAP summer internship at ONGC, a B.Tech in Computer Science at Manipal University Jaipur, three coding competitions, and the projects and certificates in between.",
  keywords: [
    "career journey",
    "professional experience",
    "Deloitte internship",
    "Data Modernization and Migration",
    "SAP analyst intern",
    "ONGC internship",
    "SAP ABAP",
    "Manipal University Jaipur",
    "B.Tech Computer Science",
    "SAP India Hackfest",
    "Adobe GenSolve",
    "Dhruv Gupta career",
  ],
  openGraph: {
    title: "Career | Dhruv Gupta",
    description:
      "Deloitte, ONGC and a B.Tech in Computer Science on one time line, with the contests, projects and certificates in between.",
    url: `${SITE_CONFIG.siteUrl}/career`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career | Dhruv Gupta",
    description: "Deloitte, ONGC and a B.Tech in Computer Science on one time line, with the contests, projects and certificates in between.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/career`,
  },
};

export default function CareerPage() {
  const model = getTrackModel();
  const years = Math.floor(model.steps / 12);

  // Generate JSON-LD structured data
  const careerSchema = getCareerSchema(
    timelineData.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      organization: item.organization,
      location: item.location,
      startDate: item.startDate,
      endDate: "endDate" in item ? item.endDate : undefined,
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
        <p>
          {years} years on one time line: study, work, contests, projects and certificates. Then each place in full.
        </p>
      </PageHeader>
      <CareerTrack model={model} />
      <CareerChapters />
    </>
  );
}
