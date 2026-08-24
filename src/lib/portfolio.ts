import type { PortraitId } from "@/components/portraits";
import type { StillId } from "@/lib/content";

export const KINDS = [
  "experience",
  "project",
  "story",
  "character",
  "video",
  "image",
] as const;

export type Kind = (typeof KINDS)[number];

export type Entry = {
  id: number;
  kind: Kind;
  payload: Record<string, string>;
  sortOrder: number;
};

export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "video"
  | "still"
  | "portrait";

export type Field = {
  key: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  required?: boolean;
};

export type Template = {
  kind: Kind;
  addLabel: string;
  editLabel: string;
  fields: Field[];
};

export const TEMPLATES: Record<Kind, Template> = {
  experience: {
    kind: "experience",
    addLabel: "Add experience",
    editLabel: "Edit experience",
    fields: [
      { key: "years", label: "Years", placeholder: "2022 — Now", required: true },
      { key: "title", label: "Title", placeholder: "Software Developer", required: true },
      { key: "place", label: "Place", placeholder: "CSG", required: true },
      {
        key: "summary",
        label: "Summary",
        type: "textarea",
        placeholder: "What you built, and what it felt like.",
        required: true,
      },
      { key: "tags", label: "Tags", placeholder: "Software, Hyderabad" },
    ],
  },
  project: {
    kind: "project",
    addLabel: "Add passion project",
    editLabel: "Edit project",
    fields: [
      { key: "title", label: "Title", placeholder: "Night Train", required: true },
      { key: "kind", label: "Kind", placeholder: "Original story / Short / Series" },
      { key: "year", label: "Year", placeholder: "2026" },
      {
        key: "logline",
        label: "Logline",
        type: "textarea",
        placeholder: "One or two sentences. The picture in words.",
        required: true,
      },
      { key: "note", label: "Note", placeholder: "In progress, draft, or released." },
      { key: "imageUrl", label: "Cover image", type: "image" },
      { key: "still", label: "Or a scene template", type: "still" },
    ],
  },
  story: {
    kind: "story",
    addLabel: "Add story",
    editLabel: "Edit story",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "year", label: "Year", placeholder: "2026" },
      {
        key: "excerpt",
        label: "Excerpt",
        type: "textarea",
        placeholder: "Paste the opening, or the whole piece.",
        required: true,
      },
      { key: "imageUrl", label: "Cover image", type: "image" },
      { key: "still", label: "Or a scene template", type: "still" },
    ],
  },
  character: {
    kind: "character",
    addLabel: "Add character",
    editLabel: "Edit character",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "role", label: "Role", placeholder: "Protagonist, rival, keeper…" },
      { key: "work", label: "From", placeholder: "Story or project name" },
      {
        key: "blurb",
        label: "About",
        type: "textarea",
        placeholder: "How they stand. What they want. What they will not say.",
        required: true,
      },
      { key: "imageUrl", label: "Portrait image", type: "image" },
      { key: "portrait", label: "Or a silhouette template", type: "portrait" },
    ],
  },
  video: {
    kind: "video",
    addLabel: "Add video",
    editLabel: "Edit video",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "runtime", label: "Runtime", placeholder: "0:48" },
      {
        key: "caption",
        label: "Caption",
        type: "textarea",
        placeholder: "Which story, which scene.",
      },
      {
        key: "videoUrl",
        label: "Video link",
        type: "video",
        placeholder: "YouTube, or a direct .mp4 link",
        required: true,
      },
      { key: "imageUrl", label: "Poster image", type: "image" },
      { key: "still", label: "Or a scene template", type: "still" },
    ],
  },
  image: {
    kind: "image",
    addLabel: "Add image",
    editLabel: "Edit image",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "year", label: "Year", placeholder: "2026" },
      { key: "from", label: "From", placeholder: "Story or project name" },
      { key: "imageUrl", label: "Image", type: "image" },
      { key: "still", label: "Or a scene template", type: "still" },
    ],
  },
};

export const EXPERIENCE_SEED: Record<string, string> = {
  years: "2022 — Now",
  title: "Software Developer",
  place: "CSG, Hyderabad",
  summary:
    "Building software at CSG. Parallel to the day job: writing original stories, designing characters, and generating cinematic scene videos — training toward direction in anime and cinema.",
  tags: "Software, Hyderabad",
};

export function isStillId(value: string | undefined): value is StillId {
  return (
    value === "train-window" ||
    value === "rooftop-dusk" ||
    value === "lantern-alley" ||
    value === "empty-classroom" ||
    value === "high-window" ||
    value === "night-ocean" ||
    value === "station-clock" ||
    value === "rain-crossing"
  );
}

export function isPortraitId(value: string | undefined): value is PortraitId {
  return (
    value === "hana" ||
    value === "ren" ||
    value === "yuri" ||
    value === "nox" ||
    value === "mira" ||
    value === "conductor"
  );
}

export function tagsOf(payload: Record<string, string>): string[] {
  return (payload.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function youtubeId(url: string): string | null {
  const trimmed = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
}

export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url.trim());
}
