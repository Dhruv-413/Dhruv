import { SITE_CONFIG } from "@/lib/constants";

const linkClass =
  "t-label inline-flex items-center gap-2 py-2 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:text-primary focus-visible:text-primary";

/**
 * Site footer (DESIGN.md §4.8): hairline rule, page grid, mono labels. Server component, no scroll listeners.
 * "Back to top" is a plain in-page anchor, so it works without JavaScript.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="border-t border-border">
      <div className="page-shell grid grid-cols-12 items-start gap-x-(--gutter) gap-y-6 py-10 md:py-14">
        <div className="col-span-12 md:col-span-6">
          <p className="t-label text-foreground">
            © {year} {SITE_CONFIG.name}
          </p>
          <p className="t-label mt-2 text-muted-foreground">Built with Next.js</p>
        </div>

        <ul role="list" className="col-span-12 flex flex-wrap gap-x-6 md:col-span-4">
          <li>
            <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={SITE_CONFIG.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={SITE_CONFIG.links.email} className={linkClass}>
              Email <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <div className="col-span-12 md:col-span-2 md:text-right">
          <a href="#main-content" className={linkClass}>
            Top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
