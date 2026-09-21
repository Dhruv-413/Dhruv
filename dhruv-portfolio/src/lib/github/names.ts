/**
 * Display names for repositories. A repo slug like `Eye-Gaze-Tracking-` or `rag-bot` is read as a title:
 * separators become spaces, camelCase is split, trailing junk is dropped, each word is capitalised, and known
 * acronyms stay upper case. A repo that carries a case study is titled by the case study instead (see model.ts).
 */

/** Words that are always upper case ("Basic-ML-Projects" -> "Basic ML Projects"). */
const ACRONYMS = new Set(["ai", "ml", "nlp", "llm", "cv", "eda", "eeg", "bci", "rag", "api", "sql", "ui", "ux", "sap", "abap", "cli", "ide", "gpu", "cpu", "iot", "sna"]);

/** Repositories that must never be listed or counted anywhere on the page (owner's request). Lower case `owner/name`. */
export const HIDDEN_REPOS = new Set(["dhruv-413/sna_dhruv_gupta_229311248"]);

export function displayName(slug: string, login?: string): string {
  // the special profile repository (named after the account) is the profile README
  if (login && slug.toLowerCase() === login.toLowerCase()) return "Profile README";

  const words = slug
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // GazeCapture -> Gaze Capture
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // MLModel -> ML Model
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      if (/^\d+$/.test(word)) return word;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

  return words.length ? words.join(" ") : slug;
}
