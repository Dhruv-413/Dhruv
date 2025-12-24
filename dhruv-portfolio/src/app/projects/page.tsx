import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

// Lazy load ProjectsSection for better performance
const ProjectsSection = dynamic(
  () =>
    import("@/components/features/projects/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  { ssr: true }
);

export const metadata = {
  title: "Projects - Dhruv Gupta",
  description:
    "Showcase of my work in Full-Stack Development, AI/ML, and Enterprise Software",
};

export default function ProjectsPage() {
  return (
    <PageWrapper variant="projects">
      <ProjectsSection />
    </PageWrapper>
  );
}
