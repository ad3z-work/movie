import { r as __toESM } from "../_runtime.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProviders } from "./tmdb.functions-Dqn1ReHf.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useSuspenseQuery, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, t as Img } from "./Img-pbA8sDz4.mjs";
import { _ as ChevronRight, c as Pause, d as Info, n as Star, s as Play, t as X, v as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
import { t as Button } from "./button-CrMKWcwz.mjs";
import { i as useContinueWatching, r as removeWatch, t as clearHistory } from "./my-list-CEHY-DpD.mjs";
import { t as homeQuery } from "./routes-B1Mztn10.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-MiB3-g5w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLIDE_DURATION_MS = 1e4;
function Hero({ items }) {
	var _slides$index;
	const slides = items.filter((i) => i.backdrop_path).slice(0, 5);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [cycle, setCycle] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (slides.length < 2 || paused) return;
		const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_DURATION_MS);
		return () => clearTimeout(timer);
	}, [
		index,
		slides.length,
		paused,
		cycle
	]);
	const select = (next) => {
		setIndex((next + slides.length) % slides.length);
		setCycle((value) => value + 1);
	};
	const item = (_slides$index = slides[index]) !== null && _slides$index !== void 0 ? _slides$index : slides[0];
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-[82svh] min-h-[480px] max-h-[960px] w-full overflow-hidden md:min-h-[560px]",
		"aria-label": "Featured titles",
		"aria-roledescription": "carousel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
				src: img(item.backdrop_path, "w1280"),
				alt: `${item.title} backdrop`,
				loading: "eager",
				fetchPriority: "high",
				className: "h-full w-full object-cover"
			})
		}, item.id), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-20 pt-28 md:px-12 md:pb-24 lg:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "hero-title max-w-3xl break-words font-display text-5xl leading-[1.02] md:text-7xl lg:text-8xl",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-3 text-xs font-medium text-foreground/80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-primary",
							title: "TMDB rating",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }),
								" ",
								item.vote_average.toFixed(1),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "/ 10"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year(item.release_date) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.media_type === "tv" ? "TV series" : "Movie" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 line-clamp-3 max-w-lg text-sm leading-relaxed text-foreground/80 md:text-base",
					children: item.overview
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "h-11 px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/watch/$type/$id",
							params: {
								type: item.media_type,
								id: String(item.id)
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "fill-current" }), " Watch now"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "glass",
						size: "lg",
						className: "h-11 px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/title/$type/$id",
							params: {
								type: item.media_type,
								id: String(item.id)
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), " Details"]
						})
					})]
				}),
				slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex items-center gap-3",
					"aria-label": "Selection controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "glass",
								size: "icon",
								"aria-label": "Previous selection",
								title: "Previous selection",
								onClick: () => select(index - 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "glass",
								size: "icon",
								"aria-label": paused ? "Resume selections" : "Pause selections",
								title: paused ? "Resume selections" : "Pause selections",
								"aria-pressed": paused,
								onClick: () => setPaused((value) => !value),
								children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "glass",
								size: "icon",
								"aria-label": "Next selection",
								title: "Next selection",
								onClick: () => select(index + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [
							String(index + 1).padStart(2, "0"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1 text-border",
								children: "/"
							}),
							" ",
							String(slides.length).padStart(2, "0")
						]
					})]
				})
			]
		})]
	});
}
function MediaRow({ title, items }) {
	const ref = (0, import_react.useRef)(null);
	const scroll = (dir) => {
		const el = ref.current;
		if (!el) return;
		el.scrollBy({
			left: dir * Math.round(el.clientWidth * .85),
			behavior: "smooth"
		});
	};
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "media-row group/row relative py-8 md:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-end justify-between px-5 md:px-12 lg:px-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-4xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "glass",
					size: "icon",
					title: "Previous titles",
					"aria-label": `Scroll ${title} left`,
					onClick: () => scroll(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "glass",
					size: "icon",
					title: "Next titles",
					"aria-label": `Scroll ${title} right`,
					onClick: () => scroll(1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-5 md:px-12 lg:px-16",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, {
				item,
				className: "w-[44vw] shrink-0 snap-start sm:w-44 md:w-48 lg:w-52"
			}, `${item.media_type}-${item.id}`))
		})]
	});
}
/**
* Homepage strip of major streaming services. Each tile deep-links into the
* Movies catalogue pre-filtered to that provider.
*/
function ProviderStrip() {
	const { data: providers } = useQuery({
		queryKey: ["providers"],
		queryFn: () => getProviders(),
		staleTime: 36e5
	});
	if (!(providers === null || providers === void 0 ? void 0 : providers.length)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-8 md:py-10",
		"aria-label": "Browse by provider",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-baseline gap-4 px-5 md:px-12 lg:px-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-4xl",
				children: "Browse by provider"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/movies",
				className: "ml-auto shrink-0 text-xs text-muted-foreground transition-colors hover:text-primary",
				children: "View all"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar flex gap-5 overflow-x-auto px-5 pb-2 md:gap-7 md:px-12 lg:px-16",
			children: providers.map((p) => {
				const logo = img(p.logo_path, "w154");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/movies",
					search: { provider: p.provider_id },
					className: "group flex w-24 shrink-0 flex-col items-center gap-3 md:w-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-16 w-16 overflow-hidden transition duration-300 group-hover:-translate-y-1 md:h-20 md:w-20",
						children: logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
							src: logo,
							alt: `${p.provider_name} logo`,
							loading: "lazy",
							decoding: "async",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-center text-xs font-medium leading-snug text-muted-foreground transition-colors group-hover:text-foreground",
						children: p.provider_name
					})]
				}, p.provider_id);
			})
		})]
	});
}
function ContinueWatching() {
	const items = useContinueWatching();
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-8 md:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-baseline gap-4 px-5 md:px-12 lg:px-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-4xl",
				children: "Continue watching"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				type: "button",
				onClick: clearHistory,
				className: "ml-auto text-muted-foreground hover:text-primary",
				children: "Clear all"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar flex gap-5 overflow-x-auto px-5 pb-2 md:px-12 lg:px-16",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative w-[78vw] max-w-sm shrink-0 overflow-hidden md:w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/watch/$type/$id",
					params: {
						type: i.media_type,
						id: String(i.id)
					},
					search: (() => {
						var _parts$, _parts$2;
						const label = i.episodeLabel;
						if (!(label === null || label === void 0 ? void 0 : label.includes("E"))) return {};
						const parts = label.split(" ");
						const s = Number(((_parts$ = parts[0]) === null || _parts$ === void 0 ? void 0 : _parts$.replace("S", "")) || 0);
						const e = Number(((_parts$2 = parts[1]) === null || _parts$2 === void 0 || (_parts$2 = _parts$2.split("E")[1]) === null || _parts$2 === void 0 ? void 0 : _parts$2.split(" —")[0]) || 0);
						return s && e ? {
							s,
							e
						} : {};
					})(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video w-full bg-surface-2",
							children: img(i.backdrop_path, "w780") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
								src: img(i.backdrop_path, "w780"),
								alt: i.title,
								className: "h-full w-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-9 w-9 fill-current text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: i.title
								}),
								i.episodeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: i.episodeLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1 w-full rounded-full bg-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1 rounded-full bg-primary",
										style: { width: `${Math.min(100, i.progress)}%` }
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "glass",
					size: "icon",
					type: "button",
					"aria-label": `Remove ${i.title} from continue watching`,
					onClick: () => removeWatch(i.id, i.media_type),
					title: `Remove ${i.title}`,
					className: "absolute right-2 top-2 z-10 h-8 w-8 text-foreground drop-shadow-md opacity-100 transition-all hover:text-primary md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}, `${i.media_type}-${i.id}`))
		})]
	});
}
function Home() {
	const { data } = useSuspenseQuery(homeQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { items: data.trending }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 -mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueWatching, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderStrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Trending now",
					items: data.trending
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "In theatres",
					items: data.nowPlaying
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Popular movies",
					items: data.popularMovies
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Popular series",
					items: data.popularTv
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Top rated movies",
					items: data.topMovies
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Critically acclaimed series",
					items: data.topTv
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
					title: "Coming soon",
					items: data.upcoming
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
