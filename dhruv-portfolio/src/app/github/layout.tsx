// Route metadata lives in ./page.tsx (page-level metadata replaces layout-level openGraph/twitter,
// so a second copy here was dead). The share image comes from ./opengraph-image.tsx.
export default function GitHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
