---
paths:
  - "dhruv-portfolio/src/data/**"
  - "dhruv-portfolio/src/types/**"
---

# Content data rules (`src/data/*.json`)

These JSON files are the portfolio's content. They are imported by `app/{projects,skills,career}/page.tsx`, the section components,
and `app/sitemap.ts`; types are in `src/types/`. Match the existing shapes exactly (use `/update-content`).

- `projects.json` (array): `id` (kebab-case, unique), `title`, `description`, `longDescription`, `category`
  (one of `Backend | Frontend | AI/ML | Computer Vision | Full-Stack`), `featured`, `technologies[]`, `codeSnippet`, `badges`,
  `metrics`, `links`, `images`, `date`.
- `skills.json` (array): `category`, `proficiency` (0–100), `color` (hex — data, not styling; the one place hex is fine), `skills[]`.
- `timeline.json` (array): `id`, `type` (`work | education | achievement`), `title`, `organization`, `location`, `startDate`,
  `endDate` (ISO `YYYY-MM-DD`), `description[]`, `tags[]`, `metrics`.
- `certifications.json` (array): `name`, `issuer`, `date`, `credentialId`, `skills[]`, `link`.
- Never invent achievements, metrics, employers, or credentials. Ask the user for facts; keep copy concrete and quantified.
- After editing, run `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"` and `/verify` (type check catches shape drift).
