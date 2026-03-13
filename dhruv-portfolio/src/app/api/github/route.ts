import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Dhruv-413";

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          login
          name
          avatarUrl
          bio
          company
          location
          websiteUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
            totalCount
            nodes {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
              updatedAt
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
            restrictedContributionsCount
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
          }
          repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
            totalCount
            nodes {
              name
              owner {
                login
              }
              url
              description
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              updatedAt
            }
          }
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
        }
      }
    `;

    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour (same as client-side)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return NextResponse.json(
        { error: "GraphQL query failed", details: result.errors },
        { status: 500 }
      );
    }

    // Return the data - no token exposed to client
    return NextResponse.json(result.data, {
      headers: {
        // Cache at CDN level for 1 hour
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
