import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Cover } from "@/components/cover";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import type { Entry } from "@/lib/portfolio";
import { listEntries } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/images")({
  loader: () => listEntries({ data: { kind: "image" } }),
  component: ImagesPage,
});

function ImagesPage() {
  const entries = Route.useLoaderData();
  const col = useCollection("image");
  const [open, setOpen] = useState<Entry | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Images"
        title="Stills from the worlds"
        lede="Upload a still, paste a URL, or start from a scene template. Click plus to add."
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <li className="col-span-2">
          <PlusCard
            label="Add image"
            onClick={col.openNew}
            className="min-h-48 h-full"
          />
        </li>
        {entries.map((image) => (
          <li key={image.id} className="relative">
            <EntryActions
              onEdit={() => col.setEditing(image)}
              onDelete={() => col.setRemoving(image)}
            />
            <button
              type="button"
              onClick={() => setOpen(image)}
              className="group block w-full overflow-hidden rounded-lg bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]"
            >
              <Cover
                imageUrl={image.payload.imageUrl}
                still={image.payload.still}
                alt={image.payload.title ?? "Image"}
                className="aspect-frame"
              />
              <div className="p-3 sm:p-4">
                <h2 className="font-display text-lg leading-snug text-fg">
                  {image.payload.title}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  {[image.payload.from, image.payload.year].filter(Boolean).join(" · ")}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="still-title"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Cover
              imageUrl={open.payload.imageUrl}
              still={open.payload.still}
              alt={open.payload.title ?? "Image"}
              className="aspect-video"
            />
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 id="still-title" className="font-display text-2xl text-fg">
                  {open.payload.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {[open.payload.from, open.payload.year].filter(Boolean).join(" · ")}
                </p>
              </div>
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center text-fg"
                aria-label="Close"
                onClick={() => setOpen(null)}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {col.editing !== null ? (
        <EntryDialog
          kind="image"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.title || "This image"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
