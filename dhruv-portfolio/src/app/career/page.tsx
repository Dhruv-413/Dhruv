import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

const TimelineSection = dynamic(
  () =>
    import("@/components/features/timeline/TimelineSection").then((mod) => ({
      default: mod.TimelineSection,
    })),
  { ssr: true }
);

export const metadata = {
  title: "Career - Dhruv Gupta",
  description: "My professional career and education journey",
};

export default function CareerPage() {
  return (
    <PageWrapper variant="timeline">
      <TimelineSection />
    </PageWrapper>
  );
}
