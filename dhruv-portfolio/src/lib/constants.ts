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
