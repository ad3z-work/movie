import { a as TSS_SERVER_FUNCTION } from "./createServerFn-YI1B8o6p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-C7lcn7pe.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
