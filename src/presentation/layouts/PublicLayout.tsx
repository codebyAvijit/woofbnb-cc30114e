/**
 * Public layout used by pages available without authentication.
 *
 * Layer: Presentation
 */

import type { ReactNode } from "react";

import { AppFooter } from "@/presentation/components/navigation/AppFooter";
import { AppHeader } from "@/presentation/components/navigation/AppHeader";

export interface PublicLayoutProps {
  readonly children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
