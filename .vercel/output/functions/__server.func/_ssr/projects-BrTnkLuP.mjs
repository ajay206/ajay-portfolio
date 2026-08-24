import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PROJECTS } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
import { t as CinematicStill } from "./stills-DdTuy3Re.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BrTnkLuP.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Passion Projects",
			title: "Original worlds, kept",
			lede: "The pictures no one commissioned. Series, a visual novel, a short, a color bible that outlived its film."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-12 grid gap-8 sm:grid-cols-2",
			children: PROJECTS.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "group",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicStill, {
						id: project.still,
						className: "aspect-still",
						alt: project.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs tracking-label text-muted uppercase",
								children: [
									project.kind,
									" · ",
									project.year
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-2xl text-fg",
								children: project.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: project.logline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-subtle",
								children: project.note
							})
						]
					})]
				})
			}, project.id))
		})]
	});
}
//#endregion
export { ProjectsPage as component };
