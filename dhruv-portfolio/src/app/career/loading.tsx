import { createTerminalLoading } from "@/components/shared/TerminalLoading";

export default createTerminalLoading({
  command: "git log --all",
  message: "Loading experience...",
});
