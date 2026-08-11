/**
 * REST implementation of IAuthService, backed by the WoofBnB Node.js API.
 *
 * Layer: Infrastructure
 *
 * Endpoints follow 04_OPENAPI_SPECIFICATION.md → Authentication.
 */

import type {
  AuthSessionDto,
  AuthUserDto,
  UserResetPasswordDto,
  UserSignInDto,
  UserSignUpDto,
} from "@/application/_shared/dtos/AuthDtos";
import { createApplicationError } from "@/application/_shared/errors/ApplicationError";
import type {
  AuthResult,
  AuthStateListener,
  IAuthService,
  Unsubscribe,
} from "@/application/_shared/services/IAuthService";
import type { ITokenStorage } from "@/infrastructure/_shared/auth/TokenStorage";
import type { HttpClient } from "@/infrastructure/_shared/http/HttpClient";
import { err, ok } from "@/shared/types/Result";

export class RestAuthService implements IAuthService {
  private readonly http: HttpClient;
  private readonly storage: ITokenStorage;
  private readonly listeners = new Set<AuthStateListener>();

  constructor(http: HttpClient, storage: ITokenStorage) {
    this.http = http;
    this.storage = storage;
  }

  getAccessToken(): string | null {
    return this.storage.read()?.accessToken ?? null;
  }

  async signIn(credentials: UserSignInDto): Promise<AuthResult<AuthSessionDto>> {
    const result = await this.http.post<AuthSessionDto>("/auth/login", {
      body: credentials,
      authenticated: false,
    });
    return this.persist(result);
  }

  async signUp(registration: UserSignUpDto): Promise<AuthResult<AuthSessionDto>> {
    const result = await this.http.post<AuthSessionDto>("/auth/register", {
      body: registration,
      authenticated: false,
    });
    return this.persist(result);
  }

  async signOut(): Promise<AuthResult<void>> {
    const result = await this.http.post<void>("/auth/logout");
    this.storage.clear();
    this.notify(null);
    return result.success ? ok(undefined) : result;
  }

  async getCurrentUser(): Promise<AuthResult<AuthUserDto | null>> {
    if (this.getAccessToken() === null) return ok(null);

    const result = await this.http.get<AuthUserDto>("/auth/me");
    if (!result.success) {
      if (result.error.code === "UNAUTHENTICATED") {
        this.storage.clear();
        this.notify(null);
        return ok(null);
      }
      return result;
    }

    this.notify(result.value);
    return ok(result.value);
  }

  async resetPassword(email: string): Promise<AuthResult<void>> {
    const result = await this.http.post<void>("/auth/forgot-password", {
      body: { email },
      authenticated: false,
    });
    return result.success ? ok(undefined) : result;
  }

  async updatePassword(request: UserResetPasswordDto): Promise<AuthResult<void>> {
    const result = await this.http.post<void>("/auth/reset-password", {
      body: request,
      authenticated: false,
    });
    return result.success ? ok(undefined) : result;
  }

  async refreshToken(): Promise<AuthResult<AuthSessionDto>> {
    const session = this.storage.read();
    if (!session?.refreshToken) {
      this.notify(null);
      return err(
        createApplicationError("UNAUTHENTICATED", "No active session to refresh."),
      );
    }

    const result = await this.http.post<AuthSessionDto>("/auth/refresh", {
      body: { refreshToken: session.refreshToken },
      authenticated: false,
    });
    return this.persist(result);
  }

  /**
   * Clears the stored session and publishes the signed-out state. Invoked by
   * the transport layer when the API rejects the current credentials.
   */
  handleUnauthorized(): void {
    this.storage.clear();
    this.notify(null);
  }

  onAuthStateChange(listener: AuthStateListener): Unsubscribe {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private persist(result: AuthResult<AuthSessionDto>): AuthResult<AuthSessionDto> {
    if (!result.success) return result;
    this.storage.write(result.value);
    this.notify(result.value.user);
    return result;
  }

  private notify(user: AuthUserDto | null): void {
    for (const listener of this.listeners) listener(user);
  }
}
