'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MarketingHeader } from '@/components/marketing-header'
import { MarketingFooter } from '@/components/marketing-footer'
import Link from 'next/link'
import { MessageSquare, Mail, Phone, FileText, HelpCircle, CheckCircle } from 'lucide-react'

const supportOptions = [
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Browse our comprehensive guides and tutorials',
    action: 'View Docs',
    href: '/docs',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Find answers to commonly asked questions',
    action: 'View FAQ',
    href: '/faq',
  },
  {
    icon: MessageSquare,
    title: 'Community Forum',
    description: 'Get help from fellow teachers',
    action: 'Visit Forum',
    href: '/dashboard/community',
  },
]

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'technical',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <MarketingHeader />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Center</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We&apos;re here to help you succeed. Find resources, get answers, or contact our support team.
        </p>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option) => (
            <Card key={option.title} className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
              <Link href={option.href}>
                <Button variant="outline" size="sm">
                  {option.action}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Form */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ticket Submitted!</h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;ve received your request and will respond within 24-48 hours. Check your email for
                  updates.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Ticket
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-2 w-full px-3 py-2 rounded-md border bg-background"
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="content">Content Question</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-2 min-h-[150px]"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Ticket
                </Button>
              </form>
            )}
          </Card>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                For urgent issues or if you prefer to contact us directly, use the information below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-muted-foreground">support@mwalimu.ai</p>
                  <p className="text-sm text-muted-foreground">Response within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone Support</h3>
                  <p className="text-muted-foreground">+254 700 123 456</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 8am-6pm EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">+254 700 123 456</p>
                  <p className="text-sm text-muted-foreground">Quick questions and updates</p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">Premium Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Professional and School plan subscribers get priority support with faster response times
                and dedicated assistance.
              </p>
              <Link href="/pricing">
                <Button variant="outline" size="sm">
                  View Plans
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
