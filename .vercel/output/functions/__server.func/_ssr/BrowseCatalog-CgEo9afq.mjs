import { r as __toESM } from "../_runtime.mjs";
import { a as objectType, n as coerce, o as stringType } from "../_libs/zod.mjs";
import { i as getGenres, n as discover, o as getProviders } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as RotateCcw, y as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
import { t as Button } from "./button-CrMKWcwz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BrowseCatalog-CgEo9afq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultFilters = {
	year: "any",
	sort: "popularity.desc"
};
var filterSearchSchema = objectType({
	genre: coerce.number().int().positive().optional(),
	year: stringType().optional(),
	rating: coerce.number().min(0).max(10).optional(),
	provider: coerce.number().int().positive().optional(),
	sort: stringType().max(40).optional()
});
var yearRanges = [
	{
		value: "any",
		label: "Any year"
	},
	{
		value: "2020s",
		label: "2020s",
		from: 2020,
		to: 2029
	},
	{
		value: "2010s",
		label: "2010s",
		from: 2010,
		to: 2019
	},
	{
		value: "2000s",
		label: "2000s",
		from: 2e3,
		to: 2009
	},
	{
		value: "1990s",
		label: "1990s",
		from: 1990,
		to: 1999
	},
	{
		value: "1980s",
		label: "1980s",
		from: 1980,
		to: 1989
	},
	{
		value: "classic",
		label: "1979 & earlier",
		from: 1900,
		to: 1979
	}
];
var ratings = [
	{
		value: void 0,
		label: "Any rating"
	},
	{
		value: 8,
		label: "8+ exceptional"
	},
	{
		value: 7,
		label: "7+ great"
	},
	{
		value: 6,
		label: "6+ good"
	},
	{
		value: 5,
		label: "5+ watchable"
	}
];
var sorts = [
	{
		value: "popularity.desc",
		label: "Most popular"
	},
	{
		value: "vote_average.desc",
		label: "Highest rated"
	},
	{
		value: "primary_release_date.desc",
		label: "Newest first"
	},
	{
		value: "revenue.desc",
		label: "Biggest hits"
	}
];
function FilterSelect({ label, value, active, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative inline-flex shrink-0 items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value,
				"aria-label": label,
				onChange: (e) => onChange(e.target.value),
				style: { colorScheme: "dark" },
				className: `w-auto min-w-[7rem] shrink-0 appearance-none whitespace-nowrap border-b border-border bg-background py-2 pl-1 pr-7 text-sm font-medium outline-none transition-colors focus:border-primary [&>option]:bg-background [&>option]:text-foreground ${active ? "border-primary text-primary" : "text-foreground"}`,
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-1 h-3.5 w-3.5 text-muted-foreground" })
		]
	});
}
function BrowseCatalog({ type, title, subtitle, filters, onFiltersChange }) {
	var _genresQuery$data, _providersQuery$data;
	const [page, setPage] = (0, import_react.useState)(1);
	const [items, setItems] = (0, import_react.useState)([]);
	const sentinelRef = (0, import_react.useRef)(null);
	const setFilter = (0, import_react.useCallback)((patch) => onFiltersChange({
		...filters,
		...patch
	}), [filters, onFiltersChange]);
	const yearRange = (0, import_react.useMemo)(() => yearRanges.find((y) => y.value === filters.year), [filters.year]);
	const hasActiveFilters = filters.genre !== void 0 || filters.year !== "any" || filters.rating !== void 0 || filters.provider !== void 0 || filters.sort !== "popularity.desc";
	const genresQuery = useQuery({
		queryKey: ["genres", type],
		queryFn: () => getGenres({ data: { type } }),
		staleTime: Infinity
	});
	const providersQuery = useQuery({
		queryKey: ["providers"],
		queryFn: () => getProviders(),
		staleTime: 36e5
	});
	const listQuery = useQuery({
		queryKey: [
			"discover",
			type,
			filters.genre,
			filters.sort,
			filters.year,
			filters.rating,
			filters.provider,
			page
		],
		queryFn: () => discover({ data: {
			type,
			genre: filters.genre,
			sort: filters.sort,
			yearFrom: yearRange === null || yearRange === void 0 ? void 0 : yearRange.from,
			yearTo: yearRange === null || yearRange === void 0 ? void 0 : yearRange.to,
			minRating: filters.rating,
			provider: filters.provider,
			page
		} }),
		staleTime: 3e5
	});
	(0, import_react.useEffect)(() => {
		setPage(1);
		setItems([]);
	}, [
		type,
		filters.genre,
		filters.sort,
		filters.year,
		filters.rating,
		filters.provider
	]);
	(0, import_react.useEffect)(() => {
		if (!listQuery.data) return;
		setItems((prev) => {
			const merged = listQuery.data.page === 1 ? listQuery.data.results : [...prev, ...listQuery.data.results];
			const seen = /* @__PURE__ */ new Set();
			return merged.filter((m) => seen.has(m.id) ? false : seen.add(m.id));
		});
	}, [listQuery.data]);
	const canLoadMore = listQuery.data ? listQuery.data.page < listQuery.data.total_pages : false;
	const totalLabel = listQuery.data ? listQuery.data.total_pages >= 500 ? "10,000+" : listQuery.data.total_pages * 20 > listQuery.data.results.length ? `${(listQuery.data.total_pages - 1) * 20 + listQuery.data.results.length}+` : `${(listQuery.data.total_pages - 1) * 20 + listQuery.data.results.length}` : "";
	(0, import_react.useEffect)(() => {
		const el = sentinelRef.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			var _entries$;
			if (((_entries$ = entries[0]) === null || _entries$ === void 0 ? void 0 : _entries$.isIntersecting) && canLoadMore && !listQuery.isFetching) setPage((p) => p + 1);
		}, { rootMargin: "800px 0px" });
		io.observe(el);
		return () => io.disconnect();
	}, [canLoadMore, listQuery.isFetching]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl px-4 pb-20 pt-28 md:px-10 md:pt-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.65rem] font-semibold uppercase text-primary",
				children: "Browse the collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl md:text-5xl",
					children: title
				}), totalLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pb-1 text-xs text-muted-foreground",
					children: [totalLabel, " titles"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-2 border-y border-border py-5",
				role: "group",
				"aria-label": "Filters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						label: "Genre",
						value: filters.genre !== void 0 ? String(filters.genre) : "any",
						active: filters.genre !== void 0,
						onChange: (v) => setFilter({ genre: v === "any" ? void 0 : Number(v) }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "any",
							children: "All genres"
						}), ((_genresQuery$data = genresQuery.data) !== null && _genresQuery$data !== void 0 ? _genresQuery$data : []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g.id,
							children: g.name
						}, g.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						label: "Release period",
						value: filters.year,
						active: filters.year !== "any",
						onChange: (v) => setFilter({ year: v }),
						children: yearRanges.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: y.value,
							children: y.label
						}, y.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterSelect, {
						label: "Streaming service",
						value: filters.provider !== void 0 ? String(filters.provider) : "any",
						active: filters.provider !== void 0,
						onChange: (v) => setFilter({ provider: v === "any" ? void 0 : Number(v) }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "any",
							children: "All services"
						}), ((_providersQuery$data = providersQuery.data) !== null && _providersQuery$data !== void 0 ? _providersQuery$data : []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.provider_id,
							children: p.provider_name
						}, p.provider_id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						label: "Minimum rating",
						value: filters.rating !== void 0 ? String(filters.rating) : "any",
						active: filters.rating !== void 0,
						onChange: (v) => setFilter({ rating: v === "any" ? void 0 : Number(v) }),
						children: ratings.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r.value !== void 0 ? String(r.value) : "any",
							children: r.label
						}, r.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						label: "Sort by",
						value: filters.sort,
						active: filters.sort !== "popularity.desc",
						onChange: (v) => setFilter({ sort: v }),
						children: sorts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.value,
							children: s.label
						}, s.value))
					}),
					hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						type: "button",
						onClick: () => onFiltersChange({ ...defaultFilters }),
						className: "text-primary hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), "Reset"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
				children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, { item }, item.id)), listQuery.isLoading && items.length === 0 && Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[2/3] rounded-md bg-surface",
					"aria-hidden": "true"
				}, i))]
			}),
			!listQuery.isLoading && !items.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-16 text-center text-sm text-muted-foreground",
				children: "No titles match these filters. Try widening the year or rating."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: sentinelRef,
				className: "h-px",
				"aria-hidden": "true"
			}),
			listQuery.isFetching && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary",
					role: "status",
					"aria-label": "Loading more titles"
				})
			})
		]
	});
}
//#endregion
export { defaultFilters as n, filterSearchSchema as r, BrowseCatalog as t };
