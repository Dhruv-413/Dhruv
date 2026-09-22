// Synthetic student records for the MUJ Placement Portal figures (the case-page sketch and the home demo).
// The portal is private and holds real student data, so nothing here comes from it. Fields are the ones the owner
// confirmed the staff screens showed (2026-09-23); no eligibility rule is shown because none was stated.

export interface SampleRecord {
  name: string;
  branch: string;
  cgpa: string;
  backlogs: number;
  /** Visible marker in the staff table, so a state never relies on colour alone. */
  mark?: "Twice" | "Updated";
}

export const SAMPLE_STUDENTS: SampleRecord[] = [
  { name: "Sample student 01", branch: "CSE", cgpa: "8.4", backlogs: 0 },
  { name: "Sample student 02", branch: "CSE", cgpa: "7.1", backlogs: 0 },
  { name: "Sample student 03", branch: "ECE", cgpa: "6.2", backlogs: 2 },
  { name: "Sample student 04", branch: "ME", cgpa: "6.8", backlogs: 1 },
  { name: "Sample student 05", branch: "IT", cgpa: "9.0", backlogs: 0 },
];

/** The five records sent in the demo: four clean ones plus record 3, which is student 02 with the branch typed another way. */
export const SENT_RECORDS: SampleRecord[] = [
  SAMPLE_STUDENTS[0],
  SAMPLE_STUDENTS[1],
  { ...SAMPLE_STUDENTS[1], branch: "Computer Sci." },
  SAMPLE_STUDENTS[2],
  SAMPLE_STUDENTS[3],
];

export type Choice = "through" | "hold" | "merge";

// Copy from docs/world-class-plan/stage-1/interaction-script.md. None of the choices is marked wrong.
export const OUTCOMES: Record<
  Choice,
  { label: string; arrived: string; held: number; twice: number; rows: SampleRecord[]; tradeOff: string; note?: string }
> = {
  through: {
    label: "Let it through",
    arrived: "5",
    held: 0,
    twice: 1,
    rows: [SENT_RECORDS[0], { ...SENT_RECORDS[1], mark: "Twice" }, { ...SENT_RECORDS[2], mark: "Twice" }, SENT_RECORDS[3], SENT_RECORDS[4]],
    tradeOff: "Nothing was blocked, but staff now see the same student twice, and the CSE count is split in two.",
  },
  hold: {
    label: "Hold it for review",
    arrived: "4",
    held: 1,
    twice: 0,
    rows: [SENT_RECORDS[0], SENT_RECORDS[1], SENT_RECORDS[3], SENT_RECORDS[4]],
    tradeOff: "The table stays clean, but a real record waits until someone checks it. Someone has to own that queue.",
    note: "Waiting for review: record 3 (Sample student 02, Computer Sci.)",
  },
  merge: {
    label: "Merge it with record 2",
    arrived: "4 (one updated)",
    held: 0,
    twice: 0,
    rows: [SENT_RECORDS[0], { ...SENT_RECORDS[1], mark: "Updated" }, SENT_RECORDS[3], SENT_RECORDS[4]],
    tradeOff: "Clean and complete, if the match is right. Merge two different students and one of them disappears.",
    note: "Record 3 merged into record 2",
  },
};

export const CHOICES = Object.keys(OUTCOMES) as Choice[];
