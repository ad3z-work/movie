import { l as createServerFn } from "./createServerFn-YI1B8o6p.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-C7lcn7pe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tmdb.functions-2dvBO8wm.js
var BASE = "https://api.themoviedb.org/3";
var CACHE_TTL_MS = 3e5;
var SEARCH_CACHE_TTL_MS = 6e4;
var MAX_CACHE_ENTRIES = 128;
var responseCache = /* @__PURE__ */ new Map();
var inFlightRequests = /* @__PURE__ */ new Map();
async function tmdb(path, params = {}) {
	const key = process.env["TMDB_API_KEY"];
	if (!key) throw new Error("TMDB_API_KEY is not configured");
	const url = new URL(BASE + path);
	url.searchParams.set("api_key", key);
	url.searchParams.set("language", "en-US");
	for (const [k, v] of Object.entries(params)) if (v !== void 0 && v !== "") url.searchParams.set(k, String(v));
	const cacheKey = url.toString();
	const cached = responseCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) return cached.value;
	if (cached) responseCache.delete(cacheKey);
	const inFlight = inFlightRequests.get(cacheKey);
	if (inFlight) return inFlight;
	const cacheTtl = path.startsWith("/search/") || path.startsWith("/discover/") ? SEARCH_CACHE_TTL_MS : CACHE_TTL_MS;
	const request = fetchTmdb(url).then((value) => {
		responseCache.set(cacheKey, {
			value,
			expiresAt: Date.now() + cacheTtl
		});
		if (responseCache.size > MAX_CACHE_ENTRIES) {
			const oldestKey = responseCache.keys().next().value;
			if (oldestKey !== void 0) responseCache.delete(oldestKey);
		}
		return value;
	}).finally(() => {
		inFlightRequests.delete(cacheKey);
	});
	inFlightRequests.set(cacheKey, request);
	return request;
}
async function fetchTmdb(url) {
	let lastError;
	for (let attempt = 0; attempt < 3; attempt++) {
		let response;
		try {
			response = await fetch(url.toString(), {
				headers: { accept: "application/json" },
				signal: AbortSignal.timeout(1e4)
			});
		} catch (err) {
			lastError = err;
			if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
			continue;
		}
		if (response.ok) return await response.json();
		lastError = /* @__PURE__ */ new Error(`TMDB request failed (${response.status})`);
		if (response.status < 500 && response.status !== 429) throw lastError;
		if (attempt < 2) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("TMDB request failed");
}
function map(raw, fallback) {
	var _ref, _raw$title, _raw$overview, _raw$poster_path, _raw$backdrop_path, _raw$vote_average, _ref2, _raw$release_date;
	const type = raw.media_type === "tv" || raw.media_type === "movie" ? raw.media_type : fallback;
	return {
		id: raw.id,
		title: (_ref = (_raw$title = raw.title) !== null && _raw$title !== void 0 ? _raw$title : raw.name) !== null && _ref !== void 0 ? _ref : "Untitled",
		overview: (_raw$overview = raw.overview) !== null && _raw$overview !== void 0 ? _raw$overview : "",
		poster_path: (_raw$poster_path = raw.poster_path) !== null && _raw$poster_path !== void 0 ? _raw$poster_path : null,
		backdrop_path: (_raw$backdrop_path = raw.backdrop_path) !== null && _raw$backdrop_path !== void 0 ? _raw$backdrop_path : null,
		vote_average: Math.round(((_raw$vote_average = raw.vote_average) !== null && _raw$vote_average !== void 0 ? _raw$vote_average : 0) * 10) / 10,
		release_date: (_ref2 = (_raw$release_date = raw.release_date) !== null && _raw$release_date !== void 0 ? _raw$release_date : raw.first_air_date) !== null && _ref2 !== void 0 ? _ref2 : null,
		media_type: type
	};
}
function list(res, fallback) {
	var _res$results;
	return ((_res$results = res.results) !== null && _res$results !== void 0 ? _res$results : []).filter((r) => r.poster_path || r.backdrop_path).map((r) => map(r, fallback));
}
async function fetchHome() {
	const [trending, popularMovies, topMovies, nowPlaying, popularTv, topTv, upcoming] = await Promise.all([
		tmdb("/trending/all/day"),
		tmdb("/movie/popular"),
		tmdb("/movie/top_rated"),
		tmdb("/movie/now_playing"),
		tmdb("/tv/popular"),
		tmdb("/tv/top_rated"),
		tmdb("/movie/upcoming")
	]);
	return {
		trending: list(trending, "movie"),
		popularMovies: list(popularMovies, "movie"),
		topMovies: list(topMovies, "movie"),
		nowPlaying: list(nowPlaying, "movie"),
		popularTv: list(popularTv, "tv"),
		topTv: list(topTv, "tv"),
		upcoming: list(upcoming, "movie")
	};
}
async function fetchDetail(type, id) {
	var _raw$recommendations$, _raw$recommendations, _raw$tagline, _ref3, _raw$runtime, _raw$episode_run_time, _raw$status, _raw$genres, _raw$seasons, _raw$number_of_season, _raw$homepage, _raw$credits$cast, _raw$credits, _raw$videos$results, _raw$videos, _raw$similar$results, _raw$similar;
	const raw = await tmdb(`/${type}/${id}`, { append_to_response: "credits,videos,similar,recommendations" });
	const base = map(raw, type);
	const sim = list({ results: (_raw$recommendations$ = (_raw$recommendations = raw.recommendations) === null || _raw$recommendations === void 0 ? void 0 : _raw$recommendations.results) !== null && _raw$recommendations$ !== void 0 ? _raw$recommendations$ : [] }, type);
	return {
		...base,
		tagline: (_raw$tagline = raw.tagline) !== null && _raw$tagline !== void 0 ? _raw$tagline : "",
		runtime: (_ref3 = (_raw$runtime = raw.runtime) !== null && _raw$runtime !== void 0 ? _raw$runtime : (_raw$episode_run_time = raw.episode_run_time) === null || _raw$episode_run_time === void 0 ? void 0 : _raw$episode_run_time[0]) !== null && _ref3 !== void 0 ? _ref3 : null,
		status: (_raw$status = raw.status) !== null && _raw$status !== void 0 ? _raw$status : "",
		genres: (_raw$genres = raw.genres) !== null && _raw$genres !== void 0 ? _raw$genres : [],
		seasons: ((_raw$seasons = raw.seasons) !== null && _raw$seasons !== void 0 ? _raw$seasons : []).filter((s) => s.season_number > 0),
		number_of_seasons: (_raw$number_of_season = raw.number_of_seasons) !== null && _raw$number_of_season !== void 0 ? _raw$number_of_season : 0,
		homepage: (_raw$homepage = raw.homepage) !== null && _raw$homepage !== void 0 ? _raw$homepage : null,
		cast: ((_raw$credits$cast = (_raw$credits = raw.credits) === null || _raw$credits === void 0 ? void 0 : _raw$credits.cast) !== null && _raw$credits$cast !== void 0 ? _raw$credits$cast : []).slice(0, 18).map((c) => {
			var _c$profile_path;
			return {
				id: c.id,
				name: c.name,
				character: c.character,
				profile_path: (_c$profile_path = c.profile_path) !== null && _c$profile_path !== void 0 ? _c$profile_path : null
			};
		}),
		videos: ((_raw$videos$results = (_raw$videos = raw.videos) === null || _raw$videos === void 0 ? void 0 : _raw$videos.results) !== null && _raw$videos$results !== void 0 ? _raw$videos$results : []).filter((v) => v.site === "YouTube"),
		similar: (sim.length ? sim : list({ results: (_raw$similar$results = (_raw$similar = raw.similar) === null || _raw$similar === void 0 ? void 0 : _raw$similar.results) !== null && _raw$similar$results !== void 0 ? _raw$similar$results : [] }, type)).slice(0, 18)
	};
}
async function fetchSearch(q, page) {
	if (!q.trim()) return {
		results: [],
		total_pages: 0,
		page: 1
	};
	const res = await tmdb("/search/multi", {
		query: q,
		page,
		include_adult: "false"
	});
	return {
		results: res.results.filter((r) => r.media_type === "movie" || r.media_type === "tv").map((r) => map(r, "movie")),
		total_pages: Math.min(res.total_pages, 500),
		page: res.page
	};
}
function mapSort(type, sort) {
	if (type === "tv" && sort.startsWith("primary_release_date")) return sort.replace("primary_release_date", "first_air_date");
	if (type === "tv" && sort === "revenue.desc") return "vote_count.desc";
	return sort;
}
async function fetchDiscover(type, page, filters = {}) {
	var _filters$sort;
	const dateFrom = type === "movie" ? "primary_release_date.gte" : "first_air_date.gte";
	const dateTo = type === "movie" ? "primary_release_date.lte" : "first_air_date.lte";
	const params = {
		page,
		sort_by: mapSort(type, (_filters$sort = filters.sort) !== null && _filters$sort !== void 0 ? _filters$sort : "popularity.desc"),
		include_adult: "false",
		"vote_count.gte": filters.minRating ? 300 : 50
	};
	if (filters.genre) params["with_genres"] = filters.genre;
	if (filters.provider) {
		params["with_watch_providers"] = filters.provider;
		params["watch_region"] = "US";
	}
	if (filters.yearFrom) params[dateFrom] = `${filters.yearFrom}-01-01`;
	if (filters.yearTo) params[dateTo] = `${filters.yearTo}-12-31`;
	if (filters.minRating) params["vote_average.gte"] = filters.minRating;
	const res = await tmdb(`/discover/${type}`, params);
	return {
		results: list(res, type),
		total_pages: Math.min(res.total_pages, 500),
		page: res.page
	};
}
/** Major streaming services users recognise, matched against TMDB's US list. */
var CURATED_PROVIDERS = [
	{
		match: "Netflix",
		display: "Netflix"
	},
	{
		match: "Disney Plus",
		display: "Disney+"
	},
	{
		match: "Amazon Prime Video",
		display: "Prime Video"
	},
	{
		match: "Apple TV",
		display: "Apple TV+"
	},
	{
		match: "HBO Max",
		display: "HBO Max"
	},
	{
		match: "Max",
		display: "HBO Max"
	},
	{
		match: "Hulu",
		display: "Hulu"
	},
	{
		match: "Peacock Premium Plus",
		display: "Peacock"
	},
	{
		match: "Peacock Premium",
		display: "Peacock"
	},
	{
		match: "Paramount Plus Premium",
		display: "Paramount+"
	},
	{
		match: "Paramount Plus Essential",
		display: "Paramount+"
	},
	{
		match: "Paramount Plus",
		display: "Paramount+"
	},
	{
		match: "Paramount+",
		display: "Paramount+"
	}
];
async function fetchProviders() {
	var _res$results2;
	const res = await tmdb("/watch/providers/movie", { watch_region: "US" });
	const byName = /* @__PURE__ */ new Map();
	for (const p of (_res$results2 = res.results) !== null && _res$results2 !== void 0 ? _res$results2 : []) {
		const curated = CURATED_PROVIDERS.find((c) => p.provider_name === c.match || p.provider_name.startsWith(c.match + " "));
		if (!p.logo_path || !curated) continue;
		const existing = byName.get(curated.display);
		if (!existing || p.provider_name.length < existing.provider_name.length) byName.set(curated.display, {
			provider_id: p.provider_id,
			provider_name: curated.display,
			logo_path: p.logo_path
		});
	}
	return CURATED_PROVIDERS.filter((c) => byName.has(c.display)).map((c) => byName.get(c.display)).map((p, i, arr) => {
		var _p$logo_path;
		return arr.findIndex((q) => q.provider_id === p.provider_id) === i ? {
			provider_id: p.provider_id,
			provider_name: p.provider_name,
			logo_path: (_p$logo_path = p.logo_path) !== null && _p$logo_path !== void 0 ? _p$logo_path : null
		} : {
			provider_id: -1,
			provider_name: "",
			logo_path: null
		};
	}).filter((p) => p.provider_id > 0);
}
async function fetchMoodPick(type, genreIds) {
	var _items$Math$floor;
	const params = {
		sort_by: "popularity.desc",
		include_adult: "false",
		"vote_count.gte": 200,
		"vote_average.gte": 6,
		with_genres: genreIds.join("|"),
		page: 1
	};
	const first = await tmdb(`/discover/${type}`, params);
	const totalPages = Math.min(first.total_pages || 1, 8);
	const page = 1 + Math.floor(Math.random() * totalPages);
	const items = list(page === 1 ? first : await tmdb(`/discover/${type}`, {
		...params,
		page
	}), type).filter((i) => i.backdrop_path && i.overview);
	if (!items.length) return null;
	return (_items$Math$floor = items[Math.floor(Math.random() * items.length)]) !== null && _items$Math$floor !== void 0 ? _items$Math$floor : null;
}
async function fetchRecommendations(type, id) {
	let items = list(await tmdb(`/${type}/${id}/recommendations`, { page: 1 }), type);
	if (!items.length) items = list(await tmdb(`/${type}/${id}/similar`, { page: 1 }), type);
	return items;
}
async function fetchGenres(type) {
	return (await tmdb(`/genre/${type}/list`)).genres;
}
async function fetchSeason(id, season) {
	var _res$episodes;
	const res = await tmdb(`/tv/${id}/season/${season}`);
	return {
		name: res.name,
		episodes: (_res$episodes = res.episodes) !== null && _res$episodes !== void 0 ? _res$episodes : []
	};
}
var getHome_createServerFn_handler = createServerRpc({
	id: "0eb7bdf2304e830f9c6aa152314e1128a8695d7b728a35f1fa6d51b2397a283e",
	name: "getHome",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => getHome.__executeServer(opts));
var getHome = createServerFn({ method: "GET" }).handler(getHome_createServerFn_handler, async () => fetchHome());
var getDetail_createServerFn_handler = createServerRpc({
	id: "5ffc5b5d38c4cc6ddf8c7802a979a04789176504fea888c81f05677293a31fb2",
	name: "getDetail",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => getDetail.__executeServer(opts));
var getDetail = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive()
}).parse(d)).handler(getDetail_createServerFn_handler, async ({ data }) => fetchDetail(data.type, data.id));
var searchMedia_createServerFn_handler = createServerRpc({
	id: "4554bac009cb7b0dd4f23b35e6381cde80f8891f6cd2c529ecb25d91e64f42ba",
	name: "searchMedia",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => searchMedia.__executeServer(opts));
var searchMedia = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	q: stringType().max(120),
	page: numberType().int().min(1).max(500).default(1)
}).parse(d)).handler(searchMedia_createServerFn_handler, async ({ data }) => fetchSearch(data.q, data.page));
var discover_createServerFn_handler = createServerRpc({
	id: "25fa7e666e5a3afee8e19fef04b92df9ac82a750803979fbc88e2a8b05fc57dd",
	name: "discover",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => discover.__executeServer(opts));
var discover = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	genre: numberType().int().optional(),
	sort: stringType().max(40).default("popularity.desc"),
	yearFrom: numberType().int().min(1900).max(2100).optional(),
	yearTo: numberType().int().min(1900).max(2100).optional(),
	minRating: numberType().min(0).max(10).optional(),
	provider: numberType().int().positive().optional(),
	page: numberType().int().min(1).max(500).default(1)
}).parse(d)).handler(discover_createServerFn_handler, async ({ data }) => fetchDiscover(data.type, data.page, {
	genre: data.genre,
	sort: data.sort,
	yearFrom: data.yearFrom,
	yearTo: data.yearTo,
	minRating: data.minRating,
	provider: data.provider
}));
var moodShuffle_createServerFn_handler = createServerRpc({
	id: "1f7ea57e9849637a5382881e62b0c92d82f36f8499b47279d54eaab959e720cb",
	name: "moodShuffle",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => moodShuffle.__executeServer(opts));
var moodShuffle = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	genres: arrayType(numberType().int()).min(1).max(4)
}).parse(d)).handler(moodShuffle_createServerFn_handler, async ({ data }) => fetchMoodPick(data.type, data.genres));
var tasteMix_createServerFn_handler = createServerRpc({
	id: "4aa807712e7398c8928c9c1a0b56eee105e0475ef6acaccd733701b20f1798f6",
	name: "tasteMix",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => tasteMix.__executeServer(opts));
var tasteMix = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ picks: arrayType(objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive()
})).min(1).max(3) }).parse(d)).handler(tasteMix_createServerFn_handler, async ({ data }) => {
	const picked = new Set(data.picks.map((p) => `${p.type}-${p.id}`));
	const lists = await Promise.all(data.picks.map((p) => fetchRecommendations(p.type, p.id)));
	const score = /* @__PURE__ */ new Map();
	for (const items of lists) for (const item of items) {
		const key = `${item.media_type}-${item.id}`;
		if (picked.has(key)) continue;
		const entry = score.get(key);
		if (entry) entry.hits += 1;
		else score.set(key, {
			item,
			hits: 1
		});
	}
	return [...score.values()].sort((a, b) => b.hits - a.hits || b.item.vote_average - a.item.vote_average).slice(0, 18).map((e) => e.item);
});
var getGenres_createServerFn_handler = createServerRpc({
	id: "ebf876321ff9fb76ab5e3e0145e843f93b8696f9dada1feaafa0882cc7a7fdef",
	name: "getGenres",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => getGenres.__executeServer(opts));
var getGenres = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ type: enumType(["movie", "tv"]) }).parse(d)).handler(getGenres_createServerFn_handler, async ({ data }) => fetchGenres(data.type));
var getProviders_createServerFn_handler = createServerRpc({
	id: "2809ece6963199ea6c4f193984f07aca6518d3a0758fc74f88ab3c7af428c994",
	name: "getProviders",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => getProviders.__executeServer(opts));
var getProviders = createServerFn({ method: "GET" }).handler(getProviders_createServerFn_handler, async () => fetchProviders());
var getSeason_createServerFn_handler = createServerRpc({
	id: "a88edc453082894d652124c430c7a3d066602e628a6fac62288f02cf51c49f58",
	name: "getSeason",
	filename: "src/lib/tmdb.functions.ts"
}, (opts) => getSeason.__executeServer(opts));
var getSeason = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	id: numberType().int().positive(),
	season: numberType().int().min(0)
}).parse(d)).handler(getSeason_createServerFn_handler, async ({ data }) => fetchSeason(data.id, data.season));
//#endregion
export { discover_createServerFn_handler, getDetail_createServerFn_handler, getGenres_createServerFn_handler, getHome_createServerFn_handler, getProviders_createServerFn_handler, getSeason_createServerFn_handler, moodShuffle_createServerFn_handler, searchMedia_createServerFn_handler, tasteMix_createServerFn_handler };
