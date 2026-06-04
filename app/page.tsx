'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  GraduationCap, ArrowRight, Menu, X, Check, Star, Quote, ChevronRight,
  BookMarked, BrainCircuit, Users, Award, BarChart3, Zap, TrendingUp,
  Home as HomeIcon, BookOpen, MessageSquare, Trophy, Settings, Flame, Shield,
  CheckCircle2, XCircle, ChevronDown, Sparkles, Globe, Target,
} from 'lucide-react'

/* ── hooks ─────────────────────────────────────────────── */
function useFadeIn(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible: v }
}
function useCountUp(to: number, dur = 1400, go = false) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    const s = performance.now()
    const f = (now: number) => {
      const p = Math.min((now - s) / dur, 1)
      setN(Math.round((1 - (1 - p) ** 3) * to))
      if (p < 1) requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }, [go, to, dur])
  return n
}

/* ── Dashboard mockup ──────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative">
      {/* Main window */}
      <div className="relative card-elevated rounded-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(13,138,95,0.12), 0 4px 20px rgba(0,0,0,0.10)' }}>

        {/* Browser chrome */}
        <div className="bg-muted/60 px-4 py-2.5 border-b border-border/50 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/90" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <span className="w-3 h-3 rounded-full bg-green-400/90" />
          </div>
          <div className="flex-1 mx-2 bg-background rounded-md px-3 py-1 border border-border/40 flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
            <span className="text-[11px] text-muted-foreground font-mono">app.mwalimuai.com/dashboard</span>
          </div>
        </div>

        {/* App shell */}
        <div className="flex bg-muted/20" style={{ height: '460px' }}>

          {/* Sidebar */}
          <div className="w-14 bg-card border-r border-border/40 flex flex-col items-center py-4 gap-1.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center mb-3">
              <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            {[
              { Icon: HomeIcon, active: true  },
              { Icon: BookOpen, active: false },
              { Icon: MessageSquare, active: false },
              { Icon: Trophy, active: false },
              { Icon: BarChart3, active: false },
              { Icon: Settings, active: false },
            ].map(({ Icon, active }, i) => (
              <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-primary/12 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-5 overflow-hidden flex flex-col gap-3.5">

            {/* Greeting row */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-foreground">Good morning, Jane 🌱</p>
                </div>
                <p className="text-[11px] text-muted-foreground">Your AI coach is ready — let&apos;s continue your CBC journey.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-[11px] font-black text-primary">JM</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Lessons done', value: '24', sub: 'of 36', color: 'text-primary' },
                { label: 'AI sessions', value: '12', sub: 'this week', color: 'text-accent' },
                { label: 'Progress', value: '67%', sub: 'CBC Module', color: 'text-primary' },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="bg-card rounded-xl p-2.5 border border-border/50">
                  <p className={`text-lg font-black ${color} leading-none`}>{value}</p>
                  <p className="text-[10px] font-semibold text-foreground mt-0.5">{label}</p>
                  <p className="text-[9px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>

            {/* AI Coach chat */}
            <div className="bg-card rounded-xl border border-border/50 p-3.5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-[11px] font-bold text-foreground">AI Coach</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-green-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-ping-soft" />
                  Online
                </span>
              </div>

              {/* AI message */}
              <div className="bg-primary/8 border border-primary/10 rounded-xl rounded-tl-sm px-3 py-2.5 mb-2.5">
                <p className="text-[11px] text-foreground leading-relaxed">
                  &ldquo;Great work on CBC Foundations, Jane! Ready to practice writing formative assessment rubrics for Grade 4?&rdquo;
                </p>
              </div>

              {/* User message */}
              <div className="bg-muted rounded-xl rounded-tr-sm px-3 py-2 self-end mb-2.5">
                <p className="text-[11px] text-muted-foreground">Yes! Show me an example rubric.</p>
              </div>

              {/* Quick replies */}
              <div className="flex gap-1.5 mt-auto flex-wrap">
                {["View example →", "Practice more", "Ask a question"].map(s => (
                  <div key={s} className="text-[10px] bg-muted border border-border/60 rounded-full px-2.5 py-1 text-muted-foreground cursor-pointer hover:border-primary/40 transition-colors">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Module progress */}
            <div className="bg-card rounded-xl border border-border/50 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <p className="text-[11px] font-bold text-foreground">CBC Foundations Program</p>
                  <p className="text-[10px] text-muted-foreground">Module 4 of 6 · Assessment Strategies</p>
                </div>
                <span className="text-[11px] font-black text-primary">67%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: '67%' }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

/* ── AI Coach mockup ───────────────────────────────────── */
function AiCoachMockup() {
  return (
    <div className="card-elevated rounded-2xl overflow-hidden">
      <div className="bg-muted/60 px-4 py-2.5 border-b border-border/40 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-mono mx-auto">AI Coach · Mwalimu AI</span>
      </div>
      <div className="bg-background p-5 space-y-3.5" style={{ minHeight: '340px' }}>
        <div className="flex items-center gap-2 pb-3 border-b border-border/50">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold">Your AI Coach</p>
            <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Always available</p>
          </div>
        </div>
        {[
          { from: 'ai', text: "Hello Jane! I see you're working on CBC strand 4. How can I help your classroom today?" },
          { from: 'user', text: "I'm struggling with writing competency-based assessment rubrics for Science." },
          { from: 'ai', text: "Great question! Here's a Grade 4 Science rubric framework aligned to KICD strands. Let's build it together step by step." },
        ].map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
              m.from === 'ai'
                ? 'bg-primary/8 border border-primary/10 rounded-tl-sm text-foreground'
                : 'bg-primary text-primary-foreground rounded-tr-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <div className="flex-1 bg-muted rounded-xl px-3.5 py-2 text-[11px] text-muted-foreground border border-border/50">Type a question about CBC...</div>
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <ArrowRight className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Modules mockup ────────────────────────────────────── */
function ModulesMockup() {
  const mods = [
    { title: 'CBC Foundations', sub: 'Core competencies & strands', pct: 67, status: 'In Progress', color: 'bg-primary' },
    { title: 'Assessment Strategies', sub: 'Rubrics, portfolios & formative', pct: 25, status: 'Started', color: 'bg-accent' },
    { title: 'Learner-Centred Pedagogy', sub: 'Student-focused methodologies', pct: 0, status: 'Up Next', color: 'bg-muted-foreground' },
    { title: 'Digital Tools in CBC', sub: 'EdTech integration & platforms', pct: 0, status: 'Locked', color: 'bg-muted-foreground' },
  ]
  return (
    <div className="card-elevated rounded-2xl overflow-hidden">
      <div className="bg-muted/60 px-4 py-2.5 border-b border-border/40 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-mono mx-auto">Learning Modules</span>
      </div>
      <div className="bg-background p-5 space-y-3" style={{ minHeight: '340px' }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-bold">Your Learning Path</p>
          <span className="text-[11px] text-primary font-semibold">2 active</span>
        </div>
        {mods.map(({ title, sub, pct, status, color }) => (
          <div key={title} className="bg-muted/40 rounded-xl p-3.5 border border-border/40">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[12px] font-bold text-foreground leading-tight">{title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                status === 'In Progress' ? 'bg-primary/10 text-primary' :
                status === 'Started' ? 'bg-accent/12 text-accent-foreground' :
                status === 'Up Next' ? 'bg-muted text-muted-foreground' : 'bg-muted text-muted-foreground/50'
              }`}>{status}</span>
            </div>
            {pct > 0 ? (
              <>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{pct}% complete</p>
              </>
            ) : (
              <div className="h-1 bg-border/50 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FAQ accordion ─────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-primary transition-colors group"
      >
        <span className="font-semibold text-[15px] text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-56 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-muted-foreground text-sm leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  )
}

/* ── data ──────────────────────────────────────────────── */
const features = [
  { icon: BrainCircuit, title: 'AI Coach', desc: 'A personal teaching advisor powered by AI — answers CBC questions, creates rubrics, and adapts to your classroom challenges 24/7.', href: '/dashboard/ai-coach', large: true, accent: 'primary' as const },
  { icon: BookMarked, title: 'Structured Modules', desc: 'KICD-mapped self-paced courses built for CBC strands — mobile-first and offline-ready.', href: '/dashboard/modules', large: false, accent: 'accent' as const },
  { icon: Users, title: 'Teacher Community', desc: 'Collaborate with 4,800+ educators across all 47 counties — share resources and solve challenges together.', href: '/dashboard/community', large: false, accent: 'primary' as const },
  { icon: Award, title: 'Achievement Badges', desc: 'Earn verifiable certificates linked to real learning outcomes and classroom impact — not just completion.', href: '/dashboard/achievements', large: false, accent: 'accent' as const },
  { icon: Zap, title: 'Needs Assessment', desc: 'A smart diagnostic that builds a fully personalised learning path around your experience and goals.', href: '/dashboard/assessment', large: false, accent: 'primary' as const },
  { icon: BarChart3, title: 'Progress Analytics', desc: 'Visual insights into your learning velocity, streak performance, and classroom impact over time.', href: '/dashboard', large: false, accent: 'accent' as const },
]

const testimonials = [
  {
    quote: 'In just 8 weeks, I went from overwhelmed by CBC assessment to confidently writing competency rubrics for all my subjects. My Grade 6 students\' outcomes improved measurably.',
    name: 'Jane Muthoni', role: 'Grade 6 Teacher', school: 'Nairobi Primary School', county: 'Nairobi', subject: 'Science & Math', years: '9 years', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=80&h=80&q=80', rating: 5, result: '40% improvement in assessment quality',
  },
  {
    quote: 'The AI Coach is the first tool that actually understands the pressure of CBC implementation. It gave me practical, Kenya-specific advice I could use the very next morning.',
    name: 'Peter Ochieng', role: 'Head of Science', school: 'Kisumu Boys High', county: 'Kisumu', subject: 'Biology', years: '14 years', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', rating: 5, result: '3x faster lesson planning',
  },
  {
    quote: 'I used to spend every weekend preparing CBC materials alone. Now the community and AI tools save me 6+ hours a week. I spend that time with my family.',
    name: 'Faith Kemunto', role: 'Mathematics Teacher', school: 'Mombasa Girls Secondary', county: 'Mombasa', subject: 'Mathematics', years: '7 years', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80', rating: 5, result: '6 hours saved per week',
  },
]

const comparison = [
  { feature: 'CBC-specific content', mwalimu: true, workshop: false, generic: false },
  { feature: 'Available 24/7', mwalimu: true, workshop: false, generic: 'partial' },
  { feature: 'AI personalisation', mwalimu: true, workshop: false, generic: false },
  { feature: 'KICD aligned', mwalimu: true, workshop: true, generic: false },
  { feature: 'Free to start', mwalimu: true, workshop: false, generic: false },
  { feature: 'Works offline', mwalimu: true, workshop: false, generic: false },
  { feature: 'Kenyan teacher community', mwalimu: true, workshop: false, generic: false },
  { feature: 'Progress tracking', mwalimu: true, workshop: false, generic: 'partial' },
]

const faqs = [
  { q: 'What is Mwalimu AI and who is it for?', a: 'Mwalimu AI is an AI-powered professional development platform built exclusively for Kenyan teachers implementing the Competency-Based Curriculum (CBC). Whether you\'re a primary or secondary teacher, newly trained or experienced, the platform adapts to your level and teaching goals.' },
  { q: 'Is Mwalimu AI really free?', a: 'Yes — you can access core learning modules, community features, and AI coaching sessions at no cost. A Professional tier unlocks advanced analytics, unlimited AI sessions, and downloadable certificates.' },
  { q: 'How does the AI Coach work?', a: 'Your AI Coach is trained on CBC curriculum content, KICD standards, and Kenyan classroom contexts. Ask it anything — how to write a competency rubric, how to plan a learner-centred lesson, or how to handle a specific student challenge — and it responds with actionable, practical guidance.' },
  { q: 'Is the content aligned with official KICD standards?', a: 'Every module is mapped to the Kenya Institute of Curriculum Development (KICD) strands, sub-strands, and competency levels. Our content team reviews all materials against the official CBC syllabus regularly.' },
  { q: 'Does it work on slow internet connections?', a: 'Yes. Mwalimu AI is built mobile-first with offline support. Once you\'ve loaded a module, you can continue learning without an internet connection. The AI Coach requires a connection, but all learning content is available offline.' },
  { q: 'Can I use Mwalimu AI on my phone?', a: 'Absolutely. The platform is designed for smartphones first — most Kenyan teachers access it on Android. It works on any modern browser and can be installed as a Progressive Web App (PWA) for a native-app experience.' },
]

/* ── main ──────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const { ref: statsRef, visible: statsGo }     = useFadeIn(0.2)
  const { ref: featRef, visible: featVisible }   = useFadeIn(0.04)
  const { ref: splitRef, visible: splitVisible } = useFadeIn(0.08)
  const { ref: compRef, visible: compVisible }   = useFadeIn(0.08)
  const { ref: howRef, visible: howVisible }     = useFadeIn(0.08)
  const { ref: testRef, visible: testVisible }   = useFadeIn(0.04)
  const { ref: faqRef, visible: faqVisible }     = useFadeIn(0.08)
  const { ref: ctaRef, visible: ctaVisible }     = useFadeIn(0.15)

  const teachers  = useCountUp(48,  1400, statsGo)
  const counties  = useCountUp(47,  1200, statsGo)
  const modules   = useCountUp(48,  1300, statsGo)
  const ratingVal = useCountUp(48,  1500, statsGo)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">

      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <header className="glass-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center btn-primary-glow transition-all duration-200 group-hover:scale-105">
              <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-base tracking-tight">Mwalimu AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {[['Features','/features'],['Pricing','/pricing'],['About','/about'],['Blog','/blog']].map(([l,h]) => (
              <Link key={h} href={h} className="px-4 py-2 text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/60">{l}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="text-[13.5px] h-9 px-4 rounded-lg font-medium">Sign in</Button>
            </Link>
            <Link href="/auth/sign-up" className="hidden md:block">
              <Button size="sm" className="text-[13.5px] h-9 px-5 rounded-xl font-semibold btn-primary-glow">Start free →</Button>
            </Link>
            <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 rounded-xl hover:bg-muted/60 transition-colors" aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-250 border-t border-border/50 ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-5 py-4 flex flex-col gap-1">
            {[['Features','/features'],['Pricing','/pricing'],['About','/about'],['Blog','/blog']].map(([l,h]) => (
              <Link key={h} href={h} onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-colors">{l}</Link>
            ))}
            <div className="flex gap-2 pt-3 mt-1 border-t border-border/40">
              <Link href="/auth/login" className="flex-1" onClick={() => setMenuOpen(false)}><Button variant="outline" className="w-full rounded-xl h-10">Sign in</Button></Link>
              <Link href="/auth/sign-up" className="flex-1" onClick={() => setMenuOpen(false)}><Button className="w-full rounded-xl h-10 font-semibold">Get started</Button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="hero-gradient-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-1.5 mb-7 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping-soft" />
                <span className="text-xs font-semibold text-foreground">Built for Kenya&apos;s 300,000+ CBC teachers</span>
              </div>

              <h1 className="font-black tracking-tight leading-[1.04] mb-7">
                <span className="block text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] text-foreground animate-fade-in animation-delay-100">Empowering</span>
                <span className="block animate-fade-in animation-delay-150">
                  <span className="inline-flex flex-col items-stretch gap-1">
                    <span className="text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] text-gradient-primary">Kenyan Teachers</span>
                    <svg aria-hidden className="w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none" fill="none">
                      <path pathLength="1" d="M0 7 C 50 1, 110 9.5, 150 5 C 190 0.5, 250 9, 300 5"
                        stroke="oklch(0.74 0.17 62)" strokeWidth="3" strokeLinecap="round"
                        strokeDasharray="1" className="animate-hero-underline" />
                    </svg>
                  </span>
                </span>
                <span className="block text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] text-foreground animate-fade-in animation-delay-200">with CBC</span>
                <span className="block text-[3.2rem] sm:text-[4rem] lg:text-[4.5rem] text-foreground animate-fade-in animation-delay-250">Excellence</span>
              </h1>

              <p className="text-[1.05rem] md:text-lg text-muted-foreground leading-relaxed mb-9 max-w-md animate-fade-in-up animation-delay-300">
                Master the Competency-Based Curriculum with a personal AI coach, structured KICD-aligned modules, and a community of 4,800+ educators across Kenya.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in-up animation-delay-400">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="gap-2 text-[15px] px-8 py-6 rounded-2xl font-semibold btn-primary-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200">
                    Start learning free
                    <ArrowRight className="w-4.5 h-4.5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-[15px] px-8 py-6 rounded-2xl font-semibold border-border/80 hover:border-primary/30 hover:bg-primary/3 hover:-translate-y-0.5 transition-all duration-200">
                    See how it works
                  </Button>
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 animate-fade-in-up animation-delay-500">
                {[
                  { icon: Check, label: 'Free to get started' },
                  { icon: Shield, label: 'KICD aligned content' },
                  { icon: Globe, label: 'All 47 counties' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard Mockup */}
            <div className="hidden lg:block animate-slide-in-right animation-delay-200">
              <DashboardMockup />
            </div>

          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="h-16 bg-gradient-to-b from-transparent to-background" />
      </section>


      {/* ════════════════════════════════════════════
          STATS — Floating metric cards
      ════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-12 bg-background border-b border-border/40">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/40">
            {[
              { value: `${(teachers / 10).toFixed(1)}K+`, label: 'Active teachers', delay: 0 },
              { value: counties, label: 'Counties reached', delay: 80 },
              { value: `${modules}+`, label: 'Learning modules', delay: 160 },
              { value: `${(ratingVal / 10).toFixed(1)}★`, label: 'Average rating', delay: 240 },
            ].map(({ value, label, delay }) => (
              <div
                key={label}
                className={`py-8 px-6 text-center transition-all duration-700 ${statsGo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <span className="block text-[2.4rem] md:text-[2.8rem] font-black text-gradient-primary tabular-nums leading-none mb-1.5">{value}</span>
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRODUCT SHOWCASE — tabbed mockups
      ════════════════════════════════════════════ */}
      <section className="py-24 section-muted overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-10">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 surface-primary rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Product Preview</span>
            </div>
            <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight mb-4">See it in action</h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
              A purpose-built platform — not a generic LMS. Every screen is designed around how Kenyan teachers actually work.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {['AI Coach', 'Dashboard', 'Learning Modules'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === i
                    ? 'bg-primary text-primary-foreground btn-primary-glow'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {activeTab === 0 && <AiCoachMockup />}
            {activeTab === 1 && <DashboardMockup />}
            {activeTab === 2 && <ModulesMockup />}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES — Premium bento grid
      ════════════════════════════════════════════ */}
      <section ref={featRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-10">

          <div className={`mb-14 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 surface-primary rounded-full px-4 py-1.5 mb-5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Platform Features</span>
            </div>
            <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight mb-4 max-w-lg">Everything you need to excel at CBC</h2>
            <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
              Tools designed specifically for the way Kenyan teachers learn and grow — not adapted from foreign platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, href, accent }, i) => (
              <div
                key={title}
                className={`group flex flex-col p-7 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-200
                  ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${accent === 'primary' ? 'bg-primary/10' : 'bg-accent/12'}`}>
                  <Icon className={`w-5 h-5 ${accent === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <h3 className="font-bold text-[15px] tracking-tight mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                <Link href={href} className={`inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200 ${accent === 'primary' ? 'text-primary' : 'text-accent'}`}>
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SPLIT — Built for Kenya
      ════════════════════════════════════════════ */}
      <section ref={splitRef} className="py-24 section-emerald-tint overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className={`transition-all duration-700 ${splitVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <div className="relative rounded-3xl overflow-hidden aspect-[3/2] card-elevated">
                <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" alt="Students in a CBC classroom" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Overlay chip */}
                <div className="absolute bottom-5 left-5 glass-subtle rounded-2xl px-4 py-3">
                  <p className="text-xs font-bold text-foreground">300,000+ teachers in Kenya</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">deserve world-class support</p>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-150 ${splitVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
              <div className="inline-flex items-center gap-2 surface-accent rounded-full px-4 py-1.5 mb-6">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">Built for Kenya</span>
              </div>
              <h2 className="text-3xl md:text-[2.5rem] font-black tracking-tight mb-5 leading-tight">
                Designed around the<br />real challenges of CBC
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Mwalimu AI was built by educators who lived through Kenya&apos;s CBC transition. Every feature exists because a teacher asked for it — not because a product manager decided it was &ldquo;nice to have.&rdquo;
              </p>
              <ul className="space-y-4 mb-9">
                {[
                  'All content mapped to KICD strands and sub-strands',
                  'Available in English and Swahili',
                  'Works on low-bandwidth networks and offline',
                  'Trusted by teachers across all 47 counties',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <Button variant="outline" className="rounded-2xl font-semibold border-primary/30 text-primary hover:bg-primary/5 px-6">
                  Our mission <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════════════ */}
      <section ref={compRef} className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-5 md:px-10">

          <div className={`text-center mb-14 transition-all duration-700 ${compVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight mb-4">Why teachers choose Mwalimu AI</h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">Not all professional development is equal. Here&apos;s how we compare.</p>
          </div>

          <div className={`card-premium rounded-3xl overflow-hidden transition-all duration-700 ${compVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Header */}
            <div className="grid grid-cols-4 bg-muted/40 border-b border-border/50">
              <div className="p-5 col-span-1" />
              {['Mwalimu AI', 'Workshops', 'Generic Courses'].map((h, i) => (
                <div key={h} className={`p-5 text-center border-l border-border/40 ${i === 0 ? 'bg-primary/5' : ''}`}>
                  <p className={`text-sm font-bold ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{h}</p>
                  {i === 0 && <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">Recommended</span>}
                </div>
              ))}
            </div>
            {comparison.map(({ feature, mwalimu, workshop, generic }, i) => (
              <div key={feature} className={`grid grid-cols-4 border-b border-border/30 last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                <div className="p-4 text-sm text-muted-foreground font-medium">{feature}</div>
                {[mwalimu, workshop, generic].map((val, j) => (
                  <div key={j} className={`p-4 flex items-center justify-center border-l border-border/30 ${j === 0 ? 'bg-primary/3' : ''}`}>
                    {val === true  && <CheckCircle2 className="w-5 h-5 check-yes" />}
                    {val === false && <XCircle className="w-5 h-5 check-no opacity-30" />}
                    {val === 'partial' && <span className="text-[11px] font-semibold text-muted-foreground">Partial</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS — Connected timeline
      ════════════════════════════════════════════ */}
      <section ref={howRef} className="py-24 section-muted overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 md:px-10">

          <div className={`text-center mb-16 transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 surface-primary rounded-full px-4 py-1.5 mb-5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Getting Started</span>
            </div>
            <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight mb-4">Up and running in minutes</h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto">Three steps to a better classroom.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px">
              <div className="w-full h-full border-t-2 border-dashed border-primary/30" />
            </div>

            {[
              { num: '01', icon: GraduationCap, title: 'Create your account', desc: 'Sign up free in under 2 minutes. Complete your teacher profile — subjects, grade levels, experience. No credit card needed.' },
              { num: '02', icon: Zap,           title: 'Take the assessment',  desc: 'A 5-minute diagnostic builds a personalised CBC learning path. The AI maps your needs to the right modules and coaching focus areas.' },
              { num: '03', icon: TrendingUp,    title: 'Start learning & growing', desc: 'Access AI coaching, modules, and the teacher community. Learn on your phone, offline, at your own pace.' },
            ].map(({ num, icon: Icon, title, desc }, i) => (
              <div key={title}
                className={`text-center transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center" style={{ boxShadow: 'var(--shadow-primary)' }}>
                    <Icon className="w-9 h-9 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent border-2 border-background flex items-center justify-center text-[11px] font-black text-white">
                    {num.slice(-1)}
                  </span>
                </div>
                <h3 className="font-bold text-[15px] mb-3 tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[230px] mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section ref={testRef} className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-10">

          <div className={`mb-14 transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight">Real teachers. Real results.</h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-muted-foreground">Verified reviews from</p>
                <p className="font-bold text-foreground">4,800+ Kenyan teachers</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, role, school, img, rating, result }, i) => (
              <div
                key={name}
                className={`card-premium rounded-3xl p-7 flex flex-col transition-all duration-700 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Quote */}
                <div className="mb-6 flex-1">
                  <Quote className="w-8 h-8 text-primary/15 mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{quote}&rdquo;</p>
                </div>

                {/* Result callout */}
                <div className="surface-primary rounded-xl px-4 py-2.5 mb-5">
                  <p className="text-[11px] text-primary font-bold">✦ {result}</p>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-5 border-t border-border/40">
                  <img src={img} alt={name} className="w-11 h-11 rounded-full object-cover border-2 border-primary/20 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{role} · {school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════ */}
      <section ref={faqRef} className="py-24 section-muted">
        <div className="max-w-3xl mx-auto px-5 md:px-10">

          <div className={`text-center mb-14 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="text-3xl md:text-[2.8rem] font-black tracking-tight mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto">Everything you need to know before getting started.</p>
          </div>

          <div className={`card-premium rounded-3xl px-8 py-2 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
          </div>

          <div className={`text-center mt-8 transition-all duration-700 delay-200 ${faqVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-muted-foreground">
              Still have questions?{' '}
              <Link href="/contact" className="text-primary font-semibold hover:underline underline-offset-4">Contact our team →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA — Emotional
      ════════════════════════════════════════════ */}
      <section ref={ctaRef} className="py-28 relative overflow-hidden bg-[oklch(0.43_0.115_163)]">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className={`relative z-10 max-w-3xl mx-auto px-5 md:px-10 text-center transition-all duration-900 ${ctaVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'}`}>

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping-soft" />
            <span className="text-sm font-semibold text-white">Free for every Kenyan teacher</span>
          </div>

          <h2 className="text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-black text-white tracking-tight leading-[1.04] mb-6">
            Your students deserve<br />
            <span style={{ color: 'oklch(0.74 0.17 62)' }}>a confident teacher.</span>
          </h2>

          <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Every module you complete, every AI coaching session you have, every colleague you connect with — it all shows up in your classroom the next morning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-base px-10 py-6 rounded-2xl font-bold bg-white text-primary hover:bg-white/95 hover:scale-105 active:scale-[0.98] transition-all duration-200 border-0">
                Start teaching better — free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <Check className="w-4 h-4" /> No credit card · Free forever
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <Check className="w-4 h-4" /> Join 4,800+ Kenyan teachers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="bg-foreground py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
                <span className="font-bold text-base text-white tracking-tight">Mwalimu AI</span>
              </Link>
              <p className="text-sm text-white/50 max-w-[210px] leading-relaxed">
                Empowering Kenyan teachers with AI-powered professional development for CBC excellence.
              </p>
              {/* Social proof mini */}
              <div className="flex items-center gap-1 mt-5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                <span className="text-[11px] text-white/40 ml-1.5">Loved by 4,800+ teachers</span>
              </div>
            </div>

            {[
              { title: 'Product',   links: [['/features','Features'],['/pricing','Pricing'],['/blog','Blog']] },
              { title: 'Company',   links: [['/about','About'],['/contact','Contact'],['/privacy','Privacy']] },
              { title: 'Resources', links: [['/docs','Documentation'],['/faq','FAQ'],['/support','Support']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-5">{title}</h4>
                <ul className="space-y-3.5">
                  {links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">&copy; 2026 Mwalimu AI · All rights reserved · Nairobi, Kenya</p>
            <div className="flex items-center gap-5 text-xs text-white/30">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy policy</Link>
              <Link href="/docs"    className="hover:text-white/70 transition-colors">Documentation</Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
