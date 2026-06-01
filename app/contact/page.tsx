'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BackButton } from '@/components/back-button'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    setSubmitted(true)
  }

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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or feedback? We&apos;d love to hear from you. Our team is here to help.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="John Kamau"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="john@school.ac.ke"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="How can we help?"
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
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Whether you have questions about our platform, need technical support, or want to explore
                partnership opportunities, we&apos;re here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">support@mwalimu.ai</p>
                  <p className="text-muted-foreground">partnerships@mwalimu.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+254 700 123 456</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 8am-6pm EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office</h3>
                  <p className="text-muted-foreground">Westlands Business Park</p>
                  <p className="text-muted-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">School Partnerships</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interested in bringing Mwalimu AI to your entire school or county? Contact us for
                special institutional pricing and custom training programs.
              </p>
              <Button variant="outline" size="sm">
                Learn About Partnerships
              </Button>
            </Card>
          </div>
        </div>
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
