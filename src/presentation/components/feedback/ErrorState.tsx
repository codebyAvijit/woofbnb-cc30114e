/**
 * Shared error state.
 *
 * Layer: Presentation
 *
 * Accepts an ApplicationError and renders a user-safe message; internal
 * details are never displayed.
 */

import { AlertTriangle } from "lucide-react";

import {
  toUserMessage,
  type ApplicationError,
} from "@/application/_shared/errors/ApplicationError";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  readonly title?: string;
  readonly error?: ApplicationError | null;
  readonly description?: string;
  readonly onRetry?: () => void;
  readonly className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  error,
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  const message =
    description ?? (error ? toUserMessage(error) : "Please try again in a moment.");

  return (
    <div
      role="alert"
      className={cn("flex flex-col items-center gap-3 py-10 text-center", className)}
    >
      <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
