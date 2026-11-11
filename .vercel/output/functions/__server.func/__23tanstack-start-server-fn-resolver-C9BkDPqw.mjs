//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-C9BkDPqw.js
var manifest = {
	"0eb7bdf2304e830f9c6aa152314e1128a8695d7b728a35f1fa6d51b2397a283e": {
		functionName: "getHome_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"1f7ea57e9849637a5382881e62b0c92d82f36f8499b47279d54eaab959e720cb": {
		functionName: "moodShuffle_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"25fa7e666e5a3afee8e19fef04b92df9ac82a750803979fbc88e2a8b05fc57dd": {
		functionName: "discover_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"2809ece6963199ea6c4f193984f07aca6518d3a0758fc74f88ab3c7af428c994": {
		functionName: "getProviders_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"4554bac009cb7b0dd4f23b35e6381cde80f8891f6cd2c529ecb25d91e64f42ba": {
		functionName: "searchMedia_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"4aa807712e7398c8928c9c1a0b56eee105e0475ef6acaccd733701b20f1798f6": {
		functionName: "tasteMix_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"5ffc5b5d38c4cc6ddf8c7802a979a04789176504fea888c81f05677293a31fb2": {
		functionName: "getDetail_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"9581086b42abad28d708d406eda42ad31e03071284a7e26c9cd7a7c634295635": {
		functionName: "getStreamSources_createServerFn_handler",
		importer: () => import("./_ssr/stream.functions-rUq41cLY.mjs")
	},
	"a88edc453082894d652124c430c7a3d066602e628a6fac62288f02cf51c49f58": {
		functionName: "getSeason_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	},
	"ebf876321ff9fb76ab5e3e0145e843f93b8696f9dada1feaafa0882cc7a7fdef": {
		functionName: "getGenres_createServerFn_handler",
		importer: () => import("./_ssr/tmdb.functions-2dvBO8wm.mjs")
	}
};
async function getServerFnById(id, access) {
	var _serverFnInfo$module;
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = (_serverFnInfo$module = serverFnInfo.module) !== null && _serverFnInfo$module !== void 0 ? _serverFnInfo$module : serverFnInfo.module = await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
