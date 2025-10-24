export interface GitHubStats {
  contributions: number;
  repos: number;
  stars: number;
  followers: number;
  recentCommits: {
    repo: string;
    message: string;
    date: string;
    url: string;
  }[];
  languages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  contributionGraph: {
    date: string;
    count: number;
  }[];
}
