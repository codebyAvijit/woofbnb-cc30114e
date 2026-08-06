/**
 * Browser-safe runtime configuration.
 *
 * Layer: Shared (cross-cutting)
 *
 * Only VITE_-prefixed values are readable in the browser. Server-only secrets
 * must never be added to this module.
 */

import { API_VERSION_PREFIX } from "@/shared/constants/app";

export interface AppEnvironment {
  /** Absolute or relative base URL of the WoofBnB REST API, version included. */
  readonly apiBaseUrl: string;
  /** Request timeout applied to API calls, in milliseconds. */
  readonly apiTimeoutMs: number;
  readonly isProduction: boolean;
}

function readApiBaseUrl(): string {
  const configured = import.meta.env['VITE_API_BASE_URL'];
  const base = typeof configured === "string" && configured.length > 0 ? configured : "";
  const normalized = base.replace(/\/+$/, "");
  return normalized.length > 0 ? normalized : API_VERSION_PREFIX;
}

function readApiTimeout(): number {
  const configured = Number(import.meta.env['VITE_API_TIMEOUT_MS']);
  return Number.isFinite(configured) && configured > 0 ? configured : 15000;
}

export const env: AppEnvironment = {
  apiBaseUrl: readApiBaseUrl(),
  apiTimeoutMs: readApiTimeout(),
  isProduction: import.meta.env.PROD,
};
