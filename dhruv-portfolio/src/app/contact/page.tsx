import { ContactSection } from "@/components/features/contact/ContactSection";

export const metadata = {
  title: "Contact - Dhruv Gupta",
  description: "Get in touch with me for opportunities and collaborations",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactSection />
    </div>
  );
}
