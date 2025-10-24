import { TimelineSection } from "@/components/features/timeline/TimelineSection";

export const metadata = {
  title: "Experience - Dhruv Gupta",
  description: "My professional experience and education journey",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-20">
      <TimelineSection />
    </div>
  );
}
