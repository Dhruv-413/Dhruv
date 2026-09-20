import skillsData from "@/data/skills.json";
import projectsData from "@/data/projects.json";
import type { SkillGroup } from "@/types/skill";
import { normaliseTech } from "@/lib/skills";
import { SkillsBento, type BentoGroup, type BentoProject } from "./SkillsBento";

/**
 * The stack section (DESIGN.md §5, 2026-09-21). The join between a skill and the projects that used it is made here,
 * on the server, from the real `technologies` lists in projects.json: nothing on this page claims a use that the
 * project data does not show. No proficiency numbers or bars (§4.7). Projects are listed oldest first, like /projects.
 */
export function SkillsMatrix() {
  const projects = [...projectsData].sort((a, b) => a.date.localeCompare(b.date));
  const bentoProjects: BentoProject[] = projects.map(({ id, title }) => ({ id, title }));

  const groups: BentoGroup[] = (skillsData as SkillGroup[]).map((group) => ({
    category: group.category,
    blurb: group.blurb,
    note: group.note,
    figure: group.figure,
    skills: group.skills.map((name) => ({
      name,
      note: group.notes?.[name],
      about: group.about?.[name],
      projectIds: projects
        .filter((project) => project.technologies.some((tech) => normaliseTech(tech) === normaliseTech(name)))
        .map((project) => project.id),
    })),
  }));

  return (
    <section aria-labelledby="skills-title" className="page-shell pb-(--section-pad) pt-8 md:pt-10">
      <h2 id="skills-title" className="sr-only">
        What I work with, {groups.flatMap((g) => g.skills).length} skills in {groups.length} groups
      </h2>
      <p className="t-label mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="mark-plus text-primary" aria-hidden="true" />
          <span aria-hidden="true">[01]</span> Stack
        </span>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">Pick a skill: what it means, and where I used it</span>
      </p>
      <SkillsBento groups={groups} projects={bentoProjects} />
    </section>
  );
}
