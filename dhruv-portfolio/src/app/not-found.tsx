import type { Metadata } from "next";
import { NotFoundMap } from "@/components/features/not-found/NotFoundMap";

// Next already adds `noindex` to the not-found response, so only the title is set here
export const metadata: Metadata = {
  title: "404 | Page not found",
};

/**
 * The 404 as a map of the site in cells (DESIGN.md §4.6): one dead cell for the address that failed, one live cell per
 * page. Prerendered; the only client code is the island that reads the address and marks the closest real page.
 */
export default function NotFound() {
  return (
    <div className="page-shell pt-28 pb-(--section-pad) md:pt-36">
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <p className="t-label flex items-center gap-2 text-muted-foreground">
          <span className="mark-plus text-primary" aria-hidden="true" />
          <span aria-hidden="true">[404]</span> Signal lost
        </p>
        <p className="t-label hidden text-muted-foreground sm:block">Nothing lives at this address. These pages do.</p>
      </div>
      <NotFoundMap />
    </div>
  );
}
