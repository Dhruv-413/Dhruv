import { SkillsSection } from "@/components/features/skills/SkillsSection";

export const metadata = {
  title: "Skills - Dhruv Gupta",
  description: "My technical skills and expertise in various technologies",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-20">
      <SkillsSection />
    </div>
  );
}
