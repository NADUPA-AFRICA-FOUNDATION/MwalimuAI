import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Stripe fulfillment webhook.
 *
 * Records subscriptions in the `subscriptions` table (created by
 * scripts/013_security_hardening.sql) so plan entitlements can be checked
 * server-side instead of trusting a ?payment=success URL.
 *
 * Setup: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   https://<your-domain>/api/stripe/webhook
 * with events: checkout.session.completed, customer.subscription.updated,
 * customer.subscription.deleted. Put the signing secret in
 * STRIPE_WEBHOOK_SECRET.
 */

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!stripe || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe/webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        if (!userId) {
          console.error('[stripe/webhook] checkout completed without client_reference_id', session.id)
          break
        }
        await admin.from('subscriptions').upsert({
          user_id:                userId,
          plan:                   session.metadata?.plan ?? 'professional',
          status:                 'active',
          stripe_customer_id:     typeof session.customer === 'string' ? session.customer : null,
          stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
          updated_at:             new Date().toISOString(),
        }, { onConflict: 'user_id' })
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const status = event.type === 'customer.subscription.deleted' ? 'canceled' : sub.status
        await admin.from('subscriptions')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id)
        break
      }
    }
  } catch (err) {
    console.error('[stripe/webhook] handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
