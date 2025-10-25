import { ContactSection } from "@/components/features/contact/ContactSection";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata = {
  title: "Contact - Dhruv Gupta",
  description: "Get in touch with me for opportunities and collaborations",
};

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen pt-20 relative">
        <ContactSection />
      </div>
    </>
  );
}
