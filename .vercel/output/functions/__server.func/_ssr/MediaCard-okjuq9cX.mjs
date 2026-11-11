import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img, t as Img } from "./Img-pbA8sDz4.mjs";
import { n as Star, s as Play } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MediaCard-okjuq9cX.js
var import_jsx_runtime = require_jsx_runtime();
function MediaCard({ item, className = "" }) {
	var _img;
	const poster = (_img = img(item.poster_path, "w342")) !== null && _img !== void 0 ? _img : img(item.backdrop_path, "w780");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/title/$type/$id",
		params: {
			type: item.media_type,
			id: String(item.id)
		},
		"aria-label": `${item.title}, ${year(item.release_date)}, ${item.media_type === "tv" ? "TV series" : "movie"}`,
		className: `group relative block min-w-0 transition-all duration-300 focus-visible:outline-none focus-visible:underline hover:-translate-y-1 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[2/3] w-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Img, {
				src: poster,
				alt: `${item.title} poster`,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center px-2 text-center text-xs text-muted-foreground",
					children: item.title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-background/35 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 fill-current text-primary" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-medium text-foreground",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }),
							" ",
							item.vote_average.toFixed(1)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year(item.release_date) || "TBA" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.media_type === "tv" ? "Series" : "Movie" })
				]
			})]
		})]
	});
}
//#endregion
export { MediaCard as t };
