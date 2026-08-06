/**
 * Authentication data transfer objects.
 *
 * Layer: Application
 * Rules: may depend only on Domain.
 */

import type { EntityId, IsoUtcTimestamp } from "@/domain/_shared/entities/Entity";

/** Authenticated user as exposed to the application and presentation layers. */
export interface AuthUserDto {
  readonly id: EntityId;
  readonly email: string;
  readonly displayName: string;
  readonly roles: readonly string[];
  readonly createdAt: IsoUtcTimestamp;
}

export interface AuthSessionDto {
  readonly user: AuthUserDto;
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresAt?: IsoUtcTimestamp;
}

export interface UserSignInDto {
  readonly email: string;
  readonly password: string;
}

export interface UserSignUpDto {
  readonly email: string;
  readonly password: string;
  readonly displayName: string;
}

export interface UserResetPasswordDto {
  readonly token: string;
  readonly newPassword: string;
}
