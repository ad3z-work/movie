import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as moodShuffle } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, t as Img } from "./Img-pbA8sDz4.mjs";
import { g as Clapperboard, m as Dices, n as Star, s as Play, u as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shuffle-BONFXqKY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOODS = [
	{
		id: "feelgood",
		label: "Feel-good",
		movie: [35, 10751],
		tv: [35, 10751]
	},
	{
		id: "laugh",
		label: "Make me laugh",
		movie: [35],
		tv: [35]
	},
	{
		id: "thrilling",
		label: "Edge of my seat",
		movie: [53, 28],
		tv: [10759, 80]
	},
	{
		id: "scary",
		label: "Scare me",
		movie: [27],
		tv: [9648]
	},
	{
		id: "romantic",
		label: "Romantic",
		movie: [10749],
		tv: [18]
	},
	{
		id: "mindbending",
		label: "Mind-bending",
		movie: [878, 9648],
		tv: [10765, 9648]
	},
	{
		id: "epic",
		label: "Epic adventure",
		movie: [12, 14],
		tv: [10759, 10765]
	},
	{
		id: "cozy",
		label: "Cozy drama",
		movie: [18, 10751],
		tv: [18, 10751]
	}
];
function ShufflePage() {
	const [mood, setMood] = (0, import_react.useState)(MOODS[0]);
	const [type, setType] = (0, import_react.useState)("movie");
	const [pick, setPick] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [shuffling, setShuffling] = (0, import_react.useState)(false);
	const shuffle = async () => {
		setLoading(true);
		setShuffling(true);
		try {
			const result = await moodShuffle({ data: {
				type,
				genres: type === "movie" ? mood.movie : mood.tv
			} });
			setTimeout(() => {
				setPick(result);
				setShuffling(false);
				setLoading(false);
			}, 900);
		} catch {
			setShuffling(false);
			setLoading(false);
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
				children: "Mood Shuffle"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted-foreground md:text-base",
				children: "No endless scrolling. Tell us how you feel and we'll deal you one perfect pick."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMood(m),
					className: `px-1 py-2 text-xs font-semibold transition-colors ${mood.id === m.id ? "text-primary underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`,
					children: m.label
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-2",
				children: [["movie", "tv"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setType(t),
					className: `px-1 py-2 text-xs font-semibold transition-colors ${type === t ? "text-primary underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`,
					children: t === "movie" ? "Movies" : "Series"
				}, t)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: shuffle,
					disabled: loading,
					className: "ml-auto inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-primary underline-offset-8 transition-colors hover:underline disabled:opacity-60",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "h-4 w-4" }), pick ? "Shuffle again" : "Deal me a pick"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [
					shuffling && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex aspect-video w-full items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "h-10 w-10 animate-bounce text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.3em]",
								children: "Shuffling…"
							})]
						})
					}),
					!shuffling && pick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
								src: img(pick.backdrop_path, "w1280"),
								alt: pick.title,
								className: "h-full w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative -mt-24 p-6 md:-mt-32 md:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs uppercase tracking-[0.3em] text-primary",
									children: [
										"Your ",
										mood.label.toLowerCase(),
										" pick"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-3xl md:text-5xl",
									children: pick.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year(pick.release_date) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }), pick.vote_average.toFixed(1)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pick.media_type === "tv" ? "Series" : "Movie" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base",
									children: pick.overview
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/watch/$type/$id",
										params: {
											type: pick.media_type,
											id: String(pick.id)
										},
										search: {},
										className: "inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-primary underline-offset-8 transition-colors hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Watch now"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/title/$type/$id",
										params: {
											type: pick.media_type,
											id: String(pick.id)
										},
										className: "inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-foreground underline-offset-8 transition-colors hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "h-4 w-4" }), " Details"]
									})]
								})
							]
						})]
					}),
					!shuffling && !pick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex aspect-video w-full flex-col items-center justify-center gap-3 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "h-10 w-10 text-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Choose a mood and hit the button — one pick, no scrolling."
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { ShufflePage as component };
