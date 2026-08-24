import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Pause, r as Play, t as X } from "../_libs/lucide-react.mjs";
import { n as Button, p as cn } from "./router-p48W-Dqv.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reel-player-CSccFFSE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReelPlayer({ reel, onClose }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % reel.frames.length);
		}, 2800);
		return () => window.clearInterval(id);
	}, [playing, reel.frames.length]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "reel-title",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-3xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video bg-bg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
					id: frame,
					ken: true,
					className: "absolute inset-0 h-full w-full",
					alt: reel.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent p-4 pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "reel-title",
						className: "font-display text-2xl text-fg",
						children: reel.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: reel.caption
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setPlaying((p) => !p),
						"aria-label": playing ? "Pause" : "Play",
						children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 translate-x-px" }), playing ? "Pause" : "Play"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 gap-1.5",
						children: reel.frames.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Frame ${i + 1}`,
							onClick: () => {
								setIndex(i);
								setPlaying(false);
							},
							className: cn("h-1.5 flex-1 rounded-full transition-colors duration-150", i === index ? "bg-primary" : "bg-border")
						}, `${f}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-muted",
						children: reel.runtime
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			})]
		})
	});
}
//#endregion
export { ReelPlayer as t };
