/**
 * Contact Page Schema for SEO
 * Generates JSON-LD structured data for Contact Page
 */

import { SITE_CONFIG } from "../constants";
import { LOCATION } from "../constants";

/**
 * Contact Page Schema
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_CONFIG.name}`,
    description: `Get in touch with ${SITE_CONFIG.name} for web development projects, AI/ML solutions, and collaboration opportunities`,
    url: `${SITE_CONFIG.siteUrl}/contact`,
    mainEntity: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: LOCATION.city,
        addressRegion: LOCATION.state,
        addressCountry: LOCATION.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "professional inquiries",
        email: SITE_CONFIG.contact.email,
        availableLanguage: ["English", "Hindi"],
      },
    },
  };
}
