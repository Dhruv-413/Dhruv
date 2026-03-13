/**
 * Email Service Interface
 * 
 * This defines the contract for email services following the
 * Dependency Inversion Principle (DIP). High-level modules depend
 * on this abstraction, not concrete implementations.
 */

export interface EmailServiceConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailServiceResponse {
  status: number;
}

export interface EmailService {
  sendEmail(payload: EmailPayload): Promise<EmailServiceResponse>;
}
