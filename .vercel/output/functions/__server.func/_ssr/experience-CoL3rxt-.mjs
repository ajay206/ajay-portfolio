import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as EXPERIENCE } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experience-CoL3rxt-.js
var import_jsx_runtime = require_jsx_runtime();
function ExperiencePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Experience",
			title: "Where the work was made",
			lede: "Sets, documents, and rooms with bad coffee. A short history of pictures that had to earn their silence."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-12 divide-y divide-border border-y border-border",
			children: EXPERIENCE.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-4 py-8 md:grid-cols-4 md:gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-nav text-muted uppercase md:col-span-1",
					children: job.years
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: job.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-primary",
							children: job.place
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-prose text-muted",
							children: job.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: job.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full px-3 py-1 text-xs tracking-wide text-muted shadow-[var(--shadow-border)]",
								children: tag
							}, tag))
						})
					]
				})]
			}, job.years))
		})]
	});
}
//#endregion
export { ExperiencePage as component };
