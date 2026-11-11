//#region \0@oxc-project+runtime@0.142.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var _provider;
var _providerCalled;
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
/**
* Singleton instance of {@link TimeoutManager}, used throughout TanStack Query to schedule and cancel timers.
*/
var timeoutManager = new (_provider = /* @__PURE__ */ new WeakMap(), _providerCalled = /* @__PURE__ */ new WeakMap(), class {
	constructor() {
		_classPrivateFieldInitSpec(this, _provider, defaultTimeoutProvider);
		_classPrivateFieldInitSpec(this, _providerCalled, false);
	}
	/**
	* `setTimeoutProvider` can be used to set a custom implementation of the
	* `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions,
	* called a `TimeoutProvider`.
	*
	* This may be useful if you notice event loop performance issues with
	* thousands of queries. A custom TimeoutProvider could also support timer
	* delays longer than the global `setTimeout` maximum delay value of about
	* 24 days.
	*
	* It is important to call `setTimeoutProvider` before creating a
	* QueryClient or queries, so that the same provider is used consistently
	* for all timers in the application, since different TimeoutProviders
	* cannot cancel each others' timers.
	* @param provider - The `TimeoutProvider` to use for all timers from now on.
	* @example
	* ```ts
	* import { timeoutManager, QueryClient } from '@tanstack/query-core'
	* import { CustomTimeoutProvider } from './CustomTimeoutProvider'
	*
	* timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())
	*
	* export const queryClient = new QueryClient()
	* ```
	*/
	setTimeoutProvider(provider) {
		_classPrivateFieldSet2(_provider, this, provider);
	}
	/**
	* `setTimeout` schedules a callback to run after approximately `delay`
	* milliseconds, like the global `setTimeout` function. The callback can be
	* canceled with `clearTimeout`.
	*
	* It returns a timer ID, which may be a number or an object that can be
	* coerced to a number via `Symbol.toPrimitive`.
	* @param callback - The function to call when the timeout elapses.
	* @param delay - The time to wait before calling `callback`, in milliseconds.
	* @returns The timer ID, to pass to {@link TimeoutManager#clearTimeout}.
	* @example
	* ```ts
	* import { timeoutManager } from '@tanstack/query-core'
	*
	* const timeoutId = timeoutManager.setTimeout(
	*   () => console.log('ran at:', new Date()),
	*   1000,
	* )
	*
	* const timeoutIdNumber: number = Number(timeoutId)
	* ```
	*/
	setTimeout(callback, delay) {
		return _classPrivateFieldGet2(_provider, this).setTimeout(callback, delay);
	}
	/**
	* `clearTimeout` cancels a timeout callback scheduled with `setTimeout`,
	* like the global `clearTimeout` function. It should be called with a
	* timer ID returned by `setTimeout`.
	* @param timeoutId - The timer ID returned by `setTimeout`, or `undefined`.
	* @example
	* ```ts
	* import { timeoutManager } from '@tanstack/query-core'
	*
	* const timeoutId = timeoutManager.setTimeout(
	*   () => console.log('ran at:', new Date()),
	*   1000,
	* )
	*
	* timeoutManager.clearTimeout(timeoutId)
	* ```
	*/
	clearTimeout(timeoutId) {
		_classPrivateFieldGet2(_provider, this).clearTimeout(timeoutId);
	}
	/**
	* `setInterval` schedules a callback to be called approximately every
	* `delay` milliseconds, like the global `setInterval` function.
	*
	* Like `setTimeout`, it returns a timer ID, which may be a number or an
	* object that can be coerced to a number via `Symbol.toPrimitive`.
	* @param callback - The function to call on every interval.
	* @param delay - The time between calls, in milliseconds.
	* @returns The timer ID, to pass to {@link TimeoutManager#clearInterval}.
	* @example
	* ```ts
	* import { timeoutManager } from '@tanstack/query-core'
	*
	* const intervalId = timeoutManager.setInterval(
	*   () => console.log('ran at:', new Date()),
	*   1000,
	* )
	* ```
	*/
	setInterval(callback, delay) {
		return _classPrivateFieldGet2(_provider, this).setInterval(callback, delay);
	}
	/**
	* `clearInterval` can be used to cancel an interval, like the global
	* `clearInterval` function. It should be called with an interval ID
	* returned by `setInterval`.
	* @param intervalId - The timer ID returned by `setInterval`, or `undefined`.
	* @example
	* ```ts
	* import { timeoutManager } from '@tanstack/query-core'
	*
	* const intervalId = timeoutManager.setInterval(
	*   () => console.log('ran at:', new Date()),
	*   1000,
	* )
	*
	* timeoutManager.clearInterval(intervalId)
	* ```
	*/
	clearInterval(intervalId) {
		_classPrivateFieldGet2(_provider, this).clearInterval(intervalId);
	}
})();
/**
* In many cases code wants to delay to the next event loop tick; this is not
* mediated by {@link timeoutManager}.
*
* This function is provided to make auditing the `tanstack/query-core` for
* incorrect use of system `setTimeout` easier.
* @param callback - The function to call on the next event loop tick.
*/
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/utils.js
/**
* @deprecated use `environmentManager.isServer()` instead.
*/
var isServer$1 = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
/**
* Resolves an {@link Updater}: calls it with `input` if it is a function, otherwise returns it as
* is.
* @param updater - The new value, or a function that receives `input` and returns the new value.
* @param input - The current value, passed to `updater` if it is a function.
* @returns The new value.
*/
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
/**
* Checks whether a value can be used as a timeout: a non-negative, finite number.
* @param value - The value to check.
* @returns `true` if `value` is a number that is `>= 0` and not `Infinity`.
*/
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
/**
* Calculates how long until data updated at `updatedAt` becomes stale.
* @param updatedAt - The timestamp, in milliseconds, at which the data was last updated.
* @param staleTime - The time, in milliseconds, after which data is considered stale. Defaults to
* `0`.
* @returns The remaining time in milliseconds, or `0` if the data is already stale.
*/
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
/**
* Resolves an option that can be given either as a value or as a function of the query, such as
* `staleTime`.
* @param value - The option value, or a function that receives `query` and returns the value.
* @param query - The query passed to `value` if it is a function.
* @returns The resolved value, or `undefined` if `value` is `undefined`.
*/
function resolveQueryValue(value, query) {
	return typeof value === "function" ? value(query) : value;
}
/**
* Checks whether a query matches the given {@link QueryFilters}.
* Every filter that is specified must match; filters that are left unspecified are ignored.
* @param filters - The filters to check the query against.
* @param query - The query to check.
* @returns `true` if the query matches every specified filter.
* @example
* ```ts
* const queryCache = queryClient.getQueryCache()
*
* const matchingQueries = queryCache
*   .getAll()
*   .filter((query) => matchQuery({ queryKey: ['posts'] }, query))
* ```
*/
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
/**
* Checks whether a mutation matches the given {@link MutationFilters}.
* Every filter that is specified must match; filters that are left unspecified are ignored.
* If a `mutationKey` filter is provided but the mutation has no `mutationKey` of its own, it does not match.
* @param filters - The filters to check the mutation against.
* @param mutation - The mutation to check.
* @returns `true` if the mutation matches every specified filter.
* @example
* ```ts
* const mutationCache = queryClient.getMutationCache()
*
* const matchingMutations = mutationCache
*   .getAll()
*   .filter((mutation) => matchMutation({ mutationKey: ['addPost'] }, mutation))
* ```
*/
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
/**
* Hashes a query key with the query's `queryKeyHashFn` option, falling back to {@link hashKey}.
* @param queryKey - The query key to hash.
* @param options - The query options that may provide a custom `queryKeyHashFn`.
* @returns The query hash, a string that identifies the query in the cache.
*/
function hashQueryKeyByOptions(queryKey, options) {
	return ((options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || hashKey)(queryKey);
}
/**
* Default query & mutation keys hash function.
* Hashes the value into a stable hash.
* @param queryKey - The query or mutation key to hash.
* @returns The stable hash of the key, as a JSON string.
* @example
* ```ts
* // Object keys are sorted, so key order doesn't affect the hash:
* hashKey(['todos', { page: 1, filter: 'done' }]) // === '["todos",{"filter":"done","page":1}]'
* ```
*/
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") {
		if (Array.isArray(a) && Array.isArray(b)) {
			if (b.length > a.length) return false;
			for (let i = 0; i < b.length; i++) if (!partialMatchKey(a[i], b[i])) return false;
			return true;
		}
		const bKeys = Object.keys(b);
		for (const key of bKeys) if (!partialMatchKey(a[key], b[key])) return false;
		return true;
	}
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
	if (a === b) return a;
	if (depth > 500) return b;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem, depth + 1);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
