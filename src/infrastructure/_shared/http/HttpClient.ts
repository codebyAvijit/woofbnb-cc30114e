/**
 * REST HTTP client for the WoofBnB API.
 *
 * Layer: Infrastructure
 *
 * The client owns every transport concern (base URL, headers, timeouts,
 * envelope unwrapping, status-code mapping) and returns Application-level
 * Results so upper layers never see fetch or Response objects.
 */

import {
  createApplicationError,
  type ApplicationError,
} from "@/application/_shared/errors/ApplicationError";
import { env } from "@/shared/config/env";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import { err, ok, type Result } from "@/shared/types/Result";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | undefined | null;

export interface HttpRequestOptions {
  readonly query?: Readonly<Record<string, QueryValue>>;
  readonly body?: unknown;
  readonly signal?: AbortSignal;
  /** Set to false for endpoints that must be called anonymously. */
  readonly authenticated?: boolean;
}

export type HttpResult<T> = Result<T, ApplicationError>;

/** Supplies the bearer token for authenticated requests, if any. */
export type AccessTokenProvider = () => string | null;

export interface HttpClientOptions {
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly getAccessToken?: AccessTokenProvider;
  /** Invoked when the API rejects the current credentials. */
  readonly onUnauthorized?: () => void;
}

function buildUrl(
  baseUrl: string,
  path: string,
  query?: Readonly<Record<string, QueryValue>>,
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        search.append(key, String(value));
      }
    }
  }

  const queryString = search.toString();
  return `${baseUrl}${normalizedPath}${queryString.length > 0 ? `?${queryString}` : ""}`;
}

function mapStatusToError(status: number, message: string, details?: readonly string[]) {
  if (status === 400 || status === 422) {
    return createApplicationError("VALIDATION_FAILED", message, details);
  }
  if (status === 401) return createApplicationError("UNAUTHENTICATED", message, details);
  if (status === 403) return createApplicationError("FORBIDDEN", message, details);
  if (status === 404) return createApplicationError("NOT_FOUND", message, details);
  if (status === 409) return createApplicationError("CONFLICT", message, details);
  if (status >= 500) return createApplicationError("SERVER_ERROR", message, details);
  return createApplicationError("UNKNOWN", message, details);
}

export class HttpClient {
  private readonly options: HttpClientOptions;

  constructor(options: HttpClientOptions) {
    this.options = options;
  }

  get<T>(path: string, options?: HttpRequestOptions): Promise<HttpResult<T>> {
    return this.request<T>("GET", path, options);
  }

  post<T>(path: string, options?: HttpRequestOptions): Promise<HttpResult<T>> {
    return this.request<T>("POST", path, options);
  }

  put<T>(path: string, options?: HttpRequestOptions): Promise<HttpResult<T>> {
    return this.request<T>("PUT", path, options);
  }

  patch<T>(path: string, options?: HttpRequestOptions): Promise<HttpResult<T>> {
    return this.request<T>("PATCH", path, options);
  }

  delete<T>(path: string, options?: HttpRequestOptions): Promise<HttpResult<T>> {
    return this.request<T>("DELETE", path, options);
  }

  async request<T>(
    method: HttpMethod,
    path: string,
    options: HttpRequestOptions = {},
  ): Promise<HttpResult<T>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.options.timeoutMs);

    if (options.signal) {
      options.signal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    const headers: Record<string, string> = { Accept: "application/json" };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";

    if (options.authenticated !== false) {
      const token = this.options.getAccessToken?.() ?? null;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(buildUrl(this.options.baseUrl, path, options.query), {
        method,
        headers,
        signal: controller.signal,
        ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
      });

      if (response.status === 401) this.options.onUnauthorized?.();

      if (response.status === 204) return ok(undefined as T);

      const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

      if (!response.ok || payload === null || payload.success === false) {
        const message =
          payload?.message ?? `Request failed with status ${String(response.status)}`;
        const details =
          payload !== null && payload.success === false ? payload.errors : undefined;
        return err(mapStatusToError(response.status, message, details));
      }

      return ok(payload.data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return err(createApplicationError("TIMEOUT", "The request timed out."));
      }
      return err(
        createApplicationError("NETWORK_ERROR", "Unable to reach the WoofBnB API."),
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}

export function createHttpClient(
  overrides: Partial<HttpClientOptions> = {},
): HttpClient {
  return new HttpClient({
    baseUrl: env.apiBaseUrl,
    timeoutMs: env.apiTimeoutMs,
    ...overrides,
  });
}
