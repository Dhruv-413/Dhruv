export const SITE_CONFIG = {
  name: "Dhruv Gupta",
  title: "Dhruv Gupta | Full Stack Developer & AI/ML Engineer",
  description:
    "Full Stack Developer & AI/ML Engineer with expertise in React, Next.js, Python, and enterprise software. B.Tech CS student at Manipal University Jaipur. Ex-ONGC Intern specializing in scalable web applications and intelligent systems.",
  url: "https://dhruvgupta.dev",
  siteUrl: "https://dhruvgupta.dev",
  ogImage: "/og-image.jpg",
  twitterImage: "/twitter-image.jpg",
  links: {
    github: "https://github.com/Dhruv-413",
    linkedin: "https://www.linkedin.com/in/dhruvgpta/",
    email: "mailto:dhruvgupta6580@gmail.com",
    twitter: "https://twitter.com/dhruvgpta",
  },
  contact: {
    email: "dhruvgupta6580@gmail.com",
    location: "Jaipur, Rajasthan, India",
    phone: "+91-XXXXXXXXXX",
  },
  // SEO Configuration
  seo: {
    keywords: [
      "Dhruv Gupta",
      "Full Stack Developer",
      "AI/ML Engineer",
      "React Developer",
      "Next.js Developer",
      "Python Developer",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "SAP ABAP",
      "Computer Vision",
      "Machine Learning",
      "Web Developer Portfolio",
      "Software Engineer India",
      "Manipal University",
    ],
    locale: "en_US",
    type: "website",
  },
  // Structured Data
  person: {
    jobTitle: "Full Stack Developer & AI/ML Engineer",
    alumniOf: "Manipal University Jaipur",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Machine Learning",
      "Computer Vision",
      "SAP ABAP",
      "Docker",
      "Full Stack Development",
      "Web Development",
    ],
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

// ============================================================================
// Layout Constants
// ============================================================================

export const LAYOUT = {
  MAX_WIDTH: "max-w-7xl",
  CONTAINER: "container mx-auto px-3 sm:px-4 md:px-6 lg:px-8",
  SECTION_PADDING: "py-12 sm:py-16 lg:py-20",
  GRID_GAP: "gap-4 sm:gap-5 lg:gap-6",
} as const;

// ============================================================================
// UI Constants
// ============================================================================

export const CONTRIBUTION_LEVELS = {
  colors: [
    "bg-muted/60 hover:bg-muted",
    "bg-green-500/25 hover:bg-green-500/35",
    "bg-green-500/45 hover:bg-green-500/55",
    "bg-green-500/65 hover:bg-green-500/75",
    "bg-green-500/85 hover:bg-green-500/95",
    "bg-green-500 hover:bg-green-400",
  ],
} as const;

export const CARD_STYLES = {
  base: "bg-card border transition-all duration-500",
  hover: "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20",
  active: "border-primary shadow-2xl shadow-white/15 scale-105",
  inactive: "border-border hover:border-primary/50",
} as const;

// ============================================================================
// Filter Options
// ============================================================================

export const DEFAULT_FILTER = "All" as const;

export const INITIAL_ITEMS_TO_SHOW = 6 as const;
