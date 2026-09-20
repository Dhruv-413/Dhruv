import Link from "next/link";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { ProjectArt } from "./ProjectArt";
import { ProjectsBrowser, type BrowserItem } from "./ProjectsBrowser";

// Oldest first: the order they were built, which is also the story (hackathon, minor project, ..., latest side project).
const projects = [...(projectsData as unknown as Project[])].sort((a, b) => a.date.localeCompare(b.date));

const muted =
  "text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70";

/**
 * Projects index (DESIGN.md §4.9): hairline rows that invert on hover/focus and link to their case study, beside a
 * sticky preview panel showing that project's illustration. Rows and art frames are rendered on the server; the
 * "which row is active" state is client-side, and three of the illustrations are small interactive islands.
 */
export function ProjectsIndex() {
  const items: BrowserItem[] = projects.map((project, i) => ({
    id: project.id,
    kind: project.kind,
    period: project.period,
    team: project.team,
    role: project.role,
    cover: <ProjectArt id={project.id} />,
    node: (
      <Link
        href={`/projects/${project.id}`}
        className="group grid grid-cols-12 gap-x-(--gutter) gap-y-2 border-t border-border px-2 py-7 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:px-4 md:py-10"
      >
        <span aria-hidden="true" className={`t-label col-span-2 md:col-span-1 ${muted}`}>
          {String(i + 1).padStart(2, "0")}
        </span>

        <span className="col-span-10 md:col-span-11">
          <span className={`t-label flex flex-wrap items-center gap-x-3 gap-y-1 ${muted}`}>
            <span className="size-1.5 bg-primary" aria-hidden="true" />
            {project.kind ?? project.category}
            {project.team ? <span>/ {project.team}</span> : null}
            {project.period ? <span>/ {project.period}</span> : null}
          </span>

          <span className="t-h2 mt-3 flex items-baseline justify-between gap-4">
            <span className="transition-transform duration-(--dur-reveal) ease-(--ease-out) group-hover:translate-x-1 group-focus-visible:translate-x-1">
              {project.title}
            </span>
            <span aria-hidden="true" className="t-label hidden md:inline">
              ↗
            </span>
          </span>

          <span className={`mt-3 block max-w-[54ch] text-[1.0625rem] leading-relaxed ${muted}`}>{project.description}</span>

          <span aria-hidden="true" className={`t-label mt-4 block leading-relaxed ${muted}`}>
            {project.technologies.slice(0, 5).join(" / ")}
          </span>
        </span>
      </Link>
    ),
  }));

  return (
    <section aria-label="Project list" className="page-shell pb-(--section-pad)">
      <ProjectsBrowser items={items} />
    </section>
  );
}
