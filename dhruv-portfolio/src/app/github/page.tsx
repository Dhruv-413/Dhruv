"use client";

import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";

// Lazy load GitHubSection - it's a heavy component with charts and API calls
const GitHubSection = dynamic(
  () =>
    import("@/components/features/github/GitHubSection").then((mod) => ({
      default: mod.GitHubSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="github" />,
    ssr: false, // GitHub data is client-side only
  }
);

// JSON-LD structured data for GitHub page
const githubPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ],
  },
  name: "GitHub Activity",
  description:
    "Open source contributions, repository statistics, and coding activity",
  url: `${SITE_CONFIG.siteUrl}/github`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_CONFIG.siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "GitHub",
      item: `${SITE_CONFIG.siteUrl}/github`,
    },
  ],
};

export default function GitHubPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(githubPageSchema).replace(/</g, "\\u003c"),
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
        <Suspense fallback={<LoadingSkeleton variant="github" />}>
          <GitHubSection />
        </Suspense>
      </div>
    </>
  );
}
