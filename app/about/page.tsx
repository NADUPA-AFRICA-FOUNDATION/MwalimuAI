import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'
import Link from 'next/link'
import { Target, Heart, Users, Award } from 'lucide-react'

const team = [
  {
    name: 'Dr. Sarah Kamau',
    role: 'Founder & CEO',
    bio: 'Former teacher and education researcher with 15 years of experience in curriculum development.',
  },
  {
    name: 'James Ochieng',
    role: 'Head of Content',
    bio: 'Curriculum specialist and former TSC trainer with expertise in CBC implementation.',
  },
  {
    name: 'Grace Muthoni',
    role: 'Lead Instructional Designer',
    bio: 'Award-winning educator passionate about making learning accessible to all teachers.',
  },
  {
    name: 'Peter Njoroge',
    role: 'CTO',
    bio: 'EdTech innovator dedicated to leveraging AI for educational transformation.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Teacher-Centered',
    description: 'Every feature and piece of content is designed with the busy Kenyan teacher in mind.',
  },
  {
    icon: Heart,
    title: 'Quality Education',
    description: 'We believe every child deserves a well-prepared teacher who can deliver quality CBC instruction.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Teachers learn best from each other. We foster collaboration and knowledge sharing.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we create, from content to technology.',
  },
]

export default function AboutPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mwalimu AI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are on a mission to empower every Kenyan teacher with the skills and confidence to deliver
          world-class Competency-Based Curriculum education.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Kenya&apos;s transition to Competency-Based Curriculum represents one of the most significant
              educational reforms in our nation&apos;s history. Yet many teachers feel underprepared and
              overwhelmed by the changes.
            </p>
            <p className="text-muted-foreground mb-4">
              Mwalimu AI was founded to bridge this gap. We combine cutting-edge AI technology with
              deep expertise in Kenyan education to provide accessible, high-quality professional
              development that meets teachers where they are.
            </p>
            <p className="text-muted-foreground">
              Our platform serves over 10,000 teachers across all 47 counties, from urban Nairobi
              schools to rural communities in Turkana.
            </p>
          </div>
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground mb-6">Teachers Trained</div>
              <div className="text-5xl font-bold text-primary mb-2">47</div>
              <div className="text-muted-foreground mb-6">Counties Reached</div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Schools Impacted</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Be part of the movement to transform education in Kenya. Start your professional development
            journey today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/sign-up">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Partner With Us
              </Button>
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
