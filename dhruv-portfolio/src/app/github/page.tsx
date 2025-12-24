"use client";

import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

// Lazy load GitHubSection - it's a heavy component with charts and API calls
const GitHubSection = dynamic(
  () =>
    import("@/components/features/github/GitHubSection").then((mod) => ({
      default: mod.GitHubSection,
    })),
  { ssr: false } // GitHub data is client-side only
);

export default function GitHubPage() {
  return (
    <PageWrapper variant="github">
      <GitHubSection />
    </PageWrapper>
  );
}
