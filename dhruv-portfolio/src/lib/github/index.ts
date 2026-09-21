/**
 * GitHub feed for /github. Import the server loader from here in server components only; client components
 * import `./calendar` and `./types` directly so the token-bearing loader never enters a client bundle.
 */
export { loadGitHub } from "./load";
export type * from "./types";
