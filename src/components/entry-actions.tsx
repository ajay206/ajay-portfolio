import { Pencil, Trash2 } from "lucide-react";

export function EntryActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-1">
      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-md bg-bg/80 text-fg"
        aria-label="Edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Pencil className="size-4" />
      </button>
      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-md bg-bg/80 text-fg"
        aria-label="Delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
