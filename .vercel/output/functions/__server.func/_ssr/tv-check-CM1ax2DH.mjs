import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tv-check-CM1ax2DH.js
var import_jsx_runtime = require_jsx_runtime();
var CHECK_SCRIPT = `
(function(){
  var rows = [], shown = false;
  function paint(k, v){ var out = document.getElementById('tvc-out'); if(!out) return; var d=document.createElement('div'); d.style.padding='6px 0'; d.style.borderBottom='1px solid #333'; d.appendChild(document.createTextNode(k+': '+v)); out.appendChild(d); }
  function row(k, v){ if (shown) paint(k, v); else rows.push([k, v]); }
  function yes(b){ return b ? 'yes' : 'NO'; }
  window.addEventListener('error', function(e){ row('Error', (e.message || 'unknown') + ' @ ' + (e.filename || '') + ':' + (e.lineno || '')); });
  var ua = navigator.userAgent; var m = ua.match(/Chrome\\/(\\d+)/);
  row('Browser', ua);
  row('Chrome version', m ? m[1] : 'unknown');
  row('Screen', window.innerWidth + ' x ' + window.innerHeight);
  row('Modern scripts (module)', yes('noModule' in document.createElement('script')));
  row('Promise', yes(typeof Promise !== 'undefined'));
  row('fetch', yes(typeof fetch !== 'undefined'));
  row('CSS variables', yes(window.CSS && CSS.supports && CSS.supports('--a', '0')));
  row('Optional chaining', (function(){ try { new Function('var a={};return a?.b'); return 'yes'; } catch(e){ return 'NO'; } })());
  // Wait until the main app has had time to start, so we don't disturb it.
  setTimeout(function(){
    row('Main app started', yes(document.documentElement.getAttribute('data-app-ready') === '1'));
    shown = true;
    for (var i = 0; i < rows.length; i++) paint(rows[i][0], rows[i][1]);
  }, 5000);
})();`;
function TvCheck() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background px-6 pb-16 pt-28 text-foreground md:px-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl",
				children: "TV check"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Take a photo of this screen and send it so the TV version can be fixed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "tvc-out",
				className: "mt-6 max-w-4xl break-all text-sm",
				suppressHydrationWarning: true,
				dangerouslySetInnerHTML: { __html: "" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: CHECK_SCRIPT } })
		]
	});
}
//#endregion
export { TvCheck as component };
