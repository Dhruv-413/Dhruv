import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SITE_CONFIG } from "@/lib/constants";
import { getContactPageSchema, getBreadcrumbSchema } from "@/lib/schema";

const ContactSection = dynamic(
  () =>
    import("@/components/features/contact/ContactSection").then((mod) => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => <LoadingSkeleton variant="contact" />,
    ssr: true,
  }
);

export const metadata: Metadata = {
  title: "Contact | Get in Touch for Collaborations & Opportunities",
  description:
    "Connect with Dhruv Gupta for freelance projects, collaboration opportunities, or just to say hello. Available for full-stack development, React, Next.js, and Python projects.",
  keywords: [
    "contact Dhruv Gupta",
    "hire full stack developer",
    "freelance developer India",
    "React developer for hire",
    "Next.js developer contact",
    "Python developer",
    "web development services",
    "collaboration opportunities",
    "software development inquiry",
    "developer contact form",
  ],
  openGraph: {
    title: "Contact Dhruv Gupta | Full Stack Developer",
    description:
      "Ready to build something amazing? Get in touch for freelance projects, collaboration opportunities, or to discuss your next web application.",
    url: `${SITE_CONFIG.siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Dhruv Gupta - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dhruv Gupta | Full Stack Developer",
    description:
      "Ready to build something amazing? Get in touch for freelance projects and collaboration opportunities.",
    images: [`${SITE_CONFIG.siteUrl}/twitter-contact.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  // Generate JSON-LD structured data
  const contactSchema = getContactPageSchema();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.siteUrl },
    { name: "Contact", url: `${SITE_CONFIG.siteUrl}/contact` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="contact" />}>
          <ContactSection />
        </Suspense>
      </div>
    </>
  );
}
