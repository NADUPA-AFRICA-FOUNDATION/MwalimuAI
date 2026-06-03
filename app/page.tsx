'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Zap,
  Users,
  Award,
  ChevronRight,
  Star,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Quote,
  BookMarked,
  BarChart3,
  BrainCircuit,
  Target,
  TrendingUp,
  Check,
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

/* ── Feature data ──────────────────────────────────────── */
const features = [
  {
    icon: BookMarked,
    accent: 'primary',
    large: true,
    tinted: true,
    title: 'Structured learning modules',
    desc: 'Curated courses covering CBC fundamentals, assessment strategies, and modern pedagogy — self-paced, mobile-first, and mapped to KICD standards.',
    link: '/dashboard/modules',
    cta: 'Explore modules',
  },
  {
    icon: BrainCircuit,
    accent: 'accent',
    large: false,
    tinted: false,
    title: 'AI coach',
    desc: 'Instant, personalised guidance for any classroom challenge, available 24/7.',
    link: '/dashboard/ai-coach',
    cta: 'Try AI coach',
  },
  {
    icon: Users,
    accent: 'primary',
    large: false,
    tinted: false,
    title: 'Teacher community',
    desc: 'Connect with educators across all 47 counties, share resources, and discuss real classroom experiences.',
    link: '/dashboard/community',
    cta: 'Join community',
  },
  {
    icon: Award,
    accent: 'accent',
    large: true,
    tinted: true,
    title: 'Verifiable achievement badges',
    desc: 'Track milestones and celebrate progress as you grow your CBC expertise. Badges are tied to real learning outcomes, not just logins.',
    link: '/dashboard/achievements',
    cta: 'View badges',
  },
  {
    icon: Zap,
    accent: 'primary',
    large: false,
    tinted: false,
    title: 'Personalised assessment',
    desc: 'A custom learning path built around your experience level and teaching goals.',
    link: '/dashboard/assessment',
    cta: 'Take assessment',
  },
  {
    icon: BarChart3,
    accent: 'accent',
    large: false,
    tinted: false,
    title: 'Progress analytics',
    desc: 'Detailed insights into your learning velocity and measurable classroom impact.',
    link: '/dashboard',
    cta: 'View dashboard',
  },
]

const testimonials = [
  {
    quote: 'The AI coach changed how I approach my lessons. I get practical advice for my Grade 4 class at any time, even late in the evening after school.',
    name: 'Jane Muthoni',
    role: 'Grade 4 teacher, Nairobi',
    initials: 'JM',
    color: 'bg-primary/15 text-primary',
    featured: true,
  },
  {
    quote: 'These modules helped me understand CBC assessment better than any workshop I have attended. The KICD alignment gives me real confidence.',
    name: 'Peter Ochieng',
    role: 'Science teacher, Kisumu',
    initials: 'PO',
    color: 'bg-accent/15 text-accent',
    featured: false,
  },
  {
    quote: 'Sharing resources in the community saves me hours every week. CBC implementation no longer feels like something I am doing alone.',
    name: 'Faith Kemunto',
    role: 'Mathematics teacher, Mombasa',
    initials: 'FK',
    color: 'bg-primary/15 text-primary',
    featured: false,
  },
]

