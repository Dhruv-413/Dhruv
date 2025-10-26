import dynamic from "next/dynamic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

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

export const metadata = {
  title: "Contact - Dhruv Gupta",
  description: "Get in touch with me for opportunities and collaborations",
};

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-16 sm:pt-20 relative">
        <Suspense fallback={<LoadingSkeleton variant="contact" />}>
          <ContactSection />
        </Suspense>
      </div>
    </>
  );
}
