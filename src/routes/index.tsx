import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/presentation/features/landing/LandingPage";
import { PublicLayout } from "@/presentation/layouts/PublicLayout";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/shared/constants/app";

const PAGE_TITLE = `${APP_NAME} — ${APP_TAGLINE}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: APP_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <PublicLayout>
      <LandingPage />
    </PublicLayout>
  );
}
