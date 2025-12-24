export const SITE_CONFIG = {
  name: "Dhruv Gupta",
  title: "Dhruv Gupta",
  description:
    "Computer Science student at Manipal University with expertise in Full-Stack Development, AI/ML, and Enterprise Software. Ex-ONGC Intern specializing in Python, React, Next.js, and SAP.",
  url: "https://dhruvgupta.dev",
  siteUrl: "https://dhruvgupta.dev",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/Dhruv-413",
    linkedin: "https://www.linkedin.com/in/dhruvgpta/",
    email: "mailto:dhruvgupta6580@gmail.com",
  },
  contact: {
    email: "dhruvgupta6580@gmail.com",
    phone: "+91-9650791766",
    location: "Ghaziabad, Uttar Pradesh, India",
  },
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Career", href: "/career" },
  { label: "GitHub", href: "/github" },
  { label: "Contact", href: "/contact" },
] as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

/**
 * Category colors for projects and skills
 * Provides consistent color scheme across the application
 */
export const CATEGORY_COLORS = {
  "AI/ML": { color: "#a855f7", bg: "#a855f720" },
  "Full-Stack": { color: "#3b82f6", bg: "#3b82f620" },
  "Computer Vision": { color: "#10b981", bg: "#10b98120" },
  Enterprise: { color: "#f59e0b", bg: "#f59e0b20" },
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;
