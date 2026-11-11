import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as getSeason } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useSuspenseQuery, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, r as runtimeLabel, t as Img } from "./Img-pbA8sDz4.mjs";
import { b as Check, h as Clock, n as Star, o as Plus, s as Play, x as Calendar } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
import { t as Button } from "./button-CrMKWcwz.mjs";
import { a as useMyList } from "./my-list-CEHY-DpD.mjs";
import { n as detailQuery, t as Route } from "./title._type._id-BdXWm70F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/title._type._id-CkLsfRXV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TitlePage() {
	var _data$seasons$0$seaso, _data$seasons$, _seasonQuery$data$epi, _seasonQuery$data;
	const params = Route.useParams();
	const type = params.type;
	const id = Number(params.id);
	const { data } = useSuspenseQuery(detailQuery(type, id));
	const { has, toggle } = useMyList();
	const saved = has(id, type);
	const [season, setSeason] = (0, import_react.useState)((_data$seasons$0$seaso = (_data$seasons$ = data.seasons[0]) === null || _data$seasons$ === void 0 ? void 0 : _data$seasons$.season_number) !== null && _data$seasons$0$seaso !== void 0 ? _data$seasons$0$seaso : 1);
	const seasonQuery = useQuery({
		queryKey: [
			"season",
			id,
			season
		],
		queryFn: () => getSeason({ data: {
			id,
			season
		} }),
		enabled: type === "tv" && data.seasons.length > 0
	});
	const backdrop = img(data.backdrop_path, "original");
	const poster = img(data.poster_path, "w780");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[68vh] w-full",
				children: [
					backdrop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
						src: backdrop,
						alt: `${data.title} backdrop`,
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 side-fade" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 hero-fade" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex min-h-[68vh] flex-col justify-end gap-6 px-4 pb-10 pt-28 md:flex-row md:items-end md:px-10",
						children: [poster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
							src: poster,
							alt: `${data.title} poster`,
							className: "hidden w-52 md:block"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "break-words text-4xl md:text-6xl",
									children: data.title
								}),
								data.tagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 italic text-primary",
									children: data.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 text-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }),
												" ",
												data.vote_average.toFixed(1)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
												" ",
												year(data.release_date) || "TBA"
											]
										}),
										data.runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
												" ",
												runtimeLabel(data.runtime)
											]
										}) : null,
										type === "tv" && data.number_of_seasons > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.number_of_seasons, " seasons"] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex flex-wrap gap-x-4 gap-y-1",
									children: data.genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: g.name
									}, g.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-sm text-foreground/85 md:text-base",
									children: data.overview
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "h-11 px-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/watch/$type/$id",
											params: {
												type,
												id: String(id)
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Play"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "glass",
										size: "lg",
										className: "h-11 px-6",
										"aria-pressed": saved,
										onClick: () => toggle({
											id: data.id,
											title: data.title,
											overview: data.overview,
											poster_path: data.poster_path,
											backdrop_path: data.backdrop_path,
											vote_average: data.vote_average,
											release_date: data.release_date,
											media_type: type
										}),
										children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), saved ? "In my list" : "Add to my list"]
									})]
								})
							]
						})]
					})
				]
			}),
			type === "tv" && data.seasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 py-8 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold",
						children: "Episodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: season,
						onChange: (e) => setSeason(Number(e.target.value)),
						className: "border-b border-border bg-transparent py-1 pr-2 text-sm outline-none",
						"aria-label": "Select season",
						children: data.seasons.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.season_number,
							children: s.name
						}, s.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-3",
					children: [((_seasonQuery$data$epi = (_seasonQuery$data = seasonQuery.data) === null || _seasonQuery$data === void 0 ? void 0 : _seasonQuery$data.episodes) !== null && _seasonQuery$data$epi !== void 0 ? _seasonQuery$data$epi : []).map((ep) => {
						var _ep$air_date;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/watch/$type/$id",
							params: {
								type: "tv",
								id: String(id)
							},
							search: {
								s: ep.season_number,
								e: ep.episode_number
							},
							className: "group flex gap-3 border-b border-border/60 p-1 transition-colors last:border-0 hover:text-primary md:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-video w-24 shrink-0 overflow-hidden rounded-sm bg-surface-2 sm:w-40",
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
					}), seasonQuery.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading episodes…"
					})]
				})]
			}),
			data.cast.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 py-8 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Cast"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2",
					children: data.cast.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-28 shrink-0 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square w-28 overflow-hidden rounded-full bg-surface-2",
								children: img(c.profile_path, "w185") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
									src: img(c.profile_path, "w185"),
									alt: c.name,
									loading: "lazy",
									className: "h-full w-full object-cover"
								}) : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 truncate text-xs font-semibold",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: c.character
							})
						]
					}, c.id))
				})]
			}),
			data.similar.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 py-8 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "More like this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
					children: data.similar.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, { item: s }, `${s.media_type}-${s.id}`))
				})]
			})
		]
	});
}
//#endregion
export { TitlePage as component };
