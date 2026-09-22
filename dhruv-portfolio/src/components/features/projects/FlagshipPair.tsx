import Link from "next/link";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const projects = projectsData as unknown as Project[];
// The two full case studies (docs/world-class-plan/06-content.md), shown before the chronological list.
// One owner-confirmed fact each, so a cell says why it is worth the click.
const FLAGSHIPS = [
  { id: "muj-placement-portal", fact: "Our juniors run it today." },
  { id: "crave-connect", fact: "Dropped after market research." },
];

/** /projects, above the list: the two case studies to read first, as two hairline cells that are whole links. */
export function FlagshipPair() {
  const items = FLAGSHIPS.flatMap(({ id, fact }) => {
    const project = projects.find((p) => p.id === id);
    return project ? [{ project, fact }] : [];
  });
  if (!items.length) return null;

  return (
    <section aria-labelledby="flagships-title" className="page-shell pb-12 md:pb-16">
      <h2 id="flagships-title" className="t-label mb-4 flex items-center gap-2 text-muted-foreground">
        <span className="mark-plus text-primary" aria-hidden="true" />
        Start with these two
      </h2>
      <ul role="list" className="hairline-grid grid-cols-1 md:grid-cols-2">
        {items.map(({ project, fact }) => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="group flex h-full min-h-44 flex-col p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:p-8"
            >
              <span className="t-label text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
                {project.kind} / {project.period}
              </span>
              <span className="mt-auto block pt-8">
                <span className="t-h2 block text-[clamp(1.75rem,3vw,2.5rem)]">{project.title}</span>
                {project.role ? (
                  <span className="mt-3 block text-lg font-medium">
                    My part: {project.role.charAt(0).toLowerCase() + project.role.slice(1)}
                  </span>
                ) : null}
                <span className="mt-1 block text-[1.0625rem] text-muted-foreground transition-colors duration-(--dur-ui) group-hover:text-background/70 group-focus-visible:text-background/70">
                  {fact}
                </span>
              </span>
              <span className="t-label flex items-center gap-2 pt-6">
                Read the case study <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
