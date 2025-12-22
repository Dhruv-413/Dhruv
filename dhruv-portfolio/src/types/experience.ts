export interface TimelineItem {
  id: string;
  type: "work" | "education" | "achievement";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  tags: string[];
  logo?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}
