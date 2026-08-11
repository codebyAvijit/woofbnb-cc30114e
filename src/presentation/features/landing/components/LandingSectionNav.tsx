/**
 * In-page navigation for the landing page sections.
 *
 * Layer: Presentation (Landing module)
 *
 * Feature routes are introduced in later milestones, so navigation currently
 * targets the sections of the landing page itself.
 */

import { LANDING_SECTIONS } from "@/presentation/features/landing/content";

export function LandingSectionNav() {
  return (
    <nav
      aria-label="Landing page sections"
      className="border-b border-border bg-muted/40"
      data-testid="landing-section-nav"
    >
      <ul className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-3 text-sm sm:px-6">
        {LANDING_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
