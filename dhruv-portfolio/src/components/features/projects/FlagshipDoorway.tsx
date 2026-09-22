import Link from "next/link";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { ArrowLink } from "@/components/ui/page-primitives";
import { ProjectArt } from "./ProjectArt";

const projects = projectsData as unknown as Project[];
const FLAGSHIP_ID = "muj-placement-portal";

/**
 * Home, "proof": the one flagship case study, straight after the demo it is the source of. Title, facts and credits
 * come from projects.json so this can't drift from the case page. The bridge line answers "is he data or screens?":
 * the records moved, and the screens I built are where they get used (both owner-confirmed).
 */
export function FlagshipDoorway() {
  const project = projects.find((p) => p.id === FLAGSHIP_ID);
  if (!project) return null;
  const href = `/projects/${project.id}`;

  return (
    <section id="flagship" aria-labelledby="flagship-title" className="page-shell scroll-mt-20 border-t border-border py-(--section-pad)">
      <p className="t-label mb-8 flex items-center gap-2 text-muted-foreground md:mb-12">
        <span className="mark-plus text-primary" aria-hidden="true" />
        <span aria-hidden="true">[04]</span> Selected work
      </p>

      <div className="grid grid-cols-12 items-start gap-x-(--gutter) gap-y-12">
        <div className="col-span-12 lg:col-span-7 lg:row-start-1">
          <p className="t-label text-muted-foreground">
            {project.kind} / {project.period}
          </p>
          <h2 id="flagship-title" className="t-h1 mt-4 text-[clamp(2.75rem,8vw,7rem)] leading-[0.88]">
            <Link
              href={href}
              className="transition-colors duration-(--dur-ui) ease-(--ease-out) hover:text-primary focus-visible:text-primary"
            >
              {project.title}
            </Link>
          </h2>
          <p className="mt-6 max-w-[30ch] text-[clamp(1.375rem,2.4vw,2.125rem)] font-medium leading-[1.18] tracking-tight">
            The placement office&apos;s records moved into one database. I built the screens where its staff{" "}
            <span className="t-serif text-primary">use them</span>.
          </p>

          {project.credits?.length ? (
            <dl className="mt-10 border-t border-border">
              {project.credits.map((credit) => (
                <div key={credit.who} className="grid grid-cols-12 gap-x-(--gutter) border-b border-border py-3">
                  <dt className="col-span-4 font-medium sm:col-span-3">{credit.who}</dt>
                  <dd className="col-span-8 text-[1.0625rem] leading-snug text-muted-foreground sm:col-span-9">
                    {credit.what}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <ProjectArt id={project.id} />
        </div>

        {/* after the figure on phones, so the section ends on a next step */}
        <div className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-2 lg:col-span-7 lg:row-start-2 lg:-mt-4">
          <ArrowLink href={href}>How we rebuilt it</ArrowLink>
          <ArrowLink href="/projects">All {projects.length} projects</ArrowLink>
        </div>
      </div>
    </section>
  );
}
