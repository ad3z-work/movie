import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-C9BkDPqw.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-YI1B8o6p.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tmdb.functions-Dqn1ReHf.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getHome = createServerFn({ method: "GET" }).handler(createSsrRpc("0eb7bdf2304e830f9c6aa152314e1128a8695d7b728a35f1fa6d51b2397a283e"));
var getDetail = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive()
}).parse(d)).handler(createSsrRpc("5ffc5b5d38c4cc6ddf8c7802a979a04789176504fea888c81f05677293a31fb2"));
var searchMedia = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	q: stringType().max(120),
	page: numberType().int().min(1).max(500).default(1)
}).parse(d)).handler(createSsrRpc("4554bac009cb7b0dd4f23b35e6381cde80f8891f6cd2c529ecb25d91e64f42ba"));
var discover = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	genre: numberType().int().optional(),
	sort: stringType().max(40).default("popularity.desc"),
	yearFrom: numberType().int().min(1900).max(2100).optional(),
	yearTo: numberType().int().min(1900).max(2100).optional(),
	minRating: numberType().min(0).max(10).optional(),
	provider: numberType().int().positive().optional(),
	page: numberType().int().min(1).max(500).default(1)
}).parse(d)).handler(createSsrRpc("25fa7e666e5a3afee8e19fef04b92df9ac82a750803979fbc88e2a8b05fc57dd"));
var moodShuffle = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	type: enumType(["movie", "tv"]),
	genres: arrayType(numberType().int()).min(1).max(4)
}).parse(d)).handler(createSsrRpc("1f7ea57e9849637a5382881e62b0c92d82f36f8499b47279d54eaab959e720cb"));
var tasteMix = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ picks: arrayType(objectType({
	type: enumType(["movie", "tv"]),
	id: numberType().int().positive()
})).min(1).max(3) }).parse(d)).handler(createSsrRpc("4aa807712e7398c8928c9c1a0b56eee105e0475ef6acaccd733701b20f1798f6"));
var getGenres = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ type: enumType(["movie", "tv"]) }).parse(d)).handler(createSsrRpc("ebf876321ff9fb76ab5e3e0145e843f93b8696f9dada1feaafa0882cc7a7fdef"));
var getProviders = createServerFn({ method: "GET" }).handler(createSsrRpc("2809ece6963199ea6c4f193984f07aca6518d3a0758fc74f88ab3c7af428c994"));
var getSeason = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	id: numberType().int().positive(),
	season: numberType().int().min(0)
}).parse(d)).handler(createSsrRpc("a88edc453082894d652124c430c7a3d066602e628a6fac62288f02cf51c49f58"));
//#endregion
export { getHome as a, moodShuffle as c, getGenres as i, searchMedia as l, discover as n, getProviders as o, getDetail as r, getSeason as s, createSsrRpc as t, tasteMix as u };
