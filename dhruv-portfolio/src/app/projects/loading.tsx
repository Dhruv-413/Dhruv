export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="text-center space-y-4">
        <div className="font-mono text-primary text-xl">
          $ npm run build<span className="terminal-loader"></span>
        </div>
        <div className="text-muted-foreground text-sm">Loading projects...</div>
      </div>
    </div>
  );
}
