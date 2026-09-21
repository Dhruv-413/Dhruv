"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLink } from "@/components/ui/page-primitives";

/** Shown only when /github cannot be rendered at all (a cold render while GitHub is down). */
export default function GitHubError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page-shell pt-28 pb-(--section-pad) md:pt-36">
      <div role="alert" className="border border-border p-6 md:p-10">
        <p className="t-label text-primary">Feed unavailable</p>
        <p className="t-h2 mt-3">GitHub data is not loading right now.</p>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
          This page is built from the GitHub API and it could not be reached. Try again, or read the profile on GitHub directly.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={reset}
            className="t-label inline-flex h-12 items-center gap-2 border border-primary bg-primary px-5 text-primary-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Retry <span aria-hidden="true">↻</span>
          </button>
          <ArrowLink href={SITE_CONFIG.links.github} external>
            Open GitHub profile
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
