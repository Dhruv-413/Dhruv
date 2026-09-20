import { SITE_CONFIG } from "@/lib/constants";
import { PageHeader } from "@/components/ui/page-primitives";
import { GitHubView } from "@/components/features/github/GitHubView";

// JSON-LD structured data for GitHub page
const githubPageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ],
  },
  name: "GitHub Activity",
  description:
    "Open source contributions, repository statistics, and coding activity",
  url: `${SITE_CONFIG.siteUrl}/github`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_CONFIG.siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "GitHub",
      item: `${SITE_CONFIG.siteUrl}/github`,
    },
  ],
};

export function GitHubContent() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(githubPageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader index="05" label="Open source" title="GitHub">
        <p>Activity and repositories, pulled live from the GitHub API.</p>
      </PageHeader>
      <GitHubView />
      <noscript>
        <p className="page-shell py-16 text-muted-foreground">
          The live activity view needs JavaScript. The profile is at {SITE_CONFIG.links.github}.
        </p>
      </noscript>
    </>
  );
}
