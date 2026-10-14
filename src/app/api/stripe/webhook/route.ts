import { NextResponse } from 'next/server'
import { handleStripeWebhook } from '@/lib/stripe-webhook'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Stripe → site. The signature is checked against STRIPE_WEBHOOK_SECRET on the raw body. */
export async function POST(request: Request) {
  const payload = await request.text()
  const result = await handleStripeWebhook(payload, request.headers.get('stripe-signature'))
  return NextResponse.json(result.body, { status: result.status })
}
