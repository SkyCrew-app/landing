import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { formatMessage, notifyOwner } from '@/lib/notify'
import { rateLimit, resetRateLimit } from '@/lib/rate-limit'
import { checkoutSchema, setupRequestSchema } from '@/lib/schemas'

describe('rateLimit', () => {
  beforeEach(() => resetRateLimit())
  it('allows `limit` hits per window and then refuses', () => {
    const t = 1_000_000
    for (let i = 0; i < 5; i++) expect(rateLimit('a', 5, 60_000, t + i).allowed).toBe(true)
    const refused = rateLimit('a', 5, 60_000, t + 10)
    expect(refused.allowed).toBe(false)
    expect(refused.retryAfter).toBeGreaterThan(0)
    expect(rateLimit('b', 5, 60_000, t + 10).allowed).toBe(true)
    expect(rateLimit('a', 5, 60_000, t + 60_001).allowed).toBe(true)
  })
})

describe('schemas', () => {
  it('requires the CGV for checkout and the consent for a request', () => {
    const base = { clubName: 'AC', contactName: 'Jo', email: 'jo@example.org', aircraft: 2, tier: 'club', cycle: 'monthly' }
    expect(checkoutSchema.safeParse({ ...base, clubName: 'AC Test', acceptCgv: false }).success).toBe(false)
    expect(checkoutSchema.safeParse({ ...base, clubName: 'AC Test', acceptCgv: true }).success).toBe(true)
    expect(setupRequestSchema.safeParse({ ...base, clubName: 'AC Test' }).success).toBe(false)
    expect(setupRequestSchema.safeParse({ ...base, clubName: 'AC Test', consent: true }).success).toBe(true)
  })
  it('refuses unknown tiers and fleets below the minimum', () => {
    const ok = { clubName: 'AC Test', contactName: 'Jo', email: 'jo@example.org', aircraft: 2, tier: 'club', cycle: 'monthly', acceptCgv: true }
    expect(checkoutSchema.safeParse({ ...ok, tier: 'premium-ia' }).success).toBe(false)
    expect(checkoutSchema.safeParse({ ...ok, aircraft: 0 }).success).toBe(false)
  })
})

describe('notifyOwner', () => {
  const env = { ...process.env }
  afterEach(() => {
    process.env = { ...env }
    vi.unstubAllGlobals()
  })

  it('posts {content} to the webhook, without mentions', async () => {
    process.env.OWNER_NOTIFY_WEBHOOK_URL = 'https://hooks.test/abc'
    delete process.env.SMTP_HOST
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)
    await notifyOwner({ title: 'Test', fields: [['Club', 'AC'], ['Vide', '']], body: '@everyone salut' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://hooks.test/abc')
    const sent = JSON.parse(init.body)
    expect(sent.content).toBe('**Test**\nClub : AC\n\n@everyone salut')
    expect(sent.allowed_mentions).toEqual({ parse: [] })
  })

  it('fails when nothing is configured or the webhook refuses', async () => {
    delete process.env.OWNER_NOTIFY_WEBHOOK_URL
    delete process.env.SMTP_HOST
    await expect(notifyOwner({ title: 'x', fields: [] })).rejects.toThrow(/No owner notification channel/)
    process.env.OWNER_NOTIFY_WEBHOOK_URL = 'https://hooks.test/abc'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })))
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    await expect(notifyOwner({ title: 'x', fields: [] })).rejects.toThrow()
    errors.mockRestore()
  })

  it('cuts messages to the Discord limit', () => {
    expect(formatMessage({ title: 't', fields: [], body: 'x'.repeat(5000) }).length).toBe(2000)
  })
})
