import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as ABOUT, l as SITE, r as buttonVariants } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DcPGTXCB.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-2 lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					kicker: "About",
					title: SITE.name,
					lede: ABOUT.lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 max-w-prose space-y-4 text-muted",
					children: ABOUT.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-10 grid gap-4 sm:grid-cols-3",
					children: ABOUT.facts.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-label text-subtle uppercase",
							children: fact.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm text-fg",
							children: fact.value
						})]
					}, fact.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: buttonVariants({ variant: "primary" }),
						children: ["Get in touch", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
				id: "high-window",
				className: "aspect-about rounded-xl",
				alt: "Apartment window facing west"
			})]
		})
	});
}
//#endregion
export { AboutPage as component };
