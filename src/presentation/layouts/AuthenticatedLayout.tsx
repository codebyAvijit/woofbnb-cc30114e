/**
 * Layout used by pages that require an authenticated user.
 *
 * Layer: Presentation
 *
 * Access control is handled by RequireAuth; this component only defines the
 * page shell.
 */

import type { ReactNode } from "react";

import { AppFooter } from "@/presentation/components/navigation/AppFooter";
import { AppHeader } from "@/presentation/components/navigation/AppHeader";
import { RequireAuth } from "@/presentation/components/routing/RequireAuth";

export interface AuthenticatedLayoutProps {
  readonly children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <RequireAuth>{children}</RequireAuth>
      </main>
      <AppFooter />
    </div>
  );
}
