export interface TimelineItem {
  id: string;
  type: "work" | "education" | "achievement";
  title: string;
  organization: string;
  /** Short name for labels and anchors ("ONGC"). Falls back to `organization`. */
  short?: string;
  location: string;
  /** How a role was done, when it matters ("Virtual", "Onsite"). */
  mode?: string;
  startDate: string;
  /** Absent means the role or course is still going. */
  endDate?: string;
  description: string[];
  tags: string[];
  logo?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}
