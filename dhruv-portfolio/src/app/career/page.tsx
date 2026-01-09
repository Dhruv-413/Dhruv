import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";
import { getCareerSchema, getBreadcrumbSchema } from "@/lib/schema";
import timelineData from "@/data/timeline.json";

const TimelineSection = dynamic(
  () =>
    import("@/components/features/timeline/TimelineSection").then((mod) => ({
      default: mod.TimelineSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="timeline" />,
    ssr: true,
  }
);

export const metadata: Metadata = {
  title: "Career Journey | Professional Experience & Education",
  description:
    "Explore Dhruv Gupta's career journey including internship at ONGC (Oil and Natural Gas Corporation), B.Tech in Computer Science at Manipal University Jaipur, and achievements like SAP India Hackfest Top 50 and Adobe GenSolve qualifier.",
  keywords: [
    "career journey",
    "professional experience",
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
      "From Computer Science education at Manipal University to enterprise impact at ONGC. Explore achievements, work experience, and professional growth.",
    url: `${SITE_CONFIG.siteUrl}/career`,
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-career.jpg`,
        width: 1200,
        height: 630,
        alt: "Career Journey - Professional Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Journey | Dhruv Gupta",
    description:
      "From Computer Science education to enterprise impact. Explore achievements, work experience, and professional growth.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-career.jpg`],
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

      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="timeline" />}>
          <TimelineSection />
        </Suspense>
      </div>
    </>
  );
}
