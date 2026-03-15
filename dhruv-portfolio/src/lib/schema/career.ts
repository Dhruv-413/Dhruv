/**
 * Career Schema for SEO
 * Generates JSON-LD structured data for Career/Experience
 */

import { SITE_CONFIG } from "../constants";

export interface ExperienceInput {
  id: string;
  type: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
}

/**
 * Career/Experience Schema
 */
export function getCareerSchema(
  experiences: Array<ExperienceInput>
) {
  const workExperiences = experiences.filter((exp) => exp.type === "work");
  const education = experiences.filter((exp) => exp.type === "education");

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      jobTitle: SITE_CONFIG.person.jobTitle,
      worksFor: workExperiences.map((exp) => ({
        "@type": "Organization",
        name: exp.organization,
        address: {
          "@type": "PostalAddress",
          addressLocality: exp.location,
        },
      })),
      alumniOf: education.map((edu) => ({
        "@type": "EducationalOrganization",
        name: edu.organization,
      })),
      hasOccupation: workExperiences.map((exp) => ({
        "@type": "Occupation",
        name: exp.title,
        occupationLocation: {
          "@type": "City",
          name: exp.location,
        },
        description: Array.isArray(exp.description)
          ? exp.description.join(". ")
          : exp.description ?? "",
      })),
    },
  };
}
