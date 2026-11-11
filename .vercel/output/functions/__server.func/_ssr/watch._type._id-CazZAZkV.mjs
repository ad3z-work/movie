import { Gt as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, i as numberType, o as stringType } from "../_libs/zod.mjs";
import { r as getDetail } from "./tmdb.functions-Dqn1ReHf.mjs";
import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch._type._id-CazZAZkV.js
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
var $$splitComponentImporter = () => import("./watch._type._id-DRSabJc4.mjs");
var searchSchema = objectType({
	s: numberType().int().min(1).optional(),
	e: numberType().int().min(1).optional(),
	v: stringType().max(40).optional()
});
var Route = createFileRoute("/watch/$type/$id")({
	validateSearch: searchSchema,
	loader: async ({ context, params }) => {
		if (params.type !== "movie" && params.type !== "tv") throw notFound();
		const id = Number(params.id);
		if (!Number.isFinite(id)) throw notFound();
		return context.queryClient.ensureQueryData(detailQuery(params.type, id));
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Player unavailable | Lumiere" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `Watch ${loaderData.title} | Lumiere`;
		const desc = (loaderData.overview || `Stream ${loaderData.title} on Lumiere.`).slice(0, 155);
		return { meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
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
			{
				name: "robots",
				content: "noindex"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { detailQuery as n, Route as t };
