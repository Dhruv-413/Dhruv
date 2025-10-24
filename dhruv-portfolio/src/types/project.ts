export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "AI/ML" | "Full-Stack" | "Computer Vision" | "Enterprise";
  featured: boolean;
  technologies: string[];
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
