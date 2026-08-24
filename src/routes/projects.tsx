import { createFileRoute } from "@tanstack/react-router";
import { Cover } from "@/components/cover";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import { listEntries } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/projects")({
  loader: () => listEntries({ data: { kind: "project" } }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const entries = Route.useLoaderData();
  const col = useCollection("project");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Passion Projects"
        title="Original worlds, kept"
        lede="Stories and films you are making because they will not leave you alone. Add one with the plus."
      />
      <ul className="mt-12 grid gap-8 sm:grid-cols-2">
        <li>
          <PlusCard
            label="Add passion project"
            onClick={col.openNew}
            className="min-h-72 h-full"
          />
        </li>
        {entries.map((project) => (
          <li key={project.id} className="group relative">
            <article className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
              <EntryActions
                onEdit={() => col.setEditing(project)}
                onDelete={() => col.setRemoving(project)}
              />
              <Cover
                imageUrl={project.payload.imageUrl}
                still={project.payload.still}
                alt={project.payload.title ?? "Project"}
                className="aspect-still"
              />
              <div className="p-5 sm:p-6">
                <p className="text-xs tracking-label text-muted uppercase">
                  {[project.payload.kind, project.payload.year].filter(Boolean).join(" · ")}
                </p>
                <h2 className="mt-2 font-display text-2xl text-fg">
                  {project.payload.title}
                </h2>
                <p className="mt-3 text-sm text-muted">{project.payload.logline}</p>
                {project.payload.note ? (
                  <p className="mt-3 text-xs text-subtle">{project.payload.note}</p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
      {col.editing !== null ? (
        <EntryDialog
          kind="project"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.title || "This project"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
