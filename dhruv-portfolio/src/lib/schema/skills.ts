/**
 * Skills Schema for SEO
 * Generates JSON-LD structured data for Skills/Expertise
 */

import { SITE_CONFIG } from "../constants";

export interface SkillCategoryInput {
  category: string;
  skills: string[];
}

/**
 * Skills/Expertise Schema
 */
export function getSkillsSchema(
  skills: Array<SkillCategoryInput>
) {
  const allSkills = skills.flatMap((cat) => cat.skills);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_CONFIG.name}'s Technical Skills`,
    description: `Technical skills across ${allSkills.length} technologies in data engineering, cloud, full-stack development and AI/ML`,
    numberOfItems: allSkills.length,
    itemListElement: allSkills.map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTerm",
        name: skill,
      },
    })),
  };
}
