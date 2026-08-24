import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { s as IMAGES } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/images-BwhzB2qL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImagesPage() {
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(e) {
			if (e.key === "Escape") setOpen(null);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Images",
				title: "Stills from the worlds",
				lede: "Key frames and color keys. Click any still to open it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
				children: IMAGES.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: spanFor(image.still),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(image),
						className: "group block w-full overflow-hidden rounded-lg bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
							id: image.still,
							className: "aspect-frame",
							alt: image.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 sm:p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg leading-snug text-fg",
								children: image.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									image.from,
									" · ",
									image.year
								]
							})]
						})]
					})
				}, image.id))
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "still-title",
				onClick: () => setOpen(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-4xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
						id: open.still,
						className: "aspect-video",
						alt: open.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "still-title",
							className: "font-display text-2xl text-fg",
							children: open.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								open.from,
								" · ",
								open.year
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 shrink-0 items-center justify-center text-fg",
							"aria-label": "Close",
							onClick: () => setOpen(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					})]
				})
			}) : null
		]
	});
}
function spanFor(id) {
	if (id === "rooftop-dusk" || id === "train-window") return "col-span-2";
	return "";
}
//#endregion
export { ImagesPage as component };
