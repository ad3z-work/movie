import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as defaultFilters, t as BrowseCatalog } from "./BrowseCatalog-CgEo9afq.mjs";
import { t as Route } from "./series-B8_1SMCy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-dYWvcj-n.js
var import_jsx_runtime = require_jsx_runtime();
function SeriesPage() {
	var _search$year, _search$sort;
	const search = Route.useSearch();
	const navigate = useNavigate();
	const filters = {
		genre: search.genre,
		year: (_search$year = search.year) !== null && _search$year !== void 0 ? _search$year : "any",
		rating: search.rating,
		provider: search.provider,
		sort: (_search$sort = search.sort) !== null && _search$sort !== void 0 ? _search$sort : "popularity.desc"
	};
	const onFiltersChange = (next) => {
		navigate({
			to: "/series",
			search: {
				genre: next.genre,
				year: next.year === "any" ? void 0 : next.year,
				rating: next.rating,
				provider: next.provider,
				sort: next.sort === "popularity.desc" ? void 0 : next.sort
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseCatalog, {
		type: "tv",
		title: "Series",
		subtitle: "Stories worth staying in for.",
		filters: filters !== null && filters !== void 0 ? filters : defaultFilters,
		onFiltersChange
	});
}
//#endregion
export { SeriesPage as component };