/**
* Shallow compare objects.
* @param a - The first object.
* @param b - The second object, or `undefined`.
* @returns `true` if both objects have the same keys, with strictly equal values for each key.
*/
function shallowEqualObjects(a, b) {
	if (!b || Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key of Object.keys(a)) if (!hasOwn.call(b, key) || a[key] !== b[key]) return false;
	return true;
}
/**
* Checks whether a value is an array with no holes and no extra properties.
* @param value - The value to check.
* @returns `true` if `value` is an array whose number of own keys equals its `length`.
*/
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
/**
* Checks whether a value is a plain object, e.g. created with an object literal or
* `Object.create(null)`.
* @param o - The value to check.
* @returns `true` if `o` is a plain object.
*/
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const objectPrototype = Object.getPrototypeOf(o);
	const ctor = objectPrototype === null || objectPrototype === void 0 ? void 0 : objectPrototype.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return false;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (objectPrototype !== Object.prototype) return false;
	return true;
}
/**
* Checks whether a value's `Object.prototype.toString` tag is `[object Object]`.
* @param o - The value to check.
* @returns `true` if the tag is `[object Object]`.
*/
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
/**
* Waits for the given time, using the configured {@link timeoutManager}.
* @param timeout - The time to wait, in milliseconds.
* @returns A promise that resolves after `timeout` milliseconds.
*/
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
/**
* Applies a query's `structuralSharing` option when writing new data.
* @param prevData - The previously cached data.
* @param data - The new data.
* @param options - The query options, whose `structuralSharing` decides how the data is merged.
* @returns The result of a custom `structuralSharing` function, `data` with its unchanged parts
* replaced by those of `prevData` by default, or `data` as is if `structuralSharing` is `false`.
* @throws {Error} The error from the default structural sharing, e.g. when the data is not JSON serializable.
* Outside production, it is also logged to the console.
*/
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
/**
* Returns a new array with `item` added at the end. If that makes the array longer than `max`,
* excess items are removed from the start.
* @param items - The current items.
* @param item - The value to append.
* @param max - The maximum number of items to keep. `0` (the default) means no limit.
* @returns A new array with `item` added.
*/
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(-max) : newItems;
}
/**
* Returns a new array with `item` added at the start. If that makes the array longer than `max`,
* excess items are removed from the end.
* @param items - The current items.
* @param item - The value to prepend.
* @param max - The maximum number of items to keep. `0` (the default) means no limit.
* @returns A new array with `item` added.
*/
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, max) : newItems;
}
/**
* Sentinel value that can be passed as a query's `queryFn` to conditionally disable the query (equivalent
* to `enabled: false`) while preserving full type inference for the query's data. Unlike `enabled: false`,
* a query disabled via `skipToken` cannot be triggered with `refetch`.
* @example
* ```ts
* new QueryObserver(queryClient, {
*   queryKey: ['post', postId],
*   queryFn: postId != null ? () => fetchPost(postId) : skipToken,
* })
* ```
*/
var skipToken = Symbol();
/**
* Returns the function to call for a fetch. If there is no `queryFn` but the fetch was started from
* an `initialPromise`, that promise is returned instead. If there is no usable `queryFn` (missing or
* {@link skipToken}), the returned function rejects with a `Missing queryFn` error.
* @param options - The query options with the `queryFn`, and the `queryHash` used in error messages.
* @param fetchOptions - The fetch options, which may carry an `initialPromise`.
* @returns The function to call for the fetch.
*/
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && (fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.initialPromise)) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
/**
* Resolves a `throwOnError` option to a boolean.
* If `throwOnError` is a function, it is called with `params` (e.g. the error and, depending on the caller,
* additional context such as the query or mutation) and its result is returned, allowing the throwing
* behavior to be decided per error. Otherwise, `throwOnError` itself is coerced to a boolean (`undefined`
* resolves to `false`).
* @param throwOnError - The `throwOnError` option: a boolean, a function that decides per error, or
* `undefined`.
* @param params - The arguments passed to `throwOnError` if it is a function.
* @returns Whether the error should be thrown.
* @example
* ```ts
* const throwOnError =
*   query.state.error && typeof options.throwOnError === 'function'
*     ? shouldThrowError(options.throwOnError, [query.state.error, query])
*     : options.throwOnError
* ```
*/
function shouldThrowError(throwOnError, params) {
	if (typeof throwOnError === "function") return throwOnError(...params);
	return !!throwOnError;
}
var fetchSignal = Symbol();
/**
* Adds a lazy `signal` getter to an object, such as a query function context. The first time
* `signal` is read, `onCancelled` is registered for the signal's `abort` event (or called right
* away if it is already aborted), so cancellation is only tracked when the signal is actually used.
* @param object - The object to add the `signal` property to.
* @param getSignal - Returns the `AbortSignal`. Called once, when `signal` is first read.
* @param onCancelled - Called when the signal is aborted, if `signal` was read.
* @param internalSignal - The fetch signal to forward without consuming the getter.
* @returns The same object, with the `signal` property added.
*/
function addConsumeAwareSignal(object, getSignal, onCancelled, internalSignal) {
	let consumed = false;
	let signal;
	Object.defineProperties(object, {
		[fetchSignal]: { value: internalSignal },
		signal: {
			enumerable: true,
			get: () => {
				var _signal;
				(_signal = signal) !== null && _signal !== void 0 || (signal = getSignal());
				if (consumed) return signal;
				consumed = true;
				if (signal.aborted) onCancelled();
				else signal.addEventListener("abort", onCancelled, { once: true });
				return signal;
			}
		}
	});
	return object;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/environmentManager.js
var isServerFn = () => isServer$1;
/**
* Returns whether the current runtime should be treated as a server environment.
* @returns `true` if the runtime is treated as a server.
*/
var isServer = () => isServerFn();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/subscribable.js
/**
* The base class behind everything in Query that you can subscribe to: `QueryCache`, `MutationCache`,
* the observers, and the `FocusManager`/`OnlineManager` behind `focusManager` and `onlineManager`.
* Subclasses decide what a listener receives and when it is called.
*/
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	/**
	* Registers a listener to be called on every update this object notifies about. Returns a function
	* that removes the listener again — call it to stop listening. The base class never drops a listener
	* on its own, though some subclasses clear all of theirs in `destroy()`.
	* @param listener - Called on each update, with whatever the subclass passes to its subscribers.
	* @returns A function that removes the listener.
	* @example
	* ```ts
	* const unsubscribe = subscribable.subscribe(() => {
	*   // react to the update
	* })
	*
	* unsubscribe()
	* ```
	*/
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	/**
	* Returns `true` while at least one listener is registered, `false` once they have all unsubscribed.
	* @returns `true` if at least one listener is registered.
	*/
	hasListeners() {
		return this.listeners.size > 0;
	}
	/**
	* Called after a listener is added. Does nothing here; subclasses override it, e.g. to start
	* tracking what they observe once the first listener subscribes.
	*/
	onSubscribe() {}
	/**
	* Called after a listener is removed. Does nothing here; subclasses override it, e.g. to clean up
	* once the last listener unsubscribes.
	*/
	onUnsubscribe() {}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/focusManager.js
var _focused;
var _cleanup$1;
var _setup$1;
/**
* Singleton instance of {@link FocusManager}, used to manage and observe the focus state within TanStack Query.
*/
var focusManager = new (_focused = /* @__PURE__ */ new WeakMap(), _cleanup$1 = /* @__PURE__ */ new WeakMap(), _setup$1 = /* @__PURE__ */ new WeakMap(), class extends Subscribable {
	constructor() {
		super();
		_classPrivateFieldInitSpec(this, _focused, void 0);
		_classPrivateFieldInitSpec(this, _cleanup$1, void 0);
		_classPrivateFieldInitSpec(this, _setup$1, void 0);
		_classPrivateFieldSet2(_setup$1, this, (onFocus) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		});
	}
	onSubscribe() {
		if (!_classPrivateFieldGet2(_cleanup$1, this)) this.setEventListener(_classPrivateFieldGet2(_setup$1, this));
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			var _classPrivateFieldGet2$7;
			(_classPrivateFieldGet2$7 = _classPrivateFieldGet2(_cleanup$1, this)) === null || _classPrivateFieldGet2$7 === void 0 || _classPrivateFieldGet2$7.call(this);
			_classPrivateFieldSet2(_cleanup$1, this, void 0);
		}
	}
	/**
	* `setEventListener` can be used to set a custom event listener that will
	* be used to determine the focus state. The provided `setup` function
	* receives a `setFocused` callback: call it with a `boolean` to manually
	* set the focus state, or with no arguments to re-evaluate the current
	* focus state and notify subscribers.
	* @param setup - Receives the `setFocused` callback, registers the event listener, and may return
	* a cleanup function that is called when the listener is replaced or no longer needed.
	* @example
	* ```ts
	* import { focusManager } from '@tanstack/query-core'
	*
	* focusManager.setEventListener((handleFocus) => {
	*   const listener = () => handleFocus()
	*   // Listen to visibilitychange
	*   if (typeof window !== 'undefined' && window.addEventListener) {
	*     window.addEventListener('visibilitychange', listener, false)
	*   }
	*
	*   return () => {
	*     // Be sure to unsubscribe if a new handler is set
	*     window.removeEventListener('visibilitychange', listener)
	*   }
	* })
	* ```
	*/
	setEventListener(setup) {
		var _classPrivateFieldGet3;
		_classPrivateFieldSet2(_setup$1, this, setup);
		(_classPrivateFieldGet3 = _classPrivateFieldGet2(_cleanup$1, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.call(this);
		_classPrivateFieldSet2(_cleanup$1, this, setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		}));
	}
	/**
	* `setFocused` can be used to manually set the focus state. Set `undefined`
	* to fall back to the default focus check.
	* @param focused - The focus state, or `undefined` to use the default focus check.
	* @example
	* ```ts
	* import { focusManager } from '@tanstack/query-core'
	*
	* // Set focused
	* focusManager.setFocused(true)
	*
	* // Set unfocused
	* focusManager.setFocused(false)
	*
	* // Fallback to the default focus check
	* focusManager.setFocused(undefined)
	* ```
	*/
	setFocused(focused) {
		if (_classPrivateFieldGet2(_focused, this) !== focused) {
			_classPrivateFieldSet2(_focused, this, focused);
			this.onFocus();
		}
	}
	/**
	* `onFocus` notifies all subscribed listeners with the current focus state.
	*/
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	/**
	* `isFocused` can be used to get the current focus state.
	* @returns The focus state set with `setFocused`, or otherwise whether the document is visible.
	*/
	isFocused() {
		var _globalThis$document;
		if (typeof _classPrivateFieldGet2(_focused, this) === "boolean") return _classPrivateFieldGet2(_focused, this);
		return ((_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.visibilityState) !== "hidden";
	}
})();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/notifyManager.js
/**
* Default scheduling function used by the notify manager.
* Schedules the callback with the system's `setTimeout(callback, 0)`.
*/
var defaultScheduler = systemSetTimeoutZero;
/**
* Creates a notify manager, which schedules and batches notifications to subscribers. Query uses a
* single instance of it, exported as {@link notifyManager}.
* @returns A new notify manager.
*/
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		/**
		* Batches all updates scheduled inside the passed callback.
		* This is mainly used internally to optimize query client updating.
		* Batches can be nested; the queue is only flushed once the outermost `batch` call finishes.
		* The return value of `callback` is passed through.
		* @param callback - The function to run in the batch.
		* @returns The return value of `callback`.
		*/
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		/**
		* All calls to the wrapped function will be batched.
		* @param callback - The function to wrap.
		* @returns A function that schedules a call to `callback` with the given arguments.
		*/
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		/**
		* Schedules a function to be run on the next batch.
		* By default, the batch is run with a `setTimeout`, but this can be configured via `setScheduler`.
		*/
		schedule,
		/**
		* Use this method to set a custom notify function.
		* This can be used to for example wrap notifications with `React.act` while running tests.
		* @param fn - Receives each notification callback and must call it.
		*/
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		/**
		* Use this method to set a custom function to batch notifications together into a single tick.
		* Framework adapters use this to plug in their own batching primitive, so that a single query
		* update only triggers one re-render instead of one per subscriber.
		* @param fn - Receives a function that runs a batch of notifications and must call it.
		* @example
		* ```ts
		* import { notifyManager } from '@tanstack/query-core'
		* import { batch } from 'solid-js'
		*
		* notifyManager.setBatchNotifyFunction(batch)
		* ```
		*/
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		/**
		* Configures a custom callback that schedules when the next batch runs.
		* The default behavior is `setTimeout(callback, 0)`.
		* @param fn - Receives a callback that runs the next batch, and schedules it.
		* @example
		* ```ts
		* import { notifyManager } from '@tanstack/query-core'
		*
		* // Schedule batches in the next microtask
		* notifyManager.setScheduler(queueMicrotask)
		*
		* // Schedule batches before the next frame is rendered
		* notifyManager.setScheduler(requestAnimationFrame)
		*
		* // Schedule batches some time in the future
		* notifyManager.setScheduler((cb) => setTimeout(cb, 10))
		* ```
		*/
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
/**
* Handles scheduling and batching callbacks in TanStack Query.
*/
var notifyManager = createNotifyManager();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/onlineManager.js
var _online;
var _cleanup;
var _setup;
/**
* Singleton instance of {@link OnlineManager}, used to manage and observe the online state within TanStack Query.
*/
var onlineManager = new (_online = /* @__PURE__ */ new WeakMap(), _cleanup = /* @__PURE__ */ new WeakMap(), _setup = /* @__PURE__ */ new WeakMap(), class extends Subscribable {
	constructor() {
		super();
		_classPrivateFieldInitSpec(this, _online, true);
		_classPrivateFieldInitSpec(this, _cleanup, void 0);
		_classPrivateFieldInitSpec(this, _setup, void 0);
		_classPrivateFieldSet2(_setup, this, (onOnline) => {
			if (typeof window !== "undefined" && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		});
	}
	onSubscribe() {
		if (!_classPrivateFieldGet2(_cleanup, this)) this.setEventListener(_classPrivateFieldGet2(_setup, this));
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			var _classPrivateFieldGet2$6;
			(_classPrivateFieldGet2$6 = _classPrivateFieldGet2(_cleanup, this)) === null || _classPrivateFieldGet2$6 === void 0 || _classPrivateFieldGet2$6.call(this);
			_classPrivateFieldSet2(_cleanup, this, void 0);
		}
	}
	/**
	* `setEventListener` can be used to set a custom event listener that will
	* be used to determine the online state. The provided `setup` function
	* receives a `setOnline` callback that should be called with a `boolean`
	* whenever the online state changes.
	* @param setup - Receives the `setOnline` callback, registers the event listener, and may return
	* a cleanup function that is called when the listener is replaced or no longer needed.
	* @example
	* ```ts
	* import NetInfo from '@react-native-community/netinfo'
	* import { onlineManager } from '@tanstack/query-core'
	*
	* onlineManager.setEventListener((setOnline) => {
	*   return NetInfo.addEventListener((state) => {
	*     setOnline(!!state.isConnected)
	*   })
	* })
	* ```
	*/
	setEventListener(setup) {
		var _classPrivateFieldGet3;
		_classPrivateFieldSet2(_setup, this, setup);
		(_classPrivateFieldGet3 = _classPrivateFieldGet2(_cleanup, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.call(this);
		_classPrivateFieldSet2(_cleanup, this, setup(this.setOnline.bind(this)));
	}
	/**
	* `setOnline` can be used to manually set the online state.
	* @param online - The online state.
	* @example
	* ```ts
	* import { onlineManager } from '@tanstack/query-core'
	*
	* // Set to online
	* onlineManager.setOnline(true)
	*
	* // Set to offline
	* onlineManager.setOnline(false)
	* ```
	*/
	setOnline(online) {
		if (_classPrivateFieldGet2(_online, this) !== online) {
			_classPrivateFieldSet2(_online, this, online);
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	/**
	* `isOnline` can be used to get the current online state.
	* @returns `true` if online.
	*/
	isOnline() {
		return _classPrivateFieldGet2(_online, this);
	}
})();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/retryer.js
/**
* The default `retryDelay`: doubles with every failure, starting at 1 second, up to 30 seconds.
* @param failureCount - The number of failures so far.
* @returns The delay before the next retry, in milliseconds.
*/
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
/**
* Checks whether a fetch can run for the given network mode.
* @param networkMode - The `networkMode` option. Defaults to `'online'`.
* @returns `true` if the network mode is not `'online'`, or if it is and the client is online.
*/
function canFetch(networkMode) {
	return (networkMode !== null && networkMode !== void 0 ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}
/**
* The error thrown by a `Retryer` (and surfaced to `query.promise`/`mutation`) when a fetch is cancelled, e.g. via
* `query.cancel()`. `revert`, if `true`, tells the caller to restore the state the query was in before the fetch
* started instead of surfacing the error. `silent`, if `true`, tells the caller to suppress this error and instead
* resolve with the promise of the fetch that triggered the cancellation.
* @example
* ```ts
* query.cancel()
*
* try {
*   await query.promise
* } catch (error) {
*   if (error instanceof CancelledError) {
*     // the fetch was cancelled, e.g. via `query.cancel()`
*   }
* }
* ```
*/
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options === null || options === void 0 ? void 0 : options.revert;
		this.silent = options === null || options === void 0 ? void 0 : options.silent;
	}
};
/**
* Creates a retryer, which runs a function and retries it on failure according to the `retry` and
* `retryDelay` options. It pauses while the network mode doesn't allow fetching or `canRun` returns
* `false`, and can be cancelled. Queries and mutations use it to run their `queryFn` and
* `mutationFn`.
* @param config - The function to run, the retry options, and the callbacks for failures, pausing,
* continuing, and cancellation.
* @returns The retryer, whose `promise` settles with the result of the function.
*/
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	let status = "pending";
	let promiseResolve;
	let promiseReject;
	const promise = new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;
	});
	promise.catch(noop);
	const isResolved = () => status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			var _config$onCancel;
			const error = new CancelledError(cancelOptions);
			reject(error);
			(_config$onCancel = config.onCancel) === null || _config$onCancel === void 0 || _config$onCancel.call(config, error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn === null || continueFn === void 0 || continueFn();
			status = "resolved";
			promiseResolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn === null || continueFn === void 0 || continueFn();
			status = "rejected";
			promiseReject(value);
		}
	};
	const pause = (canResume) => {
		return new Promise((continueResolve) => {
			var _config$onPause;
			continueFn = (value) => {
				if (isResolved() || canResume()) continueResolve(value);
			};
			(_config$onPause = config.onPause) === null || _config$onPause === void 0 || _config$onPause.call(config);
		}).then(() => {
			var _config$onContinue;
			continueFn = void 0;
			if (!isResolved()) (_config$onContinue = config.onContinue) === null || _config$onContinue === void 0 || _config$onContinue.call(config);
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise !== null && initialPromise !== void 0 ? initialPromise : config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			var _config$retry, _config$retryDelay, _config$onFail;
			if (isResolved()) return;
			const retry = (_config$retry = config.retry) !== null && _config$retry !== void 0 ? _config$retry : isServer() ? 0 : 3;
			const retryDelay = (_config$retryDelay = config.retryDelay) !== null && _config$retryDelay !== void 0 ? _config$retryDelay : defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			(_config$onFail = config.onFail) === null || _config$onFail === void 0 || _config$onFail.call(config, failureCount, error);
			sleep(delay).then(() => {
				return isResolved() || canContinue() ? void 0 : pause(canContinue);
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise,
		status: () => status,
		cancel,
		continue: () => {
			continueFn === null || continueFn === void 0 || continueFn();
			return promise;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause(canStart).then(run);
			return promise;
		}
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/removable.js
var _gcTimeout;
/**
* The base class for cache entries that are garbage collected once nothing is using them —
* `Query` and `Mutation` both extend it. `gcTime` controls how long an unused entry is kept.
*/
var Removable = (_gcTimeout = /* @__PURE__ */ new WeakMap(), class {
	constructor() {
		_classPrivateFieldInitSpec(this, _gcTimeout, void 0);
	}
	/**
	* Clears the pending garbage collection timeout, so the entry is no longer scheduled for removal.
	* A subclass may override this to release what it holds on to as well — `Query` also cancels any
	* in-flight fetch.
	*/
	destroy() {
		this.clearGcTimeout();
	}
	/**
	* Schedules the entry to be removed from its cache after `gcTime`, replacing any timeout scheduled
	* before. Nothing is scheduled if `gcTime` is `Infinity`.
	*/
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) _classPrivateFieldSet2(_gcTimeout, this, timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime));
	}
	/**
	* Updates `gcTime`, keeping the longest one seen so far. Without a value, it defaults to 5 minutes
	* on the client and `Infinity` on the server.
	* @param newGcTime - The `gcTime` from the latest options, if any.
	*/
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime !== null && newGcTime !== void 0 ? newGcTime : isServer() ? Infinity : 3e5);
	}
	/**
	* Cancels the scheduled removal, if there is one.
	*/
	clearGcTimeout() {
		if (_classPrivateFieldGet2(_gcTimeout, this) !== void 0) {
			timeoutManager.clearTimeout(_classPrivateFieldGet2(_gcTimeout, this));
			_classPrivateFieldSet2(_gcTimeout, this, void 0);
		}
	}
});
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
/**
* Creates the behavior that fetches the pages of an infinite query: the next or previous page for
* `fetchNextPage`/`fetchPreviousPage`, or all pages again from the start on a refetch.
* @param pages - The number of pages to fetch from the start when all pages are fetched again,
* e.g. from the `pages` option of `queryClient.infiniteQuery`. Defaults to the number of cached
* pages.
* @returns The query behavior to set on an infinite query.
*/
function infiniteQueryBehavior(pages) {
	return { onFetch: (context, query) => {
		var _context$fetchOptions, _context$state$data, _context$state$data2;
		const options = context.options;
		const direction = (_context$fetchOptions = context.fetchOptions) === null || _context$fetchOptions === void 0 || (_context$fetchOptions = _context$fetchOptions.meta) === null || _context$fetchOptions === void 0 || (_context$fetchOptions = _context$fetchOptions.fetchMore) === null || _context$fetchOptions === void 0 ? void 0 : _context$fetchOptions.direction;
		const oldPages = ((_context$state$data = context.state.data) === null || _context$state$data === void 0 ? void 0 : _context$state$data.pages) || [];
		const oldPageParams = ((_context$state$data2 = context.state.data) === null || _context$state$data2 === void 0 ? void 0 : _context$state$data2.pageParams) || [];
		let result = {
			pages: [],
			pageParams: []
		};
		let currentPage = 0;
		const fetchFn = async () => {
			let cancelled = false;
			const signalContext = context;
			const addSignalProperty = (object) => {
				addConsumeAwareSignal(object, () => context.signal, () => cancelled = true, signalContext[fetchSignal]);
			};
			const queryFn = ensureQueryFn(context.options, context.fetchOptions);
			const fetchPage = async (data, param, previous) => {
				if (cancelled) return Promise.reject(context.signal.reason);
				if (param == null && data.pages.length) return Promise.resolve(data);
				const createQueryFnContext = () => {
					const queryFnContext = {
						client: context.client,
						queryKey: context.queryKey,
						pageParam: param,
						direction: previous ? "backward" : "forward",
						meta: context.options.meta
					};
					addSignalProperty(queryFnContext);
					return queryFnContext;
				};
				const queryFnContext = createQueryFnContext();
				const page = await queryFn(queryFnContext);
				const { maxPages } = context.options;
				const addTo = previous ? addToStart : addToEnd;
				return {
					pages: addTo(data.pages, page, maxPages),
					pageParams: addTo(data.pageParams, param, maxPages)
				};
			};
			if (direction && oldPages.length) {
				const previous = direction === "backward";
				const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
				const oldData = {
					pages: oldPages,
					pageParams: oldPageParams
				};
				result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
			} else {
				const remainingPages = pages !== null && pages !== void 0 ? pages : oldPages.length;
				do {
					const param = currentPage === 0 ? oldPageParams[0] === void 0 ? options.initialPageParam : oldPageParams[0] : getNextPageParam(options, result);
					if (currentPage > 0 && param == null) break;
					result = await fetchPage(result, param);
					currentPage++;
				} while (currentPage < remainingPages);
			}
			return result;
		};
		if (context.options.persister) context.fetchFn = () => {
			var _context$options$pers, _context$options;
			return (_context$options$pers = (_context$options = context.options).persister) === null || _context$options$pers === void 0 ? void 0 : _context$options$pers.call(_context$options, fetchFn, {
				client: context.client,
				queryKey: context.queryKey,
				meta: context.options.meta,
				signal: context.signal
			}, query);
		};
		else context.fetchFn = fetchFn;
	} };
}
/**
* Computes the page param of the page after the last one, with the `getNextPageParam` option.
* @param options - The infinite query options.
* @param data - The current pages and page params.
* @returns The next page param, or `undefined` if there are no pages yet.
*/
function getNextPageParam(options, { pages, pageParams }) {
	const lastIndex = pages.length - 1;
	return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
/**
* Computes the page param of the page before the first one, with the `getPreviousPageParam`
* option.
* @param options - The infinite query options.
* @param data - The current pages and page params.
* @returns The previous page param, or `undefined` if there are no pages yet or no
* `getPreviousPageParam` option.
*/
function getPreviousPageParam(options, { pages, pageParams }) {
	var _options$getPreviousP;
	return pages.length > 0 ? (_options$getPreviousP = options.getPreviousPageParam) === null || _options$getPreviousP === void 0 ? void 0 : _options$getPreviousP.call(options, pages[0], pages, pageParams[0], pageParams) : void 0;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/query.js
var _queryType;
var _initialState;
var _revertState;
var _cache;
var _client$2;
var _retryer$1;
var _fetchPromise;
var _defaultOptions$1;
var _abortSignalConsumed;
var _Class_brand$2;
/**
* Represents a single cached query. A `Query` holds the query's key, options,
* state (data/error/status), and the observers currently subscribed to it.
*
* Instances are created and managed internally by `QueryCache`; application
* code typically interacts with queries indirectly through `QueryClient` or
* a framework hook like `useQuery`. Direct access to a `Query` instance is
* possible via `queryCache.find()`/`findAll()` for inspecting cache state.
* @example
* ```ts
* const queryCache = queryClient.getQueryCache()
* const query = queryCache.find({ queryKey: ['posts'] })
*
* if (query) {
*   console.log(query.state.dataUpdatedAt)
* }
* ```
*/
var Query = (_queryType = /* @__PURE__ */ new WeakMap(), _initialState = /* @__PURE__ */ new WeakMap(), _revertState = /* @__PURE__ */ new WeakMap(), _cache = /* @__PURE__ */ new WeakMap(), _client$2 = /* @__PURE__ */ new WeakMap(), _retryer$1 = /* @__PURE__ */ new WeakMap(), _fetchPromise = /* @__PURE__ */ new WeakMap(), _defaultOptions$1 = /* @__PURE__ */ new WeakMap(), _abortSignalConsumed = /* @__PURE__ */ new WeakMap(), _Class_brand$2 = /* @__PURE__ */ new WeakSet(), class extends Removable {
	constructor(config) {
		var _config$state;
		super();
		_classPrivateMethodInitSpec(this, _Class_brand$2);
		_classPrivateFieldInitSpec(this, _queryType, void 0);
		_classPrivateFieldInitSpec(this, _initialState, void 0);
		_classPrivateFieldInitSpec(this, _revertState, void 0);
		_classPrivateFieldInitSpec(this, _cache, void 0);
		_classPrivateFieldInitSpec(this, _client$2, void 0);
		_classPrivateFieldInitSpec(this, _retryer$1, void 0);
		_classPrivateFieldInitSpec(this, _fetchPromise, void 0);
		_classPrivateFieldInitSpec(this, _defaultOptions$1, void 0);
		_classPrivateFieldInitSpec(this, _abortSignalConsumed, void 0);
		_classPrivateFieldSet2(_abortSignalConsumed, this, false);
		_classPrivateFieldSet2(_defaultOptions$1, this, config.defaultOptions);
		this.setOptions(config.options);
		this.observers = [];
		_classPrivateFieldSet2(_client$2, this, config.client);
		_classPrivateFieldSet2(_cache, this, _classPrivateFieldGet2(_client$2, this).getQueryCache());
		this.queryKey = config.queryKey;
		this.queryHash = config.queryHash;
		_classPrivateFieldSet2(_initialState, this, getDefaultState$1(this.options));
		this.state = (_config$state = config.state) !== null && _config$state !== void 0 ? _config$state : _classPrivateFieldGet2(_initialState, this);
		this.scheduleGc();
	}
	/**
	* The `meta` object passed in the query's options, if any.
	* @returns The query's `meta`, or `undefined` if none was set.
	*/
	get meta() {
		return this.options.meta;
	}
	/**
	* `'infinite'` for an infinite query, otherwise `undefined`.
	* @internal
	* @returns The type of the query, set from the `_type` option (e.g. `'infinite'`).
	*/
	get queryType() {
		return _classPrivateFieldGet2(_queryType, this);
	}
	/**
	* The promise for the currently in-flight fetch, if the query is fetching.
	* `undefined` when the query is not fetching.
	* @returns The promise of the in-flight fetch, or `undefined`.
	*/
	get promise() {
		var _classPrivateFieldGet2$5;
		return (_classPrivateFieldGet2$5 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet2$5 === void 0 ? void 0 : _classPrivateFieldGet2$5.promise;
	}
	/**
	* Replaces the query's options and applies their `gcTime`. If the query has no data yet, it gets
	* the `initialData` from the new options, if any.
	* @internal
	* @param options - The new query options, merged on top of the query's default options.
	*/
	setOptions(options) {
		this.options = {
			..._classPrivateFieldGet2(_defaultOptions$1, this),
			...options
		};
		if (options === null || options === void 0 ? void 0 : options._type) _classPrivateFieldSet2(_queryType, this, options._type);
		this.updateGcTime(this.options.gcTime);
		if (this.state && this.state.data === void 0) {
			const defaultState = getDefaultState$1(this.options);
			if (defaultState.data !== void 0) {
				this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
				_classPrivateFieldSet2(_initialState, this, defaultState);
			}
		}
	}
	optionalRemove() {
		if (!this.observers.length && this.state.fetchStatus === "idle") _classPrivateFieldGet2(_cache, this).remove(this);
	}
	/**
	* Writes new data to the query and marks it as successfully fetched.
	* @internal
	* @param newData - The data to write. Structural sharing with the current data is applied.
	* @param options - Set `updatedAt` to override the timestamp, and `manual` to mark the write as
	* manual (e.g. from `queryClient.setQueryData`).
	* @returns The data that was written.
	*/
	setData(newData, options) {
		const data = replaceData(this.state.data, newData, this.options);
		_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, {
			data,
			type: "success",
			dataUpdatedAt: options === null || options === void 0 ? void 0 : options.updatedAt,
			manual: options === null || options === void 0 ? void 0 : options.manual
		});
		return data;
	}
	/**
	* Merges the given partial state directly into this query's state, notifying observers. Used
	* by persistence and broadcast plugins to restore a state snapshot, and by devtools to let a
	* user manually trigger a loading/error state or edit the cached data.
	* @param state - The partial state to merge into the query's state.
	*/
	setState(state) {
		_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, {
			type: "setState",
			state
		});
	}
	/**
	* Cancels the query's currently in-flight fetch, if any.
	* - Returns a promise that resolves once the cancellation has settled.
	* - If no fetch is in progress, resolves immediately.
	* @param options - Set `revert` to restore the state from before the fetch started, and `silent`
	* to suppress the cancellation error when a new fetch replaces the cancelled one.
	* @returns A promise that resolves once the cancellation has settled.
	* @example
	* ```ts
	* await query.cancel()
	* ```
	*/
	cancel(options) {
		var _classPrivateFieldGet3, _classPrivateFieldGet4;
		const promise = (_classPrivateFieldGet3 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.promise;
		(_classPrivateFieldGet4 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.cancel(options);
		return promise ? promise.then(noop).catch(noop) : Promise.resolve();
	}
	/**
	* Clears the query's garbage collection timeout and silently cancels any
	* in-flight fetch. Called by `QueryCache` when the query is removed from
	* the cache.
	* @see {@link Query#cancel}
	*/
	destroy() {
		super.destroy();
		this.cancel({ silent: true });
	}
	/**
	* The state the query was created with.
	* @internal
	* @returns The state the query had when it was first created, used by {@link Query#reset}.
	*/
	get resetState() {
		return _classPrivateFieldGet2(_initialState, this);
	}
	/**
	* Resets the query back to its initial state (the state it had when it was
	* first created, e.g. any `initialData`), destroying it first to cancel any
	* in-flight fetch.
	*/
	reset() {
		this.destroy();
		this.setState(this.resetState);
	}
	/**
	* Returns `true` if the query has at least one observer for which `enabled`
	* does not resolve to `false`.
	* @returns `true` if the query has an enabled observer.
	*/
	isActive() {
		return this.observers.some((observer) => resolveQueryValue(observer.options.enabled, this) !== false);
	}
	/**
	* Returns `true` if the query is disabled, meaning it will not fetch
	* automatically.
	* - If the query has observers, it is disabled when none of them are active
	*   (see `isActive`).
	* - If the query has no observers, it is disabled when its `queryFn` is
	*   `skipToken` or it has never been fetched.
	* @returns `true` if the query is disabled.
	*/
	isDisabled() {
		if (this.getObserversCount() > 0) return !this.isActive();
		return this.options.queryFn === skipToken || !this.isFetched();
	}
	/**
	* Returns `true` if the query has been fetched, i.e. it has resolved with
	* either data or an error at least once.
	* @returns `true` if the query has been fetched.
	*/
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	/**
	* Returns `true` if the query has data and at least one observer configured with
	* `staleTime: 'static'`, meaning it is treated as never stale.
	* @returns `true` if the query is static.
	*/
	isStatic() {
		if (this.state.data === void 0) return false;
		if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveQueryValue(observer.options.staleTime, this) === "static");
		return false;
	}
	/**
	* Returns `true` if the query is stale.
	* - If the query has observers, defers to whether any observer's current
	*   result reports `isStale` (which accounts for each observer's own
	*   `staleTime` and `enabled` state).
	* - If the query has no observers, it is considered stale when it has no
	*   data or has been invalidated.
	* @returns `true` if the query is stale.
	* @see {@link Query#isStaleByTime}
	* @example
	* ```ts
	* if (query.isStale()) {
	*   // refetch or otherwise treat the cached data as outdated
	* }
	* ```
	*/
	isStale() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
		return this.state.data === void 0 || this.state.isInvalidated;
	}
	/**
	* Returns `true` if the query's data is stale relative to the given
	* `staleTime` (defaults to `0`).
	* - A query with no data is always stale.
	* - `staleTime: 'static'` is never stale.
	* - An invalidated query is always stale.
	* - Otherwise, staleness is based on elapsed time since `dataUpdatedAt`.
	* @param staleTime - The time, in milliseconds, after which data is considered stale, or
	* `'static'` to never treat existing data as stale. A query without data is stale either way.
	* @returns `true` if the query's data is stale.
	* @see {@link Query#isStale}
	* @example
	* ```ts
	* const isStale = query.isStaleByTime(60 * 1000)
	* ```
	*/
	isStaleByTime(staleTime = 0) {
		if (this.state.data === void 0) return true;
		if (staleTime === "static") return false;
		if (this.state.isInvalidated) return true;
		return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
	}
	/**
	* Refetches the query when the window regains focus, if an observer wants that, and continues a
	* paused fetch.
	* @internal
	*/
	onFocus() {
		var _this$observers$find, _classPrivateFieldGet5;
		(_this$observers$find = this.observers.find((x) => x.shouldFetchOnWindowFocus())) === null || _this$observers$find === void 0 || _this$observers$find.refetch({ cancelRefetch: false });
		(_classPrivateFieldGet5 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet5 === void 0 || _classPrivateFieldGet5.continue();
	}
	/**
	* Refetches the query when the app reconnects, if an observer wants that, and continues a paused
	* fetch.
	* @internal
	*/
	onOnline() {
		var _this$observers$find2, _classPrivateFieldGet6;
		(_this$observers$find2 = this.observers.find((x) => x.shouldFetchOnReconnect())) === null || _this$observers$find2 === void 0 || _this$observers$find2.refetch({ cancelRefetch: false });
		(_classPrivateFieldGet6 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet6 === void 0 || _classPrivateFieldGet6.continue();
	}
	/**
	* Subscribes an observer to the query and stops its garbage collection.
	* @internal
	* @param observer - The observer to add. Adding an observer that is already subscribed does
	* nothing.
	*/
	addObserver(observer) {
		if (!this.observers.includes(observer)) {
			this.observers.push(observer);
			this.clearGcTimeout();
			_classPrivateFieldGet2(_cache, this).notify({
				type: "observerAdded",
				query: this,
				observer
			});
		}
	}
	/**
	* Unsubscribes an observer from the query.
	* @internal
	* @param observer - The observer to remove. When the last observer is removed, the in-flight
	* fetch is cancelled if its abort signal was consumed (otherwise only its retries are stopped),
	* and garbage collection is scheduled.
	*/
	removeObserver(observer) {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
			if (!this.observers.length) {
				if (_classPrivateFieldGet2(_retryer$1, this)) if (_classPrivateFieldGet2(_abortSignalConsumed, this) || this.state.fetchStatus === "paused" && this.state.status === "pending") _classPrivateFieldGet2(_retryer$1, this).cancel({ revert: true });
				else _classPrivateFieldGet2(_retryer$1, this).cancelRetry();
				this.scheduleGc();
			}
			_classPrivateFieldGet2(_cache, this).notify({
				type: "observerRemoved",
				query: this,
				observer
			});
		}
	}
	/**
	* Returns the number of observers currently subscribed to this query.
	* @returns The number of observers.
	* @example
	* ```ts
	* if (query.getObserversCount() === 0) {
	*   // no component is currently watching this query
	* }
	* ```
	*/
	getObserversCount() {
		return this.observers.length;
	}
	/**
	* Marks the query as invalidated, unless it is already invalidated. This
	* updates `state.isInvalidated` and notifies observers, but does not by
	* itself trigger a refetch.
	* @example
	* ```ts
	* query.invalidate()
	* ```
	*/
	invalidate() {
		if (!this.state.isInvalidated) _assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, { type: "invalidate" });
	}
	/**
	* Fetches the query, i.e. runs its `queryFn` (through any configured
	* retryer/behavior) and updates the query's state with the result.
	* - If a fetch is already in flight, returns its promise instead of
	*   starting a new one, unless `fetchOptions.cancelRefetch` is set and the
	*   query already has data, in which case the current fetch is silently
	*   cancelled first.
	* - If `options` is passed, it replaces the query's current options
	*   before fetching.
	* @param options - Query options that replace the query's current options before fetching. They
	* are not applied when an in-flight fetch is reused.
	* @param fetchOptions - Set `cancelRefetch` to cancel an in-flight fetch first (only if the query
	* already has data), and `meta` to pass extra information to the query's behavior.
	* @returns A promise that resolves with the fetched data, or rejects with the fetch error. If the
	* fetch is cancelled with `revert` while the query has data, it resolves with the restored data
	* instead.
	*/
	async fetch(options, fetchOptions) {
		var _classPrivateFieldGet7, _ref, _context$fetchOptions, _context$fetchOptions2;
		if (this.state.fetchStatus !== "idle" && ((_classPrivateFieldGet7 = _classPrivateFieldGet2(_retryer$1, this)) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.status()) !== "rejected") {
			if (this.state.data !== void 0 && (fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.cancelRefetch)) this.cancel({ silent: true });
			else if (_classPrivateFieldGet2(_retryer$1, this) && _classPrivateFieldGet2(_fetchPromise, this)) {
				_classPrivateFieldGet2(_retryer$1, this).continueRetry();
				return _classPrivateFieldGet2(_fetchPromise, this);
			}
		}
		if (options) this.setOptions(options);
		if (!this.options.queryFn) {
			const observer = this.observers.find((x) => x.options.queryFn);
			if (observer) this.setOptions(observer.options);
		}
		const abortController = new AbortController();
		const addSignalProperty = (object) => {
			Object.defineProperties(object, {
				[fetchSignal]: {
					value: abortController.signal,
					enumerable: true
				},
				signal: {
					enumerable: true,
					get: () => {
						_classPrivateFieldSet2(_abortSignalConsumed, this, true);
						return abortController.signal;
					}
				}
			});
		};
		const fetchFn = () => {
			const queryFn = ensureQueryFn(this.options, fetchOptions);
			const createQueryFnContext = () => {
				const queryFnContext = {
					client: _classPrivateFieldGet2(_client$2, this),
					queryKey: this.queryKey,
					meta: this.meta
				};
				addSignalProperty(queryFnContext);
				return queryFnContext;
			};
			const queryFnContext = createQueryFnContext();
			_classPrivateFieldSet2(_abortSignalConsumed, this, false);
			if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
			return queryFn(queryFnContext);
		};
		const createFetchContext = () => {
			const context = {
				fetchOptions,
				options: this.options,
				queryKey: this.queryKey,
				client: _classPrivateFieldGet2(_client$2, this),
				state: this.state,
				fetchFn
			};
			addSignalProperty(context);
			return context;
		};
		const context = createFetchContext();
		(_ref = _classPrivateFieldGet2(_queryType, this) === "infinite" ? infiniteQueryBehavior(this.options.pages) : this.options.behavior) === null || _ref === void 0 || _ref.onFetch(context, this);
		_classPrivateFieldSet2(_revertState, this, this.state);
		if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) === null || _context$fetchOptions === void 0 ? void 0 : _context$fetchOptions.meta)) _assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, {
			type: "fetch",
			meta: (_context$fetchOptions2 = context.fetchOptions) === null || _context$fetchOptions2 === void 0 ? void 0 : _context$fetchOptions2.meta
		});
		const retryer = _classPrivateFieldSet2(_retryer$1, this, createRetryer({
			initialPromise: fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.initialPromise,
			fn: context.fetchFn,
			onCancel: (error) => {
				if (error instanceof CancelledError && error.revert) this.setState({
					..._classPrivateFieldGet2(_revertState, this),
					fetchStatus: "idle"
				});
				abortController.abort();
			},
			onFail: (failureCount, error) => {
				_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, {
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, { type: "pause" });
			},
			onContinue: () => {
				_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, { type: "continue" });
			},
			retry: context.options.retry,
			retryDelay: context.options.retryDelay,
			networkMode: context.options.networkMode,
			canRun: () => true
		}));
		const fetchPromise = (async () => {
			try {
				var _classPrivateFieldGet8, _classPrivateFieldGet9, _classPrivateFieldGet10, _classPrivateFieldGet11;
				const data = await retryer.promise;
				if (data === void 0) throw new Error(`${this.queryHash} data is undefined`);
				this.setData(data);
				(_classPrivateFieldGet8 = (_classPrivateFieldGet9 = _classPrivateFieldGet2(_cache, this).config).onSuccess) === null || _classPrivateFieldGet8 === void 0 || _classPrivateFieldGet8.call(_classPrivateFieldGet9, data, this);
				(_classPrivateFieldGet10 = (_classPrivateFieldGet11 = _classPrivateFieldGet2(_cache, this).config).onSettled) === null || _classPrivateFieldGet10 === void 0 || _classPrivateFieldGet10.call(_classPrivateFieldGet11, data, this.state.error, this);
				return data;
			} catch (error) {
				var _classPrivateFieldGet12, _classPrivateFieldGet13, _classPrivateFieldGet14, _classPrivateFieldGet15;
				if (error instanceof CancelledError) {
					if (error.silent) {
						if (_classPrivateFieldGet2(_retryer$1, this) !== retryer && _classPrivateFieldGet2(_fetchPromise, this)) return _classPrivateFieldGet2(_fetchPromise, this);
						throw error;
					} else if (error.revert) {
						if (this.state.data === void 0) throw error;
						return this.state.data;
					}
				}
				_assertClassBrand(_Class_brand$2, this, _dispatch$1).call(this, {
					type: "error",
					error
				});
				(_classPrivateFieldGet12 = (_classPrivateFieldGet13 = _classPrivateFieldGet2(_cache, this).config).onError) === null || _classPrivateFieldGet12 === void 0 || _classPrivateFieldGet12.call(_classPrivateFieldGet13, error, this);
				(_classPrivateFieldGet14 = (_classPrivateFieldGet15 = _classPrivateFieldGet2(_cache, this).config).onSettled) === null || _classPrivateFieldGet14 === void 0 || _classPrivateFieldGet14.call(_classPrivateFieldGet15, this.state.data, error, this);
				throw error;
			} finally {
				if (_classPrivateFieldGet2(_retryer$1, this) === retryer) {
					_classPrivateFieldSet2(_retryer$1, this, void 0);
					_classPrivateFieldSet2(_fetchPromise, this, void 0);
				}
				this.scheduleGc();
			}
		})();
		_classPrivateFieldSet2(_fetchPromise, this, fetchPromise);
		retryer.start();
		return fetchPromise;
	}
});
function _dispatch$1(action) {
	const reducer = (state) => {
		switch (action.type) {
			case "failed": return {
				...state,
				fetchFailureCount: action.failureCount,
				fetchFailureReason: action.error
			};
			case "pause": return {
				...state,
				fetchStatus: "paused"
			};
			case "continue": return {
				...state,
				fetchStatus: "fetching"
			};
			case "fetch":
				var _action$meta;
				return {
					...state,
					...fetchState(state.data, this.options),
					fetchMeta: (_action$meta = action.meta) !== null && _action$meta !== void 0 ? _action$meta : null
				};
			case "success":
				const newState = {
					...state,
					...successState(action.data, action.dataUpdatedAt),
					dataUpdateCount: state.dataUpdateCount + 1,
					...!action.manual && {
						fetchStatus: "idle",
						fetchFailureCount: 0,
						fetchFailureReason: null
					}
				};
				_classPrivateFieldSet2(_revertState, this, action.manual ? newState : void 0);
				return newState;
			case "error":
				const error = action.error;
				return {
					...state,
					error,
					errorUpdateCount: state.errorUpdateCount + 1,
					errorUpdatedAt: Date.now(),
					fetchFailureCount: state.fetchFailureCount + 1,
					fetchFailureReason: error,
					fetchStatus: "idle",
					status: "error",
					isInvalidated: true
				};
			case "invalidate": return {
				...state,
				isInvalidated: true
			};
			case "setState": return {
				...state,
				...action.state
			};
		}
	};
	this.state = reducer(this.state);
	notifyManager.batch(() => {
		this.observers.slice().forEach((observer) => {
			observer.onQueryUpdate();
		});
		_classPrivateFieldGet2(_cache, this).notify({
			query: this,
			type: "updated",
			action
		});
	});
}
/**
* Returns the state changes applied when a query starts fetching.
* @param data - The query's current data. If it is `undefined`, the query is also reset to
* `'pending'` with no error.
* @param options - The query options, whose `networkMode` decides whether the query is `'fetching'`
* or `'paused'`.
* @returns The partial query state for a starting fetch.
*/
function fetchState(data, options) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
		...data === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
