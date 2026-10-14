import { NextResponse } from 'next/server'
import { jsonError, limitByIp, readJsonBody, siteOrigin } from '@/lib/http'
import { HONEYPOT_FIELD, checkoutSchema, fieldErrors } from '@/lib/schemas'
import { buildCheckoutParams, getStripe, isStripeEnabled } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Creates a Stripe Checkout session (subscription) and returns its URL. */
export async function POST(request: Request) {
  const stripe = getStripe()
  if (!isStripeEnabled() || !stripe) {
    return jsonError(503, 'Le paiement en ligne n’est pas disponible. Envoyez-nous une demande de mise en place.', {
      code: 'stripe_disabled',
    })
  }

  const limited = limitByIp(request, 'checkout', 10)
  if (limited) return limited

  const parsed = await readJsonBody(request)
  if ('error' in parsed) return parsed.error

  const trap = parsed.body[HONEYPOT_FIELD]
  if (typeof trap === 'string' && trap.trim() !== '') return jsonError(400, 'Requête invalide.')

  const result = checkoutSchema.safeParse(parsed.body)
  if (!result.success) {
    return jsonError(422, 'Certains champs sont à corriger.', { errors: fieldErrors(result.error) })
  }

  try {
    const session = await stripe.checkout.sessions.create(buildCheckoutParams(result.data, siteOrigin(request)))
    if (!session.url) throw new Error('Stripe returned a session without URL')
    return NextResponse.json({ ok: true, url: session.url })
  } catch (error) {
    // The Stripe error message only (no form data, no card data: Stripe collects the card).
    console.error('Checkout session creation failed:', error instanceof Error ? error.message : error)
    return jsonError(502, 'Le paiement n’a pas pu être préparé. Réessayez dans quelques minutes ou écrivez-nous.')
  }
}
