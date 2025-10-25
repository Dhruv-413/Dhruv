import { SkillsSection } from "@/components/features/skills/SkillsSection";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata = {
  title: "Skills - Dhruv Gupta",
  description: "My technical skills and expertise in various technologies",
};

export default function SkillsPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-20 relative">
        <SkillsSection />
      </div>
    </>
  );
}
