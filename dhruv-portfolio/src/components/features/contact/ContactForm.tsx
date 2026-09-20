"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useEmail } from "@/hooks/useEmail";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { ArrowLink } from "@/components/ui/page-primitives";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

const fieldClass =
  "block w-full border border-input bg-transparent px-4 text-base text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) placeholder:text-muted-foreground hover:border-foreground focus-visible:border-primary aria-[invalid=true]:border-destructive";

function Field({
  id,
  index,
  label,
  error,
  aside,
  children,
}: {
  id: string;
  index: string;
  label: string;
  error?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="t-label flex items-baseline justify-between gap-4 text-foreground">
        <span>
          <span aria-hidden="true" className="text-muted-foreground">
            {index}
          </span>{" "}
          {label}
        </span>
        {aside}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="t-label text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact form + direct details (DESIGN.md §4.9, slice 3). Behaviour is unchanged from the previous version:
 * same fields, order, validation, EmailJS payload and toasts. Only the presentation moved onto the tokens.
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const { sendEmail } = useEmail();
  const siteConfig = useSiteConfig();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const [subject = "", message = ""] = useWatch({ control, name: ["subject", "message"] });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await sendEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response.status === 200) {
        setFormSuccess(true);
        toast.success("Message sent. I will get back to you soon.", { duration: 5000 });
        reset();
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === "development") {
        console.error("Email Error:", error);
      }
      toast.error(
        "Failed to send message. Please try again or email me directly at " + siteConfig.contact.email,
        { duration: 7000 },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setEmailCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast.error("Could not copy. The address is shown on the page.");
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="page-shell py-(--section-pad)">
      <div className="grid grid-cols-12 gap-x-(--gutter) gap-y-16">
        {/* form */}
        <div className="col-span-12 lg:col-span-7">
          {formSuccess ? (
            <div role="status" className="mb-8 border border-primary p-4">
              <p className="t-label text-primary">Message sent</p>
              <p className="mt-1 text-muted-foreground">Thanks. I will reply by email.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            <Field id="name" index="01" label="Name" error={errors.name?.message}>
              <input
                id="name"
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
                className={cn(fieldClass, "h-12")}
              />
            </Field>

            <Field id="email" index="02" label="Email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={cn(fieldClass, "h-12")}
              />
            </Field>

            <Field
              id="subject"
              index="03"
              label="Subject"
              error={errors.subject?.message}
              aside={<span className="text-muted-foreground">{subject.length}/100</span>}
            >
              <input
                id="subject"
                autoComplete="off"
                placeholder="What is this about?"
                maxLength={100}
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                {...register("subject")}
                className={cn(fieldClass, "h-12")}
              />
            </Field>

            <Field
              id="message"
              index="04"
              label="Message"
              error={errors.message?.message}
              aside={<span className="text-muted-foreground">{message.length}/500</span>}
            >
              <textarea
                id="message"
                rows={6}
                maxLength={500}
                placeholder="Tell me about the project or role."
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
                className={cn(fieldClass, "min-h-44 resize-y py-3")}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="t-label inline-flex h-12 w-full items-center justify-center gap-3 border border-primary bg-primary px-6 text-primary-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-foreground hover:bg-foreground hover:text-background focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending" : "Send message"} <span aria-hidden="true">{isSubmitting ? "..." : "→"}</span>
            </button>
          </form>
        </div>

        {/* direct details */}
        <aside className="col-span-12 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
          <h2 className="t-label mb-6 flex items-center gap-2 text-muted-foreground">
            <span className="mark-plus text-primary" aria-hidden="true" />
            Or reach me directly
          </h2>

          <dl className="hairline-grid grid-cols-1">
            <div className="p-5">
              <dt className="t-label text-muted-foreground">Email</dt>
              <dd className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <a
                  href={siteConfig.links.email}
                  className="break-all font-mono text-sm transition-colors duration-(--dur-ui) hover:text-primary focus-visible:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="t-label min-h-11 border-b border-transparent text-foreground transition-colors duration-(--dur-ui) hover:border-primary hover:text-primary focus-visible:text-primary"
                  aria-label={emailCopied ? "Email copied" : "Copy email address"}
                >
                  {emailCopied ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            <div className="p-5">
              <dt className="t-label text-muted-foreground">Location</dt>
              <dd className="mt-2 font-mono text-sm">{siteConfig.contact.location}</dd>
            </div>
            <div className="p-5">
              <dt className="t-label text-muted-foreground">Elsewhere</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6">
                <ArrowLink href={siteConfig.links.github} external>
                  GitHub
                </ArrowLink>
                <ArrowLink href={siteConfig.links.linkedin} external>
                  LinkedIn
                </ArrowLink>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
