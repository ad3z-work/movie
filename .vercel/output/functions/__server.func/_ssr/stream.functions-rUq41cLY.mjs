import { l as createServerFn } from "./createServerFn-YI1B8o6p.mjs";
import { a as objectType, i as numberType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-C7lcn7pe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stream.functions-rUq41cLY.js
var schema = objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive(),
	season: numberType().int().positive().optional(),
	episode: numberType().int().positive().optional()
});
/**
* Single playback provider (CineSrc). Kept server-side so its name and
* URL never show in the UI; the player loads it silently as the default.
*/
function embedServers(data) {
	var _data$season, _data$episode;
	const s = (_data$season = data.season) !== null && _data$season !== void 0 ? _data$season : 1;
	const e = (_data$episode = data.episode) !== null && _data$episode !== void 0 ? _data$episode : 1;
	return [{
		name: "CineSrc",
		url: data.type === "tv" ? `https://cinesrc.st/embed/tv/${data.id}?s=${s}&e=${e}` : `https://cinesrc.st/embed/movie/${data.id}`,
		referrer: "no-referrer"
	}];
}
/**
* Resolves the configured third-party embed player for a title.
*/
var getStreamSources_createServerFn_handler = createServerRpc({
	id: "9581086b42abad28d708d406eda42ad31e03071284a7e26c9cd7a7c634295635",
	name: "getStreamSources",
	filename: "src/lib/stream.functions.ts"
}, (opts) => getStreamSources.__executeServer(opts));
var getStreamSources = createServerFn({ method: "GET" }).inputValidator((input) => schema.parse(input)).handler(getStreamSources_createServerFn_handler, async ({ data }) => {
	return {
		sources: embedServers(data),
		embed: null,
		error: null
	};
});
//#endregion
export { getStreamSources_createServerFn_handler };
