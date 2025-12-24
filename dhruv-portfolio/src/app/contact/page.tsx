import dynamic from "next/dynamic";
import { PageWrapper } from "@/components/shared/PageWrapper";

const ContactSection = dynamic(
  () =>
    import("@/components/features/contact/ContactSection").then((mod) => ({
      default: mod.ContactSection,
    })),
  { ssr: true }
);

export const metadata = {
  title: "Contact - Dhruv Gupta",
  description: "Get in touch with me for opportunities and collaborations",
};

export default function ContactPage() {
  return (
    <PageWrapper variant="contact">
      <ContactSection />
    </PageWrapper>
  );
}
