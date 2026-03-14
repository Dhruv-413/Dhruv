import { NextResponse } from "next/server";

// ============================================================================
// Security: In-memory rate limiter
// ============================================================================
// Simple rate limiting: 10 requests per minute per IP address
// Note: This is a basic in-memory implementation. For production with multiple
// server instances, use a distributed rate limiter (Redis, etc.)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // First request or window expired - create new entry
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return false;
  }

  // Increment count within window
  entry.count++;
  rateLimitMap.set(ip, entry);
  return true;
}

// ============================================================================
// Input Validation: Sanitize GitHub username
// ============================================================================
// GitHub usernames can only contain alphanumeric characters, hyphens, and underscores
// Pattern: ^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$
const GITHUB_USERNAME_PATTERN = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?$/;

function sanitizeGitHubUsername(username: string): string | null {
  // Trim whitespace
  const trimmed = username.trim();
  
  // Check length constraints (GitHub: 1-39 characters)
  if (trimmed.length < 1 || trimmed.length > 39) {
    return null;
  }
  
  // Validate against whitelist pattern
  if (!GITHUB_USERNAME_PATTERN.test(trimmed)) {
    return null;
  }
  
  // Block potentially dangerous patterns
  // Prevent GraphQL injection by escaping special characters
  // The username is passed as a variable, so basic injection isn't possible,
  // but we validate to be safe
  const dangerousPatterns = [
    /\bquery\b/i,
    /\bmutation\b/i,
    /\bsubscription\b/i,
    /\\u/i, // Unicode escapes
    /\$\w+/, // GraphQL variables
    /\{.*\}/, // Inline objects
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return null;
    }
  }
  
  return trimmed;
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DEFAULT_USERNAME = "Dhruv-413";

export async function GET(request: Request) {
  // ============================================================================
  // Security Fix #1: Rate Limiting
  // ============================================================================
  const clientIP = getClientIP(request);
  
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    if (!GITHUB_TOKEN) {
      // Security Fix #3: Generic error message - don't leak configuration details
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // ============================================================================
    // Security Fix #2: Input Validation & Sanitization
    // ============================================================================
    const envUsername = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
    const sanitizedUsername = sanitizeGitHubUsername(envUsername);
    
    if (!sanitizedUsername) {
      // Security Fix #3: Don't expose validation details
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
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
        variables: { username: sanitizedUsername },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour (same as client-side)
    });

    if (!response.ok) {
      // Security Fix #3: Generic error message - don't leak API details
      console.error("GitHub API error:", response.status);
      return NextResponse.json(
        { error: "Failed to fetch external data" },
        { status: 502 }
      );
    }

    const result = await response.json();

    if (result.errors) {
      // Security Fix #3: Don't expose GraphQL error details to client
      console.error("GraphQL errors:", result.errors);
      return NextResponse.json(
        { error: "External service returned invalid data" },
        { status: 502 }
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
    // Security Fix #3: Generic error message - don't leak internal error details
    console.error("API route error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
