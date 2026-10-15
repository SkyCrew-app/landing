import { NextResponse } from 'next/server'
import type { Dictionary } from '@/i18n'
import { clientIp, rateLimit } from '@/lib/rate-limit'

type ApiTexts = Dictionary['api']

/** Helpers shared by the form routes. */

const MAX_BODY_BYTES = 20_000

export function jsonError(status: number, message: string, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, message, ...extra }, { status, headers })
}

/** Parsed JSON body, or an error response for a wrong type, an oversized or malformed body. */
export async function readJsonBody(
  request: Request,
  t: ApiTexts,
): Promise<{ body: Record<string, unknown> } | { error: NextResponse }> {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return { error: jsonError(415, t.unsupported) }
  }
  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) return { error: jsonError(413, t.tooLong) }
  try {
    const body = JSON.parse(text)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
    return { body }
  } catch {
    return { error: jsonError(400, t.invalid) }
  }
}

/** Refuses the request once an address went over `limit` submissions of this form in `windowMs`. */
export function limitByIp(request: Request, form: string, t: ApiTexts, limit = 5, windowMs = 10 * 60_000): NextResponse | null {
  const result = rateLimit(`${form}:${clientIp(request.headers)}`, limit, windowMs)
  if (result.allowed) return null
  return jsonError(429, t.tooMany, {}, { 'Retry-After': String(result.retryAfter) })
}

/** Public origin of the site, for Stripe's return URLs. */
export function siteOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
  if (configured) return configured.replace(/\/+$/, '')
  return new URL(request.url).origin
}
