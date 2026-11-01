const UA = 'ExploreMate/2.0 (trip planner; https://github.com/it21208744/exploremate)'
const cache = new Map()

/** fetch() + JSON with timeout, friendly errors and a small in-memory TTL cache. */
export async function fetchJson(url, { ttl = 10 * 60 * 1000, timeout = 12000, headers = {}, ...opts } = {}) {
  const key = opts.method && opts.method !== 'GET' ? null : url
  if (key && cache.has(key)) {
    const hit = cache.get(key)
    if (hit.expires > Date.now()) return hit.data
    cache.delete(key)
  }
  const res = await fetch(url, {
    ...opts,
    headers: { 'User-Agent': UA, Accept: 'application/json', ...headers },
    signal: AbortSignal.timeout(timeout),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const err = new Error(`Request to ${new URL(url).host} failed (${res.status}) ${text.slice(0, 200)}`)
    err.status = res.status
    throw err
  }
  const data = await res.json()
  if (key && ttl > 0) {
    cache.set(key, { data, expires: Date.now() + ttl })
    if (cache.size > 500) cache.delete(cache.keys().next().value)
  }
  return data
}