/* ── Component ─────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const { ref: statsRef,  visible: statsGo }    = useFadeIn(0.25)
  const { ref: featRef,   visible: featVisible } = useFadeIn(0.05)
  const { ref: howRef,    visible: howVisible }  = useFadeIn(0.05)
  const { ref: testRef,   visible: testVisible } = useFadeIn(0.05)
  const { ref: ctaRef,    visible: ctaVisible }  = useFadeIn(0.2)

  const teachers  = useCountUp(48, 1400, statsGo)
  const counties  = useCountUp(47, 1200, statsGo)
  const modules   = useCountUp(48, 1300, statsGo)
  const ratingVal = useCountUp(48, 1500, statsGo)

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── Header ───────────────────────────────────────── */}
      <header className="glass sticky top-0 z-50 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:shadow-primary/50 transition-all duration-200">
              <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Mwalimu AI</span>
          </Link>

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

          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="font-medium hover:text-primary hover:bg-primary/8 rounded-xl transition-all">
                Log in
              </Button>
            </Link>
            <Link href="/auth/sign-up" className="hidden md:block">
              <Button size="sm" className="font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/45 hover:-translate-y-0.5 transition-all duration-200 px-5">
                Get started free
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

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/30 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {[
              { href: '/features', label: 'Features' },
              { href: '/pricing',  label: 'Pricing'  },
              { href: '/about',    label: 'About'    },
              { href: '/blog',     label: 'Blog'     },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-primary/8 hover:text-foreground text-muted-foreground transition-colors">
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-1 border-t border-border/50">
              <Link href="/auth/login"   className="flex-1" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl">Log in</Button>
              </Link>
              <Link href="/auth/sign-up" className="flex-1" onClick={() => setMenuOpen(false)}>
                <Button className="w-full rounded-xl">Get started free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-4 w-[30rem] h-[30rem] bg-primary/14 rounded-full blur-[80px] animate-blob" />
          <div className="absolute top-8 right-0 w-[34rem] h-[34rem] bg-accent/10 rounded-full blur-[90px] animate-blob animation-delay-3000" />
          <div className="absolute bottom-0 left-1/2 w-[26rem] h-[26rem] bg-primary/7 rounded-full blur-[70px] animate-blob animation-delay-6000" />
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 pb-16 md:pt-20 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2.5 glass-subtle border-primary/25 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-7 animate-fade-in-up cursor-default">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            AI-powered professional development
          </div>

          <h1 className="font-black tracking-tighter mb-6 animate-fade-in animation-delay-100">
            <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] leading-tight text-foreground">Empowering</span>
            <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] leading-tight mt-1">
              {/* "Kenyan Teachers" sits inside an inline-flex column so the
                  SVG underline lives in document flow and can't be clipped. */}
              <span className="inline-flex flex-col items-stretch gap-[5px]">
                <span className="text-primary">Kenyan Teachers</span>
                <svg
                  aria-hidden="true"
                  className="w-full pointer-events-none"
                  height="13"
                  viewBox="0 0 200 13"
                  preserveAspectRatio="none"
                  fill="none"
                  style={{ filter: 'drop-shadow(0 1px 4px oklch(0.70 0.20 55 / 0.45))' }}
                >
                  {/* pathLength="1" normalises the path to length 1 — dashoffset
                      animates 1→0 regardless of actual curve geometry. */}
                  <path
                    pathLength="1"
                    d="M0 10 C 30 2, 65 13, 100 6 C 135 0, 168 12, 200 7"
                    stroke="oklch(0.70 0.20 55)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    className="animate-hero-underline"
                  />
                </svg>
              </span>
              <span className="text-foreground"> with CBC</span>
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[4.5rem] leading-tight text-foreground mt-1">Mastery</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-9 max-w-xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Master the Competency-Based Curriculum with personalised AI coaching, structured learning modules, and a vibrant community of educators across Kenya.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up animation-delay-300">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 text-base px-8 py-6 rounded-2xl font-semibold shadow-xl shadow-primary/35 glow-primary hover:-translate-y-1 active:scale-[0.98] transition-all duration-200">
                Start Learning Free
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 rounded-2xl font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/4 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 animate-fade-in-up animation-delay-400">
            {[
              'Free to get started',
              'No credit card required',
              'KICD aligned content',
            ].map((label) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-14 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { value: `${(teachers / 10).toFixed(1)}K+`, label: 'Active teachers',  delay: 0   },
              { value: counties,                           label: 'Counties reached', delay: 100 },
              { value: `${modules}+`,                     label: 'Learning modules', delay: 200 },
              { value: (ratingVal / 10).toFixed(1),       label: 'Average rating',   delay: 300, star: true },
            ].map(({ value, label, delay, star }) => (
              <div
                key={label}
                className={`glass rounded-2xl p-6 text-center transition-all duration-700 ${statsGo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1.5 tabular-nums tracking-tight">{value}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                  {star && <Star className="w-3.5 h-3.5 fill-accent text-accent" />}
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section ref={featRef} className="py-28 features-bg" id="features">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className={`text-center mb-16 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 glass-subtle text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <Zap className="w-3.5 h-3.5" />
              Powerful features
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
              Everything you need to excel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed specifically for CBC implementation success
            </p>
          </div>

          {/* Bento grid — large cards tinted, small cards glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {features.map(({ icon: Icon, accent, large, tinted, title, desc, link, cta }, i) => {
              const spanClass = large
                ? 'md:col-span-2 lg:col-span-7'
                : (i === 1 || i === 2) ? 'lg:col-span-5' : 'lg:col-span-6'
              const surfaceClass = tinted
                ? accent === 'primary' ? 'glass-primary' : 'glass-accent'
                : 'glass'
              return (
                <div
                  key={title}
                  className={[
                    `group ${surfaceClass} rounded-2xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300`,
                    spanClass,
                    large ? 'p-8 flex flex-col sm:flex-row items-start gap-7' : 'p-7 flex flex-col',
                    featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  ].join(' ')}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={[
                    'rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300',
                    large ? 'w-16 h-16' : 'w-13 h-13',
                    accent === 'primary'
                      ? 'bg-primary/20 group-hover:bg-primary/28'
                      : 'bg-accent/20 group-hover:bg-accent/28',
                  ].join(' ')}>
                    <Icon className={`${large ? 'w-8 h-8' : 'w-6 h-6'} ${accent === 'primary' ? 'text-primary' : 'text-accent'} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-2.5 tracking-tight ${large ? 'text-xl' : 'text-lg'}`}>{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                    <Link href={link} className="inline-flex items-center gap-1 text-sm text-primary font-semibold hover:gap-2 transition-all duration-200">
                      {cta}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section ref={howRef} className="py-28 alt-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className={`text-center mb-16 transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get started in minutes and begin your professional development journey
            </p>
          </div>

          {/* Steps as a connected horizontal flow — different layout from feature cards */}
          <div className="relative">
            {/* connector */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+2.5rem)] right-[calc(16.67%+2.5rem)] h-px bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { Icon: GraduationCap, color: 'bg-primary text-primary-foreground shadow-primary/30', title: 'Create your account', desc: 'Sign up for free and complete your teacher profile with your experience level and subjects.' },
                { Icon: Zap,           color: 'bg-accent text-accent-foreground shadow-accent/30',    title: 'Take the assessment', desc: 'Complete a quick needs assessment so we can personalise your learning path.' },
                { Icon: TrendingUp,    color: 'bg-primary text-primary-foreground shadow-primary/30', title: 'Start learning',      desc: 'Access personalised modules, chat with your AI coach, and connect with the community.' },
              ].map(({ Icon, color, title, desc }, i) => (
                <div
                  key={title}
                  className={`text-center transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 tracking-tight">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials — featured 3/5 + stacked 2/5 layout ── */}
      <section ref={testRef} className="py-28 features-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className={`text-center mb-16 transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-3">Loved by teachers</h2>
            <p className="text-muted-foreground text-lg">
              Hear from educators transforming their classrooms with Mwalimu AI
            </p>
          </div>

          {/* Asymmetric layout: featured large (3 cols) + 2 stacked (2 cols) */}
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-5 transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Featured testimonial */}
            <div className="glass rounded-2xl p-8 lg:col-span-3 flex flex-col justify-between">
              <div>
                <Quote className="w-9 h-9 text-primary/20 mb-5" />
                <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border/40">
                <div className={`w-12 h-12 ${testimonials[0].color} rounded-full flex items-center justify-center font-bold ring-2 ring-white/60 shrink-0`}>
                  {testimonials[0].initials}
                </div>
                <div>
                  <div className="font-semibold">{testimonials[0].name}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{testimonials[0].role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
              </div>
            </div>

            {/* Two stacked secondary testimonials */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {testimonials.slice(1).map(({ quote, name, role, initials, color }, i) => (
                <div
                  key={name}
                  className="glass rounded-2xl p-6 flex-1 flex flex-col justify-between"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/30">
                    <div className={`w-9 h-9 ${color} rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white/60 shrink-0`}>
                      {initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{role}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5 shrink-0">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-accent text-accent" />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-28 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className={`relative overflow-hidden rounded-3xl bg-primary transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="absolute inset-0 shimmer opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(255,255,255,0.12),transparent_55%)]" />
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl animate-blob" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/7 rounded-full blur-2xl animate-blob animation-delay-3000" />

            <div className="relative z-10 flex items-center justify-center pt-12 pb-0">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="relative z-10 text-center px-8 md:px-20 py-10 pb-14">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Join 4,800+ Kenyan teachers
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-5 text-primary-foreground tracking-tighter">
                Ready to transform your teaching?
              </h2>
              <p className="text-primary-foreground/80 mb-9 text-lg max-w-2xl mx-auto leading-relaxed">
                Master CBC and create better learning outcomes for your students with AI-powered professional development.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base px-10 py-6 font-semibold rounded-2xl shadow-2xl hover:scale-105 active:scale-[0.98] transition-all duration-200"
                  >
                    Get started free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <p className="text-primary-foreground/60 text-sm">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
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
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy policy</Link>
              <Link href="/docs"    className="hover:text-foreground transition-colors">Documentation</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
