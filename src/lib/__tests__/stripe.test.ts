import Stripe from 'stripe'
import { describe, expect, it, vi } from 'vitest'
import { OFFER } from '@/config/offer'
import { buildCheckoutParams, isStripeEnabled, priceEnvName } from '@/lib/stripe'
import { describeEvent } from '@/lib/stripe-events'
import { handleStripeWebhook } from '@/lib/stripe-webhook'

const input = {
  clubName: 'Aéroclub de test',
  contactName: 'Jeanne Pilote',
  email: 'jeanne@example.org',
  phone: '01 23 45 67 89',
  aircraft: 5,
  tier: 'club' as const,
  cycle: 'yearly' as const,
  acceptCgv: true as const,
}

describe('isStripeEnabled', () => {
  it('needs both the secret key and the webhook secret', () => {
    expect(isStripeEnabled({})).toBe(false)
    expect(isStripeEnabled({ STRIPE_SECRET_KEY: 'sk_test_x' })).toBe(false)
    expect(isStripeEnabled({ STRIPE_SECRET_KEY: 'sk_test_x', STRIPE_WEBHOOK_SECRET: 'whsec_x' })).toBe(true)
  })
})

describe('buildCheckoutParams', () => {
  it('builds a subscription from the config prices', () => {
    const params = buildCheckoutParams(input, 'https://site.test', {}, new Date('2026-10-14T10:00:00Z'))
    expect(params.mode).toBe('subscription')
    expect(params.billing_address_collection).toBe('required')
    expect(params.tax_id_collection).toEqual({ enabled: true })
    expect(params.customer_email).toBe('jeanne@example.org')
    const [flat, perAircraft] = params.line_items!
    expect(flat.quantity).toBe(1)
    expect(flat.price_data?.unit_amount).toBe(3900 * OFFER.monthsBilledPerYear)
    expect(flat.price_data?.recurring?.interval).toBe('year')
    expect(flat.price_data?.tax_behavior).toBe('exclusive')
    expect(perAircraft.quantity).toBe(5)
    expect(perAircraft.price_data?.unit_amount).toBe(600 * OFFER.monthsBilledPerYear)
    expect(params.metadata).toMatchObject({ tier: 'club', aircraft: '5', club_name: 'Aéroclub de test', cycle: 'yearly', cgv_accepted_at: '2026-10-14T10:00:00.000Z' })
    expect(params.subscription_data?.metadata).toEqual(params.metadata)
    expect(params.subscription_data?.trial_period_days).toBe(OFFER.trialDays || undefined)
    expect(params.success_url).toBe('https://site.test/commencer/merci?session_id={CHECKOUT_SESSION_ID}')
    expect(params.cancel_url).toBe('https://site.test/commencer/annule')
    expect(params.automatic_tax).toBeUndefined()
    expect(params.locale).toBe('fr')
    expect(params.metadata?.language).toBe('fr')
    expect(flat.price_data?.product_data?.name).toBe('SkyCrew Club – abonnement annuel')
  })

  it('follows the visitor’s language: Stripe page, line names and return pages', () => {
    const params = buildCheckoutParams({ ...input, tier: 'club-ecole', cycle: 'monthly' }, 'https://site.test', {}, new Date(), 'en')
    expect(params.locale).toBe('en')
    expect(params.success_url).toBe('https://site.test/en/get-started/thank-you?session_id={CHECKOUT_SESSION_ID}')
    expect(params.cancel_url).toBe('https://site.test/en/get-started/cancelled')
    expect(params.line_items![0].price_data?.product_data?.name).toBe('SkyCrew Club + School – monthly subscription')
    expect(params.line_items![1].price_data?.product_data?.name).toBe('SkyCrew Club + School – aircraft (monthly)')
    expect(params.metadata?.language).toBe('en')
  })

  it('uses Stripe Price ids and tax settings from the environment when present', () => {
    const env = {
      [priceEnvName('club', 'yearly', 'FLAT')]: 'price_flat',
      [priceEnvName('club', 'yearly', 'AIRCRAFT')]: 'price_plane',
      STRIPE_TAX_RATE_ID: 'txr_20',
      STRIPE_AUTOMATIC_TAX: 'true',
    }
    expect(priceEnvName('club-ecole', 'monthly', 'AIRCRAFT')).toBe('STRIPE_PRICE_CLUB_ECOLE_MONTHLY_AIRCRAFT')
    const params = buildCheckoutParams(input, 'https://site.test', env)
    expect(params.line_items).toEqual([
      { price: 'price_flat', quantity: 1, tax_rates: ['txr_20'] },
      { price: 'price_plane', quantity: 5, tax_rates: ['txr_20'] },
    ])
    expect(params.automatic_tax).toEqual({ enabled: true })
  })
})

