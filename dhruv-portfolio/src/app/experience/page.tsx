import { TimelineSection } from "@/components/features/timeline/TimelineSection";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata = {
  title: "Experience - Dhruv Gupta",
  description: "My professional experience and education journey",
};

export default function ExperiencePage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-20 relative">
        <TimelineSection />
      </div>
    </>
  );
}
