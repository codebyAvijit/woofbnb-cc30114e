/**
 * Application header.
 *
 * Layer: Presentation
 *
 * Navigation targets are added as their routes are implemented in later
 * milestones; the foundation only links to routes that exist.
 */

import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/presentation/providers/AuthProvider";
import { APP_NAME } from "@/shared/constants/app";

export function AppHeader() {
  const { status, user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          {APP_NAME}
        </Link>

        <nav aria-label="Main" className="flex items-center gap-2">
          {status === "authenticated" && user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user.displayName}
              </span>
              <Button variant="outline" size="sm" onClick={() => void signOut()}>
                Sign out
              </Button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
