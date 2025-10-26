"use client";

import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  Terminal,
  Code2,
  MessageSquare,
  CheckCircle2,
  User,
  AtSign,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        console.error("Missing EmailJS configuration:", {
          publicKey: !!publicKey,
          serviceId: !!serviceId,
          templateId: !!templateId,
        });
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setFormSuccess(true);
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
          icon: "✉️",
        });
        reset();

        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(
        "Failed to send message. Please try again or email me directly at " +
          SITE_CONFIG.contact.email,
        {
          duration: 7000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setEmailCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden flex items-center py-20"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section with Terminal Effect */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          {/* Terminal Prompt */}
          <div
            className="flex items-center justify-center gap-2 mb-6"
            aria-label="Terminal prompt"
          >
            <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary font-mono text-sm">~/contact</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary font-mono"
              aria-hidden="true"
            >
              _
            </motion.span>
          </div>

          {/* Title */}
          <h1
            id="contact-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Let&apos;s Build Together
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Have a project in mind or want to discuss opportunities?{" "}
            <span className="text-primary font-semibold">
              I&apos;m all ears.
            </span>{" "}
            Whether it&apos;s a{" "}
            <span className="text-primary font-semibold">
              full-stack application
            </span>
            ,{" "}
            <span className="text-primary font-semibold">API development</span>,
            or{" "}
            <span className="text-primary font-semibold">
              technical consultation
            </span>
            , let&apos;s create something amazing.
          </p>

          {/* Quick Stats */}
          <div
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            role="list"
            aria-label="Response metrics"
          ></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form - Enhanced with scroll animations */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              {/* Form Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-bold">Send a Message</h2>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {"// Fill out the form below"}
                </p>
              </div>

              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold text-green-500">
                      Message Sent!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={`transition-all duration-300 ${
                      errors.name
                        ? "border-destructive focus:border-destructive"
                        : "focus:border-primary"
                    }`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="name-error"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span>⚠</span> {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={`transition-all duration-300 ${
                      errors.email
                        ? "border-destructive focus:border-destructive"
                        : "focus:border-primary"
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="email-error"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span>⚠</span> {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="subject" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Project Inquiry / Collaboration"
                    {...register("subject")}
                    className={`transition-all duration-300 ${
                      errors.subject
                        ? "border-destructive focus:border-destructive"
                        : "focus:border-primary"
                    }`}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="subject-error"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span>⚠</span> {errors.subject.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    {...register("message")}
                    className={`transition-all duration-300 ${
                      errors.message
                        ? "border-destructive focus:border-destructive"
                        : "focus:border-primary"
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="message-error"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <span>⚠</span> {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full group bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="mr-2"
                        >
                          <Terminal className="h-4 w-4" />
                        </motion.div>
                        <span className="font-mono">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        <span className="font-semibold">Send Message</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info - Enhanced with animations */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Info Card */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="text-2xl font-bold">Contact Info</h2>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {"// Reach me directly"}
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1 font-mono">
                      {"// Email"}
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={SITE_CONFIG.links.email}
                        className="font-medium hover:text-primary transition-colors truncate font-mono text-sm"
                        aria-label="Send email"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyEmail}
                        className="h-8 w-8 shrink-0"
                        aria-label={
                          emailCopied ? "Email copied" : "Copy email address"
                        }
                      >
                        {emailCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-mono">
                      {"// Phone"}
                    </p>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="font-medium hover:text-primary transition-colors font-mono text-sm"
                      aria-label="Call phone number"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-mono">
                      {"// Location"}
                    </p>
                    <p className="font-medium font-mono text-sm">
                      {SITE_CONFIG.contact.location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-8"
              >
                <p className="text-sm text-muted-foreground mb-4 font-mono">
                  {"// Social Links"}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110"
                  >
                    <a
                      href={SITE_CONFIG.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110"
                  >
                    <a
                      href={SITE_CONFIG.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110"
                  >
                    <a href={SITE_CONFIG.links.email} aria-label="Send email">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </Card>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
