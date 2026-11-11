const BASE = "https://api.themoviedb.org/3";

const CACHE_TTL_MS = 5 * 60 * 1000;
const SEARCH_CACHE_TTL_MS = 60 * 1000;
const MAX_CACHE_ENTRIES = 128;

const responseCache = new Map<string, { value: unknown; expiresAt: number }>();
const inFlightRequests = new Map<string, Promise<unknown>>();

export async function tmdb<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  const key = process.env["TMDB_API_KEY"];
  if (!key) throw new Error("TMDB_API_KEY is not configured");
  const url = new URL(BASE + path);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }

  const cacheKey = url.toString();
  const cached = responseCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value as T;
  if (cached) responseCache.delete(cacheKey);

  const inFlight = inFlightRequests.get(cacheKey);
  if (inFlight) return inFlight as Promise<T>;

  const cacheTtl =
    path.startsWith("/search/") || path.startsWith("/discover/")
      ? SEARCH_CACHE_TTL_MS
      : CACHE_TTL_MS;
  const request = fetchTmdb<T>(url)
    .then((value) => {
      responseCache.set(cacheKey, { value, expiresAt: Date.now() + cacheTtl });
      if (responseCache.size > MAX_CACHE_ENTRIES) {
        const oldestKey = responseCache.keys().next().value;
        if (oldestKey !== undefined) responseCache.delete(oldestKey);
      }
      return value;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });
  inFlightRequests.set(cacheKey, request);
  return request;
}

async function fetchTmdb<T>(url: URL): Promise<T> {
  // TMDB occasionally rate-limits or hiccups; retry transient failures so the
  // catalog never renders empty because of a single bad response.
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    let response: Response;
    try {
      response = await fetch(url.toString(), {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(10000),
      });
    } catch (err) {
      lastError = err;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
      continue;
    }

    if (response.ok) return (await response.json()) as T;
    lastError = new Error(`TMDB request failed (${response.status})`);
    if (response.status < 500 && response.status !== 429) throw lastError;
    if (attempt < 2) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error("TMDB request failed");
}
