import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { loadGitHub } from "@/lib/github";
import { GitHubContent } from "./GitHubContent";

// Server-rendered from the GitHub GraphQL API and cached for an hour (the token never leaves the server).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "GitHub Activity",
  description:
    "Explore my open source contributions, repository statistics, and coding activity on GitHub. View my projects, stars, and contribution graph.",
  keywords: [
    "GitHub",
    "open source",
    "contributions",
    "repositories",
    "coding activity",
    "developer portfolio",
  ],
  openGraph: {
    title: `GitHub Activity | ${SITE_CONFIG.name}`,
    description:
      "Explore my open source contributions, repository statistics, and coding activity on GitHub.",
    url: `${SITE_CONFIG.siteUrl}/github`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `GitHub Activity | ${SITE_CONFIG.name}`,
    description:
      "Explore my open source contributions and repository statistics.",
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/github`,
  },
};

export default async function GitHubPage() {
  return <GitHubContent data={await loadGitHub()} />;
}
