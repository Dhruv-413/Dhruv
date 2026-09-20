import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getContactPageSchema, getBreadcrumbSchema } from "@/lib/schema";
import { PageHeader } from "@/components/ui/page-primitives";
import { ContactForm } from "@/components/features/contact/ContactForm";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dhruv Gupta | Full Stack Developer",
    description:
      "Ready to build something amazing? Get in touch for freelance projects and collaboration opportunities.",
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

      <PageHeader index="06" label="Contact" title="Contact">
        <p>Send a message here, or use the direct details beside the form.</p>
      </PageHeader>
      <ContactForm />
    </>
  );
}
