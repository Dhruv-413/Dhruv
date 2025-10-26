import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

// Lazy load Hero component for better initial page load
const Hero = dynamic(
  () =>
    import("@/components/features/hero/Hero").then((mod) => ({
      default: mod.Hero,
    })),
  {
    loading: () => <LoadingSkeleton variant="page" />,
    ssr: true,
  }
);

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Suspense fallback={<LoadingSkeleton variant="page" />}>
        <Hero />
      </Suspense>
    </>
  );
}