describe('Stripe webhook', () => {
  const secret = 'whsec_test_secret'
  const stripe = new Stripe('sk_test_unused')
  const event = {
    id: 'evt_1',
    object: 'event',
    type: 'checkout.session.completed',
    livemode: false,
    data: {
      object: {
        id: 'cs_test_1',
        object: 'checkout.session',
        subscription: 'sub_1',
        amount_subtotal: 39000,
        amount_total: 46800,
        customer_details: { email: 'jeanne@example.org' },
        metadata: { language: 'en', tier: 'club', cycle: 'yearly', aircraft: '5', club_name: 'Aéroclub de test', contact_name: 'Jeanne Pilote', contact_email: 'jeanne@example.org' },
      },
    },
  }
  const payload = JSON.stringify(event)

  it('accepts a correctly signed event and notifies the owner', async () => {
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret })
    const notify = vi.fn().mockResolvedValue(undefined)
    const result = await handleStripeWebhook(payload, header, { secret, stripe, notify })
    expect(result.status).toBe(200)
    expect(notify).toHaveBeenCalledOnce()
    const message = notify.mock.calls[0][0]
    expect(message.title).toMatch(/Nouvel abonnement/)
    expect(message.fields).toContainEqual(['Club', 'Aéroclub de test'])
    expect(message.fields).toContainEqual(['Avions', '5'])
    expect(message.fields).toContainEqual(['Langue du visiteur', 'anglais'])
  })

  it('refuses a wrong signature, a tampered body and a missing header', async () => {
    const notify = vi.fn()
    const wrong = stripe.webhooks.generateTestHeaderString({ payload, secret: 'whsec_other' })
    expect((await handleStripeWebhook(payload, wrong, { secret, stripe, notify })).status).toBe(400)
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret })
    expect((await handleStripeWebhook(payload.replace('"5"', '"50"'), header, { secret, stripe, notify })).status).toBe(400)
    expect((await handleStripeWebhook(payload, null, { secret, stripe, notify })).status).toBe(400)
    expect(notify).not.toHaveBeenCalled()
  })

  it('refuses an old signature (replay)', async () => {
    const old = stripe.webhooks.generateTestHeaderString({ payload, secret, timestamp: Math.floor(Date.now() / 1000) - 3600 })
    expect((await handleStripeWebhook(payload, old, { secret, stripe, notify: vi.fn() })).status).toBe(400)
  })

  it('answers 500 when the owner could not be notified, so Stripe retries', async () => {
    const header = stripe.webhooks.generateTestHeaderString({ payload, secret })
    const notify = vi.fn().mockRejectedValue(new Error('down'))
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await handleStripeWebhook(payload, header, { secret, stripe, notify })).status).toBe(500)
    errors.mockRestore()
  })

  it('answers 503 when no webhook secret is configured', async () => {
    expect((await handleStripeWebhook(payload, 'x', { secret: '', stripe })).status).toBe(503)
  })
})

describe('describeEvent', () => {
  const sub = (extra: object, previous?: object, type = 'customer.subscription.updated') =>
    ({
      id: 'evt',
      type,
      livemode: true,
      data: {
        object: { id: 'sub_1', status: 'active', cancel_at_period_end: false, metadata: { club_name: 'AC Test', tier: 'club-ecole', cycle: 'monthly' }, items: { data: [] }, ...extra },
        previous_attributes: previous,
      },
    }) as unknown as Stripe.Event

  it('reports a cancellation request, a cancelled one and the end of a subscription', () => {
    expect(describeEvent(sub({ cancel_at_period_end: true, cancel_at: 1790000000 }, { cancel_at_period_end: false }))?.title).toMatch(/Résiliation demandée/)
    expect(describeEvent(sub({}, { cancel_at_period_end: true }))?.title).toMatch(/Résiliation annulée/)
    expect(describeEvent(sub({ status: 'canceled' }, undefined, 'customer.subscription.deleted'))?.title).toMatch(/résilié/)
  })

  it('stays quiet on routine renewals and on subscriptions already reported by the checkout', () => {
    expect(describeEvent(sub({}, { current_period_end: 1 }))).toBeNull()
    expect(describeEvent(sub({}, undefined, 'customer.subscription.created'))).toBeNull()
  })
})
