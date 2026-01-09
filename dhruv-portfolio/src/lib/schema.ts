/**
 * JSON-LD Structured Data Schemas for SEO
 * These schemas help search engines understand the content better
 * and enable rich snippets in search results.
 */

import { SITE_CONFIG } from "./constants";

// Person Schema for the homepage
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.siteUrl}/#person`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    image: `${SITE_CONFIG.siteUrl}/profile-photo.jpg`,
    jobTitle: SITE_CONFIG.person.jobTitle,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.person.alumniOf,
      url: "https://jaipur.manipal.edu/",
    },
    knowsAbout: SITE_CONFIG.person.knowsAbout,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Open to Opportunities",
    },
  };
}

// Website Schema
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

// Portfolio/ItemList Schema for Projects
export function getProjectsListSchema(
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    date: string;
    links?: { github?: string; live?: string };
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Projects Portfolio",
    description: `Collection of ${projects.length} web development and AI/ML projects by ${SITE_CONFIG.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
        name: project.title,
        description: project.description,
        url:
          project.links?.live ||
          `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        author: {
          "@type": "Person",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.siteUrl,
        },
        datePublished: project.date,
        programmingLanguage: project.technologies,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    })),
  };
}

// Individual Project Schema
export function getProjectSchema(project: {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  date: string;
  links?: { github?: string; live?: string };
  images?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    image: project.images?.[0] || SITE_CONFIG.ogImage,
    url: project.links?.live || `${SITE_CONFIG.siteUrl}/projects#${project.id}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
    },
    datePublished: project.date,
    programmingLanguage: project.technologies,
    codeRepository: project.links?.github,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

// Skills/Expertise Schema
export function getSkillsSchema(
  skills: Array<{
    category: string;
    skills: string[];
    proficiency: number;
  }>
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

// Career/Experience Schema
export function getCareerSchema(
  experiences: Array<{
    id: string;
    type: string;
    title: string;
    organization: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string[];
  }>
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

// Contact Page Schema
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
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
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

// Breadcrumb Schema
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
