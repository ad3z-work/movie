import { Gt as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getDetail } from "./tmdb.functions-Dqn1ReHf.mjs";
import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { i as year, n as img } from "./Img-pbA8sDz4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/title._type._id-BdXWm70F.js
var detailQuery = (type, id) => queryOptions({
	queryKey: [
		"detail",
		type,
		id
	],
	queryFn: () => getDetail({ data: {
		type,
		id
	} }),
	staleTime: 18e5
});
var $$splitComponentImporter = () => import("./title._type._id-CkLsfRXV.mjs");
var Route = createFileRoute("/title/$type/$id")({
	loader: async ({ context, params }) => {
		if (params.type !== "movie" && params.type !== "tv") throw notFound();
		const id = Number(params.id);
		if (!Number.isFinite(id)) throw notFound();
		return context.queryClient.ensureQueryData(detailQuery(params.type, id));
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Title unavailable | Lumiere" }, {
			name: "robots",
			content: "noindex"
		}] };
		const desc = (loaderData.overview || `Watch ${loaderData.title} on Lumiere.`).slice(0, 155);
		const image = img(loaderData.backdrop_path, "w1280");
		return { meta: [
			{ title: `${loaderData.title} (${year(loaderData.release_date)}) | Lumiere` },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: `${loaderData.title} | Lumiere`
			},
			{
				property: "og:description",
				content: desc
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			...image ? [{
				property: "og:image",
				content: image
			}, {
				name: "twitter:image",
				content: image
			}] : []
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { detailQuery as n, Route as t };
