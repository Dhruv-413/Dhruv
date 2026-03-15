"use client";

import { motion, useInView } from "framer-motion";
import {
  Mail,
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
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useEmail } from "@/hooks/useEmail";

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
  const [messageLength, setMessageLength] = useState(0);
  
  const { sendEmail } = useEmail();
  const siteConfig = useSiteConfig();

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Watch all fields for real-time validation
  const watchedFields = watch();

  // Helper to check if field is valid and touched
  const isFieldValid = (fieldName: keyof FormData) => {
    const value = watchedFields[fieldName];
    const trimmed = typeof value === 'string' ? value.trim() : value;
    return trimmed && trimmed.length > 0 && !errors[fieldName] && touchedFields[fieldName];
  };

  // Helper to show hint (after first touch, no error yet)
  const showFieldHint = (fieldName: keyof FormData) => {
    return touchedFields[fieldName] && !errors[fieldName];
  };

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
      // Log error in development only
      if (process.env.NODE_ENV === "development") {
        console.error("Email Error:", error);
      }
      toast.error(
        "Failed to send message. Please try again or email me directly at " +
          siteConfig.contact.email,
        {
          duration: 7000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setEmailCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Get message length color class
  const getMessageLengthColor = () => {
    if (messageLength >= 500) return "text-destructive";
    if (messageLength >= 450) return "text-yellow-500";
    return "text-muted-foreground";
  };

  // Get progress bar color
  const getProgressBarColor = () => {
    if (messageLength >= 500) return "bg-destructive";
    if (messageLength >= 450) return "bg-yellow-500";
    return "bg-primary";
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return Math.min((messageLength / 500) * 100, 100);
  };

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section with Terminal Effect */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          <SectionHeader
            terminalPath="~/contact"
            title="Let's Build Together"
            description={
              <>
                Have a project in mind or want to discuss opportunities?{" "}
                <span className="text-primary font-semibold">
                  I&apos;m all ears.
                </span>{" "}
                Whether it&apos;s a{" "}
                <span className="text-primary font-semibold">
                  full-stack application
                </span>
                , or{" "}
                <span className="text-primary font-semibold">
                  API development
                </span>
                , let&apos;s create something amazing.
              </>
            }
            isInView={isHeroInView}
            headingId="contact-heading"
          />

          {/* Quick Stats */}
          <div
            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
            role="list"
            aria-label="Response metrics"
          ></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Contact Form - Enhanced with scroll animations */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-2 sm:px-0"
          >
            <Card className="p-5 sm:p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              {/* Form Header */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Code2
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Send a Message
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                  {"// Fill out the form below"}
                </p>
              </div>

              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 sm:gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-green-500">
                      Message Sent!
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      I&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <Label
                    htmlFor="name"
                    className="flex items-center gap-1.5 sm:gap-2 text-sm"
                  >
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="John Doe"
                      {...register("name")}
                      className={`transition-all duration-300 pr-10 ${
                        errors.name
                          ? "border-destructive focus:border-destructive"
                          : isFieldValid("name")
                          ? "border-green-500 focus:border-green-500"
                          : "focus:border-primary"
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : touchedFields.name ? "name-hint" : undefined}
                    />
                    {/* Success indicator */}
                    {isFieldValid("name") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  {/* Hint - shows after touch if valid */}
                  {showFieldHint("name") && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-hint"
                      className="text-xs text-green-500 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> At least 2 characters
                    </motion.p>
                  )}
                  {/* Error message */}
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="name-error"
                      className="text-xs sm:text-sm text-destructive flex items-center gap-1"
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
                  className="space-y-1.5 sm:space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-1.5 sm:gap-2 text-sm"
                  >
                    <AtSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      autoComplete="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={`transition-all duration-300 pr-10 ${
                        errors.email
                          ? "border-destructive focus:border-destructive"
                          : isFieldValid("email")
                          ? "border-green-500 focus:border-green-500"
                          : "focus:border-primary"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : touchedFields.email ? "email-hint" : undefined}
                    />
                    {/* Success indicator */}
                    {isFieldValid("email") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  {/* Hint - shows real-time if format is wrong */}
                  {showFieldHint("email") && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-hint"
                      className="text-xs text-green-500 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> Valid email format
                    </motion.p>
                  )}
                  {/* Error message */}
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="email-error"
                      className="text-xs sm:text-sm text-destructive flex items-center gap-1"
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
                  className="space-y-1.5 sm:space-y-2"
                >
                  <Label
                    htmlFor="subject"
                    className="flex items-center gap-1.5 sm:gap-2 text-sm"
                  >
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    Subject
                    <span className="text-muted-foreground font-normal ml-auto text-xs">
                      {watchedFields.subject?.length || 0}/100
                    </span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="subject"
                      autoComplete="off"
                      placeholder="Project Inquiry / Collaboration"
                      maxLength={100}
                      {...register("subject")}
                      className={`transition-all duration-300 pr-10 ${
                        errors.subject
                          ? "border-destructive focus:border-destructive"
                          : isFieldValid("subject")
                          ? "border-green-500 focus:border-green-500"
                          : "focus:border-primary"
                      }`}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={
                        errors.subject ? "subject-error" : touchedFields.subject ? "subject-hint" : undefined
                      }
                    />
                    {/* Success indicator */}
                    {isFieldValid("subject") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  {/* Hint - shows character count as they type */}
                  {showFieldHint("subject") && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="subject-hint"
                      className="text-xs text-green-500 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> At least 5 characters
                    </motion.p>
                  )}
                  {/* Error message */}
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="subject-error"
                      className="text-xs sm:text-sm text-destructive flex items-center gap-1"
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
                  className="space-y-1.5 sm:space-y-2"
                >
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-1.5 sm:gap-2 text-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    Message
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                      maxLength={500}
                      {...register("message")}
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      className={`transition-all duration-300 resize-none ${
                        errors.message
                          ? "border-destructive focus:border-destructive"
                          : isFieldValid("message")
                          ? "border-green-500 focus:border-green-500"
                          : "focus:border-primary"
                      }`}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={
                        errors.message 
                          ? "message-error" 
                          : touchedFields.message 
                          ? "message-hint message-counter" 
                          : "message-counter"
                      }
                    />
                    {/* Success indicator - positioned below textarea */}
                    {isFieldValid("message") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute bottom-3 right-3"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Progress bar for message length */}
                  <div className="mt-2 space-y-1">
                    <div 
                      className="h-1 w-full bg-muted rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={messageLength}
                      aria-valuemin={0}
                      aria-valuemax={500}
                      aria-label="Message length"
                    >
                      <motion.div
                        className={`h-full rounded-full transition-colors duration-300 ${getProgressBarColor()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage()}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    
                    {/* Character counter - more prominent */}
                    <div className="flex justify-between items-center">
                      {/* Hint - shows after touch if valid */}
                      {showFieldHint("message") && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          id="message-hint"
                          className="text-xs text-green-500 flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" /> At least 20 characters
                        </motion.p>
                      )}
                      <span className={`text-xs font-mono font-semibold ml-auto ${getMessageLengthColor()}`}>
                        {messageLength}/500
                      </span>
                    </div>
                  </div>
                  
                  {/* Error message */}
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      id="message-error"
                      className="text-xs sm:text-sm text-destructive flex items-center gap-1"
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
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="w-full group bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 h-11 sm:h-12"
                    disabled={isSubmitting}
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
                          <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </motion.div>
                        <span className="font-mono text-sm sm:text-base">
                          Processing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        <span className="font-semibold text-sm sm:text-base">
                          Send Message
                        </span>
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
            className="space-y-6 px-2 sm:px-0"
          >
            {/* Info Card */}
            <Card className="p-5 sm:p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Contact Info
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                  {"// Reach me directly"}
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail
                      className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 font-mono">
                      {"// Email"}
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={siteConfig.links.email}
                        className="font-medium hover:text-primary transition-colors truncate font-mono text-xs sm:text-sm"
                        aria-label="Send email"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyEmail}
                        className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                        aria-label={
                          emailCopied ? "Email copied" : "Copy email address"
                        }
                      >
                        {emailCopied ? (
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInfoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <div className="p-2.5 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                    <MapPin
                      className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 font-mono">
                      {"// Location"}
                    </p>
                    <p className="font-medium font-mono text-xs sm:text-sm">
                      {siteConfig.contact.location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-6 sm:mt-8 pt-6 border-t border-border/50"
              >
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 font-mono">
                  {"// Social Links"}
                </p>
                <div className="flex gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110 h-10 w-10 sm:h-11 sm:w-11"
                  >
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110 h-10 w-10 sm:h-11 sm:w-11"
                  >
                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:border-primary hover:text-primary transition-all hover:scale-110 h-10 w-10 sm:h-11 sm:w-11"
                  >
                    <a href={siteConfig.links.email} aria-label="Send email">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
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
