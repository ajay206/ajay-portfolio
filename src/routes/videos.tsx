import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useState } from "react";
import { Cover } from "@/components/cover";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import { VideoPlayer } from "@/components/video-player";
import type { Entry } from "@/lib/portfolio";
import { listEntries } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/videos")({
  loader: () => listEntries({ data: { kind: "video" } }),
  component: VideosPage,
});

function VideosPage() {
  const entries = Route.useLoaderData();
  const col = useCollection("video");
  const [active, setActive] = useState<Entry | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Videos"
        title="Scenes in motion"
        lede="Paste a YouTube or mp4 link for an AI-generated scene. Add a poster still if you have one."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        <li>
          <PlusCard
            label="Add video"
            onClick={col.openNew}
            className="min-h-64 h-full"
          />
        </li>
        {entries.map((video) => (
          <li key={video.id} className="relative">
            <EntryActions
              onEdit={() => col.setEditing(video)}
              onDelete={() => col.setRemoving(video)}
            />
            <button
              type="button"
              onClick={() => setActive(video)}
              className="group w-full overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="relative aspect-video">
                <Cover
                  imageUrl={video.payload.imageUrl}
                  still={video.payload.still}
                  alt={video.payload.title ?? "Video"}
                  className="absolute inset-0"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-150 ease-out group-hover:scale-[1.04]">
                    <Play className="size-5 translate-x-px" />
                  </span>
                </span>
                {video.payload.runtime ? (
                  <span className="absolute right-3 bottom-3 rounded-sm bg-bg/80 px-2 py-1 text-xs tabular-nums text-fg">
                    {video.payload.runtime}
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl text-fg">
                  {video.payload.title}
                </h2>
                {video.payload.caption ? (
                  <p className="mt-2 text-sm text-muted">{video.payload.caption}</p>
                ) : null}
              </div>
            </button>
          </li>
        ))}
      </ul>
      {active ? <VideoPlayer entry={active} onClose={() => setActive(null)} /> : null}
      {col.editing !== null ? (
        <EntryDialog
          kind="video"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.title || "This video"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
