import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p className="text-xs tracking-kicker text-primary uppercase">Missing frame</p>
      <h1 className="mt-3 font-display text-4xl text-fg">This shot was never taken.</h1>
      <p className="mt-4 max-w-prose text-muted">
        The page is not in the cut. Return to the title card, or pick a section from the bar.
      </p>
      <Link to="/" className={cn(buttonVariants({ variant: "primary" }), "mt-8")}>
        Back to title
      </Link>
    </div>
  );
}
