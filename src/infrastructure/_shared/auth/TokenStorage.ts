/**
 * Client-side session persistence.
 *
 * Layer: Infrastructure
 *
 * Storage is browser-only; every access is guarded so the module stays safe to
 * evaluate during server-side rendering.
 */

import type { AuthSessionDto } from "@/application/_shared/dtos/AuthDtos";
import { AUTH_STORAGE_KEY } from "@/shared/constants/app";

export interface ITokenStorage {
  read(): AuthSessionDto | null;
  write(session: AuthSessionDto): void;
  clear(): void;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export class LocalTokenStorage implements ITokenStorage {
  private cached: AuthSessionDto | null = null;

  read(): AuthSessionDto | null {
    const storage = getStorage();
    if (!storage) return this.cached;

    const raw = storage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
      this.cached = JSON.parse(raw) as AuthSessionDto;
      return this.cached;
    } catch {
      storage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }

  write(session: AuthSessionDto): void {
    this.cached = session;
    getStorage()?.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  clear(): void {
    this.cached = null;
    getStorage()?.removeItem(AUTH_STORAGE_KEY);
  }
}
