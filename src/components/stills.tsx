import type { JSX } from "react";
import { cn } from "@/lib/utils";
import type { StillId } from "@/lib/content";

type StillProps = {
  id: StillId;
  className?: string;
  ken?: boolean;
  alt?: string;
};

function Lights({
  dots,
}: {
  dots: Array<{ x: string; y: string; s: number; d?: string }>;
}) {
  return (
    <div className="still-lights" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            animationDelay: d.d ?? `${i * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

function TrainWindow() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #14161c 0%, #0c1018 42%, #1a1420 100%)",
        }}
      />
      <Lights
        dots={[
          { x: "18%", y: "38%", s: 3 },
          { x: "24%", y: "44%", s: 2 },
          { x: "31%", y: "36%", s: 4 },
          { x: "48%", y: "42%", s: 2 },
          { x: "62%", y: "34%", s: 3 },
          { x: "71%", y: "48%", s: 2 },
          { x: "78%", y: "40%", s: 5 },
          { x: "86%", y: "52%", s: 2 },
        ]}
      />
      <div className="still-rain" />
      <div
        className="absolute inset-x-[8%] top-[10%] bottom-[18%] rounded-sm"
        style={{ boxShadow: "inset 0 0 0 10px #0a0a0c, inset 0 0 0 11px #2a2a2e" }}
      />
      <div className="absolute left-1/2 top-[10%] bottom-[18%] w-px bg-border" />
      <div
        className="absolute bottom-[8%] left-[22%] h-[28%] w-[18%] rounded-t-full"
        style={{ background: "#121218" }}
      />
      <div
        className="absolute bottom-[22%] left-[26%] h-[10%] w-[10%] rounded-t-[40%]"
        style={{ background: "#1a1a22" }}
      />
    </>
  );
}

function RooftopDusk() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #1a1520 0%, #3a2430 38%, #c45c3e 62%, #e8b48a 78%, #0a0a0c 78%)",
        }}
      />
      <div
        className="absolute bottom-[22%] left-0 right-0 h-px"
        style={{ background: "rgb(236 234 228 / 0.2)" }}
      />
      <div
        className="absolute bottom-0 left-[4%] h-[30%] w-[7%]"
        style={{ background: "#0c0c10" }}
      />
      <div
        className="absolute bottom-0 left-[8%] h-[34%] w-[12%]"
        style={{ background: "#0c0c10" }}
      />
      <div
        className="absolute bottom-0 left-[22%] h-[48%] w-[9%]"
        style={{ background: "#101014" }}
      />
      <div
        className="absolute bottom-0 left-[31%] h-[28%] w-[6%]"
        style={{ background: "#0e0e12" }}
      />
      <div
        className="absolute bottom-0 right-[8%] h-[36%] w-[10%]"
        style={{ background: "#0c0c10" }}
      />
      <div
        className="absolute bottom-0 right-[18%] h-[40%] w-[16%]"
        style={{ background: "#0c0c12" }}
      />
      <div
        className="absolute bottom-[22%] right-[22%] h-8 w-1.5"
        style={{ background: "#e24b3a" }}
      />
      <div
        className="absolute bottom-[18%] left-[38%] h-[16%] w-[8%] rounded-t-full"
        style={{ background: "#121218" }}
      />
      <div
        className="absolute bottom-[18%] left-[46%] h-[14%] w-[7%] rounded-t-full"
        style={{ background: "#16161c" }}
      />
      <Lights
        dots={[
          { x: "12%", y: "68%", s: 2 },
          { x: "26%", y: "58%", s: 2 },
          { x: "80%", y: "64%", s: 3 },
          { x: "34%", y: "72%", s: 2 },
        ]}
      />
    </>
  );
}

function LanternAlley() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(90deg, #08080c 0%, #161018 40%, #1c1410 70%, #0a0a0c 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[28%]"
        style={{ background: "#0c0c10" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[22%]"
        style={{ background: "#0a0a0e" }}
      />
      <div
        className="absolute left-[38%] top-[18%] h-[22%] w-[10%] rounded-sm"
        style={{
          background: "radial-gradient(circle at 50% 40%, #f0c9a0, #e24b3a 70%)",
          boxShadow: "0 18px 40px rgb(226 75 58 / 0.35)",
        }}
      />
      <div
        className="absolute left-[40%] top-[8%] h-[12%] w-px"
        style={{ background: "rgb(236 234 228 / 0.35)" }}
      />
      <div
        className="absolute bottom-0 left-[42%] h-[38%] w-[7%] rounded-t-full"
        style={{ background: "#121018" }}
      />
      <div
        className="absolute bottom-0 left-[52%] h-[42%] w-[8%] rounded-t-full"
        style={{ background: "#16141c" }}
      />
      <Lights
        dots={[
          { x: "64%", y: "30%", s: 3 },
          { x: "70%", y: "44%", s: 2 },
          { x: "76%", y: "28%", s: 2 },
        ]}
      />
    </>
  );
}

function EmptyClassroom() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #2a241c 0%, #c4a078 55%, #eceae4 70%, #1a1814 70%)",
        }}
      />
      <div
        className="absolute top-[12%] right-[14%] h-[48%] w-[28%] rounded-sm"
        style={{
          background: "linear-gradient(180deg, #e8d2b0, #c45c3e)",
          boxShadow: "inset 0 0 0 8px #1a1814",
        }}
      />
      <div
        className="absolute bottom-[18%] left-[12%] right-[12%] h-2"
        style={{ background: "#2a241c" }}
      />
      <div
        className="absolute bottom-[8%] left-[18%] h-[12%] w-[22%]"
        style={{ background: "#141210" }}
      />
      <div
        className="absolute bottom-[8%] left-[48%] h-[12%] w-[22%]"
        style={{ background: "#161412" }}
      />
      <div
        className="absolute bottom-[20%] left-[8%] h-16 w-10"
        style={{ background: "#1c1814" }}
      />
    </>
  );
}

function HighWindow() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #1c1824 0%, #4a3040 45%, #d4785a 70%, #0a0a0c 70%)",
        }}
      />
      <div
        className="absolute inset-x-[18%] top-[8%] bottom-[22%]"
        style={{ boxShadow: "inset 0 0 0 14px #121214" }}
      />
      <div className="absolute left-1/2 top-[8%] bottom-[22%] w-2 bg-surface" />
      <div className="absolute inset-x-[18%] top-1/2 h-2 bg-surface" />
      <div
        className="absolute bottom-0 inset-x-0 h-[22%]"
        style={{ background: "#121214" }}
      />
      <div
        className="absolute bottom-[22%] left-[28%] h-[16%] w-[10%] rounded-t-full"
        style={{ background: "#1a1820" }}
      />
    </>
  );
}

function NightOcean() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #0c1018 0%, #141c28 48%, #0a1218 48%, #080c12 100%)",
        }}
      />
      <div
        className="absolute left-[12%] right-[12%] top-[48%] h-px"
        style={{ background: "rgb(236 234 228 / 0.18)" }}
      />
      <Lights
        dots={[
          { x: "22%", y: "42%", s: 2 },
          { x: "40%", y: "38%", s: 2 },
          { x: "58%", y: "44%", s: 3 },
          { x: "74%", y: "40%", s: 2 },
          { x: "30%", y: "62%", s: 2 },
          { x: "68%", y: "70%", s: 2 },
        ]}
      />
      <div
        className="absolute bottom-[10%] left-[42%] h-[18%] w-[7%] rounded-t-full"
        style={{ background: "#10141c" }}
      />
      <div
        className="absolute bottom-[10%] left-[50%] h-[20%] w-[8%] rounded-t-full"
        style={{ background: "#141820" }}
      />
    </>
  );
}

function StationClock() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "radial-gradient(ellipse at 50% 38%, #2a2420 0%, #0c0c10 62%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[22%] h-[38%] w-[24%] -translate-x-1/2 rounded-full"
        style={{
          boxShadow: "inset 0 0 0 6px #eceae4, 0 0 0 10px #141416",
          background: "#0a0a0c",
        }}
      />
      <div
        className="absolute left-1/2 top-[38%] h-[12%] w-0.5 origin-bottom -translate-x-1/2"
        style={{ background: "#eceae4", transform: "translateX(-50%) rotate(18deg)" }}
      />
      <div
        className="absolute left-1/2 top-[32%] h-[16%] w-0.5 origin-bottom -translate-x-1/2"
        style={{ background: "#e24b3a", transform: "translateX(-50%) rotate(-40deg)" }}
      />
      <div
        className="absolute bottom-0 inset-x-[20%] h-[18%]"
        style={{ background: "#121214" }}
      />
      <div
        className="absolute bottom-[18%] left-[28%] right-[28%] h-3"
        style={{ background: "#1c1c20" }}
      />
    </>
  );
}

function RainCrossing() {
  return (
    <>
      <div
        className="still-sky"
        style={{
          background:
            "linear-gradient(180deg, #161820 0%, #0c1016 55%, #12141a 100%)",
        }}
      />
      <div className="still-rain" />
      <div
        className="absolute bottom-[28%] left-0 right-0 h-px"
        style={{ background: "rgb(226 75 58 / 0.7)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[28%]"
        style={{ background: "#0a0c10" }}
      />
      <div
        className="absolute bottom-[28%] left-[18%] h-[36%] w-[8%] rounded-t-full"
        style={{ background: "#14161c" }}
      />
      <div
        className="absolute bottom-[28%] left-[30%] h-[32%] w-[7%] rounded-t-full"
        style={{ background: "#101218" }}
      />
      <div
        className="absolute bottom-[42%] left-[46%] h-24 w-2"
        style={{ background: "#eceae4", opacity: 0.15 }}
      />
      <Lights
        dots={[
          { x: "62%", y: "36%", s: 4 },
          { x: "70%", y: "30%", s: 2 },
          { x: "78%", y: "40%", s: 3 },
          { x: "88%", y: "28%", s: 2 },
        ]}
      />
    </>
  );
}

const SCENES: Record<StillId, () => JSX.Element> = {
  "train-window": TrainWindow,
  "rooftop-dusk": RooftopDusk,
  "lantern-alley": LanternAlley,
  "empty-classroom": EmptyClassroom,
  "high-window": HighWindow,
  "night-ocean": NightOcean,
  "station-clock": StationClock,
  "rain-crossing": RainCrossing,
};

export function CinematicStill({ id, className, ken, alt }: StillProps) {
  const Scene = SCENES[id];
  return (
    <div
      className={cn("still", className)}
      role="img"
      aria-label={alt ?? id.replace(/-/g, " ")}
    >
      <div className={cn("absolute inset-0", ken && "reel-ken")}>
        <Scene />
      </div>
    </div>
  );
}
