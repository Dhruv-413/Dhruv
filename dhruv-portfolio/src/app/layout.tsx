import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { LazyToaster } from "@/components/shared/LazyToaster";

// Type system — DESIGN.md §4.2. Display + body share one variable family (weight/width/optical-size axes).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Editorial accent: one emphasised word per heading, never body copy. Italic only.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Courier New", "monospace"],
});

// Viewport configuration - separated from metadata per Next.js best practices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Browser-chrome colours must be literals: they mirror --background (light "bone" / dark "ink").
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a08" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.seo.keywords],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.siteUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.seo.locale,
    url: SITE_CONFIG.url,
    siteName: `${SITE_CONFIG.name} Portfolio`,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: "@dhruvgpta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
  category: "technology",
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Initialize theme from localStorage before React hydrates - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var html = document.documentElement;
                  var body = document.body;

                  if (theme === 'light') {
                    html.classList.add('light');
                    html.classList.remove('dark');
                    body.classList.add('light');
                    body.classList.remove('dark');
                  } else if (theme === 'dark' || !theme) {
                    html.classList.add('dark');
                    html.classList.remove('light');
                    body.classList.add('dark');
                    body.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* next/font self-hosts the type, so no Google Fonts preconnects are needed */}
        <link rel="dns-prefetch" href="https://api.github.com" />
        <meta name="theme-color" content="#0c0a08" />
      </head>
      <body
        className={`${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <div className="flex flex-col min-h-dvh">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <LazyToaster />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
