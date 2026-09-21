---
name: update-content
description: Add or edit portfolio content — a project, skill category, timeline entry, or certification — in dhruv-portfolio/src/data/*.json, matching the existing shapes, IDs, and types. Use for any content change (not styling).
disable-model-invocation: true
argument-hint: "[what to add or change, e.g. 'add project: <name>']"
---

Content request: `$ARGUMENTS`

Content lives in `dhruv-portfolio/src/data/{projects,skills,timeline,certifications}.json`. Do not touch components for a content change.

1. Read the target JSON file and the matching types in `dhruv-portfolio/src/types/` (`project.ts`, `experience.ts`). Copy the shape of an existing
   entry exactly — same keys, same key order, same formatting (2-space JSON), same style of copy.
2. **Never invent facts.** If the request lacks metrics, dates, links, employer names, or credential IDs, ask for them. Prefer concrete, quantified
   outcomes ("cut manual reporting time by 40%") over adjectives. Keep `description` to one sentence and `longDescription` to two or three.
3. IDs are unique kebab-case; dates are ISO `YYYY-MM-DD`; `category` must be one of `Backend | Frontend | AI/ML | Computer Vision | Full-Stack`;
   timeline `type` is `work | education | achievement`; skill `proficiency` is 0–100. For new projects, set `featured` deliberately (it affects the home page).
4. If the entry needs images, they go in `dhruv-portfolio/public/` and are referenced with root-relative paths; tell the user which files to add.
5. Validate: `node -e "JSON.parse(require('fs').readFileSync('dhruv-portfolio/src/data/<file>.json','utf8'))"`, then run the `/verify --quick` steps
   (lint + tsc catch shape drift). Check `app/sitemap.ts` if you added something that should be reachable by URL.
6. Show the diff and summarize what changed. Do not commit.
