import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as STORIES, n as Button } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories-eGWLQEdM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StoriesPage() {
	const [openId, setOpenId] = (0, import_react.useState)(STORIES[0]?.id ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Stories",
			title: "Fiction as pre-visualization",
			lede: "Short pieces written the way a board is drawn — image first, then the sentence that can stand next to it."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-12 space-y-6",
			children: STORIES.map((story) => {
				const open = openId === story.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
							id: story.still,
							className: "aspect-still md:col-span-1 md:aspect-auto md:min-h-full",
							alt: story.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 sm:p-7 md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-label text-muted uppercase",
									children: story.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-2xl text-fg",
									children: story.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: open ? "mt-4 max-w-prose text-muted" : "mt-4 max-w-prose text-muted line-clamp-3",
									children: story.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "link",
									className: "mt-3 h-11 px-0",
									onClick: () => setOpenId(open ? null : story.id),
									children: open ? "Close" : "Read"
								})
							]
						})]
					})
				}) }, story.id);
			})
		})]
	});
}
//#endregion
export { StoriesPage as component };
