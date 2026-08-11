/**
 * Landing page composition.
 *
 * Layer: Presentation (Landing module)
 *
 * The page is informational and consumes no server state; the route renders it
 * inside the shared PublicLayout.
 */

import { LandingClosing } from "@/presentation/features/landing/components/LandingClosing";
import { LandingHero } from "@/presentation/features/landing/components/LandingHero";
import { LandingSectionNav } from "@/presentation/features/landing/components/LandingSectionNav";
import { LandingSteps } from "@/presentation/features/landing/components/LandingSteps";
import { LandingValueProps } from "@/presentation/features/landing/components/LandingValueProps";
import {
  LANDING_OWNER_STEPS,
  LANDING_SITTER_STEPS,
} from "@/presentation/features/landing/content";

export function LandingPage() {
  return (
    <>
      <LandingSectionNav />
      <LandingHero />
      <LandingValueProps />
      <LandingSteps
        id="for-owners"
        heading="For pet owners"
        description="From finding a nearby sitter to sharing feedback after the stay."
        steps={LANDING_OWNER_STEPS}
        className="border-b border-border bg-background"
      />
      <LandingSteps
        id="for-sitters"
        heading="For pet sitters"
        description="Build a professional profile and grow a base of recurring customers."
        steps={LANDING_SITTER_STEPS}
        className="border-b border-border bg-background"
      />
      <LandingClosing />
    </>
  );
}
