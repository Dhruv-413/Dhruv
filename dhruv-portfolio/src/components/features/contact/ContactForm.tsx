"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEmail } from "@/hooks/useEmail";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;
type Status = "idle" | "sending" | "sent" | "failed";

const FIELD_ORDER = ["name", "email", "subject", "message"] as const;

// The topic only prefills the subject; it is never sent on its own, so the EmailJS payload is unchanged.
const TOPICS = [
  { id: "role", label: "Full-time role", subject: "Full-time role" },
  { id: "freelance", label: "Freelance project", subject: "Freelance project" },
  { id: "collab", label: "Collaboration", subject: "Collaboration" },
  { id: "hello", label: "Just saying hi", subject: "Just saying hi" },
] as const;
type Topic = (typeof TOPICS)[number];

const MESSAGE_MAX = 500;
const METER_CELLS = 20; // one cell per 25 characters
// A person needs longer than this to fill the form; a script that posts on load does not. Kept low so autofill users pass.
const MIN_FILL_MS = 1500;

const { email: EMAIL, availability } = SITE_CONFIG.contact;
const sentFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: availability.timeZone,
});

const fieldClass =
  "block w-full border border-input bg-transparent px-4 text-base text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) placeholder:text-muted-foreground hover:border-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-destructive";

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
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="t-label text-foreground">
          <span aria-hidden="true" className="text-muted-foreground">
            {index}
          </span>{" "}
          {label}
        </label>
        {aside ? (
          <span aria-hidden="true" className="t-label">
            {aside}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="t-label text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact form. The EmailJS payload is unchanged (name, email, subject, message). On top of it:
 * topic cells that prefill the subject, a segmented meter beside the character count, an error summary that takes
 * focus on a failed submit, a status receipt on success and an inline failure notice with the email as fallback.
 * Spam: an off-screen honeypot and a minimum fill time. Both are client-side and only stop naive bots.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [receipt, setReceipt] = useState<{ at: string; topic: string } | null>(null);
  const [attempt, setAttempt] = useState(0);

  const { sendEmail } = useEmail();
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema), shouldFocusError: false });

  const [subject = "", message = ""] = useWatch({ control, name: ["subject", "message"] });

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const problems = FIELD_ORDER.flatMap((key) => {
    const text = errors[key]?.message;
    return text ? [{ key, text }] : [];
  });
  const showSummary = attempt > 0 && problems.length > 0;

  // Every failed submit moves focus to the summary. The errors reach this component a render after `onInvalid` runs, so
  // the request is remembered in a ref and served once the summary is actually visible (and only then: typing that later
  // produces an error must not pull focus out of the field).
  const wantsFocus = useRef(false);
  useEffect(() => {
    if (wantsFocus.current && showSummary) {
      wantsFocus.current = false;
      summaryRef.current?.focus();
    }
  }, [attempt, showSummary]);

  const noticeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status !== "sent" && status !== "failed") return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    noticeRef.current?.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
  }, [status]);

  const succeed = () => {
    setReceipt({ at: sentFormat.format(new Date()), topic: topic?.label ?? "" });
    reset();
    setTopic(null);
    setStatus("sent");
  };

  const onSubmit = async (data: FormData) => {
    // a bot trips the honeypot or posts before a person could: say "sent" and send nothing, so it learns nothing
    if (honeypotRef.current?.value || Date.now() - openedAt.current < MIN_FILL_MS) {
      succeed();
      return;
    }
    setStatus("sending");
    try {
      const response = await sendEmail({ name: data.name, email: data.email, subject: data.subject, message: data.message });
      if (response.status !== 200) throw new Error("Failed to send email");
      succeed();
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error("Email Error:", error);
      setStatus("failed");
    }
  };

  const onInvalid = () => {
    wantsFocus.current = true;
    setAttempt((n) => n + 1);
  };

  const pickTopic = (next: Topic) => {
    setTopic(next);
    // only fill the subject when it is empty or still holds a topic's own text: never overwrite what the person typed
    const current = getValues("subject") ?? "";
    if (!current || TOPICS.some((t) => t.subject === current)) setValue("subject", next.subject, { shouldValidate: true });
  };

  // the group says "Optional", so choosing the selected topic again clears it (and the subject, if that is still the topic's own text)
  const clearTopic = () => {
    setTopic(null);
    const current = getValues("subject") ?? "";
    if (TOPICS.some((t) => t.subject === current)) setValue("subject", "");
  };

  const filled = Math.min(METER_CELLS, Math.ceil(message.length / (MESSAGE_MAX / METER_CELLS)));

  return (
    <div className="col-span-12 lg:col-span-7">
      {/* success receipt: the live region is always mounted so the text is announced when it appears */}
      <div role="status" aria-atomic="true">
        {status === "sent" && receipt ? (
          <div ref={noticeRef} className="mb-8 border-2 border-primary p-5 md:p-6">
            <p className="t-label text-primary">Message sent</p>
            <div className="cell-wipe mt-4 flex gap-0.5" aria-hidden="true">
              {Array.from({ length: METER_CELLS }, (_, i) => (
                <span key={i} className="h-2 flex-1 bg-primary" />
              ))}
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-[auto_auto_1fr]">
              <div>
                <dt className="t-label text-muted-foreground">Sent</dt>
                <dd className="mt-1 font-mono text-sm whitespace-nowrap">
                  {receipt.at} {availability.timeZoneLabel}
                </dd>
              </div>
              <div>
                <dt className="t-label text-muted-foreground">Topic</dt>
                <dd className="mt-1 font-mono text-sm">{receipt.topic || "Not set"}</dd>
              </div>
              <div>
                <dt className="t-label text-muted-foreground">Reply</dt>
                <dd className="mt-1 font-mono text-sm">Within {availability.replyWithinDays} days</dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>

      {status === "failed" ? (
        <div ref={noticeRef} role="alert" className="mb-8 border-2 border-destructive p-5 md:p-6">
          <p className="t-label text-destructive">Message not sent</p>
          <p className="mt-2 text-muted-foreground">
            Something failed on the way. Your text is still in the form. You can also write to me at{" "}
            <a href={`mailto:${EMAIL}`} className="font-mono text-sm text-foreground underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
              {EMAIL}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div
        ref={summaryRef}
        tabIndex={-1}
        role="group"
        aria-labelledby="error-summary-heading"
        hidden={!showSummary}
        className="mb-8 border-2 border-destructive p-5 md:p-6"
      >
        <h2 id="error-summary-heading" className="t-label text-destructive">
          There is a problem
        </h2>
        <ul role="list" className="mt-3 space-y-1">
          {problems.map(({ key, text }) => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={(event) => {
                  event.preventDefault();
                  setFocus(key);
                }}
                className="inline-flex min-h-11 items-center text-[0.9375rem] underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form
        aria-label="Send a message"
        onSubmit={(event) => {
          if (status === "sending") {
            event.preventDefault();
            return;
          }
          void handleSubmit(onSubmit, onInvalid)(event);
        }}
        onChange={() => {
          // editing again puts the receipt / failure notice away
          if (status === "sent" || status === "failed") setStatus("idle");
        }}
        noValidate
        className="relative space-y-8"
      >
        <p className="t-label text-muted-foreground">Everything except the topic is required.</p>

        <fieldset>
          <legend className="t-label mb-3 text-foreground">
            <span aria-hidden="true" className="text-muted-foreground">
              01
            </span>{" "}
            What is it about? <span className="text-muted-foreground">Optional</span>
          </legend>
          <div className="grid grid-cols-2 gap-px border border-input bg-input sm:grid-cols-4">
            {TOPICS.map((item) => (
              <label
                key={item.id}
                className="t-label relative flex min-h-14 cursor-pointer items-center gap-3 bg-background px-4 py-3 text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-card has-checked:bg-foreground has-checked:text-background has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-primary has-checked:has-focus-visible:outline-background"
              >
                <input type="radio" name="topic" value={item.id} checked={topic?.id === item.id} onChange={() => pickTopic(item)} onClick={() => topic?.id === item.id && clearTopic()} className="peer sr-only" />
                <span aria-hidden="true" className="size-2.5 shrink-0 border border-current peer-checked:bg-background" />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Field id="name" index="02" label="Name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            aria-required="true"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
            className={cn(fieldClass, "h-12")}
          />
        </Field>

        <Field id="email" index="03" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            className={cn(fieldClass, "h-12")}
          />
        </Field>

        <Field
          id="subject"
          index="04"
          label="Subject"
          error={errors.subject?.message}
          aside={<span className="text-muted-foreground">{subject.length}/100</span>}
        >
          <input
            id="subject"
            autoComplete="off"
            placeholder="What is this about?"
            maxLength={100}
            aria-required="true"
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
            className={cn(fieldClass, "h-12")}
          />
        </Field>

        <Field
          id="message"
          index="05"
          label="Message"
          error={errors.message?.message}
          aside={<span className="text-muted-foreground">{message.length}/{MESSAGE_MAX}</span>}
        >
          <textarea
            id="message"
            rows={6}
            maxLength={MESSAGE_MAX}
            placeholder="Tell me about the project or role."
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
            className={cn(fieldClass, "min-h-44 resize-y py-3")}
          />
          {/* the same cell language as the rest of the site: one cell per 25 characters (the count above is the accessible one) */}
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: METER_CELLS }, (_, i) => (
              <span
                key={i}
                className={cn("h-1.5 flex-1 transition-colors duration-(--dur-micro)", i < filled ? (filled === METER_CELLS ? "bg-primary" : "bg-foreground/80") : "bg-foreground/12")}
              />
            ))}
          </div>
        </Field>

        {/* honeypot: off-screen, not display:none, out of the tab order; people never see or fill it */}
        <div aria-hidden="true" inert className="absolute top-auto left-[-9999px] h-px w-px overflow-hidden">
          <label>
            Website, leave this empty
            <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <button
          type="submit"
          aria-disabled={status === "sending"}
          className="t-label inline-flex h-12 w-full items-center justify-center gap-3 border border-primary bg-primary px-6 text-primary-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-foreground hover:bg-foreground hover:text-background focus-visible:border-foreground aria-disabled:cursor-not-allowed aria-disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending" : "Send message"} <span aria-hidden="true">{status === "sending" ? "..." : "→"}</span>
        </button>
      </form>
    </div>
  );
}
