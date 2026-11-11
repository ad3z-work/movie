import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { S as Bookmark } from "../_libs/lucide-react.mjs";
import { t as MediaCard } from "./MediaCard-okjuq9cX.mjs";
import { t as Button } from "./button-CrMKWcwz.mjs";
import { a as useMyList } from "./my-list-CEHY-DpD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-list-cfYppnPW.js
var import_jsx_runtime = require_jsx_runtime();
function MyList() {
	const { items, ready } = useMyList();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen px-4 pb-16 pt-28 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl md:text-6xl",
				children: "My List"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your next great watch."
			}),
			ready && items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-center gap-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-10 w-10 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your list is empty."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/movies",
							children: "Browse movies"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCard, { item }, `${item.media_type}-${item.id}`))
			})
		]
	});
}
//#endregion
export { MyList as component };
