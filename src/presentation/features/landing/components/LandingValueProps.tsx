/**
 * Landing page value proposition section.
 *
 * Layer: Presentation (Landing module)
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANDING_VALUE_PROPOSITIONS } from "@/presentation/features/landing/content";

export function LandingValueProps() {
  return (
    <section id="how-it-works" className="border-b border-border bg-muted/30" aria-labelledby="landing-value-heading">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 id="landing-value-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          Why pet owners choose WoofBnB
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANDING_VALUE_PROPOSITIONS.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
