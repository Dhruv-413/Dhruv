export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "AI/ML" | "Full-Stack" | "Computer Vision" | "Enterprise";
  featured: boolean;
  technologies: string[];
  codeSnippet?: string;
  badges?: {
    type: "live" | "deployed" | "performance" | "build";
    label: string;
    value: string;
  }[];
  metrics: {
    label: string;
    value: string;
    icon?: string;
  }[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: string[];
  date: string;
}
