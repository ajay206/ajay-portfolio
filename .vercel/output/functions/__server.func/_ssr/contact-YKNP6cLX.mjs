import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as SITE, n as Button, p as cn } from "./router-p48W-Dqv.mjs";
import { t as PageHeader } from "./page-header-BEL992qn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-YKNP6cLX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "w-full rounded-md bg-elevated px-3.5 text-sm text-fg placeholder:text-subtle shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out focus:outline-none focus:shadow-[var(--shadow-border-hover)]";
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn(fieldClass, "h-11", className),
		...props
	});
});
var Textarea = (0, import_react.forwardRef)(function Textarea({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn(fieldClass, "min-h-36 py-3 resize-y", className),
		...props
	});
});
var empty = {
	name: "",
	email: "",
	subject: "",
	message: ""
};
function ContactPage() {
	const [fields, setFields] = (0, import_react.useState)(empty);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [sent, setSent] = (0, import_react.useState)(false);
	function validate(next) {
		const e = {};
		if (next.name.trim().length < 2) e.name = "Please enter your name.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) e.email = "A real email, please.";
		if (next.subject.trim().length < 3) e.subject = "Add a subject.";
		if (next.message.trim().length < 12) e.message = "A little more context helps.";
		return e;
	}
	function onSubmit(ev) {
		ev.preventDefault();
		const e = validate(fields);
		setErrors(e);
		if (Object.keys(e).length > 0) return;
		const payload = {
			...fields,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			const prev = JSON.parse(localStorage.getItem("sora-vale-mail") ?? "[]");
			localStorage.setItem("sora-vale-mail", JSON.stringify([payload, ...prev].slice(0, 20)));
		} catch {}
		const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(`${fields.message}\n\n— ${fields.name}\n${fields.email}`)}`;
		window.location.href = mailto;
		setSent(true);
	}
	function set(key, value) {
		setFields((f) => ({
			...f,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "Contact",
				title: "Write when the picture is ready",
				lede: "New work, collaborations, and quiet questions. Direct — no form that disappears into a void."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-10 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-label text-subtle uppercase",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${SITE.email}`,
							className: "text-fg underline-offset-4 hover:underline",
							children: SITE.email
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-label text-subtle uppercase",
						children: "Based"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: SITE.location
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs tracking-label text-subtle uppercase",
						children: "Currently"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: SITE.status
					})] })
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-7",
				children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Sent."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Your note is ready in your mail client. If nothing opened, write directly to ",
							SITE.email,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						variant: "ghost",
						onClick: () => {
							setSent(false);
							setFields(empty);
						},
						children: "Write another"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					noValidate: true,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							error: errors.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								autoComplete: "name",
								value: fields.name,
								onChange: (e) => set("name", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							error: errors.email,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "email",
								type: "email",
								autoComplete: "email",
								value: fields.email,
								onChange: (e) => set("email", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Subject",
							error: errors.subject,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "subject",
								value: fields.subject,
								onChange: (e) => set("subject", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Message",
							error: errors.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "message",
								value: fields.message,
								onChange: (e) => set("message", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "primary",
							className: "w-full sm:w-auto",
							children: "Send"
						})
					]
				})
			})]
		})
	});
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-xs tracking-nav text-muted uppercase",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1.5 block text-xs text-primary",
				children: error
			}) : null
		]
	});
}
//#endregion
export { ContactPage as component };
