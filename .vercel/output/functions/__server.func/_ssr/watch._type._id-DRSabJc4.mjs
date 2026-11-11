import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./createServerFn-YI1B8o6p.mjs";
import { a as objectType, i as numberType, r as enumType } from "../_libs/zod.mjs";
import { s as getSeason, t as createSsrRpc } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useSuspenseQuery, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, r as runtimeLabel, t as Img } from "./Img-pbA8sDz4.mjs";
import { C as ArrowLeft, d as Info, f as Film, s as Play } from "../_libs/lucide-react.mjs";
import { n as recordWatch } from "./my-list-CEHY-DpD.mjs";
import { n as detailQuery, t as Route } from "./watch._type._id-CazZAZkV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._type._id-DRSabJc4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive(),
	season: numberType().int().positive().optional(),
	episode: numberType().int().positive().optional()
});
/**
* Single playback provider (CineSrc). Kept server-side so its name and
* URL never show in the UI; the player loads it silently as the default.
*/
/**
* Resolves the configured third-party embed player for a title.
*/
var getStreamSources = createServerFn({ method: "GET" }).inputValidator((input) => schema.parse(input)).handler(createSsrRpc("9581086b42abad28d708d406eda42ad31e03071284a7e26c9cd7a7c634295635"));
function WatchPage() {
	var _playable$find, _ref, _search$s, _data$seasons$, _seasonData$data$epis, _seasonData$data, _episodes$find, _ref2, _currentEp$episode_nu, _stream$data, _source$url, _source$referrer, _stream$data$error, _stream$data2;
	const params = Route.useParams();
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const type = params.type;
	const id = Number(params.id);
	const { data } = useSuspenseQuery(detailQuery(type, id));
	const playable = data.videos.filter((v) => [
		"Trailer",
		"Teaser",
		"Clip",
		"Featurette"
	].includes(v.type));
	const active = (_playable$find = playable.find((v) => v.key === search.v)) !== null && _playable$find !== void 0 ? _playable$find : playable[0];
	const seasonNumber = (_ref = (_search$s = search.s) !== null && _search$s !== void 0 ? _search$s : (_data$seasons$ = data.seasons[0]) === null || _data$seasons$ === void 0 ? void 0 : _data$seasons$.season_number) !== null && _ref !== void 0 ? _ref : 1;
	const seasonData = useQuery({
		queryKey: [
			"season",
			id,
			seasonNumber
		],
		queryFn: () => getSeason({ data: {
			id,
			season: seasonNumber
		} }),
		enabled: type === "tv" && data.seasons.length > 0
	});
	const episodes = (_seasonData$data$epis = (_seasonData$data = seasonData.data) === null || _seasonData$data === void 0 ? void 0 : _seasonData$data.episodes) !== null && _seasonData$data$epis !== void 0 ? _seasonData$data$epis : [];
	const currentEp = (_episodes$find = episodes.find((ep) => ep.episode_number === search.e)) !== null && _episodes$find !== void 0 ? _episodes$find : episodes[0];
	const [mode, setMode] = (0, import_react.useState)("full");
	const episodeNumber = (_ref2 = (_currentEp$episode_nu = currentEp === null || currentEp === void 0 ? void 0 : currentEp.episode_number) !== null && _currentEp$episode_nu !== void 0 ? _currentEp$episode_nu : search.e) !== null && _ref2 !== void 0 ? _ref2 : 1;
	(0, import_react.useEffect)(() => {
		var _data$runtime;
		const totalSecs = ((_data$runtime = data.runtime) !== null && _data$runtime !== void 0 ? _data$runtime : type === "tv" ? 45 : 120) * 60;
		const start = Date.now();
		const episodeLabel = type === "tv" ? `S${seasonNumber} E${episodeNumber}${(currentEp === null || currentEp === void 0 ? void 0 : currentEp.name) ? ` — ${currentEp.name}` : ""}` : void 0;
		const save = () => {
			const elapsed = (Date.now() - start) / 1e3;
			const progress = Math.max(2, Math.min(95, elapsed / totalSecs * 100));
			const entry = {
				id,
				media_type: type,
				title: data.title,
				overview: data.overview,
				poster_path: data.poster_path,
				backdrop_path: data.backdrop_path,
				vote_average: data.vote_average,
				release_date: data.release_date,
				progress
			};
			if (episodeLabel) entry["episodeLabel"] = episodeLabel;
			recordWatch(entry);
		};
		save();
		const interval = window.setInterval(save, 15e3);
		return () => {
			window.clearInterval(interval);
			save();
		};
	}, [
		type,
		id,
		seasonNumber,
		episodeNumber,
		currentEp === null || currentEp === void 0 ? void 0 : currentEp.name,
		data.title,
		data.overview,
		data.poster_path,
		data.backdrop_path,
		data.vote_average,
		data.release_date,
		data.runtime
	]);
	const stream = useQuery({
		queryKey: [
			"stream",
			type,
			id,
			type === "tv" ? seasonNumber : 0,
			type === "tv" ? episodeNumber : 0
		],
		queryFn: () => getStreamSources({ data: type === "tv" ? {
			type,
			id,
			season: seasonNumber,
			episode: episodeNumber
		} : {
			type,
			id
		} }),
		staleTime: 6e5
	});
	const source = (_stream$data = stream.data) === null || _stream$data === void 0 ? void 0 : _stream$data.sources[0];
	const playerUrl = (_source$url = source === null || source === void 0 ? void 0 : source.url) !== null && _source$url !== void 0 ? _source$url : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-16 pt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/title/$type/$id",
					params: {
						type,
						id: String(id)
					},
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to details"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2 px-4 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setMode("full"),
					className: `inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold transition-colors ${mode === "full" ? "text-primary underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-4 w-4" }),
						" ",
						type === "tv" ? "Full episode" : "Full movie"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setMode("trailer"),
					disabled: playable.length === 0,
					className: `inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${mode === "trailer" ? "text-primary underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Trailers"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 bg-black md:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mx-auto aspect-video max-w-6xl w-full bg-black",
					children: mode === "full" ? playerUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: playerUrl,
						title: `${data.title} — full stream`,
						referrerPolicy: (_source$referrer = source === null || source === void 0 ? void 0 : source.referrer) !== null && _source$referrer !== void 0 ? _source$referrer : "origin",
						sandbox: "allow-scripts allow-same-origin allow-presentation",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
						allowFullScreen: true,
						className: "h-full w-full border-0"
					}, playerUrl) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: stream.isLoading ? "Loading player…" : (_stream$data$error = (_stream$data2 = stream.data) === null || _stream$data2 === void 0 ? void 0 : _stream$data2.error) !== null && _stream$data$error !== void 0 ? _stream$data$error : "This title is not available to stream right now."
						})]
					}) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: `https://www.youtube-nocookie.com/embed/${active.key}?autoplay=1&rel=0&modestbranding=1`,
						title: `${data.title} — ${active.name}`,
						sandbox: "allow-scripts allow-same-origin allow-presentation",
						allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
						allowFullScreen: true,
						className: "h-full w-full border-0"
					}, active.key) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No trailer is available for this title yet."
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-6 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-extrabold md:text-3xl",
						children: [data.title, type === "tv" && currentEp ? ` · S${seasonNumber}E${currentEp.episode_number} — ${currentEp.name}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year(data.release_date) || "TBA" }),
							data.runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: runtimeLabel(data.runtime) }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider",
								children: type
							}),
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: active.type
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-3xl text-sm text-foreground/80",
						children: (currentEp === null || currentEp === void 0 ? void 0 : currentEp.overview) || data.overview
					})
				]
			}),
			playable.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 py-8 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Videos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2",
					children: playable.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setMode("trailer");
							navigate({ search: (prev) => ({
								...prev,
								v: v.key
							}) });
						},
						className: `w-56 shrink-0 p-1 text-left transition-colors ${(active === null || active === void 0 ? void 0 : active.key) === v.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3 fill-current text-primary" }),
								" ",
								v.type
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 line-clamp-2 block text-sm",
							children: v.name
						})]
					}, v.key))
				})]
			}),
			type === "tv" && data.seasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 py-8 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						children: "Episodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: seasonNumber,
						onChange: (ev) => navigate({ search: (prev) => ({
							...prev,
							s: Number(ev.target.value),
							e: 1
						}) }),
						className: "border-b border-border bg-transparent py-1 pr-2 text-sm outline-none",
						"aria-label": "Select season",
						children: data.seasons.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.season_number,
							children: s.name
						}, s.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-3",
					children: [episodes.map((ep) => {
						var _ep$air_date;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({ search: (prev) => ({
								...prev,
								s: ep.season_number,
								e: ep.episode_number
							}) }),
							className: `flex gap-4 border-b border-border/60 p-1 text-left transition-colors last:border-0 ${(currentEp === null || currentEp === void 0 ? void 0 : currentEp.id) === ep.id ? "text-primary" : "hover:text-primary"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:w-40",
								children: img(ep.still_path, "w342") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
									src: img(ep.still_path, "w342"),
									alt: ep.name,
									loading: "lazy",
									className: "h-full w-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold",
										children: [
											ep.episode_number,
											". ",
											ep.name
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											(_ep$air_date = ep.air_date) !== null && _ep$air_date !== void 0 ? _ep$air_date : "TBA",
											" ",
											ep.runtime ? `· ${runtimeLabel(ep.runtime)}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 line-clamp-2 text-xs text-muted-foreground",
										children: ep.overview
									})
								]
							})]
						}, ep.id);
					}), seasonData.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading episodes…"
					})]
				})]
			})
		]
	});
}
//#endregion
export { WatchPage as component };
