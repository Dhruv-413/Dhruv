/**
 * Skills Schema for SEO
 * Generates JSON-LD structured data for Skills/Expertise
 */

import { SITE_CONFIG } from "../constants";

export interface SkillCategoryInput {
  category: string;
  skills: string[];
  proficiency: number;
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
    description: `Technical expertise across ${allSkills.length}+ technologies including AI/ML, Full-Stack Development, and Enterprise Software`,
    numberOfItems: allSkills.length,
    itemListElement: allSkills.map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTerm",
        name: skill,
        description: `Professional proficiency in ${skill}`,
      },
    })),
  };
}
