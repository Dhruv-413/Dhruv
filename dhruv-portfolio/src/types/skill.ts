/** One group on the Skills page (src/data/skills.json). Order in the file is the order on the page. */
export interface SkillGroup {
  category: string;
  /** One plain sentence about what the group is for. */
  blurb: string;
  /** Where the whole group was learned, when that is worth saying (shown under the heading). */
  note?: string;
  /** Groups with a figure become the two large tiles of the bento. */
  figure?: "lakehouse" | "azure";
  skills: string[];
  /** Per-skill notes, keyed by the exact skill name (where it was learned). */
  notes?: Record<string, string>;
  /** Per-skill plain-language meaning, keyed by the exact skill name. */
  about?: Record<string, string>;
}
