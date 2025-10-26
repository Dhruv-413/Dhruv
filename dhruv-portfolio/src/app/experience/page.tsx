import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

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

export const metadata = {
  title: "Experience - Dhruv Gupta",
  description: "My professional experience and education journey",
};

export default function ExperiencePage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="timeline" />}>
          <TimelineSection />
        </Suspense>
      </div>
    </>
  );
}
