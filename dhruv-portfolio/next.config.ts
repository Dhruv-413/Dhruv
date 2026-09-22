import type { NextConfig } from "next";
import { PRODUCTION_ORIGIN, SITE_CONFIG } from "./src/lib/constants";

// Guard: a Vercel production build must publish the real domain in canonicals, OG, robots and the sitemap.
// (The live site once shipped http://localhost:3000 everywhere because NEXT_PUBLIC_SITE_URL was unset.)
if (process.env.VERCEL_ENV === "production" && SITE_CONFIG.siteUrl !== PRODUCTION_ORIGIN) {
  throw new Error(
    `NEXT_PUBLIC_SITE_URL resolves to "${SITE_CONFIG.siteUrl}", expected "${PRODUCTION_ORIGIN}". ` +
      "Fix it in Vercel → Settings → Environment Variables (Production) or remove it, then redeploy.",
  );
}

const nextConfig: NextConfig = {
  /* Performance optimizations */
  reactCompiler: true,

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Security Note: dangerouslyAllowSVG is required for simpleicons.org CDN
    // which serves SVG icons for skill/technology badges.
    // The CSP header (contentSecurityPolicy) below provides some protection,
    // but for production, consider hosting icons locally or using a different
    // icon provider that supports other image formats.
    // See: https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowsvg
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Production build optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-hook-form",
      "@tanstack/react-query",
      "date-fns",
      "recharts",
    ],
    // Enable modern bundling
    webpackBuildWorker: true,
  },

  // Headers for better caching and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
