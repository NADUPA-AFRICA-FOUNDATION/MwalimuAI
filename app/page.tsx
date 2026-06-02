'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  Zap,
  Users,
  Award,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Star,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Quote,
} from 'lucide-react'

/* ── Hooks ─────────────────────────────────────────────── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCountUp(to: number, duration = 1400, go = false) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setN(Math.round(eased * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [go, to, duration])
  return n
}

/* ── Feature card data ─────────────────────────────────── */
const features = [
  {
    icon: BookOpen,
    accent: 'primary',
    title: 'Structured Learning Modules',
    desc: 'Curated courses covering CBC fundamentals, assessment strategies, and modern pedagogy with flexible, self-paced learning.',
    link: '/dashboard/modules',
    cta: 'Explore Modules',
  },
  {
    icon: MessageSquare,
    accent: 'accent',
    title: 'AI Coach Support',
    desc: 'Get instant, personalised guidance from your AI coach for any classroom challenge — available 24/7, whenever you need it.',
    link: '/dashboard/ai-coach',
    cta: 'Try AI Coach',
  },
  {
    icon: Users,
    accent: 'primary',
    title: 'Teacher Community',
    desc: 'Connect with fellow educators across Kenya, share resources, and learn from real classroom experiences countrywide.',
    link: '/dashboard/community',
    cta: 'Join Community',
  },
  {
    icon: Award,
    accent: 'accent',
    title: 'Achievement Badges',
    desc: 'Track milestones and celebrate progress as you grow your CBC expertise with verifiable recognition badges.',
    link: '/dashboard/achievements',
    cta: 'View Badges',
  },
  {
    icon: Sparkles,
    accent: 'primary',
    title: 'Personalised Assessment',
    desc: 'Complete a needs assessment to receive a custom learning path built around your experience level and teaching goals.',
    link: '/dashboard/assessment',
    cta: 'Take Assessment',
  },
  {
    icon: TrendingUp,
    accent: 'accent',
    title: 'Progress Tracking',
    desc: 'Monitor your learning journey with detailed analytics and see the measurable impact on your everyday teaching practice.',
    link: '/dashboard',
    cta: 'View Dashboard',
  },
]

const testimonials = [
  {
    quote: 'The AI coach has been a game-changer. I can ask questions at any time and get practical advice for my Grade 4 class.',
    name: 'Jane Muthoni',
    role: 'Primary Teacher, Nairobi',
    initials: 'JM',
    color: 'bg-primary/15 text-primary',
  },
  {
    quote: 'The structured modules helped me understand CBC assessment better than any workshop I have ever attended. Highly recommended!',
    name: 'Peter Ochieng',
    role: 'Science Teacher, Kisumu',
    initials: 'PO',
    color: 'bg-accent/15 text-accent',
  },
  {
    quote: 'I love connecting with other teachers in the community. Sharing resources and experiences has made CBC implementation so much easier.',
    name: 'Faith Kemunto',
    role: 'Math Teacher, Mombasa',
    initials: 'FK',
    color: 'bg-primary/15 text-primary',
  },
]

