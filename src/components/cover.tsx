import { CharacterPortrait } from "@/components/portraits";
import { CinematicStill } from "@/components/stills";
import { isPortraitId, isStillId } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function Cover({
  imageUrl,
  still,
  portrait,
  alt,
  className,
}: {
  imageUrl?: string;
  still?: string;
  portrait?: string;
  alt: string;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  if (isStillId(still)) {
    return <CinematicStill id={still} className={className} alt={alt} />;
  }
  if (isPortraitId(portrait)) {
    return (
      <div className={cn("bg-elevated", className)}>
        <CharacterPortrait id={portrait} />
      </div>
    );
  }
  return <div className={cn("bg-elevated", className)} aria-hidden />;
}
