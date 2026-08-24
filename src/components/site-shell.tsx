import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

function FilmGrain() {
  return <div className="film-grain" aria-hidden />;
}

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className={className} aria-label="Sections">
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex min-h-11 shrink-0 items-center whitespace-nowrap px-2.5 text-xs tracking-nav uppercase transition-colors duration-150 ease-out",
              active ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {item.label}
            {active ? (
              <span className="absolute inset-x-3 bottom-1.5 h-px bg-primary" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <FilmGrain />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="flex h-14 shrink-0 items-center gap-3 py-2"
            aria-label={`${SITE.name} home`}
          >
            <span className="block h-6 w-0.5 bg-primary" aria-hidden />
            <span className="font-display text-lg tracking-label text-fg sm:text-xl">
              {SITE.name.toUpperCase()}
            </span>
          </Link>

          <button
            type="button"
            className="flex size-11 items-center justify-center text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <div className="hidden border-t border-border lg:block">
          <NavLinks className="nav-scroll mx-auto flex max-w-6xl flex-nowrap items-center justify-center overflow-x-auto px-2" />
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-border bg-bg px-2 py-2 lg:hidden"
          >
            <NavLinks className="flex flex-col" onNavigate={() => setOpen(false)} />
          </div>
        ) : null}
      </header>

      <main id="content" className="relative z-0">
        <div key={pathname} className="page-enter">
          {children}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            {SITE.name} · {SITE.tagline}
          </p>
          <p>Hyderabad, India</p>
        </div>
      </footer>
    </div>
  );
}
