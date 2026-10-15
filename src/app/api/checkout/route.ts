import { NextResponse } from 'next/server'
import { langOfRequest } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { jsonError, limitByIp, readJsonBody, siteOrigin } from '@/lib/http'
import { HONEYPOT_FIELD, fieldErrors } from '@/lib/schemas'
import { schemasFor } from '@/lib/schemas-by-lang'
import { buildCheckoutParams, getStripe, isStripeEnabled } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Creates a Stripe Checkout session (subscription) and returns its URL. The visitor's language
 * (`?lang=`, French by default) sets the messages, the Stripe page and the return pages.
 */
export async function POST(request: Request) {
  const lang = langOfRequest(request)
  const t = getDictionary(lang).api
  const stripe = getStripe()
  if (!isStripeEnabled() || !stripe) {
    return jsonError(503, t.stripeDisabled, { code: 'stripe_disabled' })
  }

  const limited = limitByIp(request, 'checkout', t, 10)
  if (limited) return limited

  const parsed = await readJsonBody(request, t)
  if ('error' in parsed) return parsed.error

  const trap = parsed.body[HONEYPOT_FIELD]
  if (typeof trap === 'string' && trap.trim() !== '') return jsonError(400, t.invalid)

  const result = schemasFor(lang).checkout.safeParse(parsed.body)
  if (!result.success) {
    return jsonError(422, t.fixFields, { errors: fieldErrors(result.error) })
  }

  try {
    const session = await stripe.checkout.sessions.create(
      buildCheckoutParams(result.data, siteOrigin(request), process.env, new Date(), lang),
    )
    if (!session.url) throw new Error('Stripe returned a session without URL')
    return NextResponse.json({ ok: true, url: session.url })
  } catch (error) {
    // The Stripe error message only (no form data, no card data: Stripe collects the card).
    console.error('Checkout session creation failed:', error instanceof Error ? error.message : error)
    return jsonError(502, t.checkoutFailed)
  }
}
