"use client";

import { motion } from "framer-motion";
import {
  GitFork,
  Star,
  GitCommit,
  Code2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  useGitHubUser,
  useGitHubRepos,
  useGitHubStats,
} from "@/hooks/useGitHub";
import { formatDistanceToNow } from "date-fns";

export function GitHubSection() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const { data: stats } = useGitHubStats();

  const isLoading = userLoading || reposLoading;

  // Get top repositories by stars
  const topRepos = repos
    ?.filter((repo) => !repo.name.includes("Dhruv-413")) // Filter out profile repo
    ?.sort((a, b) => b.stargazers_count - a.stargazers_count)
    ?.slice(0, 6);

  // Get top languages
  const topLanguages = stats?.languages
    ? Object.entries(stats.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
    : [];

  if (isLoading) {
    return (
      <section id="github" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">GitHub Activity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time statistics and contributions from my GitHub profile
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {user?.public_repos || 0}
              </div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-lg mb-3">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {stats?.totalStars || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-3">
                <GitFork className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {stats?.totalForks || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Forks</div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mb-3">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {user?.followers || 0}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Repositories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Top Repositories</h3>
            <div className="space-y-4">
              {topRepos?.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-primary hover:underline">
                        {repo.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Updated{" "}
                        {formatDistanceToNow(new Date(repo.updated_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Language Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Most Used Languages</h3>
            <Card className="p-6">
              <div className="space-y-4">
                {topLanguages.map(([language, count], index) => {
                  const percentage = stats?.totalRepos
                    ? ((count / stats.totalRepos) * 100).toFixed(1)
                    : 0;
                  return (
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{language}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} repos ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* GitHub Profile Link */}
              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={`https://github.com/${user?.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-primary hover:underline"
                >
                  <GitCommit className="h-5 w-5" />
                  View Full GitHub Profile
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
