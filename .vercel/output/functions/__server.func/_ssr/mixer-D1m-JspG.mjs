import { r as __toESM } from "../_runtime.mjs";
import { l as searchMedia, u as tasteMix } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, t as Img } from "./Img-pbA8sDz4.mjs";
import { i as Search, r as Sparkles, t as X, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mixer-D1m-JspG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MixerPage() {
	var _data$results;
	const [q, setQ] = (0, import_react.useState)("");
	const [debounced, setDebounced] = (0, import_react.useState)("");
	const [picks, setPicks] = (0, import_react.useState)([]);
	const [results, setResults] = (0, import_react.useState)(null);
	const [mixing, setMixing] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	const [showSuggest, setShowSuggest] = (0, import_react.useState)(false);
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
		queryKey: ["mixer-suggest", debounced],
		queryFn: () => searchMedia({ data: {
			q: debounced,
			page: 1
		} }),
		enabled: debounced.length > 1,
		staleTime: 6e4
	});
	const suggestions = ((_data$results = data === null || data === void 0 ? void 0 : data.results) !== null && _data$results !== void 0 ? _data$results : []).filter((r) => !picks.some((p) => p.id === r.id && p.media_type === r.media_type)).slice(0, 6);
	const addPick = (item) => {
		if (picks.length >= 3) return;
		setPicks((p) => [...p, item]);
		setQ("");
		setShowSuggest(false);
		setResults(null);
	};
	const mix = async () => {
		setMixing(true);
		try {
			const res = await tasteMix({ data: { picks: picks.map((p) => ({
				type: p.media_type,
				id: p.id
			})) } });
			setResults(res);
		} finally {
			setMixing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 pb-16 pt-28 md:px-12 md:pt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.3em] text-primary",
				children: "Lumiere originals"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl md:text-6xl",
				children: "Taste Mixer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted-foreground md:text-base",
				children: "Pick up to three titles you love. We blend their DNA into a row of hidden gems — smarter than \"more like this\"."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-3",
				children: [
					picks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 py-1.5 pr-1 text-xs font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-7 w-5 overflow-hidden rounded-sm bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
									src: img(p.poster_path, "w185"),
									alt: "",
									className: "h-full w-full object-cover"
								})
							}),
							p.title,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove ${p.title}`,
								onClick: () => {
									setPicks((prev) => prev.filter((x) => !(x.id === p.id && x.media_type === p.media_type)));
									setResults(null);
								},
								className: "text-muted-foreground transition-colors hover:text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}, `${p.media_type}-${p.id}`)),
					picks.length < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: boxRef,
						className: "relative w-full max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border bg-transparent px-1 py-2 focus-within:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => {
										setQ(e.target.value);
										setShowSuggest(true);
									},
									onFocus: () => setShowSuggest(true),
									placeholder: picks.length ? "Add another title…" : "Search a title you love…",
									"aria-label": "Add a title",
									autoComplete: "off",
									className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
								}),
								isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" })
							]
						}), showSuggest && debounced.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background absolute left-0 top-full z-50 mt-2 w-full overflow-hidden py-2",
							children: [suggestions.length === 0 && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-4 text-center text-sm text-muted-foreground",
								children: "No matches found."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => addPick(item),
								className: "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-surface",
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
											item.media_type === "tv" ? "Series" : "Movie"
										]
									})]
								})]
							}) }, `${item.media_type}-${item.id}`)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: mix,
						disabled: picks.length === 0 || mixing,
						className: "inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-primary underline-offset-8 transition-colors hover:underline disabled:opacity-50",
						children: [mixing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Mix my taste"]
					})
				]
			}),
			results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl md:text-3xl",
						children: "Your blend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground",
						children: results.length ? `${results.length} picks from your mix` : "No blend found — try different titles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
						children: results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, { item }, `${item.media_type}-${item.id}`))
					})
				]
			})
		]
	});
}
//#endregion
export { MixerPage as component };
