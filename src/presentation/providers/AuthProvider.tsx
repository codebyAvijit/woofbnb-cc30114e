/**
 * Authentication state provider.
 *
 * Layer: Presentation
 *
 * Depends only on the Application-level IAuthService contract; the concrete
 * implementation is injected by the composition root.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  AuthUserDto,
  UserSignInDto,
  UserSignUpDto,
} from "@/application/_shared/dtos/AuthDtos";
import type { ApplicationError } from "@/application/_shared/errors/ApplicationError";
import type { IAuthService } from "@/application/_shared/services/IAuthService";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  readonly status: AuthStatus;
  readonly user: AuthUserDto | null;
  readonly error: ApplicationError | null;
  signIn(credentials: UserSignInDto): Promise<boolean>;
  signUp(registration: UserSignUpDto): Promise<boolean>;
  signOut(): Promise<void>;
  refresh(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  readonly authService: IAuthService;
  readonly children: ReactNode;
}

export function AuthProvider({ authService, children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUserDto | null>(null);
  const [error, setError] = useState<ApplicationError | null>(null);

  const applyUser = useCallback((next: AuthUserDto | null) => {
    setUser(next);
    setStatus(next ? "authenticated" : "unauthenticated");
  }, []);

  const refresh = useCallback(async () => {
    const result = await authService.getCurrentUser();
    if (result.success) {
      setError(null);
      applyUser(result.value);
      return;
    }
    setError(result.error);
    applyUser(null);
  }, [authService, applyUser]);

  useEffect(() => {
    void refresh();
    return authService.onAuthStateChange(applyUser);
  }, [authService, applyUser, refresh]);

  const signIn = useCallback(
    async (credentials: UserSignInDto) => {
      const result = await authService.signIn(credentials);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      setError(null);
      applyUser(result.value.user);
      return true;
    },
    [authService, applyUser],
  );

  const signUp = useCallback(
    async (registration: UserSignUpDto) => {
      const result = await authService.signUp(registration);
      if (!result.success) {
        setError(result.error);
        return false;
      }
      setError(null);
      applyUser(result.value.user);
      return true;
    },
    [authService, applyUser],
  );

  const signOut = useCallback(async () => {
    await authService.signOut();
    setError(null);
    applyUser(null);
  }, [authService, applyUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, error, signIn, signUp, signOut, refresh }),
    [status, user, error, signIn, signUp, signOut, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
