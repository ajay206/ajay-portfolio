import { Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CinematicStill } from "@/components/stills";
import { Button } from "@/components/ui/button";
import type { StillId } from "@/lib/content";
import { cn } from "@/lib/utils";

type Reel = {
  title: string;
  runtime: string;
  caption: string;
  frames: StillId[];
};

export function ReelPlayer({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % reel.frames.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [playing, reel.frames.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const frame = reel.frames[index] ?? reel.frames[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reel-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-bg">
          <CinematicStill
            id={frame}
            ken
            className="absolute inset-0 h-full w-full"
            alt={reel.title}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-4 pt-16">
            <p id="reel-title" className="font-display text-2xl text-fg">
              {reel.title}
            </p>
            <p className="mt-1 text-sm text-muted">{reel.caption}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4 translate-x-px" />
            )}
            {playing ? "Pause" : "Play"}
          </Button>
          <div className="flex flex-1 gap-1.5">
            {reel.frames.map((f, i) => (
              <button
                key={`${f}-${i}`}
                type="button"
                aria-label={`Frame ${i + 1}`}
                onClick={() => {
                  setIndex(i);
                  setPlaying(false);
                }}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-150",
                  i === index ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
          <span className="text-xs tabular-nums text-muted">{reel.runtime}</span>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
