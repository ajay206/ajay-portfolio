import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  createEntry,
  deleteEntry,
  updateEntry,
} from "@/lib/portfolio.functions";
import type { Entry, Kind } from "@/lib/portfolio";

export function useCollection(kind: Kind) {
  const router = useRouter();
  const [editing, setEditing] = useState<Entry | null | "new">(null);
  const [removing, setRemoving] = useState<Entry | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(payload: Record<string, string>) {
    setBusy(true);
    setError(null);
    try {
      if (editing && editing !== "new") {
        await updateEntry({ data: { id: editing.id, payload } });
      } else {
        await createEntry({ data: { kind, payload } });
      }
      setEditing(null);
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function confirmRemove() {
    if (!removing) return;
    setBusy(true);
    try {
      await deleteEntry({ data: { id: removing.id } });
      setRemoving(null);
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove.");
    } finally {
      setBusy(false);
    }
  }

  return {
    editing,
    setEditing,
    removing,
    setRemoving,
    busy,
    error,
    save,
    confirmRemove,
    openNew: () => {
      setError(null);
      setEditing("new");
    },
  };
}