/**
* Returns the state changes applied when a query receives data.
* @param data - The new data.
* @param dataUpdatedAt - The timestamp the data is recorded with. Defaults to the current time.
* @returns The partial query state for a successful update.
*/
function successState(data, dataUpdatedAt) {
	return {
		data,
		dataUpdatedAt: dataUpdatedAt !== null && dataUpdatedAt !== void 0 ? dataUpdatedAt : Date.now(),
		error: null,
		isInvalidated: false,
		status: "success"
	};
}
/**
* Returns the initial state of a query, based on its `initialData` and `initialDataUpdatedAt`
* options.
* @param options - The query options.
* @returns The initial query state: `'success'` if `initialData` is set, otherwise `'pending'`.
*/
function getDefaultState$1(options) {
	const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
	const hasData = data !== void 0;
	const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
	return {
		data,
		dataUpdateCount: 0,
		dataUpdatedAt: hasData ? initialDataUpdatedAt !== null && initialDataUpdatedAt !== void 0 ? initialDataUpdatedAt : Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: false,
		status: hasData ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryObserver.js
var _client$1;
var _currentQuery;
var _currentQueryInitialState;
var _currentResult;
var _currentResultState;
var _currentResultOptions;
var _selectError;
var _selectFn;
var _selectResult;
var _lastQueryWithDefinedData;
var _staleTimeoutId;
var _refetchIntervalId;
var _currentRefetchInterval;
var _trackedProps;
var _Class_brand$1;
/**
* A `QueryObserver` watches a single query in the `QueryCache` and computes a
* `QueryObserverResult` from its state, recomputing and notifying subscribers
* whenever the underlying query (or the observer's options) changes. It is
* the primitive that framework adapters (e.g. `useQuery`) build their hooks
* on top of, but it can also be used directly to observe and switch between
* queries outside of any framework.
* @example
* ```ts
* const observer = new QueryObserver(queryClient, {
*   queryKey: ['posts'],
*   queryFn: fetchPosts,
* })
*
* const unsubscribe = observer.subscribe((result) => {
*   console.log(result.data)
* })
* ```
*/
var QueryObserver = (_client$1 = /* @__PURE__ */ new WeakMap(), _currentQuery = /* @__PURE__ */ new WeakMap(), _currentQueryInitialState = /* @__PURE__ */ new WeakMap(), _currentResult = /* @__PURE__ */ new WeakMap(), _currentResultState = /* @__PURE__ */ new WeakMap(), _currentResultOptions = /* @__PURE__ */ new WeakMap(), _selectError = /* @__PURE__ */ new WeakMap(), _selectFn = /* @__PURE__ */ new WeakMap(), _selectResult = /* @__PURE__ */ new WeakMap(), _lastQueryWithDefinedData = /* @__PURE__ */ new WeakMap(), _staleTimeoutId = /* @__PURE__ */ new WeakMap(), _refetchIntervalId = /* @__PURE__ */ new WeakMap(), _currentRefetchInterval = /* @__PURE__ */ new WeakMap(), _trackedProps = /* @__PURE__ */ new WeakMap(), _Class_brand$1 = /* @__PURE__ */ new WeakSet(), class extends Subscribable {
	constructor(client, options) {
		super();
		_classPrivateMethodInitSpec(this, _Class_brand$1);
		_classPrivateFieldInitSpec(this, _client$1, void 0);
		_classPrivateFieldInitSpec(this, _currentQuery, void 0);
		_classPrivateFieldInitSpec(this, _currentQueryInitialState, void 0);
		_classPrivateFieldInitSpec(this, _currentResult, void 0);
		_classPrivateFieldInitSpec(this, _currentResultState, void 0);
		_classPrivateFieldInitSpec(this, _currentResultOptions, void 0);
		_classPrivateFieldInitSpec(this, _selectError, void 0);
		_classPrivateFieldInitSpec(this, _selectFn, void 0);
		_classPrivateFieldInitSpec(this, _selectResult, void 0);
		_classPrivateFieldInitSpec(this, _lastQueryWithDefinedData, void 0);
		_classPrivateFieldInitSpec(this, _staleTimeoutId, void 0);
		_classPrivateFieldInitSpec(this, _refetchIntervalId, void 0);
		_classPrivateFieldInitSpec(this, _currentRefetchInterval, void 0);
		_classPrivateFieldInitSpec(this, _trackedProps, /* @__PURE__ */ new Set());
		this.options = options;
		_classPrivateFieldSet2(_client$1, this, client);
		_classPrivateFieldSet2(_selectError, this, null);
		this.bindMethods();
		this.setOptions(options);
	}
	/**
	* Binds the methods of the result (`refetch`) to the observer, so they keep working when destructured
	* from it. Subclasses override it to bind their own result methods as well.
	*/
	bindMethods() {
		this.refetch = this.refetch.bind(this);
	}
	onSubscribe() {
		if (this.listeners.size === 1) {
			_classPrivateFieldGet2(_currentQuery, this).addObserver(this);
			if (shouldFetchOnMount(_classPrivateFieldGet2(_currentQuery, this), this.options)) _assertClassBrand(_Class_brand$1, this, _executeFetch).call(this);
			else this.updateResult();
			_assertClassBrand(_Class_brand$1, this, _updateTimers).call(this);
		}
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.destroy();
	}
	/**
	* Returns whether the observed query is currently stale and configured
	* (via the `refetchOnReconnect` option) to refetch when the network
	* reconnects.
	* @returns `true` if the observer should refetch the query on reconnect.
	*/
	shouldFetchOnReconnect() {
		return shouldFetchOn(_classPrivateFieldGet2(_currentQuery, this), this.options, this.options.refetchOnReconnect);
	}
	/**
	* Returns whether the observed query is currently stale and configured
	* (via the `refetchOnWindowFocus` option) to refetch when the window
	* regains focus.
	* @returns `true` if the observer should refetch the query on window focus.
	*/
	shouldFetchOnWindowFocus() {
		return shouldFetchOn(_classPrivateFieldGet2(_currentQuery, this), this.options, this.options.refetchOnWindowFocus);
	}
	/**
	* Stops observing the current query: clears all listeners, cancels the
	* stale and refetch-interval timers, and removes this observer from the
	* query it was observing.
	*/
	destroy() {
		this.listeners = /* @__PURE__ */ new Set();
		_assertClassBrand(_Class_brand$1, this, _clearStaleTimeout).call(this);
		_assertClassBrand(_Class_brand$1, this, _clearRefetchInterval).call(this);
		_classPrivateFieldGet2(_currentQuery, this).removeObserver(this);
	}
	/**
	* Updates the observer's options. This will re-resolve the query being
	* observed (switching to a different query if the `queryKey` changed),
	* trigger a fetch if the new options require one and the observer has
	* subscribers, recompute the current result, and reschedule the stale and
	* refetch-interval timers as needed.
	* @param options - The new observer options. They are defaulted with {@link
	* QueryClient#defaultQueryOptions} before being applied.
	* @throws {Error} If `enabled` is neither a boolean nor a function.
	* @example
	* ```ts
	* observer.setOptions({ queryKey: ['posts', 1], queryFn: () => fetchPost(1) })
	* // later: switch to a different query, reusing the same observer
	* observer.setOptions({ queryKey: ['posts', 2], queryFn: () => fetchPost(2) })
	* ```
	*/
	setOptions(options) {
		const prevOptions = this.options;
		const prevQuery = _classPrivateFieldGet2(_currentQuery, this);
		this.options = _classPrivateFieldGet2(_client$1, this).defaultQueryOptions(options);
		if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveQueryValue(this.options.enabled, _classPrivateFieldGet2(_currentQuery, this)) !== "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
		_assertClassBrand(_Class_brand$1, this, _updateQuery).call(this);
		_classPrivateFieldGet2(_currentQuery, this).setOptions(this.options);
		if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) _classPrivateFieldGet2(_client$1, this).getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: _classPrivateFieldGet2(_currentQuery, this),
			observer: this
		});
		const mounted = this.hasListeners();
		if (mounted && shouldFetchOptionally(_classPrivateFieldGet2(_currentQuery, this), prevQuery, this.options, prevOptions)) _assertClassBrand(_Class_brand$1, this, _executeFetch).call(this);
		this.updateResult();
		if (mounted && (_classPrivateFieldGet2(_currentQuery, this) !== prevQuery || resolveQueryValue(this.options.enabled, _classPrivateFieldGet2(_currentQuery, this)) !== resolveQueryValue(prevOptions.enabled, _classPrivateFieldGet2(_currentQuery, this)) || resolveQueryValue(this.options.staleTime, _classPrivateFieldGet2(_currentQuery, this)) !== resolveQueryValue(prevOptions.staleTime, _classPrivateFieldGet2(_currentQuery, this)))) _assertClassBrand(_Class_brand$1, this, _updateStaleTimeout).call(this);
		const nextRefetchInterval = _assertClassBrand(_Class_brand$1, this, _computeRefetchInterval).call(this);
		if (mounted && (_classPrivateFieldGet2(_currentQuery, this) !== prevQuery || resolveQueryValue(this.options.enabled, _classPrivateFieldGet2(_currentQuery, this)) !== resolveQueryValue(prevOptions.enabled, _classPrivateFieldGet2(_currentQuery, this)) || nextRefetchInterval !== _classPrivateFieldGet2(_currentRefetchInterval, this))) _assertClassBrand(_Class_brand$1, this, _updateRefetchInterval).call(this, nextRefetchInterval);
	}
	/**
	* Computes the result the observer would produce for the given (already-defaulted) options
	* right now, building the underlying `Query` if it doesn't exist yet, without waiting for a
	* subscription callback. Called by framework adapters on every render (e.g. `useQuery`) so the
	* returned value is available synchronously, ahead of `setOptions` triggering an actual fetch.
	* @param options - The defaulted observer options to compute the result for.
	* @returns The result for the given options.
	*/
	getOptimisticResult(options) {
		const query = _classPrivateFieldGet2(_client$1, this).getQueryCache().build(_classPrivateFieldGet2(_client$1, this), options);
		const result = this.createResult(query, options);
		if (!shallowEqualObjects(this.getCurrentResult(), result)) {
			_classPrivateFieldSet2(_currentResult, this, result);
			_classPrivateFieldSet2(_currentResultOptions, this, this.options);
			_classPrivateFieldSet2(_currentResultState, this, _classPrivateFieldGet2(_currentQuery, this).state);
		}
		return result;
	}
	/**
	* Returns the most recently computed `QueryObserverResult` for the
	* observed query. This is a point-in-time read; to be notified of updates
	* as they happen, subscribe to the observer instead (its inherited
	* `subscribe` method).
	* @returns The observer's latest result.
	* @example
	* ```ts
	* const result = observer.getCurrentResult()
	* console.log(result.status, result.data)
	* ```
	*/
	getCurrentResult() {
		return _classPrivateFieldGet2(_currentResult, this);
	}
	/**
	* Wraps a `QueryObserverResult` in a `Proxy` that records which properties are read, via
	* {@link QueryObserver#trackProp} (and an optional `onPropTracked` callback). Used by framework
	* adapters when `notifyOnChangeProps` is not set, to implement its default "only re-render on
	* properties you actually read" behavior.
	* @param result - The result to wrap.
	* @param onPropTracked - Called with the name of each property that is read.
	* @returns A proxy of `result` that tracks property reads.
	*/
	trackResult(result, onPropTracked) {
		return new Proxy(result, { get: (target, key) => {
			this.trackProp(key);
			onPropTracked === null || onPropTracked === void 0 || onPropTracked(key);
			return Reflect.get(target, key);
		} });
	}
	/**
	* Records that the given `QueryObserverResult` property was read, so a subsequent update only
	* notifies this observer if a tracked property actually changed. Normally called indirectly via
	* {@link QueryObserver#trackResult}'s proxy; exposed directly for adapters that track property
	* access themselves (e.g. through their own reactivity system) instead of via the proxy.
	* @param key - The name of the property that was read.
	*/
	trackProp(key) {
		_classPrivateFieldGet2(_trackedProps, this).add(key);
	}
	/**
	* Returns the `Query` instance this observer is currently observing.
	* @returns The observed query.
	*/
	getCurrentQuery() {
		return _classPrivateFieldGet2(_currentQuery, this);
	}
	/**
	* Refetches the observed query and returns a promise that resolves with
	* the resulting `QueryObserverResult`.
	* @param options - Set `cancelRefetch` to `false` to keep a running fetch instead of cancelling
	* it, and `throwOnError` to `true` to reject when the refetch fails.
	* @returns A promise that resolves with the result after the refetch.
	* @example
	* ```ts
	* const result = await observer.refetch({ cancelRefetch: false })
	* console.log(result.data)
	* ```
	*/
	refetch({ ...options } = {}) {
		return this.fetch({ ...options });
	}
	/**
	* Fetches a query defined by the given options without affecting this
	* observer's own tracked query or result, and returns a promise that
	* resolves with the `QueryObserverResult` for that fetch. This is useful
	* for prefetching data that another observer (e.g. a query about to be
	* navigated to) will need, ahead of time.
	* @param options - The observer options of the query to fetch.
	* @returns A promise that resolves with the result for the fetched query.
	* @example
	* ```ts
	* const result = await observer.fetchOptimistic({
	*   queryKey: ['posts', 2],
	*   queryFn: () => fetchPost(2),
	* })
	* console.log(result.data)
	* ```
	*/
	fetchOptimistic(options) {
		const defaultedOptions = _classPrivateFieldGet2(_client$1, this).defaultQueryOptions(options);
		const query = _classPrivateFieldGet2(_client$1, this).getQueryCache().build(_classPrivateFieldGet2(_client$1, this), defaultedOptions);
		let unsubscribe = () => {};
		let resolveEarly;
		const cachePromise = new Promise((resolve) => {
			resolveEarly = resolve;
			unsubscribe = _classPrivateFieldGet2(_client$1, this).getQueryCache().subscribe((event) => {
				if (event.type === "updated" && event.query.queryHash === query.queryHash && query.state.data !== void 0) {
					unsubscribe();
					resolve(this.createResult(query, defaultedOptions));
				}
			});
		});
		return Promise.race([query.fetch(defaultedOptions).then(() => {
			const result = this.createResult(query, defaultedOptions);
			resolveEarly === null || resolveEarly === void 0 || resolveEarly(result);
			return result;
		}).finally(() => {
			unsubscribe();
		}), cachePromise]);
	}
	/**
	* Fetches the observed query and updates the result once the fetch settles. Used by `refetch` and,
	* in `InfiniteQueryObserver`, to fetch more pages.
	* @param fetchOptions - Options for this fetch. `cancelRefetch` defaults to `true`.
	* @returns A promise that resolves with the updated result.
	*/
	fetch(fetchOptions) {
		var _fetchOptions$cancelR;
		return _assertClassBrand(_Class_brand$1, this, _executeFetch).call(this, {
			...fetchOptions,
			cancelRefetch: (_fetchOptions$cancelR = fetchOptions.cancelRefetch) !== null && _fetchOptions$cancelR !== void 0 ? _fetchOptions$cancelR : true
		}).then(() => {
			this.updateResult();
			return _classPrivateFieldGet2(_currentResult, this);
		});
	}
	/**
	* Computes the result for a query and options from the query's state, applying `select`,
	* `placeholderData`, and the derived flags. Subclasses override it to add their own fields.
	* @param query - The query to compute the result for.
	* @param options - The observer options to compute the result with.
	* @returns The computed result.
	*/
	createResult(query, options) {
		const prevQuery = _classPrivateFieldGet2(_currentQuery, this);
		const prevOptions = this.options;
		const prevResult = _classPrivateFieldGet2(_currentResult, this);
		const prevResultState = _classPrivateFieldGet2(_currentResultState, this);
		const prevResultOptions = _classPrivateFieldGet2(_currentResultOptions, this);
		const queryInitialState = query !== prevQuery ? query.state : _classPrivateFieldGet2(_currentQueryInitialState, this);
		const { state } = query;
		let newState = { ...state };
		let isPlaceholderData = false;
		let data;
		if (options._optimisticResults) {
			const mounted = this.hasListeners();
			const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
			const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
			if (fetchOnMount || fetchOptionally) newState = {
				...newState,
				...fetchState(state.data, query.options)
			};
			if (options._optimisticResults === "isRestoring") newState.fetchStatus = "idle";
		}
		let { error, errorUpdatedAt, status } = newState;
		data = newState.data;
		let skipSelect = false;
		if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
			var _classPrivateFieldGet2$4;
			let placeholderData;
			if ((prevResult === null || prevResult === void 0 ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions === null || prevResultOptions === void 0 ? void 0 : prevResultOptions.placeholderData)) {
				placeholderData = prevResult.data;
				skipSelect = true;
			} else placeholderData = typeof options.placeholderData === "function" ? options.placeholderData((_classPrivateFieldGet2$4 = _classPrivateFieldGet2(_lastQueryWithDefinedData, this)) === null || _classPrivateFieldGet2$4 === void 0 ? void 0 : _classPrivateFieldGet2$4.state.data, _classPrivateFieldGet2(_lastQueryWithDefinedData, this)) : options.placeholderData;
			if (placeholderData !== void 0) {
				status = "success";
				data = replaceData(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, placeholderData, options);
				isPlaceholderData = true;
			}
		}
		if (options.select && data !== void 0 && !skipSelect) if (prevResult && data === (prevResultState === null || prevResultState === void 0 ? void 0 : prevResultState.data) && options.select === _classPrivateFieldGet2(_selectFn, this)) data = _classPrivateFieldGet2(_selectResult, this);
		else try {
			_classPrivateFieldSet2(_selectFn, this, options.select);
			data = options.select(data);
			data = replaceData(prevResult === null || prevResult === void 0 ? void 0 : prevResult.data, data, options);
			_classPrivateFieldSet2(_selectResult, this, data);
			_classPrivateFieldSet2(_selectError, this, null);
		} catch (selectError) {
			_classPrivateFieldSet2(_selectError, this, selectError);
		}
		else if (data === void 0) _classPrivateFieldSet2(_selectError, this, null);
		if (_classPrivateFieldGet2(_selectError, this)) {
			error = _classPrivateFieldGet2(_selectError, this);
			data = _classPrivateFieldGet2(_selectResult, this);
			errorUpdatedAt = (prevResult === null || prevResult === void 0 ? void 0 : prevResult.error) === error ? prevResult.errorUpdatedAt : Date.now();
			status = "error";
			isPlaceholderData = false;
		}
		const isFetching = newState.fetchStatus === "fetching";
		const isPending = status === "pending";
		const isError = status === "error";
		const isLoading = isPending && isFetching;
		const hasData = data !== void 0;
		return {
			status,
			fetchStatus: newState.fetchStatus,
			isPending,
			isSuccess: status === "success",
			isError,
			isInitialLoading: isLoading,
			isLoading,
			data,
			dataUpdatedAt: newState.dataUpdatedAt,
			error,
			errorUpdatedAt,
			failureCount: newState.fetchFailureCount,
			failureReason: newState.fetchFailureReason,
			errorUpdateCount: newState.errorUpdateCount,
			isFetched: query.isFetched(),
			isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
			isFetching,
			isRefetching: isFetching && !isPending,
			isLoadingError: isError && !hasData,
			isPaused: newState.fetchStatus === "paused",
			isPlaceholderData,
			isRefetchError: isError && hasData,
			isStale: isStale(query, options),
			refetch: this.refetch,
			isEnabled: resolveQueryValue(options.enabled, query) !== false
		};
	}
	/**
	* Recomputes and stores the current result from the current query/options, notifying listeners
	* if it changed. Framework adapters call this right after subscribing to make sure no query
	* update was missed in the gap between creating the observer and subscribing to it.
	*/
	updateResult() {
		const prevResult = _classPrivateFieldGet2(_currentResult, this);
		const nextResult = this.createResult(_classPrivateFieldGet2(_currentQuery, this), this.options);
		_classPrivateFieldSet2(_currentResultState, this, _classPrivateFieldGet2(_currentQuery, this).state);
		_classPrivateFieldSet2(_currentResultOptions, this, this.options);
		if (_classPrivateFieldGet2(_currentResultState, this).data !== void 0) _classPrivateFieldSet2(_lastQueryWithDefinedData, this, _classPrivateFieldGet2(_currentQuery, this));
		if (shallowEqualObjects(nextResult, prevResult)) return;
		_classPrivateFieldSet2(_currentResult, this, nextResult);
		const shouldNotifyListeners = () => {
			if (!prevResult) return true;
			const { notifyOnChangeProps } = this.options;
			const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
			if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !_classPrivateFieldGet2(_trackedProps, this).size) return true;
			if (this.options.throwOnError && _classPrivateFieldGet2(_currentResult, this).error !== prevResult.error) return true;
			for (const key of notifyOnChangePropsValue !== null && notifyOnChangePropsValue !== void 0 ? notifyOnChangePropsValue : _classPrivateFieldGet2(_trackedProps, this)) if (_classPrivateFieldGet2(_currentResult, this)[key] !== prevResult[key]) return true;
			return false;
		};
		const notifyListeners = shouldNotifyListeners();
		notifyManager.batch(() => {
			if (notifyListeners) this.listeners.forEach((listener) => {
				listener(_classPrivateFieldGet2(_currentResult, this));
			});
			_classPrivateFieldGet2(_client$1, this).getQueryCache().notify({
				query: _classPrivateFieldGet2(_currentQuery, this),
				type: "observerResultsUpdated"
			});
		});
	}
	/**
	* Updates the observer's result when the observed query changes, and reschedules its timers if it
	* has listeners.
	* @internal
	*/
	onQueryUpdate() {
		this.updateResult();
		if (this.hasListeners()) _assertClassBrand(_Class_brand$1, this, _updateTimers).call(this);
	}
});
function _executeFetch(fetchOptions) {
	_assertClassBrand(_Class_brand$1, this, _updateQuery).call(this);
	let promise = _classPrivateFieldGet2(_currentQuery, this).fetch(this.options, fetchOptions);
	if (!(fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.throwOnError)) promise = promise.catch(noop);
	return promise;
}
function _shouldScheduleTimer(timeout) {
	return !isServer() && resolveQueryValue(this.options.enabled, _classPrivateFieldGet2(_currentQuery, this)) !== false && isValidTimeout(timeout);
}
function _updateStaleTimeout() {
	_assertClassBrand(_Class_brand$1, this, _clearStaleTimeout).call(this);
	const staleTime = resolveQueryValue(this.options.staleTime, _classPrivateFieldGet2(_currentQuery, this));
	if (_classPrivateFieldGet2(_currentResult, this).isStale || !_assertClassBrand(_Class_brand$1, this, _shouldScheduleTimer).call(this, staleTime)) return;
	const timeout = timeUntilStale(_classPrivateFieldGet2(_currentResult, this).dataUpdatedAt, staleTime) + 1;
	_classPrivateFieldSet2(_staleTimeoutId, this, timeoutManager.setTimeout(() => {
		if (!_classPrivateFieldGet2(_currentResult, this).isStale) this.updateResult();
	}, timeout));
}
function _computeRefetchInterval() {
	var _resolveQueryValue;
	return (_resolveQueryValue = resolveQueryValue(this.options.refetchInterval, _classPrivateFieldGet2(_currentQuery, this))) !== null && _resolveQueryValue !== void 0 ? _resolveQueryValue : false;
}
function _updateRefetchInterval(nextInterval) {
	_assertClassBrand(_Class_brand$1, this, _clearRefetchInterval).call(this);
	_classPrivateFieldSet2(_currentRefetchInterval, this, nextInterval);
	if (_classPrivateFieldGet2(_currentRefetchInterval, this) === 0 || !_assertClassBrand(_Class_brand$1, this, _shouldScheduleTimer).call(this, _classPrivateFieldGet2(_currentRefetchInterval, this))) return;
	_classPrivateFieldSet2(_refetchIntervalId, this, timeoutManager.setInterval(() => {
		if (this.options.refetchIntervalInBackground || focusManager.isFocused()) _assertClassBrand(_Class_brand$1, this, _executeFetch).call(this);
	}, _classPrivateFieldGet2(_currentRefetchInterval, this)));
}
function _updateTimers() {
	_assertClassBrand(_Class_brand$1, this, _updateStaleTimeout).call(this);
	_assertClassBrand(_Class_brand$1, this, _updateRefetchInterval).call(this, _assertClassBrand(_Class_brand$1, this, _computeRefetchInterval).call(this));
}
function _clearStaleTimeout() {
	if (_classPrivateFieldGet2(_staleTimeoutId, this) !== void 0) {
		timeoutManager.clearTimeout(_classPrivateFieldGet2(_staleTimeoutId, this));
		_classPrivateFieldSet2(_staleTimeoutId, this, void 0);
	}
}
function _clearRefetchInterval() {
	if (_classPrivateFieldGet2(_refetchIntervalId, this) !== void 0) {
		timeoutManager.clearInterval(_classPrivateFieldGet2(_refetchIntervalId, this));
		_classPrivateFieldSet2(_refetchIntervalId, this, void 0);
	}
}
function _updateQuery() {
	const query = _classPrivateFieldGet2(_client$1, this).getQueryCache().build(_classPrivateFieldGet2(_client$1, this), this.options);
	if (query === _classPrivateFieldGet2(_currentQuery, this)) return;
	const prevQuery = _classPrivateFieldGet2(_currentQuery, this);
	_classPrivateFieldSet2(_currentQuery, this, query);
	_classPrivateFieldSet2(_currentQueryInitialState, this, query.state);
	if (this.hasListeners()) {
		prevQuery === null || prevQuery === void 0 || prevQuery.removeObserver(this);
		query.addObserver(this);
	}
}
/**
* Checks whether a query has no data yet and should do its initial load when an observer mounts.
* @param query - The query to check.
* @param options - The observer options.
* @returns `true` if the query is enabled, has no data, and isn't in an error state with
* `retryOnMount: false`.
*/
function shouldLoadOnMount(query, options) {
	return resolveQueryValue(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && resolveQueryValue(options.retryOnMount, query) === false);
}
/**
* Checks whether a query should fetch when an observer mounts: either for its initial load, or
* because it has data and `refetchOnMount` asks for a refetch.
* @param query - The query to check.
* @param options - The observer options.
* @returns `true` if the query should fetch on mount.
*/
function shouldFetchOnMount(query, options) {
	return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
/**
* Checks whether a query should fetch for a `refetchOnMount`, `refetchOnWindowFocus`, or
* `refetchOnReconnect` option.
* @param query - The query to check.
* @param options - The observer options.
* @param field - The value of the option to check.
* @returns `true` if the query is enabled, not static, and the option is `'always'`, or is not
* `false` and the query is stale.
*/
function shouldFetchOn(query, options, field) {
	if (resolveQueryValue(options.enabled, query) !== false && resolveQueryValue(options.staleTime, query) !== "static") {
		const value = resolveQueryValue(field, query);
		return value === "always" || value !== false && isStale(query, options);
	}
	return false;
}
/**
* Checks whether a query should fetch after the observer's options change.
* @param query - The query observed with the new options.
* @param prevQuery - The query observed with the previous options.
* @param options - The new observer options.
* @param prevOptions - The previous observer options.
* @returns `true` if the query changed or was disabled before, it isn't a suspense query in an
* error state, and it is stale.
*/
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
	return (query !== prevQuery || resolveQueryValue(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
/**
* Checks whether a query is stale for the given observer options.
* @param query - The query to check.
* @param options - The observer options, whose `enabled` and `staleTime` are used.
* @returns `true` if the query is enabled and its data is stale for `staleTime`.
*/
function isStale(query, options) {
	return resolveQueryValue(options.enabled, query) !== false && query.isStaleByTime(resolveQueryValue(options.staleTime, query));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutation.js
var _client;
var _observers;
var _mutationCache$1;
var _retryer;
var _Class_brand;
/**
* Represents a single mutation attempt. A `Mutation` holds the mutation's
* options, state (data/error/status), and the `MutationObserver`s currently
* subscribed to it.
*
* Instances are created and managed internally by `MutationCache`; application
* code typically interacts with mutations indirectly through `QueryClient` or
* a framework hook like `useMutation`. Direct access to a `Mutation` instance
* is possible via `mutationCache.find()`/`getAll()` for inspecting cache state.
* @example
* ```ts
* const mutationCache = queryClient.getMutationCache()
*
* const mutation = mutationCache.find({ mutationKey: ['addPost'] })
* ```
*/
var Mutation = (_client = /* @__PURE__ */ new WeakMap(), _observers = /* @__PURE__ */ new WeakMap(), _mutationCache$1 = /* @__PURE__ */ new WeakMap(), _retryer = /* @__PURE__ */ new WeakMap(), _Class_brand = /* @__PURE__ */ new WeakSet(), class extends Removable {
	constructor(config) {
		super();
		_classPrivateMethodInitSpec(this, _Class_brand);
		_classPrivateFieldInitSpec(this, _client, void 0);
		_classPrivateFieldInitSpec(this, _observers, void 0);
		_classPrivateFieldInitSpec(this, _mutationCache$1, void 0);
		_classPrivateFieldInitSpec(this, _retryer, void 0);
		_classPrivateFieldSet2(_client, this, config.client);
		this.mutationId = config.mutationId;
		_classPrivateFieldSet2(_mutationCache$1, this, config.mutationCache);
		_classPrivateFieldSet2(_observers, this, []);
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	/**
	* Replaces the mutation's options and applies their `gcTime`.
	* @internal
	* @param options - The new mutation options.
	*/
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	/**
	* The `meta` object passed in the mutation's options, if any.
	* @returns The mutation's `meta`, or `undefined` if none was set.
	*/
	get meta() {
		return this.options.meta;
	}
	/**
	* Subscribes an observer to the mutation and stops its garbage collection.
	* @internal
	* @param observer - The observer to add. Adding an observer that is already subscribed does
	* nothing.
	*/
	addObserver(observer) {
		if (!_classPrivateFieldGet2(_observers, this).includes(observer)) {
			_classPrivateFieldGet2(_observers, this).push(observer);
			this.clearGcTimeout();
			_classPrivateFieldGet2(_mutationCache$1, this).notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	/**
	* Unsubscribes an observer from the mutation.
	* @internal
	* @param observer - The observer to remove. Garbage collection is scheduled afterwards.
	*/
	removeObserver(observer) {
		_classPrivateFieldSet2(_observers, this, _classPrivateFieldGet2(_observers, this).filter((x) => x !== observer));
		this.scheduleGc();
		_classPrivateFieldGet2(_mutationCache$1, this).notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!_classPrivateFieldGet2(_observers, this).length) if (this.state.status === "pending") this.scheduleGc();
		else _classPrivateFieldGet2(_mutationCache$1, this).remove(this);
	}
	/**
	* Resumes a mutation that is currently paused or was restored from a
	* dehydrated, still-`pending` state.
	*
	* - If this mutation has an active retryer (it paused mid-attempt, e.g. due
	*   to the network mode or scope-based queuing), its retryer is resumed.
	* - Otherwise, if the mutation's status is still `pending` (e.g. it was
	*   dehydrated while an attempt was in flight and never got a retryer in
	*   this instance), `execute` is called again with the last known variables.
	* - Otherwise the mutation has already settled and this resolves immediately
	*   without running anything again.
	* @returns A promise that settles with the resumed mutation: it rejects if the mutation fails.
	* It resolves immediately if the mutation has already settled.
	* @see {@link Mutation#execute}
	* @example
	* ```ts
	* // typically driven by reconnect handling, e.g. queryClient.resumePausedMutations()
	* const mutation = mutationCache.find({ mutationKey: ['addPost'] })
	* await mutation?.continue()
	* ```
	*/
	continue() {
		var _this$retryer$continu, _classPrivateFieldGet2$3;
		return (_this$retryer$continu = (_classPrivateFieldGet2$3 = _classPrivateFieldGet2(_retryer, this)) === null || _classPrivateFieldGet2$3 === void 0 ? void 0 : _classPrivateFieldGet2$3.continue()) !== null && _this$retryer$continu !== void 0 ? _this$retryer$continu : this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve();
	}
	/**
	* Runs the mutation function for the given variables through a retryer, and
	* drives the mutation's state and lifecycle callbacks through to settlement.
	*
	* If this mutation's state is already `pending` when `execute` is called
	* (i.e. it was restored, still in-flight, from a dehydrated state), the
	* `onMutate` step is skipped and a `continue` action is dispatched to
	* unpause it; otherwise a `pending` action is dispatched first, then the
	* mutation cache's `onMutate` and the mutation's own `onMutate` option are
	* awaited in that order, and the resulting context is stored.
	*
	* The mutation function is then run (subject to `retry`/`retryDelay`/
	* `networkMode`, and to the mutation cache's scope-based serialization).
	* On success, the cache's `onSuccess`/`onSettled` callbacks run before the
	* mutation's own `onSuccess`/`onSettled` options, a `success` action is
	* dispatched, and the resolved data is returned. On failure, the same
	* cache-then-option ordering is used for `onError`/`onSettled`, but each of
	* those four callbacks is individually caught so that a throwing callback
	* cannot mask the original error; an `error` action is then dispatched and
	* the original error is re-thrown.
	* @param variables - The variables passed to the `mutationFn`.
	* @returns A promise that resolves with the mutation's data, or rejects with its error.
	* @see {@link Mutation#continue}
	* @example
	* ```ts
	* // Called internally by `MutationObserver.mutate` and `Mutation.continue` —
	* // applications normally trigger mutations through those, not this method.
	* const data = await mutation.execute(variables)
	* ```
	*/
	async execute(variables) {
		var _this$options$retry;
		const onContinue = () => {
			_assertClassBrand(_Class_brand, this, _dispatch).call(this, { type: "continue" });
		};
		const mutationFnContext = {
			client: _classPrivateFieldGet2(_client, this),
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		const retryer = _classPrivateFieldSet2(_retryer, this, createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				_assertClassBrand(_Class_brand, this, _dispatch).call(this, {
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				_assertClassBrand(_Class_brand, this, _dispatch).call(this, { type: "pause" });
			},
			onContinue,
			retry: (_this$options$retry = this.options.retry) !== null && _this$options$retry !== void 0 ? _this$options$retry : 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => _classPrivateFieldGet2(_mutationCache$1, this).canRun(this)
		}));
		const restored = this.state.status === "pending";
		const isPaused = !retryer.canStart();
		try {
			var _classPrivateFieldGet3, _classPrivateFieldGet4, _this$options$onSucce, _this$options2, _classPrivateFieldGet5, _classPrivateFieldGet6, _this$options$onSettl, _this$options3;
			if (restored) onContinue();
			else {
				var _this$options$onMutat, _this$options;
				_assertClassBrand(_Class_brand, this, _dispatch).call(this, {
					type: "pending",
					variables,
					isPaused
				});
				if (_classPrivateFieldGet2(_mutationCache$1, this).config.onMutate) await _classPrivateFieldGet2(_mutationCache$1, this).config.onMutate(variables, this, mutationFnContext);
				const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) === null || _this$options$onMutat === void 0 ? void 0 : _this$options$onMutat.call(_this$options, variables, mutationFnContext));
				if (context !== this.state.context) _assertClassBrand(_Class_brand, this, _dispatch).call(this, {
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			if (this.state.isPaused && retryer.canStart()) onContinue();
			const data = await retryer.start();
			await ((_classPrivateFieldGet3 = (_classPrivateFieldGet4 = _classPrivateFieldGet2(_mutationCache$1, this).config).onSuccess) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.call(_classPrivateFieldGet4, data, variables, this.state.context, this, mutationFnContext));
			await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) === null || _this$options$onSucce === void 0 ? void 0 : _this$options$onSucce.call(_this$options2, data, variables, this.state.context, mutationFnContext));
			await ((_classPrivateFieldGet5 = (_classPrivateFieldGet6 = _classPrivateFieldGet2(_mutationCache$1, this).config).onSettled) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.call(_classPrivateFieldGet6, data, null, this.state.variables, this.state.context, this, mutationFnContext));
			await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) === null || _this$options$onSettl === void 0 ? void 0 : _this$options$onSettl.call(_this$options3, data, null, variables, this.state.context, mutationFnContext));
			_assertClassBrand(_Class_brand, this, _dispatch).call(this, {
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				var _classPrivateFieldGet7, _classPrivateFieldGet8;
				await ((_classPrivateFieldGet7 = (_classPrivateFieldGet8 = _classPrivateFieldGet2(_mutationCache$1, this).config).onError) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.call(_classPrivateFieldGet8, error, variables, this.state.context, this, mutationFnContext));
			} catch (e) {
				Promise.reject(e);
			}
			try {
				var _this$options$onError, _this$options4;
				await ((_this$options$onError = (_this$options4 = this.options).onError) === null || _this$options$onError === void 0 ? void 0 : _this$options$onError.call(_this$options4, error, variables, this.state.context, mutationFnContext));
			} catch (e) {
				Promise.reject(e);
			}
			try {
				var _classPrivateFieldGet9, _classPrivateFieldGet10;
				await ((_classPrivateFieldGet9 = (_classPrivateFieldGet10 = _classPrivateFieldGet2(_mutationCache$1, this).config).onSettled) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.call(_classPrivateFieldGet10, void 0, error, this.state.variables, this.state.context, this, mutationFnContext));
			} catch (e) {
				Promise.reject(e);
			}
			try {
				var _this$options$onSettl2, _this$options5;
				await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) === null || _this$options$onSettl2 === void 0 ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, variables, this.state.context, mutationFnContext));
			} catch (e) {
				Promise.reject(e);
			}
			_assertClassBrand(_Class_brand, this, _dispatch).call(this, {
				type: "error",
				error
			});
			throw error;
		} finally {
			if (_classPrivateFieldGet2(_retryer, this) === retryer) _classPrivateFieldSet2(_retryer, this, void 0);
			_classPrivateFieldGet2(_mutationCache$1, this).runNext(this);
		}
	}
});
function _dispatch(action) {
	const reducer = (state) => {
		switch (action.type) {
			case "failed": return {
				...state,
				failureCount: action.failureCount,
				failureReason: action.error
			};
			case "pause": return {
				...state,
				isPaused: true
			};
			case "continue": return {
				...state,
				isPaused: false
			};
			case "pending": return {
				...state,
				context: action.context,
				data: void 0,
				failureCount: 0,
				failureReason: null,
				error: null,
				isPaused: action.isPaused,
				status: "pending",
				variables: action.variables,
				submittedAt: Date.now()
			};
			case "success": return {
				...state,
				data: action.data,
				failureCount: 0,
				failureReason: null,
				error: null,
				status: "success",
				isPaused: false
			};
			case "error": return {
				...state,
				data: void 0,
				error: action.error,
				failureCount: state.failureCount + 1,
				failureReason: action.error,
				isPaused: false,
				status: "error"
			};
		}
	};
	this.state = reducer(this.state);
	notifyManager.batch(() => {
		_classPrivateFieldGet2(_observers, this).forEach((observer) => {
			observer.onMutationUpdate(action);
		});
		_classPrivateFieldGet2(_mutationCache$1, this).notify({
			mutation: this,
			type: "updated",
			action
		});
	});
}
/**
* Returns the initial state of a mutation: `'idle'`, with no data, error, or variables.
* @returns The initial mutation state.
*/
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationCache.js
var _mutations;
var _scopes;
var _mutationId;
/**
* The `MutationCache` is the storage for mutations.
*
* Normally, you will not interact with the `MutationCache` directly and instead use a
* `QueryClient`. You can subscribe to it (inherited from `Subscribable`) to be informed of
* safe/known updates to the cache, such as mutations being added, removed, or updated.
* @example
* ```ts
* const unsubscribe = mutationCache.subscribe((event) => {
*   console.log(event.type, event.mutation)
* })
* ```
*/
var MutationCache = (_mutations = /* @__PURE__ */ new WeakMap(), _scopes = /* @__PURE__ */ new WeakMap(), _mutationId = /* @__PURE__ */ new WeakMap(), class extends Subscribable {
	constructor(config = {}) {
		super();
		_classPrivateFieldInitSpec(this, _mutations, void 0);
		_classPrivateFieldInitSpec(this, _scopes, void 0);
		_classPrivateFieldInitSpec(this, _mutationId, void 0);
		this.config = config;
		_classPrivateFieldSet2(_mutations, this, /* @__PURE__ */ new Set());
		_classPrivateFieldSet2(_scopes, this, /* @__PURE__ */ new Map());
		_classPrivateFieldSet2(_mutationId, this, 0);
	}
	/**
	* Creates a mutation and adds it to the cache.
	* @internal
	* @param client - The client the mutation belongs to, used to default its options.
	* @param options - The mutation options. They are defaulted with {@link
	* QueryClient#defaultMutationOptions}.
	* @param state - The initial state of the mutation, e.g. when restoring a dehydrated mutation.
	* @returns The new mutation, already added to the cache.
	*/
	build(client, options, state) {
		var _this$mutationId;
		const mutation = new Mutation({
			client,
			mutationCache: this,
			mutationId: _classPrivateFieldSet2(_mutationId, this, (_this$mutationId = _classPrivateFieldGet2(_mutationId, this), ++_this$mutationId)),
			options: client.defaultMutationOptions(options),
			state
		});
		this.add(mutation);
		return mutation;
	}
	/**
	* Adds a mutation to the cache.
	* @internal
	* @param mutation - The mutation to add. If it has a `scope`, it is queued in that scope.
	*/
	add(mutation) {
		_classPrivateFieldGet2(_mutations, this).add(mutation);
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const scopedMutations = _classPrivateFieldGet2(_scopes, this).get(scope);
			if (scopedMutations) scopedMutations.push(mutation);
			else _classPrivateFieldGet2(_scopes, this).set(scope, [mutation]);
		}
		this.notify({
			type: "added",
			mutation
		});
	}
	/**
	* Removes a mutation from the cache.
	* @internal
	* @param mutation - The mutation to remove, also from its scope's queue.
	*/
	remove(mutation) {
		if (_classPrivateFieldGet2(_mutations, this).delete(mutation)) {
			const scope = scopeFor(mutation);
			if (typeof scope === "string") {
				const scopedMutations = _classPrivateFieldGet2(_scopes, this).get(scope);
				if (scopedMutations) {
					if (scopedMutations.length > 1) {
						const index = scopedMutations.indexOf(mutation);
						if (index !== -1) scopedMutations.splice(index, 1);
					} else if (scopedMutations[0] === mutation) _classPrivateFieldGet2(_scopes, this).delete(scope);
				}
			}
		}
		this.notify({
			type: "removed",
			mutation
		});
	}
	/**
	* Checks whether a mutation can run now, given the other mutations in its `scope`.
	* @internal
	* @param mutation - The mutation to check.
	* @returns `true` if the mutation has no `scope`, or no other mutation in its scope is pending
	* ahead of it.
	*/
	canRun(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			var _classPrivateFieldGet2$2;
			const firstPendingMutation = (_classPrivateFieldGet2$2 = _classPrivateFieldGet2(_scopes, this).get(scope)) === null || _classPrivateFieldGet2$2 === void 0 ? void 0 : _classPrivateFieldGet2$2.find((m) => m.state.status === "pending");
			return !firstPendingMutation || firstPendingMutation === mutation;
		} else return true;
	}
	/**
	* Continues the next paused mutation in the same `scope` after a mutation finishes.
	* @internal
	* @param mutation - The mutation that finished.
	* @returns A promise that resolves once the next paused mutation in the same scope has continued,
	* or immediately if there is none.
	*/
	runNext(mutation) {
		var _this$scopes$get$find, _this$scopes$get;
		const scope = scopeFor(mutation);
		if (typeof scope === "string") return (_this$scopes$get$find = (_this$scopes$get = _classPrivateFieldGet2(_scopes, this).get(scope)) === null || _this$scopes$get === void 0 || (_this$scopes$get = _this$scopes$get.find((m) => m !== mutation && m.state.isPaused)) === null || _this$scopes$get === void 0 ? void 0 : _this$scopes$get.continue()) !== null && _this$scopes$get$find !== void 0 ? _this$scopes$get$find : Promise.resolve();
		else return Promise.resolve();
	}
	/**
	* Removes all mutations from the cache.
	* @example
	* ```ts
	* const mutationCache = queryClient.getMutationCache()
	*
	* mutationCache.clear()
	* ```
	*/
	clear() {
		notifyManager.batch(() => {
			const mutations = this.getAll();
			_classPrivateFieldGet2(_mutations, this).clear();
			_classPrivateFieldGet2(_scopes, this).clear();
			mutations.forEach((mutation) => {
				this.notify({
					type: "removed",
					mutation
				});
			});
		});
	}
	/**
	* Returns all mutations within the cache.
	*
	* This is not typically needed for most applications, but can come in handy when needing more
	* information about a mutation in rare scenarios.
	* @returns Every mutation in the cache.
	* @example
	* ```ts
	* const mutationCache = queryClient.getMutationCache()
	*
	* const mutations = mutationCache.getAll()
	* ```
	*/
	getAll() {
		return Array.from(_classPrivateFieldGet2(_mutations, this));
	}
	/**
	* A slightly more advanced method that can be used to get an existing mutation instance from
	* the cache. If the mutation does not exist, `undefined` is returned.
	*
	* This is not typically needed for most applications, but can come in handy when needing more
	* information about a mutation in rare scenarios.
	* @param filters - The filters to match. `exact` defaults to `true`.
	* @returns The first matching mutation, or `undefined`.
	* @see {@link MutationCache#findAll}
	* @example
	* ```ts
	* const mutationCache = queryClient.getMutationCache()
	*
	* const mutation = mutationCache.find({ mutationKey: ['addPost'] })
	* ```
	*/
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
	}
	/**
	* An even more advanced method that can be used to get existing mutation instances from the
	* cache that match the given filters. If no mutations match, an empty array is returned.
	*
	* This is not typically needed for most applications, but can come in handy when needing more
	* information about mutations in rare scenarios.
	* @param filters - The filters to match. Without filters, every mutation is returned.
	* @returns The matching mutations.
	* @see {@link MutationCache#find}
	* @example
	* ```ts
	* const mutationCache = queryClient.getMutationCache()
	*
	* const mutations = mutationCache.findAll({ mutationKey: ['addPost'] })
	* ```
	*/
	findAll(filters = {}) {
		return this.getAll().filter((mutation) => matchMutation(filters, mutation));
	}
	/**
	* Notifies every cache listener of an event, in one batch.
	* @internal
	* @param event - The event passed to every listener.
	*/
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	/**
	* Continues every paused mutation, e.g. when the app comes back online.
	* @internal
	* @returns A promise that resolves once every paused mutation has continued and settled.
	*/
	resumePausedMutations() {
		const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
		return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
	}
});
/**
* Returns the scope id of a mutation, used to run mutations with the same scope one after another.
* @param mutation - The mutation to read the scope of.
* @returns The mutation's `scope.id`, or `undefined` if it has no scope.
*/
function scopeFor(mutation) {
	var _mutation$options$sco;
	return (_mutation$options$sco = mutation.options.scope) === null || _mutation$options$sco === void 0 ? void 0 : _mutation$options$sco.id;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryCache.js
var _queries;
/**
* The `QueryCache` is the storage mechanism for TanStack Query. It stores all the data, meta
* information, and state of the queries it contains.
*
* Normally, you will not interact with the `QueryCache` directly and instead use a `QueryClient`
* for a specific cache. You can subscribe to it (inherited from `Subscribable`) to be informed of
* safe/known updates to the cache, such as queries being added, removed, or updated — updates made
* outside of the cache's own tracked mechanisms (e.g. mutating a query's state object directly) do
* not notify subscribers.
* @example
* ```ts
* const unsubscribe = queryCache.subscribe((event) => {
*   console.log(event.type, event.query)
* })
* ```
*/
var QueryCache = (_queries = /* @__PURE__ */ new WeakMap(), class extends Subscribable {
	constructor(config = {}) {
		super();
		_classPrivateFieldInitSpec(this, _queries, void 0);
		this.config = config;
		_classPrivateFieldSet2(_queries, this, /* @__PURE__ */ new Map());
	}
	/**
	* Returns the existing `Query` instance for the given options' `queryKey`/`queryHash`, or
	* builds and adds a new one to the cache if none exists yet. Used by framework adapters and
	* plugins (e.g. broadcast/persistence) that need to get-or-create a `Query` directly, bypassing
	* the reactive `QueryObserver` machinery.
	* @param client - The client the query belongs to, used to default its options.
	* @param options - The query options, including the `queryKey`. A new query is created with the
	* options defaulted by {@link QueryClient#defaultQueryOptions}.
	* @param state - The initial state of a newly created query, e.g. when hydrating. Ignored if the
	* query already exists.
	* @returns The existing or newly created query.
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	*
	* const query = queryCache.build(queryClient, {
	*   queryKey: ['posts'],
	*   queryFn: fetchPosts,
	* })
	* ```
	*/
	build(client, options, state) {
		var _options$queryHash;
		const queryKey = options.queryKey;
		const queryHash = (_options$queryHash = options.queryHash) !== null && _options$queryHash !== void 0 ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
		let query = this.get(queryHash);
		if (!query) {
			query = new Query({
				client,
				queryKey,
				queryHash,
				options: client.defaultQueryOptions(options),
				state,
				defaultOptions: client.getQueryDefaults(queryKey)
			});
			this.add(query);
		}
		return query;
	}
	/**
	* Adds a query to the cache.
	* @internal
	* @param query - The query to add. If a query with the same hash is already cached, nothing
	* happens.
	*/
	add(query) {
		if (!_classPrivateFieldGet2(_queries, this).has(query.queryHash)) {
			_classPrivateFieldGet2(_queries, this).set(query.queryHash, query);
			this.notify({
				type: "added",
				query
			});
		}
	}
	/**
	* Destroys the given `Query` and removes it from the cache, notifying subscribers with a
	* `'removed'` event. A no-op if the query is no longer the one currently stored under its hash
	* (e.g. it was already replaced). Used by plugins (e.g. the broadcast client) that mirror
	* removals across `QueryCache` instances.
	* @param query - The query to remove.
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	* const query = queryCache.find({ queryKey: ['posts'] })
	*
	* if (query) {
	*   queryCache.remove(query)
	* }
	* ```
	*/
	remove(query) {
		if (_classPrivateFieldGet2(_queries, this).get(query.queryHash) === query) {
			query.destroy();
			_classPrivateFieldGet2(_queries, this).delete(query.queryHash);
			this.notify({
				type: "removed",
				query
			});
		}
	}
	/**
	* Removes all queries from the cache.
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	*
	* queryCache.clear()
	* ```
	*/
	clear() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				this.remove(query);
			});
		});
	}
	/**
	* Returns the `Query` instance stored under the given `queryHash`, or `undefined` if none
	* exists. Unlike {@link QueryCache#find}, this looks up by the already-computed hash rather
	* than by `QueryFilters`. Used by plugins (e.g. broadcast/hydration) that already have a hash
	* to look up directly.
	* @param queryHash - The hash of the query to look up.
	* @returns The query stored under the hash, or `undefined`.
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	* const queryHash = hashKey(['posts'])
	*
	* const query = queryCache.get(queryHash)
	* ```
	*/
	get(queryHash) {
		return _classPrivateFieldGet2(_queries, this).get(queryHash);
	}
	/**
	* Returns all queries within the cache.
	* @returns Every query in the cache.
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	*
	* const queries = queryCache.getAll()
	* ```
	*/
	getAll() {
		return [..._classPrivateFieldGet2(_queries, this).values()];
	}
	/**
	* A slightly more advanced method that can be used to get an existing query instance from the
	* cache. This instance not only contains all the state for the query, but all of the instances,
	* and underlying guts of the query as well. If the query does not exist, `undefined` is
	* returned.
	*
	* This is not typically needed for most applications, but can come in handy when needing more
	* information about a query in rare scenarios (e.g. looking at `query.state.dataUpdatedAt` to
	* decide whether a query is fresh enough to be used as an initial value).
	* @param filters - The filters to match, including the required `queryKey`. `exact` defaults to
	* `true`.
	* @returns The first matching query, or `undefined`.
	* @see {@link QueryCache#findAll}
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	*
	* const query = queryCache.find({ queryKey: ['posts'] })
	* ```
	*/
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((query) => matchQuery(defaultedFilters, query));
	}
	/**
	* An even more advanced method that can be used to get existing query instances from the cache
	* that partially match a query key. If no queries match, an empty array is returned.
	*
	* This is not typically needed for most applications, but can come in handy when needing more
	* information about queries in rare scenarios.
	* @param filters - The filters to match. Without filters, every query is returned.
	* @returns The matching queries.
	* @see {@link QueryCache#find}
	* @example
	* ```ts
	* const queryCache = queryClient.getQueryCache()
	*
	* const queries = queryCache.findAll({ queryKey: ['posts'] })
	* ```
	*/
	findAll(filters = {}) {
		const queries = this.getAll();
		return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
	}
	/**
	* Notifies every cache listener of an event, in one batch.
	* @internal
	* @param event - The event passed to every listener.
	*/
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	/**
	* Calls {@link Query#onFocus} on every cached query, in one batch.
	* @internal
	*/
	onFocus() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onFocus();
			});
		});
	}
	/**
	* Calls {@link Query#onOnline} on every cached query, in one batch.
	* @internal
	*/
	onOnline() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onOnline();
			});
		});
	}
});
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryClient.js
var _queryCache;
var _mutationCache;
var _defaultOptions;
var _queryDefaults;
var _mutationDefaults;
var _mountCount;
var _unsubscribeFocus;
var _unsubscribeOnline;
/**
* `QueryClient` is used to interact with a cache of queries and mutations. It owns a
* `QueryCache` and a `MutationCache` (creating default ones if none are passed in) and holds
* the default options that are applied to queries and mutations created through it.
* @example
* ```ts
* const queryClient = new QueryClient({
*   defaultOptions: {
*     queries: {
*       staleTime: Infinity,
*     },
*   },
* })
*
* await queryClient.query({ queryKey: ['posts'], queryFn: fetchPosts })
* ```
*/
var QueryClient = (_queryCache = /* @__PURE__ */ new WeakMap(), _mutationCache = /* @__PURE__ */ new WeakMap(), _defaultOptions = /* @__PURE__ */ new WeakMap(), _queryDefaults = /* @__PURE__ */ new WeakMap(), _mutationDefaults = /* @__PURE__ */ new WeakMap(), _mountCount = /* @__PURE__ */ new WeakMap(), _unsubscribeFocus = /* @__PURE__ */ new WeakMap(), _unsubscribeOnline = /* @__PURE__ */ new WeakMap(), class {
	constructor(config = {}) {
		_classPrivateFieldInitSpec(this, _queryCache, void 0);
		_classPrivateFieldInitSpec(this, _mutationCache, void 0);
		_classPrivateFieldInitSpec(this, _defaultOptions, void 0);
		_classPrivateFieldInitSpec(this, _queryDefaults, void 0);
		_classPrivateFieldInitSpec(this, _mutationDefaults, void 0);
		_classPrivateFieldInitSpec(this, _mountCount, void 0);
		_classPrivateFieldInitSpec(this, _unsubscribeFocus, void 0);
		_classPrivateFieldInitSpec(this, _unsubscribeOnline, void 0);
		_classPrivateFieldSet2(_queryCache, this, config.queryCache || new QueryCache());
		_classPrivateFieldSet2(_mutationCache, this, config.mutationCache || new MutationCache());
		_classPrivateFieldSet2(_defaultOptions, this, config.defaultOptions || {});
		_classPrivateFieldSet2(_queryDefaults, this, /* @__PURE__ */ new Map());
		_classPrivateFieldSet2(_mutationDefaults, this, /* @__PURE__ */ new Map());
		_classPrivateFieldSet2(_mountCount, this, 0);
	}
	/**
	* Called by a framework adapter's `QueryClientProvider`-equivalent when it mounts, to start
	* listening for focus/online events and resume paused mutations. Ref-counted via an internal
	* mount count, so nested or multiple providers sharing the same `QueryClient` don't tear down
	* the shared listeners until the last one unmounts.
	*/
	mount() {
		var _this$mountCount;
		_classPrivateFieldSet2(_mountCount, this, (_this$mountCount = _classPrivateFieldGet2(_mountCount, this), _this$mountCount++, _this$mountCount));
		if (_classPrivateFieldGet2(_mountCount, this) !== 1) return;
		_classPrivateFieldSet2(_unsubscribeFocus, this, focusManager.subscribe(async (focused) => {
			if (focused) {
				await this.resumePausedMutations();
				_classPrivateFieldGet2(_queryCache, this).onFocus();
			}
		}));
		_classPrivateFieldSet2(_unsubscribeOnline, this, onlineManager.subscribe(async (online) => {
			if (online) {
				await this.resumePausedMutations();
				_classPrivateFieldGet2(_queryCache, this).onOnline();
			}
		}));
	}
	/**
	* The inverse of {@link QueryClient#mount} — called by a framework adapter's
	* `QueryClientProvider`-equivalent when it unmounts. Only tears down the focus/online
	* listeners once the mount count returns to `0`.
	*/
	unmount() {
		var _this$mountCount3, _classPrivateFieldGet2$1, _classPrivateFieldGet3;
		_classPrivateFieldSet2(_mountCount, this, (_this$mountCount3 = _classPrivateFieldGet2(_mountCount, this), _this$mountCount3--, _this$mountCount3));
		if (_classPrivateFieldGet2(_mountCount, this) !== 0) return;
		(_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_unsubscribeFocus, this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.call(this);
		_classPrivateFieldSet2(_unsubscribeFocus, this, void 0);
		(_classPrivateFieldGet3 = _classPrivateFieldGet2(_unsubscribeOnline, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.call(this);
		_classPrivateFieldSet2(_unsubscribeOnline, this, void 0);
	}
	/**
	* Returns the number of queries in the cache that are currently fetching, optionally
	* matching a set of filters. This includes background-fetching, loading new pages, and
	* loading more infinite query results.
	* @param filters - Narrows down which fetching queries are counted. Without filters, every
	* fetching query is counted.
	* @returns The number of matching queries whose `fetchStatus` is `'fetching'`.
	* @example
	* ```ts
	* if (queryClient.isFetching()) {
	*   console.log('At least one query is fetching!')
	* }
	* ```
	*/
	isFetching(filters) {
		return _classPrivateFieldGet2(_queryCache, this).findAll({
			...filters,
			fetchStatus: "fetching"
		}).length;
	}
	/**
	* Returns the number of mutations in the cache that are currently pending, optionally
	* matching a set of filters.
	* @param filters - Narrows down which pending mutations are counted. Without filters, every
	* pending mutation is counted.
	* @returns The number of matching mutations whose `status` is `'pending'`.
	* @example
	* ```ts
	* if (queryClient.isMutating()) {
	*   console.log('At least one mutation is pending!')
	* }
	* ```
	*/
	isMutating(filters) {
		return _classPrivateFieldGet2(_mutationCache, this).findAll({
			...filters,
			status: "pending"
		}).length;
	}
	/**
	* Imperative (non-reactive) way to retrieve data for a QueryKey.
	* Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
	*
	* Hint: Do not use this function inside a component, because it won't receive updates.
	* Use `useQuery` to create a `QueryObserver` that subscribes to changes.
	* @param queryKey - The query key of the query to read.
	* @returns The cached data for the query, or `undefined` if no query with this key has been observed yet.
	* @see {@link QueryClient#getQueriesData}
	*/
	getQueryData(queryKey) {
		var _classPrivateFieldGet4;
		const options = this.defaultQueryOptions({ queryKey });
		return (_classPrivateFieldGet4 = _classPrivateFieldGet2(_queryCache, this).get(options.queryHash)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.state.data;
	}
	/**
	* Returns the cached data of a query, or fetches it if there is none. With `revalidateIfStale`,
	* stale cached data is also refetched in the background.
	* @param options - The query options. If the query has no cached data yet, it is fetched with
	* these options.
	* @returns A promise that resolves to the cached data, or to the fetched data if nothing was
	* cached yet.
	* @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
	*/
	ensureQueryData(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		const query = _classPrivateFieldGet2(_queryCache, this).build(this, defaultedOptions);
		const cachedData = query.state.data;
		if (cachedData === void 0) return this.fetchQuery(options);
		if (options.revalidateIfStale && query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
		return Promise.resolve(cachedData);
	}
	/**
	* Imperative (non-reactive) way to retrieve the cached data of multiple queries at once.
	* Only queries matching the given filters are returned; if none match, an empty array is
	* returned.
	*
	* Because the matched queries can hold data of different shapes (e.g. a broad filter can match
	* queries with unrelated data types), the `TQueryFnData` generic defaults to `unknown` rather
	* than being inferred. Passing a more specific type is a convenience for call sites that know
	* every matched query holds the same shape — it is not checked against the actual cache
	* contents.
	* @param filters - The filters that select which queries to read.
	* @returns An array of query key and data pairs. The data is `undefined` for a query with no cached data.
	* @see {@link QueryClient#getQueryData}
	* @example
	* ```ts
	* const data = queryClient.getQueriesData({ queryKey: ['posts'] })
	* ```
	*/
	getQueriesData(filters) {
		return _classPrivateFieldGet2(_queryCache, this).findAll(filters).map(({ queryKey, state }) => {
			return [queryKey, state.data];
		});
	}
	/**
	* Synchronous way to immediately update a query's cached data. If the updater (or the value
	* passed) resolves to `undefined`, the cache is left untouched and no query is created;
	* otherwise, if the query does not exist yet, it will be created. To update multiple queries
	* at once by partially matching query keys, use {@link QueryClient#setQueriesData} instead.
	*
	* Updates must be performed immutably: do not mutate `oldData`, or data previously retrieved
	* via {@link QueryClient#getQueryData}, in place.
	* @param queryKey - The query key to set data for.
	* @param updater - Either the new data, or a function that receives the current data (which
	* may be `undefined`) and returns the new data.
	* @param options - Set `updatedAt` to override the timestamp the written data is recorded with.
	* @returns The data that was written, or `undefined` if the updater returned `undefined` — in that case
	* the write is skipped and the cache is left unchanged.
	* @example
	* ```ts
	* queryClient.setQueryData(['posts'], newPosts)
	*
	* // Or, using an updater function that receives the current data:
	* queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
	* ```
	*/
	setQueryData(queryKey, updater, options) {
		var _classPrivateFieldGet5;
		const defaultedOptions = this.defaultQueryOptions({ queryKey });
		const data = functionalUpdate(updater, (_classPrivateFieldGet5 = _classPrivateFieldGet2(_queryCache, this).get(defaultedOptions.queryHash)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.state.data);
		if (data === void 0) return;
		return _classPrivateFieldGet2(_queryCache, this).build(this, defaultedOptions).setData(data, {
			...options,
			manual: true
		});
	}
	/**
	* Synchronous way to immediately update the cached data of multiple queries at once, using
	* filters or partial query key matching. Only queries that already exist and match the given
	* filters are updated; no new cache entries are created. Internally this calls
	* {@link QueryClient#setQueryData} for each matching query.
	* @param filters - The filters that select which existing queries to update.
	* @param updater - Either the new data, or a function that receives each matched query's current
	* data (which may be `undefined`) and returns the new data.
	* @param options - Set `updatedAt` to override the timestamp the written data is recorded with.
	* @returns One `[queryKey, data]` tuple per matched query, in the same shape and with the same
	* `undefined` case as {@link QueryClient#setQueryData}.
	* @example
	* ```ts
	* queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) =>
	*   oldPosts ? oldPosts.filter((post) => post.id !== deletedId) : oldPosts,
	* )
	* ```
	*/
	setQueriesData(filters, updater, options) {
		return notifyManager.batch(() => _classPrivateFieldGet2(_queryCache, this).findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
	}
	/**
	* Imperative (non-reactive) way to retrieve an existing query's state. If the query does not
	* exist, `undefined` is returned.
	* @param queryKey - The query key of the query to read.
	* @returns The query's state, or `undefined` if no query with this key exists.
	* @example
	* ```ts
	* const state = queryClient.getQueryState(['posts'])
	* console.log(state?.dataUpdatedAt)
	* ```
	*/
	getQueryState(queryKey) {
		var _classPrivateFieldGet6;
		const options = this.defaultQueryOptions({ queryKey });
		return (_classPrivateFieldGet6 = _classPrivateFieldGet2(_queryCache, this).get(options.queryHash)) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.state;
	}
	/**
	* Removes queries from the cache that match the given filters. Unlike
	* {@link QueryClient#invalidateQueries} or {@link QueryClient#refetchQueries}, this removes
	* matching queries from the cache instead of refetching them. Without filters, every query in
	* the cache is removed.
	* @param filters - The filters that select which queries to remove. Without filters, every query
	* is removed.
	* @example
	* ```ts
	* queryClient.removeQueries({ queryKey: ['posts'], exact: true })
	* ```
	*/
	removeQueries(filters) {
		const queryCache = _classPrivateFieldGet2(_queryCache, this);
		notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				queryCache.remove(query);
			});
		});
	}
	/**
	* Resets queries matching the given filters back to their initial state (e.g. any
	* `initialData`), notifying subscribers rather than removing them. Active queries among the
	* matched set are then refetched, and the returned promise resolves once that refetch settles.
	* @param filters - The filters that select which queries to reset. Without filters, every query
	* is reset.
	* @param options - Passed to the refetch of the active matched queries, e.g. `cancelRefetch` and
	* `throwOnError`.
	* @returns A promise that resolves once the refetch of the active matched queries settles.
	* @example
	* ```ts
	* await queryClient.resetQueries({ queryKey: ['posts'], exact: true })
	* ```
	*/
	resetQueries(filters, options) {
		const queryCache = _classPrivateFieldGet2(_queryCache, this);
		return notifyManager.batch(() => {
			const matched = queryCache.findAll(filters);
			const queriesToRefetch = new Set(matched);
			matched.forEach((query) => {
				query.reset();
			});
			return this.refetchQueries({
				type: "active",
				predicate: (query) => queriesToRefetch.has(query)
			}, options);
		});
	}
	/**
	* Cancels outgoing fetches for queries matching the given filters. Most useful when performing
	* optimistic updates, since any outgoing refetch that resolves afterwards would otherwise
	* overwrite the optimistic update. By default (`revert: true`), a cancelled query's data is
	* reverted to its state before the outgoing fetch started.
	*
	* The returned promise never rejects, even if individual cancellations fail.
	* @param filters - The filters that select which queries to cancel. Without filters, every query
	* is cancelled.
	* @param cancelOptions - Passed to each matched query's cancellation. `revert` defaults to
	* `true`.
	* @returns A promise that resolves once every cancellation has settled.
	* @example
	* ```ts
	* await queryClient.cancelQueries({ queryKey: ['posts'], exact: true })
	* ```
	*/
	cancelQueries(filters, cancelOptions = {}) {
		const defaultedCancelOptions = {
			revert: true,
			...cancelOptions
		};
		const promises = notifyManager.batch(() => _classPrivateFieldGet2(_queryCache, this).findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
		return Promise.all(promises).then(noop).catch(noop);
	}
	/**
	* Marks queries matching the given filters as invalidated. Unlike
	* {@link QueryClient#removeQueries}, invalidated queries stay in the cache.
	*
	* Unless `filters.refetchType` is `'none'`, matching queries are then refetched via
	* {@link QueryClient#refetchQueries}, using `filters.refetchType` if set, otherwise
	* `filters.type`, otherwise `'active'`.
	* @param filters - The filters that select which queries to invalidate, plus `refetchType` to
	* control which of them to refetch afterwards. Without filters, every query is invalidated.
	* @param options - Passed to {@link QueryClient#refetchQueries}, e.g. `cancelRefetch` and
	* `throwOnError`.
	* @returns A promise that resolves once the refetch settles, or immediately if `refetchType` is
	* `'none'`.
	* @example
	* ```ts
	* await queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'active' })
	* ```
	*/
	invalidateQueries(filters, options = {}) {
		return notifyManager.batch(() => {
			var _ref, _filters$refetchType;
			_classPrivateFieldGet2(_queryCache, this).findAll(filters).forEach((query) => {
				query.invalidate();
			});
			if ((filters === null || filters === void 0 ? void 0 : filters.refetchType) === "none") return Promise.resolve();
			return this.refetchQueries({
				...filters,
				type: (_ref = (_filters$refetchType = filters === null || filters === void 0 ? void 0 : filters.refetchType) !== null && _filters$refetchType !== void 0 ? _filters$refetchType : filters === null || filters === void 0 ? void 0 : filters.type) !== null && _ref !== void 0 ? _ref : "active"
			}, options);
		});
	}
	/**
	* Refetches queries matching the given filters, regardless of whether they are stale. Without
	* filters, every query in the cache is refetched. Queries that are disabled, or static (only
	* have observers with a static `staleTime`), are never refetched.
	*
	* By default (`cancelRefetch: true`), a currently running fetch is cancelled before the new
	* one starts. The returned promise does not reject on individual query failures unless
	* `throwOnError` is `true`.
	*
	* Initially paused fetches do not delay the returned promise. Their later errors are handled
	* even when `throwOnError` is `true`.
	* @param filters - The filters that select which queries to refetch. Without filters, every query
	* in the cache is included.
	* @param options - Set `cancelRefetch` to `false` to keep a running fetch instead of cancelling
	* it, and `throwOnError` to `true` to reject when a refetch that was not initially paused fails.
	* @returns A promise that resolves once all matching refetches that were not initially paused
	* have settled.
	* @example
	* ```ts
	* // refetch all active queries partially matching a query key:
	* await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
	* ```
	*/
	refetchQueries(filters, options = {}) {
		var _options$cancelRefetc;
		const fetchOptions = {
			...options,
			cancelRefetch: (_options$cancelRefetc = options.cancelRefetch) !== null && _options$cancelRefetc !== void 0 ? _options$cancelRefetc : true
		};
		const promises = notifyManager.batch(() => _classPrivateFieldGet2(_queryCache, this).findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
			let promise = query.fetch(void 0, fetchOptions);
			const isPaused = query.state.fetchStatus === "paused";
			if (!fetchOptions.throwOnError || isPaused) promise = promise.catch(noop);
			return isPaused ? Promise.resolve() : promise;
		}));
		return Promise.all(promises).then(noop);
	}
	/**
	* Asynchronous method to fetch and cache a query, resolving with the data or throwing with
	* the error.
	*
	* If the query already exists in the cache and its data is not stale (per the given
	* `staleTime`), the cached data is returned without fetching. Otherwise, the query is fetched
	* and the promise resolves once the fetch settles. If a `select` function is provided, it is
	* applied to the data in both cases (cached or freshly fetched) before it is returned.
	*
	* Unlike a reactive observer, retries are disabled by default here (`retry: false`) unless
	* explicitly configured, since there is no component to catch a thrown error and retry through
	* re-render.
	*
	* The accepted options are `QueryObserverOptions` minus the fields that only make sense for a
	* reactive observer — `enabled`, `refetchInterval`, `refetchIntervalInBackground`,
	* `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `retryOnMount`,
	* `notifyOnChangeProps`, `throwOnError`, `suspense`, and `placeholderData` are not part of this
	* method's options.
	*
	* This method replaces the deprecated `fetchQuery`, and — combined with
	* `{ staleTime: 'static' }` — the deprecated `ensureQueryData`.
	* @param options - The query options, including the `queryKey` and the `queryFn` used if the
	* query needs to fetch.
	* @returns A promise that resolves to the data, or to the result of `select` if provided. It
	* rejects with the error from the fetch or from `select`.
	* @example
	* ```ts
	* try {
	*   const data = await queryClient.query({ queryKey, queryFn, staleTime: 10000 })
	* } catch (error) {
	*   console.log(error)
	* }
	* ```
	*/
	async query(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = _classPrivateFieldGet2(_queryCache, this).build(this, defaultedOptions);
		const queryData = query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? await query.fetch(defaultedOptions) : query.state.data;
		const select = defaultedOptions.select;
		if (select) return select(queryData);
		return queryData;
	}
	/**
	* Fetches and caches a query, or returns its cached data if it isn't stale. Unlike in observers,
	* the fetch isn't retried unless `retry` is set.
	* @param options - The query options, including the `queryKey` and the `queryFn` used if the
	* query needs to fetch.
	* @returns A promise that resolves to the cached or fetched data, or rejects with the fetch
	* error.
	* @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
	*/
	fetchQuery(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = _classPrivateFieldGet2(_queryCache, this).build(this, defaultedOptions);
		return query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
	}
	/**
	* Fetches and caches a query like {@link QueryClient#fetchQuery}, but ignores the result and any
	* error.
	* @param options - The query options, including the `queryKey` and the `queryFn` used if the
	* query needs to fetch.
	* @returns A promise that resolves once the fetch settles. It never rejects.
	* @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
	*/
	prefetchQuery(options) {
		return this.fetchQuery(options).then(noop).catch(noop);
	}
	/**
	* Asynchronous method to fetch and cache an infinite query, resolving with an
	* {@link InfiniteData} object or throwing with the error.
	*
	* Behaves like {@link QueryClient#query}, accepting the same options (minus
	* `initialPageParam`), plus the required `initialPageParam`, and an optional `pages` /
	* `getNextPageParam` pair used to refetch a fixed number of pages from the start.
	*
	* This method replaces the deprecated `fetchInfiniteQuery`, and — combined with
	* `{ staleTime: 'static' }` — the deprecated `ensureInfiniteQueryData`.
	* @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
	* `initialPageParam`.
	* @returns A promise that resolves to the {@link InfiniteData}, or to the result of `select` if
	* provided. It rejects with the error from the fetch or from `select`.
	* @example
	* ```ts
	* try {
	*   const data = await queryClient.infiniteQuery({ queryKey, queryFn, initialPageParam: 0 })
	*   console.log(data.pages)
	* } catch (error) {
	*   console.log(error)
	* }
	* ```
	*/
	infiniteQuery(options) {
		options._type = "infinite";
		return this.query(options);
	}
	/**
	* Fetches and caches an infinite query, or returns its cached data if it isn't stale.
	* @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
	* `initialPageParam`.
	* @returns A promise that resolves to the cached or fetched {@link InfiniteData}, or rejects with
	* the fetch error.
	* @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
	*/
	fetchInfiniteQuery(options) {
		options._type = "infinite";
		return this.fetchQuery(options);
	}
	/**
	* Fetches and caches an infinite query like {@link QueryClient#fetchInfiniteQuery}, but ignores
	* the result and any error.
	* @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
	* `initialPageParam`.
	* @returns A promise that resolves once the fetch settles. It never rejects.
	* @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
	*/
	prefetchInfiniteQuery(options) {
		return this.fetchInfiniteQuery(options).then(noop).catch(noop);
	}
	/**
	* Returns the cached data of an infinite query, or fetches it if there is none. With
	* `revalidateIfStale`, stale cached data is also refetched in the background.
	* @param options - The infinite query options. If the query has no cached data yet, it is fetched
	* with these options.
	* @returns A promise that resolves to the cached {@link InfiniteData}, or to the fetched data if
	* nothing was cached yet.
	* @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
	*/
	ensureInfiniteQueryData(options) {
		options._type = "infinite";
		return this.ensureQueryData(options);
	}
	/**
	* Resumes mutations that were paused because there was no network connection. Does nothing
	* (resolving immediately) if the client is currently offline.
	* @returns A promise that resolves once the resumed mutations have settled.
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* await queryClient.resumePausedMutations()
	* ```
	*/
	resumePausedMutations() {
		if (onlineManager.isOnline()) return _classPrivateFieldGet2(_mutationCache, this).resumePausedMutations();
		return Promise.resolve();
	}
	/**
	* Returns the query cache this client is connected to.
	* @returns The {@link QueryCache} instance.
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* const queryCache = queryClient.getQueryCache()
	* const queries = queryCache.findAll({ queryKey: ['posts'] })
	* ```
	*/
	getQueryCache() {
		return _classPrivateFieldGet2(_queryCache, this);
	}
	/**
	* Returns the mutation cache this client is connected to.
	* @returns The {@link MutationCache} instance.
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* const mutationCache = queryClient.getMutationCache()
	* const mutations = mutationCache.findAll({ status: 'pending' })
	* ```
	*/
	getMutationCache() {
		return _classPrivateFieldGet2(_mutationCache, this);
	}
	/**
	* Returns the default options that were set when creating the client, or via
	* {@link QueryClient#setDefaultOptions}.
	* @returns The client's current default options.
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* const defaultOptions = queryClient.getDefaultOptions()
	* ```
	*/
	getDefaultOptions() {
		return _classPrivateFieldGet2(_defaultOptions, this);
	}
	/**
	* Dynamically sets the default options for this client, overwriting any previously defined
	* default options.
	* @param options - The new default options for queries and mutations.
	* @see {@link QueryClient#getDefaultOptions}
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* queryClient.setDefaultOptions({
	*   queries: {
	*     staleTime: Infinity,
	*   },
	* })
	* ```
	*/
	setDefaultOptions(options) {
		_classPrivateFieldSet2(_defaultOptions, this, options);
	}
	/**
	* Sets default options for queries whose query key partially matches the given `queryKey`.
	*
	* If several registered query defaults match a given query key, they are merged together in
	* registration order by {@link QueryClient#getQueryDefaults}, so register defaults from the
	* most generic key to the least generic one — more specific defaults should be registered
	* after more generic ones so they take precedence.
	* @param queryKey - The query key that query keys are partially matched against.
	* @param options - The default options applied to matching queries.
	* @example
	* ```ts
	* queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })
	*
	* await queryClient.query({ queryKey: ['posts'] })
	* ```
	*/
	setQueryDefaults(queryKey, options) {
		_classPrivateFieldGet2(_queryDefaults, this).set(hashKey(queryKey), {
			queryKey,
			defaultOptions: options
		});
	}
	/**
	* Returns the default options registered for queries whose query key partially matches the
	* given `queryKey`, via {@link QueryClient#setQueryDefaults}. If multiple registered defaults
	* match, they are merged together in registration order.
	* @param queryKey - The query key to look up registered defaults for.
	* @returns The merged default options of every registration that matches, or an empty object if
	* none match.
	* @example
	* ```ts
	* const defaultOptions = queryClient.getQueryDefaults(['posts'])
	* ```
	*/
	getQueryDefaults(queryKey) {
		const defaults = [..._classPrivateFieldGet2(_queryDefaults, this).values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	/**
	* Sets default options for mutations whose mutation key partially matches the given
	* `mutationKey`. As with {@link QueryClient#setQueryDefaults}, the order of registration
	* matters when several registered defaults match the same mutation key.
	* @param mutationKey - The mutation key that mutation keys are partially matched against.
	* @param options - The default options applied to matching mutations.
	* @see {@link QueryClient#getMutationDefaults}
	* @example
	* ```ts
	* queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })
	* ```
	*/
	setMutationDefaults(mutationKey, options) {
		_classPrivateFieldGet2(_mutationDefaults, this).set(hashKey(mutationKey), {
			mutationKey,
			defaultOptions: options
		});
	}
	/**
	* Returns the default options registered for mutations whose mutation key partially matches
	* the given `mutationKey`, via {@link QueryClient#setMutationDefaults}. If multiple registered
	* defaults match, they are merged together in registration order.
	* @param mutationKey - The mutation key to look up registered defaults for.
	* @returns The merged default options of every registration that matches, or an empty object if
	* none match.
	* @example
	* ```ts
	* const defaultOptions = queryClient.getMutationDefaults(['addPost'])
	* ```
	*/
	getMutationDefaults(mutationKey) {
		const defaults = [..._classPrivateFieldGet2(_mutationDefaults, this).values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	/**
	* Called by framework adapters (e.g. inside `useQuery`) to resolve the options passed by the
	* caller into their final, defaulted form: merging the client's own `defaultOptions.queries`,
	* then `queryClient.setQueryDefaults` for the given `queryKey`, then the caller's options on
	* top. A no-op if the options are already defaulted (`_defaulted: true`).
	* @param options - The query options passed by the caller.
	* @returns The defaulted options, with `queryHash` and dependent defaults (e.g.
	* `refetchOnReconnect`) filled in.
	*/
	defaultQueryOptions(options) {
		if (options._defaulted) return options;
		const defaultedOptions = {
			..._classPrivateFieldGet2(_defaultOptions, this).queries,
			...this.getQueryDefaults(options.queryKey),
			...options,
			_defaulted: true
		};
		if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
		if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
		if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
		if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
		if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
		return defaultedOptions;
	}
	/**
	* The mutation counterpart of {@link QueryClient#defaultQueryOptions}. Called by framework
	* adapters (e.g. inside `useMutation`) to merge the client's `defaultOptions.mutations`, then
	* `queryClient.setMutationDefaults` for the given `mutationKey`, then the caller's options on
	* top. A no-op if the options are already defaulted (`_defaulted: true`).
	* @param options - The mutation options passed by the caller.
	* @returns The defaulted options.
	*/
	defaultMutationOptions(options) {
		if (options === null || options === void 0 ? void 0 : options._defaulted) return options;
		return {
			..._classPrivateFieldGet2(_defaultOptions, this).mutations,
			...(options === null || options === void 0 ? void 0 : options.mutationKey) && this.getMutationDefaults(options.mutationKey),
			...options,
			_defaulted: true
		};
	}
	/**
	* Clears both the query cache and the mutation cache this client is connected to.
	* @example
	* ```ts
	* import { QueryClient } from '@tanstack/query-core'
	*
	* const queryClient = new QueryClient()
	* queryClient.clear()
	* ```
	*/
	clear() {
		_classPrivateFieldGet2(_queryCache, this).clear();
		_classPrivateFieldGet2(_mutationCache, this).clear();
	}
});
//#endregion
export { shouldThrowError as a, _assertClassBrand as c, noop as i, _classPrivateFieldInitSpec as l, QueryObserver as n, _classPrivateFieldGet2 as o, notifyManager as r, _classPrivateFieldSet2 as s, QueryClient as t, _classPrivateMethodInitSpec as u };
