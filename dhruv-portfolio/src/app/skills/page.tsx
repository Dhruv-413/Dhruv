import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

const SkillsSection = dynamic(
  () =>
    import("@/components/features/skills/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  { ssr: true }
);

export const metadata = {
  title: "Skills - Dhruv Gupta",
  description: "My technical skills and expertise in various technologies",
};

export default function SkillsPage() {
  return (
    <PageWrapper variant="skills">
      <SkillsSection />
    </PageWrapper>
  );
}
