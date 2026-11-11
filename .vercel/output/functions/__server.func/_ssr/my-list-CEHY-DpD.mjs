import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-list-CEHY-DpD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "lumiere.mylist.v1";
var EVENT = "lumiere-mylist-change";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function write(items) {
	window.localStorage.setItem(KEY, JSON.stringify(items));
	window.dispatchEvent(new Event(EVENT));
}
function useMyList() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => setItems(read());
		sync();
		setReady(true);
		window.addEventListener(EVENT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return {
		items,
		ready,
		has: (0, import_react.useCallback)((id, type) => items.some((i) => i.id === id && i.media_type === type), [items]),
		toggle: (0, import_react.useCallback)((item) => {
			const current = read();
			const exists = current.some((i) => i.id === item.id && i.media_type === item.media_type);
			write(exists ? current.filter((i) => !(i.id === item.id && i.media_type === item.media_type)) : [item, ...current]);
			return !exists;
		}, [])
	};
}
var HISTORY_KEY = "lumiere.continue.v1";
function recordWatch(entry) {
	if (typeof window === "undefined") return;
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY);
		const list = raw ? JSON.parse(raw) : [];
		const next = [{
			...entry,
			watchedAt: Date.now()
		}, ...list.filter((i) => !(i.id === entry.id && i.media_type === entry.media_type))].slice(0, 20);
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
		window.dispatchEvent(new Event("lumiere-history-change"));
	} catch {}
}
function removeWatch(id, mediaType) {
	if (typeof window === "undefined") return;
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY);
		const list = raw ? JSON.parse(raw) : [];
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(list.filter((i) => !(i.id === id && i.media_type === mediaType))));
		window.dispatchEvent(new Event("lumiere-history-change"));
	} catch {}
}
function clearHistory() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(HISTORY_KEY);
		window.dispatchEvent(new Event("lumiere-history-change"));
	} catch {}
}
function useContinueWatching() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			try {
				const raw = window.localStorage.getItem(HISTORY_KEY);
				setItems(raw ? JSON.parse(raw) : []);
			} catch {
				setItems([]);
			}
		};
		sync();
		window.addEventListener("lumiere-history-change", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("lumiere-history-change", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return items;
}
//#endregion
export { useMyList as a, useContinueWatching as i, recordWatch as n, removeWatch as r, clearHistory as t };
