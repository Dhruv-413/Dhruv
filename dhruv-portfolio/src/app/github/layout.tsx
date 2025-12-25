import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GitHub Activity | Open Source Contributions & Projects",
  description:
    "Explore Dhruv Gupta's GitHub activity including open source contributions, repositories, language distribution, and coding statistics. Active contributor with projects in React, TypeScript, Python, and more.",
  keywords: [
    "GitHub profile",
    "open source contributions",
    "GitHub activity",
    "coding statistics",
    "repository showcase",
    "developer GitHub",
    "Dhruv Gupta GitHub",
    "programming languages",
    "code contributions",
    "software repositories",
    "TypeScript projects",
    "React repositories",
  ],
  openGraph: {
    title: "GitHub Activity | Dhruv Gupta - Full Stack Developer",
    description:
      "Explore open source contributions, repository statistics, and coding activity. Active GitHub contributor with projects in React, TypeScript, Python, and more.",
    url: `${SITE_CONFIG.siteUrl}/github`,
    type: "profile",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-github.jpg`,
        width: 1200,
        height: 630,
        alt: "GitHub Activity - Dhruv Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Activity | Dhruv Gupta",
    description:
      "Open source contributions, repository statistics, and coding activity on GitHub.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-github.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/github`,
  },
};

export default function GitHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
