'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing-header'
import { MarketingFooter } from '@/components/marketing-footer'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is Mwalimu AI?',
        a: 'Mwalimu AI is an AI-powered professional development platform designed specifically for Kenyan teachers implementing the Competency-Based Curriculum (CBC). It offers structured learning modules, an AI coach for personalized guidance, community forums, and downloadable resources.',
      },
      {
        q: 'Is Mwalimu AI free to use?',
        a: 'Yes! We offer a free plan that includes access to 3 learning modules, 10 AI Coach questions per day, and full community forum access. For unlimited access to all features, you can upgrade to our Professional plan.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign Up" button on our homepage, enter your email and password, then complete your profile with your teaching details. You\'ll receive a confirmation email to verify your account.',
      },
      {
        q: 'What devices can I use Mwalimu AI on?',
        a: 'Mwalimu AI works on any device with a web browser - smartphones, tablets, laptops, and desktop computers. Our platform is fully responsive and optimized for mobile use.',
      },
    ],
  },
  {
    category: 'Learning & Content',
    questions: [
      {
        q: 'What topics do the learning modules cover?',
        a: 'Our modules cover CBC fundamentals, assessment strategies, differentiated instruction, classroom management, subject-specific pedagogy, and more. All content is aligned with KICD guidelines and practical for Kenyan classrooms.',
      },
      {
        q: 'How long does each module take to complete?',
        a: 'Each module typically takes 2-4 hours to complete, broken into short lessons of 10-15 minutes each. You can learn at your own pace and pick up where you left off.',
      },
      {
        q: 'Do I get a certificate after completing modules?',
        a: 'Yes! Professional plan subscribers receive digital certificates for each completed module. These certificates can be downloaded and shared with your school administration.',
      },
      {
        q: 'Can I download content for offline use?',
        a: 'Professional plan subscribers can download lesson materials, resources, and worksheets for offline use. This is especially helpful for teachers in areas with limited internet connectivity.',
      },
    ],
  },
  {
    category: 'AI Coach',
    questions: [
      {
        q: 'How does the AI Coach work?',
        a: 'The AI Coach uses advanced language AI trained on CBC curriculum materials and teaching best practices. Simply type your question or describe your classroom challenge, and receive personalized, actionable advice.',
      },
      {
        q: 'What kind of questions can I ask the AI Coach?',
        a: 'You can ask about lesson planning, assessment strategies, classroom management, how to teach specific concepts, differentiation strategies, parent communication, and any other teaching-related questions.',
      },
      {
        q: 'Is the AI Coach available 24/7?',
        a: 'Yes! The AI Coach is available anytime you need it - during lesson prep, after school hours, or on weekends. It\'s like having a mentor teacher available whenever you need guidance.',
      },
      {
        q: 'How accurate is the AI Coach advice?',
        a: 'The AI Coach is trained on verified CBC curriculum materials and teaching best practices. However, we recommend using it as a helpful tool alongside your own professional judgment and school guidelines.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    questions: [
      {
        q: 'How do I upgrade to Professional?',
        a: 'Log into your account, go to Settings, and click on "Upgrade Plan." You can pay via M-Pesa, credit card, or bank transfer. Schools can contact us for invoice payments.',
      },
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes, you can cancel your Professional subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.',
      },
      {
        q: 'Do you offer school or county licenses?',
        a: 'Yes! We offer special pricing for schools and counties that want to provide access to multiple teachers. Contact us at partnerships@mwalimu.ai for more information.',
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page and enter your email address. You\'ll receive a link to create a new password within a few minutes.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-muted-foreground">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <MarketingHeader />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about Mwalimu AI. Can&apos;t find what you&apos;re looking for?
          Contact our support team.
        </p>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <div className="space-y-8">
          {faqs.map((section) => (
            <Card key={section.category} className="p-6">
              <h2 className="text-xl font-semibold mb-4">{section.category}</h2>
              <div>
                {section.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <Link href="/contact">
            <Button>Contact Support</Button>
          </Link>
        </Card>
      </section>

      <MarketingFooter />
    </div>
  )
}
