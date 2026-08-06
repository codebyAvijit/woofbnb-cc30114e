/**
 * Application footer.
 *
 * Layer: Presentation
 */

import { APP_NAME } from "@/shared/constants/app";

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. {APP_NAME} connects pet owners
          with pet sitters and does not provide pet care services directly.
        </p>
      </div>
    </footer>
  );
}
