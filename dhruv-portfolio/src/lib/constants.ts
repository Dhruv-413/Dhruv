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
  { label: "Experience", href: "/experience" },
  { label: "GitHub", href: "/github" },
  { label: "Contact", href: "/contact" },
] as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;
