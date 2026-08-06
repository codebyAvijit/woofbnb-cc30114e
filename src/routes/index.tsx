import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          WoofBnB
        </h1>
        <p className="text-lg text-muted-foreground">
          A cozy place for dogs to stay. Coming soon.
        </p>
      </div>
    </main>
  );
}
