import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Cover } from "@/components/cover";
import { CinematicStill } from "@/components/stills";
import { Button, buttonVariants } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import { SITE } from "@/lib/content";
import { listHome } from "@/lib/portfolio.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: () => listHome(),
  component: HomePage,
});

function HomePage() {
  const { projects, videos } = Route.useLoaderData();
  const [reelOpen, setReelOpen] = useState(false);
  const featured = projects[0];
  const showreel = videos[0];

  return (
    <div>
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
            <CinematicStill
              id="rooftop-dusk"
              ken
              className="hero-frame w-full"
              alt="Rooftop at dusk"
            />
            <div className="absolute inset-0 bg-bg/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <div className="stagger-in max-w-2xl">
                <p className="text-xs tracking-hero text-fg/80 uppercase">
                  {SITE.role}
                </p>
                <h1 className="mt-5 font-display text-5xl leading-none tracking-tight text-fg sm:text-7xl">
                  {SITE.name}
                </h1>
                <p className="mt-4 font-display text-xl italic text-fg/80 sm:text-2xl">
                  {SITE.tagline}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {showreel ? (
                    <Button
                      variant="primary"
                      onClick={() => setReelOpen(true)}
                      className="min-w-44"
                    >
                      <Play className="size-4 translate-x-px" />
                      Watch reel
                    </Button>
                  ) : (
                    <Link
                      to="/videos"
                      className={cn(buttonVariants({ variant: "primary" }), "min-w-44")}
                    >
                      <Play className="size-4 translate-x-px" />
                      Add a video
                    </Link>
                  )}
                  <Link
                    to="/projects"
                    className={cn(buttonVariants({ variant: "ghost" }), "min-w-44")}
                  >
                    Passion projects
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {featured ? (
          <>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-kicker text-primary uppercase">Now</p>
                <h2 className="mt-2 font-display text-3xl text-fg">
                  {featured.payload.title}
                </h2>
              </div>
              <Link
                to="/projects"
                className="hidden text-xs tracking-nav text-muted uppercase hover:text-fg sm:inline"
              >
                All projects
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Cover
                imageUrl={featured.payload.imageUrl}
                still={featured.payload.still}
                alt={featured.payload.title ?? "Project"}
                className="aspect-still rounded-lg"
              />
              <div className="flex flex-col justify-center">
                <p className="text-xs tracking-label text-muted uppercase">
                  {[featured.payload.kind, featured.payload.year]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-4 max-w-prose text-fg">{featured.payload.logline}</p>
                {featured.payload.note ? (
                  <p className="mt-3 text-sm text-muted">{featured.payload.note}</p>
                ) : null}
                <div className="mt-6">
                  <Link to="/about" className={buttonVariants({ variant: "ghost" })}>
                    About Ajay
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs tracking-kicker text-primary uppercase">Now</p>
              <h2 className="mt-2 font-display text-3xl text-fg">{SITE.status}</h2>
              <p className="mt-4 max-w-prose text-muted">
                Software at CSG by day. At night: original stories, character
                sheets, and AI-generated scene videos — the long road to
                directing anime and cinema.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/stories" className={buttonVariants({ variant: "ghost" })}>
                  Stories
                  <ArrowRight className="size-4" />
                </Link>
                <Link to="/about" className={buttonVariants({ variant: "ghost" })}>
                  About Ajay
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <CinematicStill
              id="high-window"
              className="aspect-still rounded-lg"
              alt="Window at dusk"
            />
          </div>
        )}
      </section>

      {reelOpen && showreel ? (
        <VideoPlayer entry={showreel} onClose={() => setReelOpen(false)} />
      ) : null}
    </div>
  );
}
