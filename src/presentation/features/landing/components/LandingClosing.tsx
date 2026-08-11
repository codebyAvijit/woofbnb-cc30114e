/**
 * Landing page closing section.
 *
 * Layer: Presentation (Landing module)
 *
 * The platform disclaimer keeps the marketplace role explicit, as required by
 * the business documentation.
 */

import { APP_NAME } from "@/shared/constants/app";

export function LandingClosing() {
  return (
    <section aria-labelledby="landing-closing-heading" className="bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2
          id="landing-closing-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Trusted pet care starts close to home
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          {APP_NAME} is a marketplace that connects pet owners with independent pet sitters. Sitter
          discovery, booking and reviews become available as the platform rolls out.
        </p>
      </div>
    </section>
  );
}
