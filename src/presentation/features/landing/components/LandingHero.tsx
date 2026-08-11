/**
 * Landing page hero section.
 *
 * Layer: Presentation (Landing module)
 */

import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/shared/constants/app";

export function LandingHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {APP_NAME}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {APP_TAGLINE}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{APP_DESCRIPTION}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            See how it works
          </a>
          <a
            href="#for-sitters"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Become a pet sitter
          </a>
        </div>
      </div>
    </section>
  );
}
