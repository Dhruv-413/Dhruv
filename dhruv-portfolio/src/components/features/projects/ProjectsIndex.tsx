import Link from "next/link";
import projects from "@/data/projects.json";
import { FilterableList, type FilterItem } from "./FilterableList";

/**
 * Projects index (DESIGN.md §4.9, slice 2): hairline rows that invert on hover/focus, each linking to its case study.
 * Rows are rendered on the server; only the category filter is a client island.
 */
export function ProjectsIndex() {
  const categories = [...new Set(projects.map((project) => project.category))];

  const items: FilterItem[] = projects.map((project, i) => ({
    id: project.id,
    category: project.category,
    node: (
      <Link
        href={`/projects/${project.id}`}
        className="group grid grid-cols-12 items-baseline gap-x-(--gutter) gap-y-3 border-t border-border px-2 py-7 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:px-4 md:py-10"
      >
        <span
          aria-hidden="true"
          className="t-label col-span-2 text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70 md:col-span-1"
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        <span className="col-span-10 md:col-span-6">
          <span className="t-h2 block transition-transform duration-(--dur-reveal) ease-(--ease-out) group-hover:translate-x-1 group-focus-visible:translate-x-1">
            {project.title}
          </span>
          <span className="mt-3 block max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
            {project.description}
          </span>
        </span>

        <span className="t-label col-span-10 col-start-3 text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70 md:col-span-4 md:col-start-8">
          {project.category}
          <span aria-hidden="true" className="mt-2 block leading-relaxed">
            {project.technologies.slice(0, 4).join(" / ")}
          </span>
        </span>

        <span className="t-label hidden whitespace-nowrap text-right md:col-span-1 md:block">
          {new Date(project.date).getFullYear()} <span aria-hidden="true">↗</span>
        </span>
      </Link>
    ),
  }));

  return (
    <section aria-label="Project list" className="page-shell py-(--section-pad)">
      <FilterableList categories={categories} items={items} />
    </section>
  );
}
