/**
 * Provider-agnostic email contract (system.json → email.abstraction).
 *
 * Layer: Application
 * Rules: implemented by Infrastructure; templates live in Infrastructure.
 */

import type { ApplicationError } from "@/application/_shared/errors/ApplicationError";
import type { Result } from "@/shared/types/Result";

export interface EmailRequest {
  readonly to: string;
  readonly subject?: string;
  readonly data?: Readonly<Record<string, string | number | boolean>>;
}

export type EmailResult = Result<void, ApplicationError>;

export interface IEmailService {
  sendConfirmationEmail(request: EmailRequest): Promise<EmailResult>;
  sendOtpEmail(request: EmailRequest): Promise<EmailResult>;
  sendNotificationEmail(request: EmailRequest): Promise<EmailResult>;
  sendBookingConfirmation(request: EmailRequest): Promise<EmailResult>;
  sendBookingCancellation(request: EmailRequest): Promise<EmailResult>;
  sendWelcomeEmail(request: EmailRequest): Promise<EmailResult>;
}
