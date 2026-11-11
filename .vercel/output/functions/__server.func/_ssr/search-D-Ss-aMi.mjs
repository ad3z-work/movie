import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-D-Ss-aMi.js
var $$splitComponentImporter = () => import("./search-B5w_Z3DI.mjs");
var searchSchema = objectType({ q: stringType().catch("") });
var Route = createFileRoute("/search")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Search Movies & Series | Lumiere" },
		{
			name: "description",
			content: "Search the full Lumiere catalogue of movies and TV series by title, in seconds."
		},
		{
			property: "og:title",
			content: "Search Movies & Series | Lumiere"
		},
		{
			property: "og:description",
			content: "Find any movie or series in the Lumiere catalogue."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
