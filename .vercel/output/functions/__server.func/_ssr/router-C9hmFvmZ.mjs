import { r as __toESM } from "../_runtime.mjs";
import { t as QueryClient } from "../_libs/@tanstack/query-core.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as searchMedia } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as QueryClientProvider, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, t as Img } from "./Img-pbA8sDz4.mjs";
import { g as Clapperboard, i as Search, l as Menu, p as Download, t as X, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CrMKWcwz.mjs";
import { t as Route$6 } from "./movies-CX1IXYDQ.mjs";
import { t as homeQuery } from "./routes-B1Mztn10.mjs";
import { t as Route$7 } from "./search-D-Ss-aMi.mjs";
import { t as Route$8 } from "./series-B8_1SMCy.mjs";
import { t as Route$9 } from "./title._type._id-BdXWm70F.mjs";
import { t as Route$10 } from "./watch._type._id-CazZAZkV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C9hmFvmZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-zPGiTw7N.css";
function reportLovableError(error, context = {}) {
	var _window$__lovableEven, _window$__lovableEven2, _window$__lovableRepo, _window;
	if (typeof window === "undefined") return;
	(_window$__lovableEven = window.__lovableEvents) === null || _window$__lovableEven === void 0 || (_window$__lovableEven2 = _window$__lovableEven.captureException) === null || _window$__lovableEven2 === void 0 || _window$__lovableEven2.call(_window$__lovableEven, error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	(_window$__lovableRepo = (_window = window).__lovableReportRuntimeError) === null || _window$__lovableRepo === void 0 || _window$__lovableRepo.call(_window, {
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
/**
* Internal, silent request/popup shield.
*
* Runs once on the client and neutralises the ad, popunder and redirect
* behaviour that third-party embed players try to trigger. It is intentionally
* invisible: nothing is rendered, nothing is logged, and blocked activity fails
* quietly so the surrounding app keeps working normally.
*/
var BLOCKED_HOST_PATTERNS = [
	"doubleclick",
	"googlesyndication",
	"googleadservices",
	"adservice.google",
	"adnxs",
	"adsystem",
	"adform",
	"adroll",
	"taboola",
	"outbrain",
	"criteo",
	"pubmatic",
	"rubiconproject",
	"openx",
	"smartadserver",
	"sharethrough",
	"media.net",
	"mgid",
	"revcontent",
	"zedo",
	"propellerads",
	"popads",
	"popcash",
	"popunder",
	"adsterra",
	"hilltopads",
	"exoclick",
	"juicyads",
	"trafficjunky",
	"clickadu",
	"adcash",
	"onclickads",
	"monetag",
	"clksite",
	"bidgear",
	"bidvertiser",
	"adskeeper",
	"adnium",
	"trafficstars",
	"tsyndicate",
	"ad-maven",
	"admaven",
	"vidoomy",
	"aniview",
	"spotxchange",
	"teads",
	"google-analytics",
	"googletagmanager",
	"googletagservices",
	"scorecardresearch",
	"quantserve",
	"hotjar",
	"yandex.ru/metrika",
	"mc.yandex",
	"histats",
	"statcounter",
	"clarity.ms",
	"amplitude",
	"mixpanel",
	"segment.io",
	"/ads/",
	"/adsbygoogle",
	"banner",
	"prebid",
	"pixel.gif",
	"track.php"
];
var isBlockedUrl = (raw) => {
	if (!raw) return false;
	const url = raw.toLowerCase();
	if (url.startsWith("data:") || url.startsWith("blob:")) return false;
	return BLOCKED_HOST_PATTERNS.some((p) => url.includes(p));
};
var installed$1 = false;
function installShield() {
	if (installed$1 || typeof window === "undefined") return;
	installed$1 = true;
	const noop = () => null;
	try {
		Object.defineProperty(window, "open", {
			configurable: true,
			writable: true,
			value: noop
		});
	} catch {}
	const guardAnchor = (event) => {
		var _target$closest, _anchor$getAttribute;
		const target = event.target;
		const anchor = target === null || target === void 0 || (_target$closest = target.closest) === null || _target$closest === void 0 ? void 0 : _target$closest.call(target, "a[href]");
		if (!anchor) return;
		const browsingTarget = (_anchor$getAttribute = anchor.getAttribute("target")) === null || _anchor$getAttribute === void 0 ? void 0 : _anchor$getAttribute.trim().toLowerCase();
		if (isBlockedUrl(anchor.href) || browsingTarget && browsingTarget !== "_self") {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	};
	window.addEventListener("click", guardAnchor, true);
	window.addEventListener("auxclick", guardAnchor, true);
	const originalFetch = window.fetch.bind(window);
	window.fetch = (input, init) => {
		if (isBlockedUrl(typeof input === "string" ? input : input instanceof URL ? input.href : input.url)) return Promise.resolve(new Response("", {
			status: 204,
			statusText: "No Content"
		}));
		return originalFetch(input, init);
	};
	const OriginalXHR = window.XMLHttpRequest;
	const originalOpen = OriginalXHR.prototype.open;
	OriginalXHR.prototype.open = function(method, url, ...rest) {
		this.__blocked = isBlockedUrl(String(url));
		return originalOpen.apply(this, [
			method,
			this.__blocked ? "data:text/plain," : url,
			...rest
		]);
	};
	if (typeof navigator.sendBeacon === "function") {
		const originalBeacon = navigator.sendBeacon.bind(navigator);
		navigator.sendBeacon = (url, data) => isBlockedUrl(String(url)) ? true : originalBeacon(url, data);
	}
	const cleanNode = (node) => {
		if (!(node instanceof HTMLElement)) return;
		const src = node.src || node.src || node.src || "";
		if (src && isBlockedUrl(src)) {
			node.remove();
			return;
		}
		if (node.tagName === "DIV" || node.tagName === "A") {
			var _node$getAttribute;
			const s = ((_node$getAttribute = node.getAttribute("style")) !== null && _node$getAttribute !== void 0 ? _node$getAttribute : "").replace(/\s/g, "").toLowerCase();
			if ((s.includes("position:fixed") || s.includes("position:absolute")) && (s.includes("z-index:99") || s.includes("z-index:2147483647")) && (s.includes("width:100%") || s.includes("width:100vw")) && node.closest("[data-app-root]") === null) node.remove();
		}
	};
	new MutationObserver((mutations) => {
		for (const m of mutations) m.addedNodes.forEach(cleanNode);
	}).observe(document.documentElement, {
		childList: true,
		subtree: true
	});
}
var TV_UA = /smart-?tv|smarttv|tizen|web0s|webos|netcast|hbbtv|bravia|aft[a-z]|android tv|googletv|google tv|crkey|roku|viera|philipstv|vidaa|hisense|vidaa_|appletv|tv safari|large screen|xbox|playstation/i;
function isTvDevice() {
	if (typeof window === "undefined") return false;
	const q = new URLSearchParams(window.location.search).get("tv");
	if (q === "1") localStorage.setItem("lumiere-tv", "1");
	if (q === "0") localStorage.removeItem("lumiere-tv");
	if (localStorage.getItem("lumiere-tv") === "1") return true;
	return TV_UA.test(navigator.userAgent);
}
var FOCUSABLE = "a[href], button:not([disabled]), input:not([type=hidden]), select, textarea, iframe, [tabindex]:not([tabindex=\"-1\"])";
function visible(el) {
	const r = el.getBoundingClientRect();
	if (r.width === 0 || r.height === 0) return false;
	const s = getComputedStyle(el);
	return s.visibility !== "hidden" && s.display !== "none";
}
function move(dir) {
	const current = document.activeElement;
	const all = Array.from(document.querySelectorAll(FOCUSABLE)).filter((el) => el !== current && visible(el));
	if (!current || current === document.body) {
		var _all$find;
		(_all$find = all.find((el) => el.getBoundingClientRect().top >= 0)) === null || _all$find === void 0 || _all$find.focus();
		return;
	}
	const c = current.getBoundingClientRect();
	const cx = c.left + c.width / 2;
	const cy = c.top + c.height / 2;
	let best = null;
	let bestScore = Infinity;
	for (const el of all) {
		const r = el.getBoundingClientRect();
		const x = r.left + r.width / 2;
		const y = r.top + r.height / 2;
		const dx = x - cx;
		const dy = y - cy;
		let main, cross;
		if (dir === "right") {
			if (r.left < c.right - 4) continue;
			main = dx;
			cross = Math.abs(dy);
		} else if (dir === "left") {
			if (r.right > c.left + 4) continue;
			main = -dx;
			cross = Math.abs(dy);
		} else if (dir === "down") {
			if (r.top < c.bottom - 4) continue;
			main = dy;
			cross = Math.abs(dx);
		} else {
			if (r.bottom > c.top + 4) continue;
			main = -dy;
			cross = Math.abs(dx);
		}
		const score = main + cross * 2.5;
		if (score < bestScore) {
			bestScore = score;
			best = el;
		}
	}
	if (best) {
		best.focus({ preventScroll: true });
		try {
			best.scrollIntoView({
				block: "center",
				inline: "center",
				behavior: "smooth"
			});
		} catch {
			best.scrollIntoView();
		}
	} else if (dir === "up") window.scrollBy({
		top: -400,
		behavior: "smooth"
	});
	else if (dir === "down") window.scrollBy({
		top: 400,
		behavior: "smooth"
	});
}
var KEYMAP = {
	37: "left",
	38: "up",
	39: "right",
	40: "down"
};
var BACK_KEYS = /* @__PURE__ */ new Set([
	8,
	10009,
	461,
	27,
	166
]);
var installed = false;
function installTvMode() {
	if (installed || !isTvDevice()) return;
	installed = true;
	document.documentElement.classList.add("tv");
	window.addEventListener("keydown", (e) => {
		var _KEYMAP$e$keyCode;
		const target = e.target;
		const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
		const dir = (_KEYMAP$e$keyCode = KEYMAP[e.keyCode]) !== null && _KEYMAP$e$keyCode !== void 0 ? _KEYMAP$e$keyCode : e.key.startsWith("Arrow") ? e.key.slice(5).toLowerCase() : void 0;
		if (dir) {
			if (typing && (dir === "left" || dir === "right")) return;
			if (target.tagName === "SELECT" && (dir === "up" || dir === "down")) return;
			e.preventDefault();
			move(dir);
			return;
		}
		if (e.key === "Enter" && target.matches("[tabindex]:not(a):not(button)")) {
			e.preventDefault();
			target.click();
			return;
		}
		if (BACK_KEYS.has(e.keyCode) || e.key === "GoBack" || e.key === "BrowserBack") {
			if (typing && e.keyCode === 8) return;
			if (document.fullscreenElement) return;
			e.preventDefault();
			if (window.history.length > 1) window.history.back();
		}
	}, true);
	setTimeout(() => {
		if (document.activeElement === document.body) move("down");
	}, 800);
}
function InstallAppButton({ className = "" }) {
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onPrompt = (e) => {
			e.preventDefault();
			setDeferred(e);
		};
		const onInstalled = () => setDeferred(null);
		window.addEventListener("beforeinstallprompt", onPrompt);
		window.addEventListener("appinstalled", onInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", onPrompt);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	if (!deferred) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: async () => {
			await deferred.prompt();
			const { outcome } = await deferred.userChoice;
			if (outcome === "accepted") setDeferred(null);
		},
		className: `inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-primary underline-offset-4 transition-colors hover:underline ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), "Install app"]
	});
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/movies",
		label: "Movies"
	},
	{
		to: "/series",
		label: "Series"
	},
	{
		to: "/shuffle",
		label: "Shuffle"
	},
	{
		to: "/mixer",
		label: "Mixer"
	},
	{
		to: "/my-list",
		label: "My List"
	}
];
function SiteHeader() {
	var _data$results;
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [debounced, setDebounced] = (0, import_react.useState)("");
	const [showSuggest, setShowSuggest] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(-1);
	const boxRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebounced(q.trim()), 300);
		return () => clearTimeout(t);
	}, [q]);
	(0, import_react.useEffect)(() => {
		const onDoc = (e) => {
			if (boxRef.current && !boxRef.current.contains(e.target)) setShowSuggest(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	const { data, isFetching } = useQuery({
		queryKey: ["suggest", debounced],
		queryFn: () => searchMedia({ data: {
			q: debounced,
			page: 1
		} }),
		enabled: debounced.length > 1,
		staleTime: 6e4
	});
	const suggestions = ((_data$results = data === null || data === void 0 ? void 0 : data.results) !== null && _data$results !== void 0 ? _data$results : []).slice(0, 8);
	const go = (item) => {
		setShowSuggest(false);
		setQ("");
		navigate({
			to: "/title/$type/$id",
			params: {
				type: item.media_type,
				id: String(item.id)
			}
		});
	};
	const submit = (e) => {
		e.preventDefault();
		if (active >= 0 && suggestions[active]) {
			go(suggestions[active]);
			return;
		}
		if (!q.trim()) return;
		setShowSuggest(false);
		navigate({
			to: "/search",
			search: { q: q.trim() }
		});
	};
	const onKeyDown = (e) => {
		if (!showSuggest || suggestions.length === 0) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((a) => (a + 1) % suggestions.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((a) => a <= 0 ? suggestions.length - 1 : a - 1);
		} else if (e.key === "Escape") setShowSuggest(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 md:px-8 md:pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: `pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent transition-opacity duration-300 md:h-40 ${scrolled ? "opacity-100" : "opacity-80"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-3 md:h-16 md:gap-5 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex shrink-0 items-center gap-2",
						"aria-label": "Lumiere home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl md:text-3xl",
							children: "Lumiere"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "ml-2 hidden items-center gap-5 lg:flex",
						"aria-label": "Main navigation",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							activeOptions: { exact: l.to === "/" },
							activeProps: { className: "text-foreground border-b border-primary" },
							inactiveProps: { className: "text-muted-foreground" },
							className: "py-2 text-xs font-semibold transition-colors hover:text-foreground",
							children: l.label
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: boxRef,
						className: "relative ml-auto w-full max-w-[12rem] sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: submit,
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full items-center gap-2 border-b border-border bg-transparent px-1 py-2 transition-colors focus-within:border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: q,
										onChange: (e) => {
											setQ(e.target.value);
											setActive(-1);
											setShowSuggest(true);
										},
										onFocus: () => setShowSuggest(true),
										onKeyDown,
										placeholder: "Search films & series",
										"aria-label": "Search",
										autoComplete: "off",
										className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
									}),
									isFetching && debounced.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 shrink-0 animate-spin text-primary" })
								]
							})
						}), showSuggest && debounced.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background fixed inset-x-2 top-[4.5rem] z-50 overflow-hidden py-2 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[22rem] sm:max-w-[calc(100vw-2rem)]",
							children: [
								suggestions.length === 0 && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-4 py-5 text-center text-sm text-muted-foreground",
									children: "No matches found."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "max-h-[60vh] overflow-y-auto",
									children: suggestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										type: "button",
										onMouseEnter: () => setActive(i),
										onClick: () => go(item),
										className: `flex h-auto w-full justify-start items-center gap-3 px-3 py-2 text-left transition-colors ${active === i ? "text-primary" : "hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-14 w-10 shrink-0 overflow-hidden rounded-md bg-surface-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
												src: img(item.poster_path, "w185"),
												alt: "",
												className: "h-full w-full object-cover",
												loading: "lazy"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-sm font-medium",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-xs text-muted-foreground",
												children: [
													year(item.release_date),
													" · ",
													item.media_type === "tv" ? "Series" : "Movie",
													item.vote_average ? ` · ★ ${item.vote_average.toFixed(1)}` : ""
												]
											})]
										})]
									}) }, `${item.media_type}-${item.id}`))
								}),
								q.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									type: "button",
									onClick: () => {
										setShowSuggest(false);
										navigate({
											to: "/search",
											search: { q: q.trim() }
										});
									},
									className: "block h-auto w-full truncate border-t border-border px-4 py-2.5 text-left text-xs font-medium text-primary hover:text-foreground",
									children: [
										"See all results for “",
										q.trim(),
										"”"
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallAppButton, { className: "shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "shrink-0 lg:hidden",
						"aria-label": "Toggle menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Mobile navigation",
				className: "bg-background mt-2 flex flex-col px-4 py-2 lg:hidden",
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					activeOptions: { exact: l.to === "/" },
					activeProps: { className: "text-primary" },
					className: "py-2.5 text-sm font-medium text-muted-foreground",
					children: l.label
				}, l.to))
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 border-t border-border px-5 py-14 md:px-12 lg:px-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl",
						children: "Lumiere"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "A considered home for remarkable film and television, curated around what you want to watch next."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 text-sm sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Browse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/movies",
								className: "text-muted-foreground hover:text-foreground",
								children: "Movies"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/series",
								className: "text-muted-foreground hover:text-foreground",
								children: "Series"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/my-list",
								className: "text-muted-foreground hover:text-foreground",
								children: "My List"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Discover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/search",
								search: { q: "action" },
								className: "text-muted-foreground hover:text-foreground",
								children: "Action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/search",
								search: { q: "comedy" },
								className: "text-muted-foreground hover:text-foreground",
								children: "Comedy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/search",
								search: { q: "documentary" },
								className: "text-muted-foreground hover:text-foreground",
								children: "Documentary"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Data by TMDB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Trailers via YouTube"
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mx-auto mt-10 max-w-6xl text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Lumiere. This product uses the TMDB API but is not endorsed or certified by TMDB."
			]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#090A0C"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Lumiere"
			},
			{ title: "Lumiere — Stream Movies & Series" },
			{
				name: "description",
				content: "Browse trending movies and series, watch trailers and clips, and build your watchlist with live data from TMDB."
			},
			{
				property: "og:title",
				content: "Lumiere — Stream Movies & Series"
			},
			{
				property: "og:description",
				content: "Trending films, top-rated series, trailers and a personal watchlist."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://image.tmdb.org",
				crossOrigin: "anonymous"
			},
			{
				rel: "dns-prefetch",
				href: "https://image.tmdb.org"
			},
			{
				rel: "preconnect",
				href: "https://media.themoviedb.org",
				crossOrigin: "anonymous"
			},
			{
				rel: "dns-prefetch",
				href: "https://images.weserv.nl"
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
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			suppressHydrationWarning: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-app-ready", "1");
		installShield();
		installTvMode();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-screen",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-MiB3-g5w.mjs");
var Route$4 = createFileRoute("/")({
	loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery),
	head: ({ loaderData }) => {
		var _img, _loaderData$trending$, _loaderData$trending$2, _img2, _loaderData$trending$3, _loaderData$trending$4;
		return { meta: [
			{ title: "Lumiere — Stream Movies & Series in HD" },
			{
				name: "description",
				content: "Watch trending movies and TV series on Lumiere. Browse thousands of titles, play trailers instantly and build your own watchlist."
			},
			{
				property: "og:title",
				content: "Lumiere — Stream Movies & Series in HD"
			},
			{
				property: "og:description",
				content: "Trending movies, top-rated series and instant trailers — all in one streaming home."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			...(loaderData === null || loaderData === void 0 ? void 0 : loaderData.trending.find((item) => item.backdrop_path)) ? [{
				property: "og:image",
				content: (_img = img((_loaderData$trending$ = (_loaderData$trending$2 = loaderData.trending.find((item) => item.backdrop_path)) === null || _loaderData$trending$2 === void 0 ? void 0 : _loaderData$trending$2.backdrop_path) !== null && _loaderData$trending$ !== void 0 ? _loaderData$trending$ : null, "w1280")) !== null && _img !== void 0 ? _img : ""
			}, {
				name: "twitter:image",
				content: (_img2 = img((_loaderData$trending$3 = (_loaderData$trending$4 = loaderData.trending.find((item) => item.backdrop_path)) === null || _loaderData$trending$4 === void 0 ? void 0 : _loaderData$trending$4.backdrop_path) !== null && _loaderData$trending$3 !== void 0 ? _loaderData$trending$3 : null, "w1280")) !== null && _img2 !== void 0 ? _img2 : ""
			}] : []
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./mixer-D1m-JspG.mjs");
var Route$3 = createFileRoute("/mixer")({
	head: () => ({ meta: [
		{ title: "Taste Mixer — Lumiere" },
		{
			name: "description",
			content: "Pick up to three titles you love and Lumiere blends them into a row of hidden gems you'll actually like."
		},
		{
			property: "og:title",
			content: "Taste Mixer — Lumiere"
		},
		{
			property: "og:description",
			content: "Blend your favourite titles into a curated row of hidden gems."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./my-list-cfYppnPW.mjs");
var Route$2 = createFileRoute("/my-list")({
	head: () => ({ meta: [
		{ title: "My List — Your Saved Titles | Lumiere" },
		{
			name: "description",
			content: "Everything you saved on Lumiere, ready to watch whenever you are."
		},
		{
			property: "og:title",
			content: "My List — Your Saved Titles | Lumiere"
		},
		{
			property: "og:description",
			content: "Your personal watchlist of movies and series on Lumiere."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./shuffle-BONFXqKY.mjs");
var Route$1 = createFileRoute("/shuffle")({
	head: () => ({ meta: [
		{ title: "Mood Shuffle — Lumiere" },
		{
			name: "description",
			content: "Can't decide what to watch? Pick a mood and let Lumiere surprise you with the perfect movie or series."
		},
		{
			property: "og:title",
			content: "Mood Shuffle — Lumiere"
		},
		{
			property: "og:description",
			content: "Pick a mood, get a surprise pick tailored to it."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tv-check-CM1ax2DH.mjs");
var Route = createFileRoute("/tv-check")({
	head: () => ({ meta: [
		{ title: "TV Check — Lumiere" },
		{
			name: "description",
			content: "Check whether your TV's browser can run Lumiere."
		},
		{
			property: "og:title",
			content: "TV Check — Lumiere"
		},
		{
			property: "og:description",
			content: "A quick compatibility check for smart TV browsers."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	MixerRoute: Route$3.update({
		id: "/mixer",
		path: "/mixer",
		getParentRoute: () => Route$5
	}),
	MoviesRoute: Route$6.update({
		id: "/movies",
		path: "/movies",
		getParentRoute: () => Route$5
	}),
	MyListRoute: Route$2.update({
		id: "/my-list",
		path: "/my-list",
		getParentRoute: () => Route$5
	}),
	SearchRoute: Route$7.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$5
	}),
	SeriesRoute: Route$8.update({
		id: "/series",
		path: "/series",
		getParentRoute: () => Route$5
	}),
	ShuffleRoute: Route$1.update({
		id: "/shuffle",
		path: "/shuffle",
		getParentRoute: () => Route$5
	}),
	TvCheckRoute: Route.update({
		id: "/tv-check",
		path: "/tv-check",
		getParentRoute: () => Route$5
	}),
	TitleTypeIdRoute: Route$9.update({
		id: "/title/$type/$id",
		path: "/title/$type/$id",
		getParentRoute: () => Route$5
	}),
	WatchTypeIdRoute: Route$10.update({
		id: "/watch/$type/$id",
		path: "/watch/$type/$id",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
