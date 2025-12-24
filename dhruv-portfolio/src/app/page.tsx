import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

// Lazy load Hero component for better initial page load
const Hero = dynamic(
  () =>
    import("@/components/features/hero/Hero").then((mod) => ({
      default: mod.Hero,
    })),
  { ssr: true }
);

export default function Home() {
  return (
    <PageWrapper variant="page" includeTopPadding={false}>
      <Hero />
    </PageWrapper>
  );
}
