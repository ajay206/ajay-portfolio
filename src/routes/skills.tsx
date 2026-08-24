import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SKILL_GROUPS } from "@/lib/content";

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Skills"
        title="Two crafts, one desk"
        lede="Software that ships. Stories that hold a still. The overlap is direction — knowing what the frame is for."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <section key={group.heading}>
            <h2 className="border-b border-border pb-3 font-display text-2xl text-fg">
              {group.heading}
            </h2>
            <ul className="mt-6 space-y-6">
              {group.items.map((item) => (
                <li key={item.name}>
                  <h3 className="text-sm font-medium tracking-wide text-fg">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
