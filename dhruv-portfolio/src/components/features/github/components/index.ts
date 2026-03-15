// GitHub Section Sub-Components
// Organized for DRY principle - each component handles a specific concern

export { ContributionHeatmap } from "./ContributionHeatmap";
export { LanguageDistribution } from "./LanguageDistribution";
export { RepositoryCard, ContributedRepoCard } from "./RepoCards";
export { QuickStats } from "./QuickStats";

// Extracted helper components (refactored from GitHubSection.tsx)
export { LoadingSkeleton } from "./LoadingSkeleton";
export { ErrorFallback } from "./ErrorFallback";
export { TerminalPrompt } from "./TerminalPrompt";
export { MobileDesktopMessage } from "./MobileDesktopMessage";
export { RepositoriesSection } from "./RepositoriesSection";
export { ContributedRepositoriesSection } from "./ContributedRepositoriesSection";
