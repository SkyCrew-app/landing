/**
 * Small in-memory rate limiter (sliding window) keyed by IP address and form. It lives in the
 * Node process: it is reset on restart and not shared between several instances, which is
 * enough to slow down a script hammering a single server.
 */

const hits = new Map<string, number[]>()
let lastSweep = 0

export interface RateLimitResult {
  allowed: boolean
  /** Seconds to wait before the next allowed attempt, when refused. */
  retryAfter: number
}

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): RateLimitResult {
  if (now - lastSweep > windowMs) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    }
    lastSweep = now
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return { allowed: false, retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  return { allowed: true, retryAfter: 0 }
}

/** Test helper. */
export function resetRateLimit() {
  hits.clear()
  lastSweep = 0
}

/**
 * Client address. Behind a reverse proxy (nginx, Caddy, a PaaS) the first X-Forwarded-For entry
 * is the visitor; make sure the proxy overwrites that header rather than appending to a value
 * sent by the client.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headers.get('x-real-ip')?.trim() || 'unknown'
}
