/**
 * EmailJS Service Implementation
 * 
 * Concrete implementation of the EmailService interface.
 * This handles all EmailJS-specific logic and environment variable access
 * in one place, following DIP - the service depends on the abstraction.
 */

import emailjs from "@emailjs/browser";
import type {
  EmailService,
  EmailServiceConfig,
  EmailPayload,
  EmailServiceResponse,
} from "@/lib/emailService";

/**
 * Configuration for EmailJS service
 */
function getEmailJsConfig(): EmailServiceConfig {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    throw new Error(
      "EmailJS configuration is missing. Please check your environment variables."
    );
  }

  return { publicKey, serviceId, templateId };
}

/**
 * EmailJS Service implementation
 * 
 * Implements the EmailService interface for sending emails via EmailJS
 */
export class EmailJsService implements EmailService {
  private config: EmailServiceConfig;

  constructor() {
    // Validate config on instantiation
    this.config = getEmailJsConfig();
  }

  /**
   * Send an email using EmailJS
   * @param payload - The email payload containing name, email, subject, and message
   * @returns Promise resolving to EmailServiceResponse
   */
  async sendEmail(payload: EmailPayload): Promise<EmailServiceResponse> {
    const templateParams = {
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    };

    const response = await emailjs.send(
      this.config.serviceId,
      this.config.templateId,
      templateParams,
      this.config.publicKey
    );

    return {
      status: response.status,
    };
  }
}

/**
 * Factory function to create an EmailJsService instance
 * This allows for easy testing and dependency injection
 */
export function createEmailService(): EmailService {
  return new EmailJsService();
}
