import skillsData from "@/data/skills.json";
import { SectionHead } from "@/components/ui/page-primitives";

/**
 * Skills as a matrix (DESIGN.md §4.9, slice 3): one hairline cell per category, skills as a plain list.
 * Server component. No proficiency numbers or bars: they are self-assessed and read as vanity data (§4.7).
 */
export function SkillsMatrix() {
  return (
    <section aria-labelledby="skills-title" className="page-shell py-(--section-pad)">
      <SectionHead index="01" label="Stack" title="By area" id="skills-title" />

      <ul role="list" className="hairline-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {skillsData.map((group, i) => (
          <li key={group.category} data-reveal className="flex min-h-56 flex-col p-6 md:p-8">
            <p className="t-label flex items-center justify-between text-muted-foreground">
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true">{String(group.skills.length).padStart(2, "0")}</span>
            </p>
            <h3 className="t-h2 mt-6">{group.category}</h3>
            <ul role="list" className="mt-auto pt-8">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="border-t border-border py-2.5 text-[1.0625rem] first:border-t-0 md:py-3"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
