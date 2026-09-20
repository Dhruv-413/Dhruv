/**
 * Re-mounts on every navigation, which replays a short transform-only enter animation (see `.page-enter` in
 * globals.css). No opacity change on purpose: it must not delay LCP. Disabled under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
