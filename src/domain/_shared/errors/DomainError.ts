/**
 * Domain-level error model.
 *
 * Layer: Domain
 * Rules: no framework, infrastructure or presentation dependencies.
 */

export type DomainErrorCode =
  | "VALIDATION_FAILED"
  | "BUSINESS_RULE_VIOLATED"
  | "NOT_FOUND"
  | "UNKNOWN";

export interface DomainError {
  readonly code: DomainErrorCode;
  readonly message: string;
  readonly details?: readonly string[];
}

export function createDomainError(
  code: DomainErrorCode,
  message: string,
  details?: readonly string[],
): DomainError {
  return details === undefined ? { code, message } : { code, message, details };
}
