import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'
import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 'KES 0',
    period: 'forever',
    description: 'Perfect for getting started with CBC professional development.',
    features: [
      'Access to 3 learning modules',
      'AI Coach (10 questions/day)',
      'Community forum access',
      'Basic progress tracking',
      'Mobile app access',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 'KES 500',
    period: 'per month',
    description: 'Full access to all features for dedicated educators.',
    features: [
      'All learning modules',
      'Unlimited AI Coach access',
      'Priority community support',
      'Downloadable resources',
      'Certificate of completion',
      'Advanced progress analytics',
      'Offline content access',
    ],
    cta: 'Start Professional',
    highlighted: true,
  },
  {
    name: 'School',
    price: 'KES 3,000',
    period: 'per month',
    description: 'For schools wanting to train multiple teachers.',
    features: [
      'Everything in Professional',
      'Up to 20 teacher accounts',
      'Admin dashboard',
      'School-wide analytics',
      'Custom learning paths',
      'Dedicated support',
      'Training workshops',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton fallbackHref="/" />
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-semibold text-lg">Mwalimu AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that fits your professional development needs. All plans include access to our
          core CBC learning content.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 flex flex-col ${plan.highlighted ? 'border-primary ring-2 ring-primary/20' : ''}`}
            >
              {plan.highlighted && (
                <div className="text-sm font-medium text-primary mb-2">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/{plan.period}</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/sign-up">
                <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check our FAQ or contact our support team for help choosing the right plan.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/faq">
              <Button variant="outline">View FAQ</Button>
            </Link>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Mwalimu AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
