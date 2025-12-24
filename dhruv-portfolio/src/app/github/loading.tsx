import { createTerminalLoading } from "@/components/shared/TerminalLoading";

export default createTerminalLoading({
  command: "git fetch origin",
  message: "Fetching GitHub data...",
});
