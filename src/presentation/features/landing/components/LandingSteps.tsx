/**
 * Reusable step list used by the landing page journey sections.
 *
 * Layer: Presentation (Landing module)
 */

import type { LandingStep } from "@/presentation/features/landing/content";

export interface LandingStepsProps {
  readonly id: string;
  readonly heading: string;
  readonly description: string;
  readonly steps: readonly LandingStep[];
  readonly className?: string;
}

export function LandingSteps({ id, heading, description, steps, className }: LandingStepsProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-foreground">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.step} className="flex flex-col gap-2">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                {step.step}
              </span>
              <h3 className="text-base font-medium text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
