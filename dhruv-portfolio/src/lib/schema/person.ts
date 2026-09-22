/**
 * Person Schema for SEO
 * Generates JSON-LD structured data for a Person
 */

import { SITE_CONFIG, LOCATION, UNIVERSITY } from "../constants";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.siteUrl}/#person`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    image: `${SITE_CONFIG.siteUrl}/images/portrait.webp`,
    jobTitle: SITE_CONFIG.person.jobTitle,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.state,
      addressCountry: LOCATION.country,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.person.alumniOf,
      url: UNIVERSITY.url,
    },
    knowsAbout: SITE_CONFIG.person.knowsAbout,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ],
    worksFor: [
      { "@type": "Organization", name: SITE_CONFIG.person.currentRole.organization },
      { "@type": "Organization", name: SITE_CONFIG.person.venture.name },
    ],
  };
}
