/**
 * Website Schema for SEO
 * Generates JSON-LD structured data for a WebSite
 */

import { SITE_CONFIG } from "../constants";

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.siteUrl}/#website`,
    url: SITE_CONFIG.siteUrl,
    name: `${SITE_CONFIG.name} Portfolio`,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#person`,
    },
    inLanguage: "en-US",
  };
}