/* ── Component ─────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { ref: statsRef,  visible: statsGo }      = useFadeIn(0.25)
  const { ref: featRef,   visible: featVisible }   = useFadeIn(0.05)
  const { ref: howRef,    visible: howVisible }    = useFadeIn(0.05)
  const { ref: testRef,   visible: testVisible }   = useFadeIn(0.05)
  const { ref: ctaRef,    visible: ctaVisible }    = useFadeIn(0.2)

  const teachers  = useCountUp(5,  1400, statsGo)
  const counties  = useCountUp(47, 1200, statsGo)
  const modules   = useCountUp(50, 1300, statsGo)
  const ratingVal = useCountUp(49, 1500, statsGo)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="glass sticky top-0 z-50 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:shadow-primary/50 transition-all duration-200">
              <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Mwalimu AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/features', label: 'Features' },
              { href: '/pricing',  label: 'Pricing'  },
              { href: '/about',    label: 'About'    },
              { href: '/blog',     label: 'Blog'     },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-primary/5 group"
              >
                {label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="font-medium hover:text-primary hover:bg-primary/8 rounded-xl transition-all">
                Log In
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="hidden md:block">
              <Button size="sm" className="font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 px-5">
                Get Started
              </Button>
            </Link>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 hover:bg-muted rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/30 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {[
              { href: '/features', label: 'Features' },
              { href: '/pricing',  label: 'Pricing'  },
              { href: '/about',    label: 'About'    },
              { href: '/blog',     label: 'Blog'     },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/8 hover:text-foreground text-muted-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-1 border-t border-border/50">
              <Link href="/auth/login"   className="flex-1" onClick={() => setMenuOpen(false)}><Button variant="outline" className="w-full rounded-xl">Log In</Button></Link>
              <Link href="/auth/sign-up" className="flex-1" onClick={() => setMenuOpen(false)}><Button className="w-full rounded-xl">Get Started</Button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden mesh-bg">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-8 w-80 h-80 bg-primary/12 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-32 right-12 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-3000" />
          <div className="absolute bottom-16 left-1/3 w-72 h-72 bg-primary/6 rounded-full blur-3xl animate-blob animation-delay-6000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 glass-subtle border-primary/25 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up cursor-default">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              AI-Powered Professional Development
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in animation-delay-100">
              Empowering{' '}
              <span className="relative inline-block">
                <span className="gradient-text">Kenyan Teachers</span>
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 10" fill="none" aria-hidden>
                  <path d="M2 8C60 3 160 1.5 298 5" stroke="oklch(0.72 0.18 55)" strokeWidth="3.5" strokeLinecap="round" className="animate-draw-line" />
                </svg>
              </span>
              {' '}with CBC Mastery
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Master the Competency-Based Curriculum with personalised AI coaching,
              structured learning modules, and a vibrant community of educators across Kenya.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-fade-in-up animation-delay-300">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2 text-base px-8 py-6 rounded-2xl font-semibold shadow-xl shadow-primary/30 glow-primary hover:-translate-y-1 transition-all duration-200">
                  Start Learning Free
                  <ArrowRight className="w-4.5 h-4.5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 rounded-2xl font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/4 hover:-translate-y-1 transition-all duration-200">
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground animate-fade-in-up animation-delay-400">
              {['Free to get started', 'No credit card required', 'KICD aligned content'].map(t => (
                <div key={t} className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: `${teachers}K+`, label: 'Active Teachers',    delay: 0   },
              { value: counties,        label: 'Counties Reached',   delay: 100 },
              { value: `${modules}+`,  label: 'Learning Modules',   delay: 200 },
              { value: (ratingVal / 10).toFixed(1), label: 'Average Rating', delay: 300, star: true },
            ].map(({ value, label, delay, star }) => (
              <div
                key={label}
                className={`glass rounded-2xl p-6 text-center transition-all duration-700 ${statsGo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1.5 tabular-nums">{value}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  {star && <Star className="w-3.5 h-3.5 fill-accent text-accent" />}
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section ref={featRef} className="py-28" id="features">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section header */}
          <div className={`text-center mb-16 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 glass-subtle text-accent border-accent/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <Zap className="w-3.5 h-3.5" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed specifically for CBC implementation success
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, accent, title, desc, link, cta }, i) => (
              <div
                key={title}
                className={`group glass rounded-2xl p-7 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-2 transition-all duration-300 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                  accent === 'primary'
                    ? 'bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10'
                    : 'bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10'
                }`}>
                  <Icon className={`w-6 h-6 ${accent === 'primary' ? 'text-primary' : 'text-accent'} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="font-bold text-lg mb-2.5 tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                <Link
                  href={link}
                  className="inline-flex items-center gap-1 text-sm text-primary font-semibold hover:gap-2 transition-all duration-200"
                >
                  {cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section ref={howRef} className="py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className={`text-center mb-16 transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get started in minutes and begin your professional development journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />

            {[
              { num: '01', color: 'bg-primary text-primary-foreground shadow-primary/30', title: 'Create Your Account', desc: 'Sign up for free and complete your teacher profile with your experience level and subjects.' },
              { num: '02', color: 'bg-accent text-accent-foreground shadow-accent/30',    title: 'Take the Assessment', desc: 'Complete a quick needs assessment so we can personalise your learning path and recommendations.' },
              { num: '03', color: 'bg-primary text-primary-foreground shadow-primary/30', title: 'Start Learning',      desc: 'Access personalised modules, chat with your AI coach, and connect with the community.' },
            ].map(({ num, color, title, desc }, i) => (
              <div
                key={num}
                className={`relative text-center transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-6 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200`}>
                  {num}
                </div>
                <h3 className="font-bold text-lg mb-3 tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section ref={testRef} className="py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className={`text-center mb-16 transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">Loved by Teachers</h2>
            <p className="text-muted-foreground text-lg">
              Hear from educators transforming their classrooms with Mwalimu AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, role, initials, color }, i) => (
              <div
                key={name}
                className={`group glass rounded-2xl p-7 relative overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Decorative quote mark */}
                <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/8 rotate-180" />

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${color} rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white/60 shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-28 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`relative overflow-hidden rounded-3xl p-12 md:p-20 text-center bg-primary transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            {/* Shimmering overlay */}
            <div className="absolute inset-0 shimmer opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_75%,rgba(255,255,255,0.10),transparent_55%)]" />

            {/* Floating orbs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-blob" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/8 rounded-full blur-2xl animate-blob animation-delay-3000" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
                <Sparkles className="w-4 h-4" />
                Join 5,000+ Kenyan Teachers
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground tracking-tight">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-primary-foreground/80 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                Master CBC and create better learning outcomes for your students with AI-powered professional development.
              </p>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-10 py-6 font-semibold rounded-2xl shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-200"
                >
                  Start Your Free Journey Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border/40 bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-200">
                  <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg tracking-tight">Mwalimu AI</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Empowering Kenyan teachers with AI-powered professional development for CBC excellence.
              </p>
            </div>

            {/* Links */}
            {[
              { title: 'Product',   links: [{ href: '/features', label: 'Features' }, { href: '/pricing', label: 'Pricing' }, { href: '/blog', label: 'Blog' }] },
              { title: 'Company',   links: [{ href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }, { href: '/privacy', label: 'Privacy' }] },
              { title: 'Resources', links: [{ href: '/docs', label: 'Documentation' }, { href: '/faq', label: 'FAQ' }, { href: '/support', label: 'Support' }] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">&copy; 2026 Mwalimu AI. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/docs"    className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
