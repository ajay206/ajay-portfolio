import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Menu, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-p48W-Dqv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SITE = {
	name: "Sora Vale",
	given: "Sora",
	family: "Vale",
	tagline: "Stories in motion",
	role: "Director · Writer · Character Designer",
	location: "Tokyo / Los Angeles",
	email: "hello@soravale.studio",
	status: "Writing season two of After Rain"
};
var NAV = [
	{
		to: "/experience",
		label: "Experience"
	},
	{
		to: "/projects",
		label: "Passion Projects"
	},
	{
		to: "/stories",
		label: "Stories"
	},
	{
		to: "/skills",
		label: "Skills"
	},
	{
		to: "/characters",
		label: "Characters"
	},
	{
		to: "/videos",
		label: "Videos"
	},
	{
		to: "/images",
		label: "Images"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
var EXPERIENCE = [
	{
		years: "2024 — Now",
		title: "Director",
		place: "Night Frame Studio",
		summary: "Leading After Rain, an original limited series about a city that forgets its weather. Built the color bible, boarded the first four episodes, and directed the pilot.",
		tags: ["Series", "Original"]
	},
	{
		years: "2022 — 2024",
		title: "Storyboard Artist",
		place: "Lumen Pictures",
		summary: "Boards and animatics for two streaming features. Specialized in silent sequences, rain, and night interiors — the shots that have to carry a scene without dialogue.",
		tags: ["Feature", "Boards"]
	},
	{
		years: "2020 — 2022",
		title: "Character Designer",
		place: "Freelance",
		summary: "Key art and turnarounds for independent games and a visual novel. Designed casts that read in a single still — silhouette first, then the eyes.",
		tags: ["Games", "Key art"]
	},
	{
		years: "2019",
		title: "Writer / Director",
		place: "Paper Lanterns",
		summary: "A 14-minute short that played twelve festivals. Two actors, one alley, and a lantern that would not stay lit. Shot on a borrowed camera and a lot of patience.",
		tags: ["Short film"]
	}
];
var PROJECTS = [
	{
		id: "after-rain",
		title: "After Rain",
		kind: "Original series",
		year: "2024",
		still: "rain-crossing",
		logline: "In a coastal city where the weather has a memory, a meteorologist starts receiving forecasts for days that have not happened yet.",
		note: "Pilot locked. Season two in outline."
	},
	{
		id: "last-station",
		title: "The Last Station",
		kind: "Visual novel",
		year: "2023",
		still: "station-clock",
		logline: "A night train that only stops for people who have somewhere they cannot go back to. Six passengers. One conductor. No morning.",
		note: "Playable prologue released as a passion build."
	},
	{
		id: "paper-lanterns",
		title: "Paper Lanterns",
		kind: "Short film",
		year: "2019",
		still: "lantern-alley",
		logline: "Two strangers keep a festival lantern alive until dawn. If it goes out, one of them disappears. Neither is sure which.",
		note: "Festival circuit, 2019–2020."
	},
	{
		id: "west-window",
		title: "A Window Facing West",
		kind: "Color script / short",
		year: "2021",
		still: "high-window",
		logline: "A color script for a film that was never greenlit — a woman watches the same sunset from a high window for 28 days, and the sky refuses to repeat.",
		note: "Published as a printed color bible."
	}
];
var STORIES = [
	{
		id: "train",
		title: "The Train That Forgot Its Destination",
		year: "2023",
		still: "train-window",
		excerpt: "The conductor punched my ticket and handed it back with the destination blank. “It will fill itself in,” he said, as if that were a kindness. Outside, the stations had no names, only weather. I watched a town made of rain slide past the glass and tried to remember whether I had packed for leaving or for arriving."
	},
	{
		id: "window",
		title: "A Window Facing West",
		year: "2021",
		still: "high-window",
		excerpt: "On the ninth evening the sun set in the same place and a different color. I had been taking notes like a scientist, then like a painter, then like someone writing a letter they would never send. The apartment was too quiet for a city. I started talking to the window as if it could choose."
	},
	{
		id: "summer",
		title: "Letters from a Summer That Didn’t End",
		year: "2020",
		still: "empty-classroom",
		excerpt: "The classroom kept the heat after everyone left. Chalk dust hung in the last band of light like it had nowhere else to be. I found a letter in the desk that was addressed to me, dated August, in a year I had not lived yet. The handwriting was mine. The apology was not."
	},
	{
		id: "ocean",
		title: "The Night the Tide Learned Our Names",
		year: "2022",
		still: "night-ocean",
		excerpt: "We stood on the concrete where the city ends and the water begins, and the tide came in speaking. Not words, exactly — the way a film score suggests a sentence. Hana said if we waited until the lights on the opposite shore went out, we would hear the rest. We waited. The lights stayed on. We heard it anyway."
	}
];
var SKILL_GROUPS = [
	{
		heading: "Picture",
		items: [
			{
				name: "Direction",
				detail: "Blocking, coverage, and the cut you feel before you see it."
			},
			{
				name: "Storyboards",
				detail: "Boards that read as sentences. Animatics that already have weather."
			},
			{
				name: "Color scripts",
				detail: "Palettes as plot. Night that is never just blue."
			}
		]
	},
	{
		heading: "People",
		items: [
			{
				name: "Character design",
				detail: "Silhouette, then the eyes. Casts that hold a still."
			},
			{
				name: "Performance notes",
				detail: "What an actor does with their hands when they are lying."
			},
			{
				name: "World bibles",
				detail: "Rules a city obeys when no one is looking."
			}
		]
	},
	{
		heading: "Language",
		items: [
			{
				name: "Screenwriting",
				detail: "Dialogue that can lose to a look and still win the scene."
			},
			{
				name: "Prose",
				detail: "Short fiction as pre-visualization — image first."
			},
			{
				name: "Editing & sound",
				detail: "Rhythm, room tone, the second of silence before rain."
			}
		]
	}
];
var CHARACTERS = [
	{
		id: "hana",
		name: "Hana Shirogane",
		role: "Meteorologist",
		work: "After Rain",
		portrait: "hana",
		blurb: "Reads the sky like a letter she is afraid to finish. Keeps a notebook of sunsets that should not have happened. Soft voice, stubborn posture."
	},
	{
		id: "ren",
		name: "Ren Okada",
		role: "Night-shift courier",
		work: "The Last Station",
		portrait: "ren",
		blurb: "Delivers packages to addresses that only exist after midnight. Wears a scarf he will not explain. Always one stop too early."
	},
	{
		id: "yuri",
		name: "Yuri Amane",
		role: "Archivist",
		work: "A Window Facing West",
		portrait: "yuri",
		blurb: "Catalogues colors the way other people catalogue dates. Wears glasses that catch every practical. Knows which books are lying."
	},
	{
		id: "nox",
		name: "Nox",
		role: "The forecast",
		work: "After Rain",
		portrait: "nox",
		blurb: "Not a person, exactly — a weather that learned a face. Speaks in pressure systems. Wants Hana to stop writing things down."
	},
	{
		id: "mira",
		name: "Little Mira",
		role: "Lantern keeper",
		work: "Paper Lanterns",
		portrait: "mira",
		blurb: "Too young to be left with a festival, too serious to hand the light back. Believes lanterns have opinions. She is usually right."
	},
	{
		id: "conductor",
		name: "The Conductor",
		role: "Night train",
		work: "The Last Station",
		portrait: "conductor",
		blurb: "Punches tickets that fill themselves in. Never removes the cap. Has not seen a morning in a very long time, and does not miss it."
	}
];
var VIDEOS = [
	{
		id: "showreel",
		title: "Showreel 2024",
		runtime: "0:48",
		still: "rooftop-dusk",
		frames: [
			"rooftop-dusk",
			"rain-crossing",
			"train-window",
			"lantern-alley"
		],
		caption: "Selected picture — boards, color, and locked shots from After Rain, The Last Station, and Paper Lanterns."
	},
	{
		id: "after-rain-pilot",
		title: "After Rain — Pilot animatic",
		runtime: "0:36",
		still: "rain-crossing",
		frames: [
			"high-window",
			"rain-crossing",
			"night-ocean",
			"empty-classroom"
		],
		caption: "Opening sequence. Hana’s first wrong forecast. The city pretends it is only rain."
	},
	{
		id: "last-station-teaser",
		title: "The Last Station — Teaser",
		runtime: "0:28",
		still: "station-clock",
		frames: [
			"station-clock",
			"train-window",
			"night-ocean"
		],
		caption: "A train that only stops for people who cannot go back. Tickets punch themselves."
	},
	{
		id: "lanterns-cut",
		title: "Paper Lanterns — Festival cut",
		runtime: "0:32",
		still: "lantern-alley",
		frames: [
			"lantern-alley",
			"rooftop-dusk",
			"empty-classroom"
		],
		caption: "Two strangers, one alley, a light that must last until morning."
	}
];
var IMAGES = [
	{
		id: "train-window",
		still: "train-window",
		title: "Night train, unnamed station",
		year: "2023",
		from: "The Last Station"
	},
	{
		id: "rooftop-dusk",
		still: "rooftop-dusk",
		title: "Rooftop, last of the sun",
		year: "2024",
		from: "After Rain"
	},
	{
		id: "lantern-alley",
		still: "lantern-alley",
		title: "Alley with a borrowed lantern",
		year: "2019",
		from: "Paper Lanterns"
	},
	{
		id: "empty-classroom",
		still: "empty-classroom",
		title: "Classroom after the bell",
		year: "2020",
		from: "Letters from a Summer"
	},
	{
		id: "high-window",
		still: "high-window",
		title: "Apartment 12F, facing west",
		year: "2021",
		from: "A Window Facing West"
	},
	{
		id: "night-ocean",
		still: "night-ocean",
		title: "Where the city ends",
		year: "2022",
		from: "The Night the Tide"
	},
	{
		id: "station-clock",
		still: "station-clock",
		title: "Clock that will not strike morning",
		year: "2023",
		from: "The Last Station"
	},
	{
		id: "rain-crossing",
		still: "rain-crossing",
		title: "Crossing, unscheduled rain",
		year: "2024",
		from: "After Rain"
	}
];
var ABOUT = {
	lead: "Sora Vale is a director and writer working between Tokyo and Los Angeles. She treats weather as a character and silence as a line of dialogue.",
	body: [
		"Her pictures live in the hour after rain, in classrooms that keep the heat, on trains that refuse to name their stops. She builds original worlds the way a novelist builds a sentence — one precise image at a time.",
		"She came up boarding other people’s films, then stopped waiting for permission to make her own. Paper Lanterns (2019) was the first: fourteen minutes, two actors, a lantern, a lot of night. After Rain is the one she is living in now.",
		"When she is not on a set or in a document, she is drawing characters until they look back."
	],
	facts: [
		{
			label: "Based",
			value: "Tokyo / Los Angeles"
		},
		{
			label: "Working on",
			value: "After Rain, season two"
		},
		{
			label: "Representation",
			value: "Direct — hello@soravale.studio"
		}
	]
};
function FilmGrain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "film-grain",
		"aria-hidden": true
	});
}
function NavLinks({ onNavigate, className }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className,
		"aria-label": "Sections",
		children: NAV.map((item) => {
			const active = pathname === item.to;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				"aria-current": active ? "page" : void 0,
				className: cn("relative flex min-h-11 shrink-0 items-center whitespace-nowrap px-2.5 text-xs tracking-nav uppercase transition-colors duration-150 ease-out", active ? "text-fg" : "text-muted hover:text-fg"),
				children: [item.label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 bottom-1.5 h-px bg-primary" }) : null]
			}, item.to);
		})
	});
}
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmGrain, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex h-14 shrink-0 items-center gap-3 py-2",
							"aria-label": `${SITE.name} home`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-6 w-0.5 bg-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg tracking-label text-fg sm:text-xl",
								children: SITE.name.toUpperCase()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center text-fg lg:hidden",
							"aria-expanded": open,
							"aria-controls": "mobile-nav",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden border-t border-border lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { className: "nav-scroll mx-auto flex max-w-6xl flex-nowrap items-center justify-center overflow-x-auto px-2" })
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "mobile-nav",
						className: "border-t border-border bg-bg px-2 py-2 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
							className: "flex flex-col",
							onNavigate: () => setOpen(false)
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: "relative z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page-enter",
					children
				}, pathname)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						SITE.name,
						" · ",
						SITE.tagline
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tokyo / Los Angeles" })]
				})
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", {
	variants: {
		variant: {
			primary: "bg-fg text-bg hover:opacity-90 shadow-[var(--shadow-border)]",
			ghost: "bg-transparent text-fg hover:bg-elevated shadow-[var(--shadow-border)]",
			leader: "bg-primary text-primary-fg hover:opacity-90",
			link: "bg-transparent text-muted hover:text-fg px-0 h-auto"
		},
		size: {
			md: "h-11 px-5 text-sm rounded-md",
			sm: "h-9 px-3.5 text-xs rounded-sm",
			lg: "h-12 px-6 text-sm rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(function Button({ className, variant, size, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-24 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-kicker text-primary uppercase",
				children: "Missing frame"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-fg",
				children: "This shot was never taken."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-prose text-muted",
				children: "The page is not in the cut. Return to the title card, or pick a section from the bar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: cn(buttonVariants({ variant: "primary" }), "mt-8"),
				children: "Back to title"
			})
		]
	});
}
var styles_default = "/assets/styles-CaHP7OtZ.css";
var APP_NAME = "Sora Vale";
var Route$10 = createRootRoute({
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Sora Vale — director, writer, and character designer. Stories in motion."
			},
			{
				name: "theme-color",
				content: "#0a0a0c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Sora:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-CBcaO-2G.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./about-DcPGTXCB.mjs");
var Route$8 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./characters-DPhlNmUa.mjs");
var Route$7 = createFileRoute("/characters")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./contact-YKNP6cLX.mjs");
var Route$6 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./experience-CoL3rxt-.mjs");
var Route$5 = createFileRoute("/experience")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./images-BwhzB2qL.mjs");
var Route$4 = createFileRoute("/images")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./projects-BrTnkLuP.mjs");
var Route$3 = createFileRoute("/projects")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./skills--ewMGoE1.mjs");
var Route$2 = createFileRoute("/skills")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stories-eGWLQEdM.mjs");
var Route$1 = createFileRoute("/stories")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./videos-BmU01ans.mjs");
var Route = createFileRoute("/videos")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AboutRoute: Route$8.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$10
	}),
	CharactersRoute: Route$7.update({
		id: "/characters",
		path: "/characters",
		getParentRoute: () => Route$10
	}),
	ContactRoute: Route$6.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$10
	}),
	ExperienceRoute: Route$5.update({
		id: "/experience",
		path: "/experience",
		getParentRoute: () => Route$10
	}),
	ImagesRoute: Route$4.update({
		id: "/images",
		path: "/images",
		getParentRoute: () => Route$10
	}),
	ProjectsRoute: Route$3.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => Route$10
	}),
	SkillsRoute: Route$2.update({
		id: "/skills",
		path: "/skills",
		getParentRoute: () => Route$10
	}),
	StoriesRoute: Route$1.update({
		id: "/stories",
		path: "/stories",
		getParentRoute: () => Route$10
	}),
	VideosRoute: Route.update({
		id: "/videos",
		path: "/videos",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { CHARACTERS as a, PROJECTS as c, STORIES as d, VIDEOS as f, ABOUT as i, SITE as l, Button as n, EXPERIENCE as o, cn as p, buttonVariants as r, IMAGES as s, router_exports as t, SKILL_GROUPS as u };
