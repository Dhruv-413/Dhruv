import { Hero } from "@/components/features/hero/Hero";
import { ProjectsSection } from "@/components/features/projects/ProjectsSection";
import { SkillsSection } from "@/components/features/skills/SkillsSection";
import { TimelineSection } from "@/components/features/timeline/TimelineSection";
import { StatsSection } from "@/components/features/stats/StatsSection";
import { GitHubSection } from "@/components/features/github/GitHubSection";
import { ContactSection } from "@/components/features/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <TimelineSection />
      <StatsSection />
      <GitHubSection />
      <ContactSection />
    </>
  );
}
