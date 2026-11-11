import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Img-pbA8sDz4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var IMG = "https://image.tmdb.org/t/p";
function img(path, size = "w500") {
	if (!path) return null;
	return `${IMG}/${size}${path}`;
}
function year(date) {
	return date ? date.slice(0, 4) : "";
}
function runtimeLabel(mins) {
	if (!mins) return "";
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	return h ? `${h}h ${m}m` : `${m}m`;
}
/**
* Resilient image element.
*
* TMDB posters occasionally fail to load (CDN hiccups, ISP/DNS filtering of
* image.tmdb.org, or rate limiting when many posters load at once). This
* component silently retries the same asset through mirror hosts before
* giving up, so the catalog keeps showing artwork instead of blank tiles.
* A watchdog also rolls over to the next mirror when a source simply hangs
* (no error event) so the page never sits on empty grey tiles.
*/
var mirrorsFor = (src) => {
	const list = [src];
	if (src.includes("image.tmdb.org")) list.push(src.replace("image.tmdb.org", "media.themoviedb.org"));
	list.push(`https://images.weserv.nl/?url=${encodeURIComponent(src.replace(/^https?:\/\//, ""))}`);
	return list;
};
function Img({ src, fallback = null, alt = "", className = "", ...rest }) {
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const sources = src ? mirrorsFor(src) : [];
	const current = sources[attempt];
	(0, import_react.useEffect)(() => {
		setAttempt(0);
		setLoaded(false);
	}, [src]);
	(0, import_react.useEffect)(() => {
		if (!current || loaded) return;
		const t = setTimeout(() => {
			const el = ref.current;
			if (!el || el.complete && el.naturalWidth > 0) return;
			const r = el.getBoundingClientRect();
			if (r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth && r.width > 0) setAttempt((a) => a + 1 < sources.length ? a + 1 : a);
		}, 8e3);
		return () => clearTimeout(t);
	}, [
		current,
		loaded,
		sources.length
	]);
	if (!src || attempt >= sources.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, import_react.createElement)("img", {
		...rest,
		ref,
		key: current,
		src: current,
		alt,
		referrerPolicy: "no-referrer",
		decoding: "async",
		className: `${className} ${loaded ? "" : "bg-surface-2"}`,
		onLoad: (e) => {
			var _rest$onLoad;
			setLoaded(true);
			(_rest$onLoad = rest.onLoad) === null || _rest$onLoad === void 0 || _rest$onLoad.call(rest, e);
		},
		onError: () => setAttempt((a) => a + 1)
	});
}
//#endregion
export { year as i, img as n, runtimeLabel as r, Img as t };
