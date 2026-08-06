import { createFileRoute } from "@tanstack/react-router";

import { PublicLayout } from "@/presentation/layouts/PublicLayout";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/shared/constants/app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — ${APP_TAGLINE}` },
      { name: "description", content: APP_DESCRIPTION },
      { property: "og:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      { property: "og:description", content: APP_DESCRIPTION },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{APP_TAGLINE}</p>
      </section>
    </PublicLayout>
  );
}
