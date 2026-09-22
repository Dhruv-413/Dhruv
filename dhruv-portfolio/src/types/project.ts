export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "AI/ML" | "Full-Stack" | "Computer Vision" | "Backend" | "Frontend" | "Enterprise";
  featured: boolean;
  /** Short label for what sort of project it is, e.g. "Hackathon entry", "Production software". */
  kind?: string;
  /** When in my studies it happened, e.g. "3rd year". */
  period?: string;
  /** Who built it, e.g. "Team of 5", "With a friend". */
  team?: string;
  /** My part, when it was not the whole thing. */
  role?: string;
  /** Private repository: no source link, and no code excerpt is shown. */
  private?: boolean;
  /** The story in plain sentences, in order. Rendered as numbered chapters on the case-study page. */
  chapters?: { title: string; body: string }[];
  /** Show the project's reconstruction figure after this many chapters (default: after the last). */
  figureAfter?: number;
  /** Who built which part, when it was a team. Rendered as a table on the case-study page. */
  credits?: { who: string; what: string }[];
  technologies: string[];
  codeSnippet?: string;
  /** Where the excerpt comes from (a permalink), so the claim can be checked. */
  codeSource?: { label: string; href: string };
  badges?: {
    type: "live" | "deployed" | "performance" | "build";
    label: string;
    value: string;
  }[];
  metrics: {
    label: string;
    value: string;
    icon?: string;
    /** A rough, unmeasured figure: shown with a visible "Estimate" label. */
    estimate?: boolean;
  }[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: string[];
  date: string;
}
