import { createTerminalLoading } from "@/components/shared/TerminalLoading";

export default createTerminalLoading({
  command: "npm run build",
  message: "Loading projects...",
});
