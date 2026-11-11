import { r as __toESM } from "../_runtime.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as searchMedia } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as Search, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
import { t as Route } from "./search-D-Ss-aMi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B5w_Z3DI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	var _data$results;
	const { q } = Route.useSearch();
	const navigate = useNavigate();
	const [term, setTerm] = (0, import_react.useState)(q);
	(0, import_react.useEffect)(() => setTerm(q), [q]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => {
			if (term !== q) navigate({
				to: "/search",
				search: { q: term },
				replace: true
			});
		}, 350);
		return () => clearTimeout(t);
	}, [
		term,
		q,
		navigate
	]);
	const { data, isFetching } = useQuery({
		queryKey: ["search", q],
		queryFn: () => searchMedia({ data: {
			q,
			page: 1
		} }),
		enabled: q.trim().length > 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen px-4 pb-16 pt-28 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-6xl",
				children: "Search"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex max-w-xl items-center gap-3 border-b border-border px-1 py-3 focus-within:border-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: term,
						onChange: (e) => setTerm(e.target.value),
						placeholder: "Search for a movie or series…",
						"aria-label": "Search catalogue",
						className: "w-full bg-transparent outline-none placeholder:text-muted-foreground"
					}),
					isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" })
				]
			}),
			q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: data ? `${data.results.length} results for "${q}"` : "Searching…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
				children: ((_data$results = data === null || data === void 0 ? void 0 : data.results) !== null && _data$results !== void 0 ? _data$results : []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, { item }, `${item.media_type}-${item.id}`))
			}),
			q && data && data.results.length === 0 && !isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-16 text-center text-sm text-muted-foreground",
				children: "Nothing found. Try another title."
			})
		]
	});
}
//#endregion
export { SearchPage as component };
