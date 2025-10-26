import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

// Lazy load ProjectsSection for better performance
const ProjectsSection = dynamic(
  () =>
    import("@/components/features/projects/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="projects" />,
    ssr: true,
  }
);

export const metadata = {
  title: "Projects - Dhruv Gupta",
  description:
    "Showcase of my work in Full-Stack Development, AI/ML, and Enterprise Software",
};

export default function ProjectsPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="projects" />}>
          <ProjectsSection />
        </Suspense>
      </div>
    </>
  );
}
