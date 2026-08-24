import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowRight, r as Play } from "../_libs/lucide-react.mjs";
import { c as PROJECTS, f as VIDEOS, l as SITE, n as Button, p as cn, r as buttonVariants } from "./router-p48W-Dqv.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
import { t as ReelPlayer } from "./reel-player-CSccFFSE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CBcaO-2G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const [reelOpen, setReelOpen] = (0, import_react.useState)(false);
	const showreel = VIDEOS[0];
	const featured = PROJECTS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
							id: "rooftop-dusk",
							ken: true,
							className: "hero-frame w-full",
							alt: "Rooftop at dusk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/35" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stagger-in max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-hero text-fg/80 uppercase",
										children: SITE.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-5 font-display text-5xl leading-none tracking-tight text-fg sm:text-7xl",
										children: SITE.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 font-display text-xl italic text-fg/80 sm:text-2xl",
										children: SITE.tagline
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex flex-wrap items-center justify-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "primary",
											onClick: () => setReelOpen(true),
											className: "min-w-44",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 translate-x-px" }), "Watch reel"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/projects",
											className: cn(buttonVariants({ variant: "ghost" }), "min-w-44"),
											children: ["Passion projects", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})]
									})
								]
							})
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-kicker text-primary uppercase",
					children: "Now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-fg",
					children: featured.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/projects",
					className: "hidden text-xs tracking-nav text-muted uppercase hover:text-fg sm:inline",
					children: "All projects"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
					id: featured.still,
					className: "aspect-still rounded-lg",
					alt: featured.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tracking-label text-muted uppercase",
							children: [
								featured.kind,
								" · ",
								featured.year
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-prose text-fg",
							children: featured.logline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: featured.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/about",
								className: buttonVariants({ variant: "ghost" }),
								children: ["About Sora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				})]
			})]
		}),
		reelOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelPlayer, {
			reel: showreel,
			onClose: () => setReelOpen(false)
		}) : null
	] });
}
//#endregion
export { HomePage as component };
