import { GitHubSection } from "@/components/features/github/GitHubSection";

export const metadata = {
  title: "GitHub - Dhruv Gupta",
  description: "My GitHub activity, contributions, and open source work",
};

export default function GitHubPage() {
  return (
    <div className="min-h-screen pt-20">
      <GitHubSection />
    </div>
  );
}
