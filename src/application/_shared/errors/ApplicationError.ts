/**
 * Application-level error model returned by use cases and service interfaces.
 *
 * Layer: Application
 * Rules: may depend only on Domain.
 */

import type { DomainError } from "@/domain/_shared/errors/DomainError";

export type ApplicationErrorCode =
  | "VALIDATION_FAILED"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "SERVER_ERROR"
  | "UNKNOWN";

export interface ApplicationError {
  readonly code: ApplicationErrorCode;
  readonly message: string;
  readonly details?: readonly string[];
}

export function createApplicationError(
  code: ApplicationErrorCode,
  message: string,
  details?: readonly string[],
): ApplicationError {
  return details === undefined ? { code, message } : { code, message, details };
}

export function fromDomainError(error: DomainError): ApplicationError {
  const code: ApplicationErrorCode =
    error.code === "VALIDATION_FAILED"
      ? "VALIDATION_FAILED"
      : error.code === "NOT_FOUND"
        ? "NOT_FOUND"
        : error.code === "BUSINESS_RULE_VIOLATED"
          ? "CONFLICT"
          : "UNKNOWN";

  return createApplicationError(code, error.message, error.details);
}

/** User-facing message that never exposes internal implementation details. */
export function toUserMessage(error: ApplicationError): string {
  switch (error.code) {
    case "UNAUTHENTICATED":
      return "Please sign in to continue.";
    case "FORBIDDEN":
      return "You do not have permission to perform this action.";
    case "NOT_FOUND":
      return "The requested information could not be found.";
    case "NETWORK_ERROR":
      return "We could not reach the server. Please check your connection and try again.";
    case "TIMEOUT":
      return "The request took too long. Please try again.";
    case "SERVER_ERROR":
      return "Something went wrong on our end. Please try again shortly.";
    default:
      return error.message.length > 0 ? error.message : "Something went wrong. Please try again.";
  }
}
