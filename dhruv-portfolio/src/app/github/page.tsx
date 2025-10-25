import { GitHubSection } from "@/components/features/github/GitHubSection";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata = {
  title: "GitHub - Dhruv Gupta",
  description: "My GitHub activity, contributions, and open source work",
};

export default function GitHubPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-20 relative">
        <GitHubSection />
      </div>
    </>
  );
}
