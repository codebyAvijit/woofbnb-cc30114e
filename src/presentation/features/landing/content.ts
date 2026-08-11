/**
 * Static landing page content.
 *
 * Layer: Presentation (Landing module)
 *
 * The landing page is informational only. It contains no server state and
 * therefore keeps its copy as presentation-level constants rather than
 * fetching it through the API layer.
 */

export interface LandingSection {
  /** Anchor id used by the in-page section navigation. */
  readonly id: string;
  readonly label: string;
}

export interface LandingValueProposition {
  readonly title: string;
  readonly description: string;
}

export interface LandingStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export const LANDING_SECTIONS: readonly LandingSection[] = [
  { id: "how-it-works", label: "How it works" },
  { id: "for-owners", label: "For pet owners" },
  { id: "for-sitters", label: "For pet sitters" },
];

export const LANDING_VALUE_PROPOSITIONS: readonly LandingValueProposition[] = [
  {
    title: "Discover sitters nearby",
    description:
      "Location-based discovery makes it simple to see which trusted sitters are available close to home.",
  },
  {
    title: "Compare with confidence",
    description:
      "Standardised sitter profiles present services, experience and pricing in a consistent, comparable format.",
  },
  {
    title: "Transparent reviews",
    description:
      "Ratings and reviews from previous bookings help pet owners judge each sitter before making a request.",
  },
  {
    title: "Straightforward bookings",
    description:
      "A guided booking flow takes pet owners from discovery to a confirmed stay without unnecessary steps.",
  },
];

export const LANDING_OWNER_STEPS: readonly LandingStep[] = [
  {
    step: 1,
    title: "Search your area",
    description: "Enter a location and find pet sitters available nearby.",
  },
  {
    step: 2,
    title: "Review profiles",
    description: "Compare services, experience and reviews across sitter profiles.",
  },
  {
    step: 3,
    title: "Request a booking",
    description: "Share your pet's details and send a booking request to the sitter.",
  },
  {
    step: 4,
    title: "Leave a review",
    description: "After the stay, share feedback to help other pet owners choose.",
  },
];

export const LANDING_SITTER_STEPS: readonly LandingStep[] = [
  {
    step: 1,
    title: "Create a profile",
    description: "Describe your services, experience and the pets you care for.",
  },
  {
    step: 2,
    title: "Set availability",
    description: "Keep your calendar current so owners only request open dates.",
  },
  {
    step: 3,
    title: "Receive requests",
    description: "Respond to booking requests from pet owners in your area.",
  },
  {
    step: 4,
    title: "Build your reputation",
    description: "Collect reviews from completed bookings and grow recurring customers.",
  },
];
