import { X } from "lucide-react";
import { useEffect } from "react";
import { Cover } from "@/components/cover";
import { isDirectVideo, youtubeId, type Entry } from "@/lib/portfolio";

export function VideoPlayer({
  entry,
  onClose,
}: {
  entry: Entry;
  onClose: () => void;
}) {
  const url = (entry.payload.videoUrl ?? "").trim();
  const yt = youtubeId(url);
  const direct = isDirectVideo(url);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-bg">
          {yt ? (
            <iframe
              title={entry.payload.title ?? "Video"}
              src={`https://www.youtube.com/embed/${yt}?autoplay=1`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : direct ? (
            <video
              className="absolute inset-0 h-full w-full"
              src={url}
              controls
              autoPlay
              poster={entry.payload.imageUrl || undefined}
            />
          ) : url ? (
            <iframe
              title={entry.payload.title ?? "Video"}
              src={url}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <Cover
              imageUrl={entry.payload.imageUrl}
              still={entry.payload.still}
              alt={entry.payload.title ?? "Video"}
              className="absolute inset-0"
            />
          )}
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <h2 id="video-title" className="font-display text-2xl text-fg">
              {entry.payload.title}
            </h2>
            {entry.payload.caption ? (
              <p className="mt-1 text-sm text-muted">{entry.payload.caption}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center text-fg"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
