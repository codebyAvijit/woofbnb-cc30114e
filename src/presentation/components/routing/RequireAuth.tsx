/**
 * Client-side access guard.
 *
 * Layer: Presentation
 *
 * Renders its children only for authenticated users. Authorization remains the
 * responsibility of the backend; this guard is a user-experience concern.
 */

import type { ReactNode } from "react";

import { EmptyState } from "@/presentation/components/feedback/EmptyState";
import { LoadingIndicator } from "@/presentation/components/feedback/LoadingIndicator";
import { useAuth } from "@/presentation/providers/AuthProvider";

export interface RequireAuthProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

export function RequireAuth({ children, fallback }: RequireAuthProps) {
  const { status } = useAuth();

  if (status === "loading") {
    return <LoadingIndicator label="Checking your session" fullScreen />;
  }

  if (status === "unauthenticated") {
    return (
      fallback ?? (
        <EmptyState
          title="Sign in required"
          description="You need to be signed in to view this page."
        />
      )
    );
  }

  return <>{children}</>;
}
