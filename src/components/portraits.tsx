import type { JSX } from "react";
import { cn } from "@/lib/utils";

export type PortraitId =
  | "hana"
  | "ren"
  | "yuri"
  | "nox"
  | "mira"
  | "conductor";

export const PORTRAIT_OPTIONS: { id: PortraitId; label: string }[] = [
  { id: "hana", label: "Moonlight" },
  { id: "ren", label: "Courier" },
  { id: "yuri", label: "Archivist" },
  { id: "nox", label: "Shadow" },
  { id: "mira", label: "Lantern" },
  { id: "conductor", label: "Conductor" },
];

function Hana() {
  return (
    <>
      <rect width="100" height="140" fill="#141820" />
      <rect y="88" width="100" height="52" fill="#1c2430" />
      <circle cx="50" cy="58" r="22" fill="#1a1c24" />
      <path d="M28 58 C28 28 72 28 72 58 L74 118 L26 118 Z" fill="#12141c" />
      <path d="M22 40 C30 8 70 8 78 42 L70 58 L30 58 Z" fill="#0c0e14" />
      <ellipse cx="42" cy="56" rx="3" ry="3.5" fill="#eceae4" />
      <ellipse cx="58" cy="56" rx="3" ry="3.5" fill="#eceae4" />
      <path d="M44 68 Q50 72 56 68" stroke="#8f8c86" fill="none" strokeWidth="1" />
      <rect x="38" y="78" width="24" height="36" fill="#2a3444" />
    </>
  );
}

function Ren() {
  return (
    <>
      <rect width="100" height="140" fill="#1c1410" />
      <rect y="96" width="100" height="44" fill="#241810" />
      <circle cx="50" cy="54" r="20" fill="#1a1614" />
      <path d="M30 50 C32 22 68 20 70 52 L68 110 L32 110 Z" fill="#161210" />
      <path d="M28 38 L40 22 L52 36 L64 20 L74 40 L70 52 L30 52 Z" fill="#0e0c0a" />
      <ellipse cx="43" cy="54" rx="2.8" ry="3.2" fill="#eceae4" />
      <ellipse cx="57" cy="54" rx="2.8" ry="3.2" fill="#eceae4" />
      <path
        d="M38 78 Q50 96 62 78 L58 120 L42 120 Z"
        fill="#e24b3a"
        opacity="0.9"
      />
      <rect x="40" y="78" width="20" height="40" fill="#2a2018" />
    </>
  );
}

function Yuri() {
  return (
    <>
      <rect width="100" height="140" fill="#121814" />
      <rect y="90" width="100" height="50" fill="#1a221c" />
      <circle cx="50" cy="56" r="20" fill="#1c201c" />
      <path d="M32 56 C34 30 66 30 68 56 L66 112 L34 112 Z" fill="#161a16" />
      <path d="M34 34 C40 22 60 22 66 34 L62 48 L38 48 Z" fill="#0e120e" />
      <circle cx="42" cy="56" r="7" fill="none" stroke="#eceae4" strokeWidth="1.4" />
      <circle cx="58" cy="56" r="7" fill="none" stroke="#eceae4" strokeWidth="1.4" />
      <line x1="49" y1="56" x2="51" y2="56" stroke="#eceae4" strokeWidth="1.2" />
      <ellipse cx="42" cy="56" rx="2.2" ry="2.6" fill="#eceae4" />
      <ellipse cx="58" cy="56" rx="2.2" ry="2.6" fill="#eceae4" />
      <rect x="40" y="78" width="20" height="40" fill="#243028" />
      <rect x="18" y="108" width="16" height="22" fill="#2a2018" />
      <rect x="66" y="104" width="14" height="26" fill="#1c1810" />
    </>
  );
}

function Nox() {
  return (
    <>
      <rect width="100" height="140" fill="#10080c" />
      <rect y="100" width="100" height="40" fill="#1a0c10" />
      <path d="M24 40 L50 18 L76 40 L70 120 L30 120 Z" fill="#140a12" />
      <path d="M28 28 L50 8 L72 30 L64 48 L36 48 Z" fill="#0a0608" />
      <ellipse cx="40" cy="58" rx="4" ry="5" fill="#e24b3a" />
      <ellipse cx="60" cy="58" rx="2" ry="2.4" fill="#8f8c86" />
      <path d="M38 74 L62 74" stroke="#2a2a2e" strokeWidth="1" />
      <rect x="36" y="82" width="28" height="40" fill="#1a1014" />
    </>
  );
}

function Mira() {
  return (
    <>
      <rect width="100" height="140" fill="#1a1410" />
      <rect y="100" width="100" height="40" fill="#221810" />
      <circle cx="50" cy="62" r="18" fill="#1c1814" />
      <path d="M34 62 C36 40 64 40 66 62 L64 108 L36 108 Z" fill="#181410" />
      <path d="M32 48 C38 28 62 28 68 48 L62 60 L38 60 Z" fill="#2a2018" />
      <ellipse cx="44" cy="62" rx="2.6" ry="3" fill="#eceae4" />
      <ellipse cx="56" cy="62" rx="2.6" ry="3" fill="#eceae4" />
      <circle cx="72" cy="78" r="8" fill="#e24b3a" />
      <circle cx="72" cy="78" r="4" fill="#eceae4" opacity="0.35" />
      <rect x="42" y="84" width="16" height="32" fill="#3a2a20" />
    </>
  );
}

function Conductor() {
  return (
    <>
      <rect width="100" height="140" fill="#121416" />
      <rect y="96" width="100" height="44" fill="#1a1c20" />
      <circle cx="50" cy="60" r="18" fill="#1c1e22" />
      <path d="M34 60 C36 40 64 40 66 60 L64 114 L36 114 Z" fill="#16181c" />
      <rect x="28" y="36" width="44" height="10" fill="#0c0c0e" />
      <rect x="22" y="44" width="56" height="4" fill="#0c0c0e" />
      <ellipse cx="43" cy="62" rx="2.4" ry="2.8" fill="#eceae4" />
      <ellipse cx="57" cy="62" rx="2.4" ry="2.8" fill="#eceae4" />
      <path d="M44 72 Q50 76 56 72" stroke="#6b6862" fill="none" strokeWidth="1" />
      <rect x="38" y="82" width="24" height="36" fill="#1c2028" />
      <rect x="46" y="82" width="8" height="20" fill="#e24b3a" />
    </>
  );
}

const MAP: Record<PortraitId, () => JSX.Element> = {
  hana: Hana,
  ren: Ren,
  yuri: Yuri,
  nox: Nox,
  mira: Mira,
  conductor: Conductor,
};

export function CharacterPortrait({
  id,
  className,
}: {
  id: PortraitId;
  className?: string;
}) {
  const Scene = MAP[id];
  return (
    <svg
      viewBox="0 0 100 140"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden
    >
      <Scene />
    </svg>
  );
}
