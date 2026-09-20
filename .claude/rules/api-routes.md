---
paths:
  - "dhruv-portfolio/src/app/api/**"
  - "dhruv-portfolio/src/lib/github/**"
  - "dhruv-portfolio/src/lib/email*"
  - "dhruv-portfolio/src/lib/email/**"
---

# Server-side / API rules

- `GITHUB_TOKEN` is server-only: read it in route handlers, never in a `"use client"` file, never in a response, log line, or error message.
  Keep error responses generic (the existing route returns "Service temporarily unavailable" / "Invalid request" on purpose).
- Validate every input that reaches an outbound request (see `sanitizeGitHubUsername` in `api/github/route.ts`). Pass values to GraphQL as
  variables, never by string interpolation.
- Keep the rate limit and its bounded-map cleanup. It is best-effort per instance; if abuse matters, move to a shared store (Vercel KV/Upstash).
- Cache on purpose: the client already uses `staleTime` 1h + `revalidate: 3600`. New endpoints need an explicit caching decision.
- `NEXT_PUBLIC_*` values are public by design (EmailJS keys). Anything else stays server-side.
- Run the `route-security-reviewer` subagent after non-trivial changes here.
