/**
 * useEmail Hook
 * 
 * Custom hook that provides email sending functionality.
 * This abstracts the service creation from the component,
 * making it easy to test and swap implementations.
 */

import { useCallback, useState } from "react";
import type { EmailPayload, EmailServiceResponse } from "@/lib/emailService";
import { createEmailService } from "@/lib/email/emailJsService";

interface UseEmailReturn {
  sendEmail: (payload: EmailPayload) => Promise<EmailServiceResponse>;
  isLoading: boolean;
  error: Error | null;
}

export function useEmail(): UseEmailReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendEmail = useCallback(async (payload: EmailPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const emailService = createEmailService();
      const response = await emailService.sendEmail(payload);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to send email");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendEmail,
    isLoading,
    error,
  };
}
