import Stripe from 'stripe'
import { OFFER, getTier, type BillingCycle, type TierId } from '@/config/offer'
import { DEFAULT_LANG, LOCALES, type Lang } from '@/i18n/config'
import { fmt, getDictionary } from '@/i18n'
import { pathOf } from '@/i18n/routes'
import { computePrice } from '@/lib/pricing'
import type { CheckoutInput } from '@/lib/schemas'

/**
 * Stripe, server side only. The online subscription is offered only when both the secret key
 * and the webhook secret are set: without the webhook, a payment would reach Stripe but the
 * owner would never hear of it.
 */

type Env = Record<string, string | undefined>

export function isStripeEnabled(env: Env = process.env): boolean {
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET)
}

let client: Stripe | null = null

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  if (!client) client = new Stripe(key, { appInfo: { name: 'skycrew-landing' } })
  return client
}

const TIER_ENV: Record<TierId, string> = { club: 'CLUB', 'club-ecole': 'CLUB_ECOLE' }
const CYCLE_ENV: Record<BillingCycle, string> = { monthly: 'MONTHLY', yearly: 'YEARLY' }

/** Name of the variable holding a Stripe Price id, e.g. STRIPE_PRICE_CLUB_YEARLY_AIRCRAFT. */
export function priceEnvName(tier: TierId, cycle: BillingCycle, part: 'FLAT' | 'AIRCRAFT') {
  return `STRIPE_PRICE_${TIER_ENV[tier]}_${CYCLE_ENV[cycle]}_${part}`
}

/** Metadata copied on the Checkout session and on the subscription. */
export function checkoutMetadata(input: CheckoutInput, acceptedAt: string, lang: Lang = DEFAULT_LANG): Record<string, string> {
  return {
    language: lang,
    tier: input.tier,
    cycle: input.cycle,
    aircraft: String(input.aircraft),
    club_name: input.clubName,
    contact_name: input.contactName,
    contact_email: input.email,
    contact_phone: input.phone || '',
    cgv_accepted_at: acceptedAt,
  }
}

/**
 * Checkout session parameters: a subscription with two recurring lines, the flat fee
 * (quantity 1) and the per-aircraft fee (quantity = number of aircraft). Each line uses the
 * Stripe Price id from the environment when there is one, or else an inline price computed
 * from src/config/offer.ts. The Stripe page, the line names and the return pages follow the
 * visitor's language.
 */
export function buildCheckoutParams(
  input: CheckoutInput,
  origin: string,
  env: Env = process.env,
  now = new Date(),
  lang: Lang = DEFAULT_LANG,
): Stripe.Checkout.SessionCreateParams {
  const tier = getTier(input.tier)
  if (!tier) throw new Error(`Unknown tier ${input.tier}`)
  const t = getDictionary(lang)
  const price = computePrice(tier, input.aircraft, input.cycle)
  const interval = input.cycle === 'yearly' ? 'year' : 'month'
  const taxRates = env.STRIPE_TAX_RATE_ID ? [env.STRIPE_TAX_RATE_ID] : undefined
  const names = { tier: t.tiers[tier.id].name, period: input.cycle === 'yearly' ? t.stripe.yearly : t.stripe.monthly }

  const line = (
    part: 'FLAT' | 'AIRCRAFT',
    name: string,
    unitAmount: number,
    quantity: number,
  ): Stripe.Checkout.SessionCreateParams.LineItem => {
    const priceId = env[priceEnvName(tier.id, input.cycle, part)]
    const base = priceId
      ? { price: priceId, quantity }
      : {
          quantity,
          price_data: {
            currency: OFFER.currency,
            unit_amount: unitAmount,
            tax_behavior: 'exclusive' as const,
            recurring: { interval: interval as 'month' | 'year' },
            product_data: { name },
          },
        }
    return taxRates ? { ...base, tax_rates: taxRates } : base
  }

  const metadata = checkoutMetadata(input, now.toISOString(), lang)
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    locale: LOCALES[lang].stripe,
    customer_email: input.email,
    billing_address_collection: 'required',
    tax_id_collection: { enabled: true },
    line_items: [
      line('FLAT', fmt(t.stripe.flatLine, names), price.flatCents, 1),
      line('AIRCRAFT', fmt(t.stripe.aircraftLine, names), price.perAircraftCents, price.aircraft),
    ],
    metadata,
    subscription_data: {
      metadata,
      ...(OFFER.trialDays > 0 ? { trial_period_days: OFFER.trialDays } : {}),
    },
    success_url: `${origin}${pathOf(lang, 'startThanks')}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${pathOf(lang, 'startCancelled')}`,
  }
  if (env.STRIPE_AUTOMATIC_TAX === 'true') params.automatic_tax = { enabled: true }
  return params
}
