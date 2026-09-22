import Link from "next/link";
import projects from "@/data/projects.json";

/** Home, last block: where to go next. Moved out of About so it follows the demo and the flagship (action comes last). */
export function ContinueNav() {
  return (
    <div className="page-shell pb-(--section-pad)">
      <nav aria-label="Continue" className="hairline-grid grid-cols-1 md:grid-cols-2">
        <Link
          href="/projects"
          className="group flex min-h-48 flex-col justify-between gap-10 p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:p-8"
        >
          <span className="t-label text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
            {String(projects.length).padStart(2, "0")} projects
          </span>
          <span className="t-h1 flex items-end justify-between gap-4">
            Projects <span aria-hidden="true">↗</span>
          </span>
        </Link>
        <Link
          href="/contact"
          className="group flex min-h-48 flex-col justify-between gap-10 p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground md:p-8"
        >
          <span className="t-label text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
            Have a question or an idea
          </span>
          <span className="t-h1 flex items-end justify-between gap-4">
            Contact <span aria-hidden="true">↗</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
