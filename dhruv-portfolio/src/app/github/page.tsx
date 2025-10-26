"use client";

import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

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

export default function GitHubPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="github" />}>
          <GitHubSection />
        </Suspense>
      </div>
    </>
  );
}
