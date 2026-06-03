import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/require-auth'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set — Stripe checkout will not work.')
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

const PLANS: Record<string, { name: string; amount: number; interval: 'month' | 'year' }> = {
  professional: {
    name: 'Mwalimu AI Professional',
    amount: 50000, // KES 500 × 100 (senti)
    interval: 'month',
  },
  school: {
    name: 'Mwalimu AI School',
    amount: 300000, // KES 3,000 × 100 (senti)
    interval: 'month',
  },
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth(req)
  if (authError) return authError

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.' },
      { status: 503 },
    )
  }

  let plan: string
  let customerEmail: string | undefined
  try {
    const body = await req.json()
    plan = body.plan
    customerEmail = body.email
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const planConfig = PLANS[plan]
  if (!planConfig) {
    return NextResponse.json({ error: 'Unknown plan.' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'kes',
            product_data: { name: planConfig.name },
            unit_amount: planConfig.amount,
            recurring: { interval: planConfig.interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/dashboard?payment=success&plan=${plan}`,
      cancel_url:  `${APP_URL}/pricing?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout session creation failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
