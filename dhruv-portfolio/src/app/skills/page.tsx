import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

const SkillsSection = dynamic(
  () =>
    import("@/components/features/skills/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="skills" />,
    ssr: true,
  }
);

export const metadata = {
  title: "Skills - Dhruv Gupta",
  description: "My technical skills and expertise in various technologies",
};

export default function SkillsPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="skills" />}>
          <SkillsSection />
        </Suspense>
      </div>
    </>
  );
}
