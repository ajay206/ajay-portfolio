import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CinematicStill } from "@/components/stills";
import { buttonVariants } from "@/components/ui/button";
import { ABOUT, SITE } from "@/lib/content";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <PageHeader kicker="About" title={SITE.name} lede={ABOUT.lead} />
          <div className="mt-8 max-w-prose space-y-4 text-muted">
            {ABOUT.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {ABOUT.facts.map((fact) => (
              <div key={fact.label} className="border-t border-border pt-3">
                <dt className="text-xs tracking-label text-subtle uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Link to="/contact" className={buttonVariants({ variant: "primary" })}>
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <CinematicStill
          id="high-window"
          className="aspect-about rounded-xl"
          alt="Window facing west"
        />
      </div>
    </div>
  );
}
