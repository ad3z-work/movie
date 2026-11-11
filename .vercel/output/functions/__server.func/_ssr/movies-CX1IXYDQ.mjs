import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as filterSearchSchema } from "./BrowseCatalog-CgEo9afq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/movies-CX1IXYDQ.js
var $$splitComponentImporter = () => import("./movies-BAEQTVi4.mjs");
var Route = createFileRoute("/movies")({
	validateSearch: filterSearchSchema,
	head: () => ({ meta: [
		{ title: "Movies — Browse Every Genre | Lumiere" },
		{
			name: "description",
			content: "Browse thousands of movies by genre, rating and release date. Filter, sort and start watching on Lumiere."
		},
		{
			property: "og:title",
			content: "Movies — Browse Every Genre | Lumiere"
		},
		{
			property: "og:description",
			content: "Filter thousands of movies by genre, rating and release date."
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
