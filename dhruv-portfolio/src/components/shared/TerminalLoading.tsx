interface TerminalLoadingProps {
  command: string;
  message: string;
}

/**
 * Terminal-style loading component factory
 * Creates consistent loading screens with different commands/messages
 */
export function createTerminalLoading({
  command,
  message,
}: TerminalLoadingProps) {
  return function TerminalLoading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center space-y-4">
          <div className="font-mono text-primary text-xl">
            $ {command}
            <span className="terminal-loader"></span>
          </div>
          <div className="text-muted-foreground text-sm">{message}</div>
        </div>
      </div>
    );
  };
}

/**
 * Creates a default animated loading component
 */
export function createDefaultLoading() {
  return function DefaultLoading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="font-mono text-primary text-2xl terminal-loader">
            Loading
          </div>
          <div className="flex gap-1 justify-center">
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    );
  };
}
