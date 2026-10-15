import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST as checkout } from '@/app/api/checkout/route'
import { POST as contact } from '@/app/api/contact/route'
import { POST as request } from '@/app/api/request/route'
import { resetRateLimit } from '@/lib/rate-limit'

const post = (handler: (r: Request) => Promise<Response>, url: string, body: unknown, ip = '203.0.113.1') =>
  handler(
    new Request(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(body),
    }),
  )

describe('API routes answer in the visitor’s language', () => {
  const env = { ...process.env }
  beforeEach(() => resetRateLimit())
  afterEach(() => {
    process.env = { ...env }
    vi.unstubAllGlobals()
  })

  it('validates the contact form in English with ?lang=en, in French otherwise', async () => {
    const bad = { name: 'J', email: 'nope', message: 'short' }
    const en = await post(contact, 'http://site.test/api/contact?lang=en', bad)
    expect(en.status).toBe(422)
    const enBody = await en.json()
    expect(enBody.message).toBe('Some fields need to be corrected.')
    expect(enBody.errors).toEqual({
      name: 'Name must be at least 2 characters long.',
      email: 'Enter a valid e-mail address.',
      message: 'Message must be at least 10 characters long.',
    })

    const fr = await post(contact, 'http://site.test/api/contact', bad)
    const frBody = await fr.json()
    expect(frBody.message).toBe('Certains champs sont à corriger.')
    expect(frBody.errors.email).toBe('Saisissez une adresse e-mail valide.')

    // An unknown language falls back to French.
    const other = await post(contact, 'http://site.test/api/contact?lang=de', bad)
    expect((await other.json()).message).toBe('Certains champs sont à corriger.')
  })

  it('answers errors raised before validation in the requested language', async () => {
    const wrongType = await contact(
      new Request('http://site.test/api/contact?lang=en', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'x' }),
    )
    expect(wrongType.status).toBe(415)
    expect((await wrongType.json()).message).toBe('Unsupported request format.')

    delete process.env.OWNER_NOTIFY_WEBHOOK_URL
    delete process.env.SMTP_HOST
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ok = { name: 'Jo Pilot', email: 'jo@example.org', message: 'Hello, a question about the fleet.' }
    const unconfigured = await post(contact, 'http://site.test/api/contact?lang=en', ok)
    expect(unconfigured.status).toBe(503)
    expect((await unconfigured.json()).message).toMatch(/not set up on this site/)
    errors.mockRestore()

    for (let i = 0; i < 5; i++) await post(contact, 'http://site.test/api/contact?lang=en', {}, '203.0.113.9')
    const limited = await post(contact, 'http://site.test/api/contact?lang=en', {}, '203.0.113.9')
    expect(limited.status).toBe(429)
    expect((await limited.json()).message).toMatch(/^Too many submissions/)
  })

  it('tells the owner, in French, which language the visitor used', async () => {
    process.env.OWNER_NOTIFY_WEBHOOK_URL = 'https://hooks.test/abc'
    delete process.env.SMTP_HOST
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)

    const sent = await post(request, 'http://site.test/api/request?lang=en', {
      clubName: 'Riverside Flying Club',
      contactName: 'Jo Pilot',
      email: 'jo@example.org',
      aircraft: 3,
      tier: 'club-ecole',
      cycle: 'yearly',
      consent: true,
    })
    expect(sent.status).toBe(200)
    const content = JSON.parse(fetchMock.mock.calls[0][1].body).content as string
    expect(content).toContain('Demande de mise en place')
    expect(content).toContain('Offre : Club + École (annuel)')
    expect(content).toContain('Langue du visiteur : anglais')

    await post(contact, 'http://site.test/api/contact', { name: 'Jeanne', email: 'j@example.org', message: 'Bonjour, une question.' })
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).content).toContain('Langue du visiteur : français')
  })

  it('answers the checkout in the requested language when Stripe is off', async () => {
    delete process.env.STRIPE_SECRET_KEY
    const response = await post(checkout, 'http://site.test/api/checkout?lang=en', {})
    expect(response.status).toBe(503)
    const body = await response.json()
    expect(body.code).toBe('stripe_disabled')
    expect(body.message).toBe('Online payment is not available. Send us a set-up request instead.')
  })
})
