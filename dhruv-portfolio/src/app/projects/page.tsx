import { ProjectsSection } from "@/components/features/projects/ProjectsSection";

export const metadata = {
  title: "Projects - Dhruv Gupta",
  description:
    "Showcase of my work in Full-Stack Development, AI/ML, and Enterprise Software",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-20">
      <ProjectsSection />
    </div>
  );
}
