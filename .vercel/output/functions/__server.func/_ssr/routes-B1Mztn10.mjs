import { a as getHome } from "./tmdb.functions-Dqn1ReHf.mjs";
import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1Mztn10.js
var homeQuery = queryOptions({
	queryKey: ["home"],
	queryFn: () => getHome(),
	staleTime: 6e5
});
//#endregion
export { homeQuery as t };
