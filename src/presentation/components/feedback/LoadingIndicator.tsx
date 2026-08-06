/**
 * Shared loading indicator.
 *
 * Layer: Presentation
 */

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface LoadingIndicatorProps {
  readonly label?: string;
  readonly fullScreen?: boolean;
  readonly className?: string;
}

export function LoadingIndicator({
  label = "Loading",
  fullScreen = false,
  className,
}: LoadingIndicatorProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullScreen ? "min-h-[50vh]" : "py-10",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
