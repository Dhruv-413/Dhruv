# Server-side rules

- `GITHUB_TOKEN` is server-only: read it in `src/lib/github/load.ts` (or a route handler), never in a `"use client"` file, never in a response, log line, or error message.
  Keep failures generic: `loadGitHub()` logs an error *type* and returns `null`, and the page renders its "unavailable" state.
- **Private data never crosses `src/lib/github/model.ts`.** Only repositories fetched from a PUBLIC connection may become rows, commits, log lines or
  collaborations, and `isPrivate` is re-checked there. Private work is a count (`restrictedContributionsCount`) and nothing else. Do not query `topRepositories`
  or an unfiltered per-repo contribution list into anything that reaches a component.
- Validate every input that reaches an outbound request (`GITHUB_USERNAME` is matched against the GitHub login pattern in `load.ts`). Pass values to GraphQL
  as variables, never by string interpolation. The one templated part of a document, the calendar years, is `Number.isInteger`-guarded in `query.ts`.
- Cache on purpose: `/github` sets `revalidate = 3600` and its `fetch` sets `next: { revalidate: 3600 }`. New data sources or routes need an explicit caching decision.
- If an API route is added again, give it its own rate limit (best-effort per instance; a shared store if abuse matters).
- `NEXT_PUBLIC_*` values are public by design (EmailJS keys). Anything else stays server-side.
- Run the `route-security-reviewer` subagent after non-trivial changes here.
