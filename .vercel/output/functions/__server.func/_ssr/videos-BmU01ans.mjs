import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Play } from "../_libs/lucide-react.mjs";
import { f as VIDEOS } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
import { t as ReelPlayer } from "./reel-player-CSccFFSE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/videos-BmU01ans.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VideosPage() {
	const [active, setActive] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Videos",
				title: "Reels and animatics",
				lede: "Picture in motion — selected sequences from the showreel, the After Rain pilot, and two teasers."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-12 grid gap-6 sm:grid-cols-2",
				children: VIDEOS.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(video),
					className: "group w-full overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
								id: video.still,
								className: "absolute inset-0",
								alt: video.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-14 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-150 ease-out group-hover:scale-[1.04]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 translate-x-px" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-3 bottom-3 rounded-sm bg-bg/80 px-2 py-1 text-xs tabular-nums text-fg",
								children: video.runtime
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: video.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: video.caption
						})]
					})]
				}) }, video.id))
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelPlayer, {
				reel: active,
				onClose: () => setActive(null)
			}) : null
		]
	});
}
//#endregion
export { VideosPage as component };
