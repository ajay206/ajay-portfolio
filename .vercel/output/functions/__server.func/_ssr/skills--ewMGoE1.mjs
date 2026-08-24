import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as SKILL_GROUPS } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills--ewMGoE1.js
var import_jsx_runtime = require_jsx_runtime();
function SkillsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Skills",
			title: "Craft, not a list of tools",
			lede: "The work is picture, people, and language. Software changes. Weather does not."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-10 md:grid-cols-3",
			children: SKILL_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-b border-border pb-3 font-display text-2xl text-fg",
				children: group.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-6",
				children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium tracking-wide text-fg",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted",
					children: item.detail
				})] }, item.name))
			})] }, group.heading))
		})]
	});
}
//#endregion
export { SkillsPage as component };
