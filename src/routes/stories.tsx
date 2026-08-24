import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cover } from "@/components/cover";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import { Button } from "@/components/ui/button";
import { listEntries } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/stories")({
  loader: () => listEntries({ data: { kind: "story" } }),
  component: StoriesPage,
});

function StoriesPage() {
  const entries = Route.useLoaderData();
  const col = useCollection("story");
  const [openId, setOpenId] = useState<number | null>(entries[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Stories"
        title="Fiction as pre-visualization"
        lede="Paste an opening, a chapter, or the whole piece. Image first, then the sentence that can stand next to it."
      />
      <ul className="mt-12 space-y-6">
        <li>
          <PlusCard label="Add story" onClick={col.openNew} />
        </li>
        {entries.map((story) => {
          const open = openId === story.id;
          return (
            <li key={story.id} className="relative">
              <article className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
                <EntryActions
                  onEdit={() => col.setEditing(story)}
                  onDelete={() => col.setRemoving(story)}
                />
                <div className="grid md:grid-cols-3">
                  <Cover
                    imageUrl={story.payload.imageUrl}
                    still={story.payload.still}
                    alt={story.payload.title ?? "Story"}
                    className="aspect-still md:col-span-1 md:aspect-auto md:min-h-full"
                  />
                  <div className="p-5 sm:p-7 md:col-span-2">
                    <p className="text-xs tracking-label text-muted uppercase">
                      {story.payload.year}
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-fg">
                      {story.payload.title}
                    </h2>
                    <p
                      className={
                        open
                          ? "mt-4 max-w-prose whitespace-pre-wrap text-muted"
                          : "mt-4 max-w-prose text-muted line-clamp-3"
                      }
                    >
                      {story.payload.excerpt}
                    </p>
                    <Button
                      variant="link"
                      className="mt-3 h-11 px-0"
                      onClick={() => setOpenId(open ? null : story.id)}
                    >
                      {open ? "Close" : "Read"}
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {col.editing !== null ? (
        <EntryDialog
          kind="story"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.title || "This story"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
