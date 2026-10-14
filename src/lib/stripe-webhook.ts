import Stripe from 'stripe'
import { notifyOwner, type OwnerMessage } from '@/lib/notify'
import { getStripe } from '@/lib/stripe'
import { describeEvent } from '@/lib/stripe-events'

export interface WebhookResult {
  status: number
  body: Record<string, unknown>
}

interface Deps {
  secret?: string
  notify?: (message: OwnerMessage) => Promise<void>
  stripe?: Stripe
}

/**
 * Verifies the signature, then notifies the owner of the events that matter. Answers 500 when
 * the notification could not be delivered, so that Stripe retries the event later (and shows the
 * failure in its dashboard) rather than losing it.
 */
export async function handleStripeWebhook(payload: string, signature: string | null, deps: Deps = {}): Promise<WebhookResult> {
  const secret = deps.secret ?? process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return { status: 503, body: { error: 'webhook not configured' } }
  if (!signature) return { status: 400, body: { error: 'missing signature' } }

  // Signature checking needs no API call: any client instance can do it.
  const stripe = deps.stripe ?? getStripe() ?? new Stripe('sk_signature_check_only')
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret)
  } catch {
    return { status: 400, body: { error: 'invalid signature' } }
  }

  const message = describeEvent(event)
  if (!message) return { status: 200, body: { received: true, notified: false } }
  try {
    await (deps.notify ?? notifyOwner)(message)
  } catch (error) {
    console.error(`Stripe event ${event.id} (${event.type}) could not be notified:`, error instanceof Error ? error.message : error)
    return { status: 500, body: { error: 'notification failed' } }
  }
  return { status: 200, body: { received: true, notified: true } }
}
