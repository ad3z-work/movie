import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as filterSearchSchema } from "./BrowseCatalog-CgEo9afq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-B8_1SMCy.js
var $$splitComponentImporter = () => import("./series-dYWvcj-n.mjs");
var Route = createFileRoute("/series")({
	validateSearch: filterSearchSchema,
	head: () => ({ meta: [
		{ title: "TV Series — Full Seasons & Episodes | Lumiere" },
		{
			name: "description",
			content: "Explore TV series by genre and rating, browse seasons and episodes, and keep track of what you watch."
		},
		{
			property: "og:title",
			content: "TV Series — Full Seasons & Episodes | Lumiere"
		},
		{
			property: "og:description",
			content: "Explore series by genre and rating, with full season and episode guides."
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
