/**
 * Provider-agnostic authentication contract (system.json → auth.abstraction).
 *
 * Layer: Application
 * Rules: implemented by Infrastructure, consumed by Presentation.
 */

import type {
  AuthSessionDto,
  AuthUserDto,
  UserResetPasswordDto,
  UserSignInDto,
  UserSignUpDto,
} from "@/application/_shared/dtos/AuthDtos";
import type { ApplicationError } from "@/application/_shared/errors/ApplicationError";
import type { Result } from "@/shared/types/Result";

export type AuthResult<T> = Result<T, ApplicationError>;

export type AuthStateListener = (user: AuthUserDto | null) => void;

/** Unsubscribes a previously registered auth state listener. */
export type Unsubscribe = () => void;

export interface IAuthService {
  signIn(credentials: UserSignInDto): Promise<AuthResult<AuthSessionDto>>;
  signUp(registration: UserSignUpDto): Promise<AuthResult<AuthSessionDto>>;
  signOut(): Promise<AuthResult<void>>;
  getCurrentUser(): Promise<AuthResult<AuthUserDto | null>>;
  resetPassword(email: string): Promise<AuthResult<void>>;
  updatePassword(request: UserResetPasswordDto): Promise<AuthResult<void>>;
  refreshToken(): Promise<AuthResult<AuthSessionDto>>;
  onAuthStateChange(listener: AuthStateListener): Unsubscribe;
}
