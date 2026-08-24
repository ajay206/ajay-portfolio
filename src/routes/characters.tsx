import { createFileRoute } from "@tanstack/react-router";
import { Cover } from "@/components/cover";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import { listEntries } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/characters")({
  loader: () => listEntries({ data: { kind: "character" } }),
  component: CharactersPage,
});

function CharactersPage() {
  const entries = Route.useLoaderData();
  const col = useCollection("character");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Characters"
        title="The people who look back"
        lede="Upload a portrait, or start from a silhouette template. Name, role, and the one thing they will not say."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li>
          <PlusCard
            label="Add character"
            onClick={col.openNew}
            className="min-h-80 h-full"
          />
        </li>
        {entries.map((c) => (
          <li key={c.id} className="relative">
            <article className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
              <EntryActions
                onEdit={() => col.setEditing(c)}
                onDelete={() => col.setRemoving(c)}
              />
              <Cover
                imageUrl={c.payload.imageUrl}
                portrait={c.payload.portrait}
                still={c.payload.still}
                alt={c.payload.name ?? "Character"}
                className="aspect-portrait"
              />
              <div className="p-5">
                <p className="text-xs tracking-label text-muted uppercase">
                  {[c.payload.work, c.payload.role].filter(Boolean).join(" · ")}
                </p>
                <h2 className="mt-2 font-display text-2xl text-fg">
                  {c.payload.name}
                </h2>
                <p className="mt-3 text-sm text-muted">{c.payload.blurb}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {col.editing !== null ? (
        <EntryDialog
          kind="character"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.name || "This character"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
