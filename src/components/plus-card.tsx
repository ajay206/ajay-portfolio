import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlusCard({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl bg-surface text-muted shadow-[var(--shadow-border)] transition-[box-shadow,color] duration-150 ease-out hover:text-fg hover:shadow-[var(--shadow-border-hover)]",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-elevated text-fg">
        <Plus className="size-6" />
      </span>
      <span className="text-xs tracking-nav uppercase">{label}</span>
    </button>
  );
}
