import { X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { PORTRAIT_OPTIONS } from "@/components/portraits";
import { CharacterPortrait } from "@/components/portraits";
import { CinematicStill } from "@/components/stills";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { STILL_IDS, STILL_LABELS } from "@/lib/content";
import {
  TEMPLATES,
  type Entry,
  type Field,
  type Kind,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const MAX_IMAGE_BYTES = 1_200_000;

export function EntryDialog({
  kind,
  entry,
  onClose,
  onSave,
  busy,
  error,
}: {
  kind: Kind;
  entry: Entry | null;
  onClose: () => void;
  onSave: (payload: Record<string, string>) => void;
  busy?: boolean;
  error?: string | null;
}) {
  const template = TEMPLATES[kind];
  const [values, setValues] = useState<Record<string, string>>(
    () => entry?.payload ?? {},
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    for (const field of template.fields) {
      if (field.required && !(values[field.key] ?? "").trim()) {
        setLocalError(`${field.label} is required.`);
        return;
      }
    }
    if (kind === "image" && !(values.imageUrl ?? "").trim() && !(values.still ?? "").trim()) {
      setLocalError("Add an image or pick a scene template.");
      return;
    }
    setLocalError(null);
    onSave(values);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bg/80 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-dialog-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-xl bg-surface shadow-[var(--shadow-border)] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 id="entry-dialog-title" className="font-display text-2xl text-fg">
            {entry ? template.editLabel : template.addLabel}
          </h2>
          <button
            type="button"
            className="flex size-11 items-center justify-center text-fg"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 p-5">
          {template.fields.map((field) => (
            <FieldControl
              key={field.key}
              field={field}
              value={values[field.key] ?? ""}
              onChange={(v) => set(field.key, v)}
            />
          ))}
          {localError || error ? (
            <p className="text-sm text-primary">{localError || error}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={busy}>
              {busy ? "Saving" : "Save"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} disabled={busy}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (value: string) => void;
}) {
  const type = field.type ?? "text";

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs tracking-nav text-muted uppercase">
        {field.label}
      </span>
      {type === "textarea" ? (
        <Textarea
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "image" ? (
        <ImageField value={value} placeholder={field.placeholder} onChange={onChange} />
      ) : type === "still" ? (
        <StillPicker value={value} onChange={onChange} />
      ) : type === "portrait" ? (
        <PortraitPicker value={value} onChange={onChange} />
      ) : (
        <Input
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function ImageField({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const [fileError, setFileError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError("Use a PNG, JPG, or WebP.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setFileError("Keep images under 1.2 MB, or paste a URL.");
      return;
    }
    const data = await readAsDataUrl(file);
    setFileError(null);
    onChange(data);
  }

  return (
    <div className="space-y-2">
      <Input
        value={value.startsWith("data:") ? "" : value}
        placeholder={placeholder ?? "https://…"}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="block w-full text-xs text-muted file:mr-3 file:h-11 file:rounded-md file:border-0 file:bg-elevated file:px-4 file:text-sm file:text-fg"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
      {value ? (
        <img
          src={value}
          alt=""
          className="mt-1 h-28 w-full rounded-md object-cover shadow-[var(--shadow-border)]"
        />
      ) : null}
      {fileError ? <p className="text-xs text-primary">{fileError}</p> : null}
    </div>
  );
}

function StillPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {STILL_IDS.map((id) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(active ? "" : id)}
            className={cn(
              "overflow-hidden rounded-md text-left shadow-[var(--shadow-border)]",
              active && "ring-2 ring-primary",
            )}
          >
            <CinematicStill id={id} className="aspect-frame" alt={STILL_LABELS[id]} />
          </button>
        );
      })}
    </div>
  );
}

function PortraitPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {PORTRAIT_OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(active ? "" : opt.id)}
            className={cn(
              "overflow-hidden rounded-md bg-elevated shadow-[var(--shadow-border)]",
              active && "ring-2 ring-primary",
            )}
            aria-label={opt.label}
          >
            <CharacterPortrait id={opt.id} className="aspect-portrait" />
          </button>
        );
      })}
    </div>
  );
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export function ConfirmDelete({
  title,
  onCancel,
  onConfirm,
  busy,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  busy?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="font-display text-2xl text-fg">
          Remove this?
        </h2>
        <p className="mt-2 text-sm text-muted">{title}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="leader" onClick={onConfirm} disabled={busy}>
            {busy ? "Removing" : "Remove"}
          </Button>
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            Keep
          </Button>
        </div>
      </div>
    </div>
  );
}
