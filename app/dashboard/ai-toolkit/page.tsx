'use client'

import { useState, useEffect } from 'react'
import { BackButton } from '@/components/back-button'
import { recordToolUsed } from '@/lib/streak'
import { useProfile } from '@/context/profile-context'
import {
  AI_MODULES, AI_COMPETENCIES, KNEC_LEVELS, type AiModule, type ToolSection, type Pathway,
} from '@/lib/ai-toolkit-data'
import {
  Sparkles, NotebookPen, GraduationCap, Layers, Sprout, Boxes, Compass, ClipboardCheck,
  Lightbulb, Copy, Check, ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Trophy,
  Clock, Wand2, FlaskConical, Globe, Palette, type LucideIcon,
} from 'lucide-react'

/* ── Icon maps ──────────────────────────────────────────────── */
const MODULE_ICONS: Record<AiModule['icon'], LucideIcon> = {
  layers: Layers, sprout: Sprout, boxes: Boxes, compass: Compass, clipboard: ClipboardCheck,
}
const TOOL_ICONS: Record<ToolSection['tool'], LucideIcon> = {
  Gemini: Sparkles, NotebookLM: NotebookPen, 'Google Classroom': GraduationCap,
}
const PATHWAY_ICONS: Record<Pathway['icon'], LucideIcon> = {
  flask: FlaskConical, globe: Globe, palette: Palette,
}
const TONE: Record<string, string> = {
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300',
  sky:     'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-300',
  amber:   'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300',
  rose:    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300',
}

/* ── Copyable prompt block ──────────────────────────────────── */
function PromptBlock({ title, prompt }: { title: string; prompt: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(prompt).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="mt-4 rounded-xl border border-border/60 overflow-hidden bg-muted/30">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border/50 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <Wand2 className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">Prompt</span>
          <span className="text-xs font-medium text-foreground/80 truncate">{title}</span>
        </div>
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors shrink-0 ${
            copied
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
          }`}
          aria-label={copied ? 'Copied' : 'Copy prompt'}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="m-0 px-4 py-4 text-xs leading-relaxed text-foreground/80 font-mono whitespace-pre-wrap break-words max-h-80 overflow-y-auto">
        {prompt}
      </pre>
    </div>
  )
}

/* ── Expandable tool section ────────────────────────────────── */
function SectionCard({ section, accent }: { section: ToolSection; accent: string }) {
  const [open, setOpen] = useState(false)
  const Icon = TOOL_ICONS[section.tool]
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3.5 px-5 py-4 text-left hover:bg-muted/20 transition-colors"
        aria-expanded={open}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
            {section.tool}{section.pathway ? ` · ${section.pathway}` : ''}
          </div>
          <div className="font-semibold text-sm leading-snug">{section.title}</div>
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-[1.75] text-foreground/85 whitespace-pre-line mb-4">{section.content}</p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-4 mb-2">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" /> Pedagogical Tip
            </p>
            <p className="text-sm leading-relaxed text-foreground/85">{section.tip}</p>
          </div>

          <PromptBlock title={section.promptTitle} prompt={section.prompt} />
        </div>
      )}
    </div>
  )
}

/* ── Module detail view ─────────────────────────────────────── */
function ModuleView({ mod }: { mod: AiModule }) {
  const Icon = MODULE_ICONS[mod.icon]
  return (
    <div className="space-y-5">
      {/* Hero */}
      <div
        className="rounded-2xl p-6 md:p-7"
        style={{ background: `linear-gradient(135deg, ${mod.accent}14, ${mod.accent}05)`, border: `1px solid ${mod.accent}2e` }}
      >
        <div className="flex gap-4 items-start flex-wrap">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${mod.accent}26`, border: `1px solid ${mod.accent}4d` }}
          >
            <Icon className="w-7 h-7" style={{ color: mod.accent }} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap text-xs">
              <span className="font-mono font-semibold uppercase tracking-wider" style={{ color: mod.accent }}>Module {mod.number}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium" style={{ background: `${mod.accent}1a`, color: mod.accent }}>
                <Clock className="w-3 h-3" /> {mod.duration}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{mod.level}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{mod.title}</h1>
            <p className="text-sm text-muted-foreground italic">{mod.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-5">
          {mod.competencies.map(code => {
            const c = AI_COMPETENCIES.find(x => x.code === code)
            return (
              <span key={code} title={c?.name} className="text-[11px] font-mono font-semibold px-2 py-1 rounded-md bg-foreground/5 text-foreground/70 border border-border/50">
                {code}
              </span>
            )
          })}
        </div>
      </div>

      {/* Overview */}
      <section className="glass rounded-2xl p-5 md:p-6">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Module Overview</h2>
        <p className="text-sm leading-[1.8] text-foreground/85">{mod.overview}</p>
      </section>

      {/* Outcomes */}
      <section className="glass rounded-2xl p-5 md:p-6">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Learning Outcomes</h2>
        <div className="space-y-3">
          {mod.outcomes.map((o, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-mono text-xs font-bold mt-0.5 shrink-0" style={{ color: mod.accent }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm leading-relaxed text-foreground/85">{o}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pathways (M4) */}
      {mod.pathways && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mod.pathways.map(p => {
            const PIcon = PATHWAY_ICONS[p.icon]
            return (
              <div key={p.name} className="glass rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${mod.accent}1a` }}>
                  <PIcon className="w-5 h-5" style={{ color: mod.accent }} aria-hidden="true" />
                </div>
                <div className="font-semibold text-sm mb-1">{p.name}</div>
                <div className="text-[11px] font-mono text-muted-foreground mb-2">{p.tracks}</div>
                <div className="text-xs leading-relaxed text-foreground/70">{p.subjects}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tool sections */}
      <div className="pt-1">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Tool Walkthroughs · tap to expand</h2>
        <div className="space-y-2.5">
          {mod.sections.map((s, i) => <SectionCard key={i} section={s} accent={mod.accent} />)}
        </div>
      </div>

      {/* Deliverable */}
      <section className="rounded-2xl p-5 md:p-6" style={{ background: `${mod.accent}0d`, border: `1px solid ${mod.accent}2e` }}>
        <div className="flex items-center gap-2.5 mb-4">
          <Trophy className="w-4.5 h-4.5" style={{ color: mod.accent }} aria-hidden="true" />
          <h2 className="font-bold text-sm" style={{ color: mod.accent }}>{mod.deliverable.title}</h2>
        </div>
        <div className="space-y-2.5">
          {mod.deliverable.items.map((item, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: mod.accent }} aria-hidden="true" />
              <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ── Overview / index ───────────────────────────────────────── */
function Overview({ onSelect }: { onSelect: (i: number) => void }) {
  const totalHours = AI_MODULES.reduce((a, m) => a + m.hours, 0)
  const stats = [
    { n: String(AI_MODULES.length), l: 'Modules' },
    { n: `${totalHours}h`, l: 'Total Duration' },
    { n: '15+', l: 'Prompt Templates' },
    { n: '3', l: 'Google AI Tools' },
  ]
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> The AI-Empowered Educator
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-balance">
          Mastering Gemini, NotebookLM &amp; Google Classroom for CBC
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          A tool-specific professional development course for Kenyan educators, from Pre-Primary to Senior School, grounded in KICD, KNEC, and the seven CBC core competencies.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.l} className="glass rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text mb-0.5">{s.n}</div>
            <div className="text-[11px] font-mono text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Competency map */}
      <section className="glass rounded-2xl p-5 md:p-6">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3.5">CBC&apos;s 7 Core Competencies · Addressed Across This Course</h2>
        <div className="flex flex-wrap gap-2">
          {AI_COMPETENCIES.map(c => (
            <div key={c.code} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 border border-border/50">
              <span className="font-mono text-[11px] font-bold text-primary">{c.code}</span>
              <span className="text-xs text-foreground/70">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* KNEC scale */}
      <section className="glass rounded-2xl p-5 md:p-6">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3.5">KNEC Competency-Based Assessment · 8-Point Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {KNEC_LEVELS.map(p => (
            <div key={p.level} className={`rounded-xl border p-3.5 text-center ${TONE[p.tone]}`}>
              <div className="text-lg font-bold mb-0.5">{p.level}</div>
              <div className="text-xs font-medium text-foreground/75 mb-1 leading-tight">{p.name}</div>
              <div className="text-[10px] font-mono opacity-70">{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Module cards */}
      <div>
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Course Modules</h2>
        <div className="space-y-2.5">
          {AI_MODULES.map((m, i) => {
            const Icon = MODULE_ICONS[m.icon]
            return (
              <button
                key={m.id}
                onClick={() => onSelect(i)}
                className="group w-full glass rounded-2xl p-4 md:p-5 flex items-center gap-4 text-left hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${m.accent}1f`, border: `1px solid ${m.accent}3d` }}>
                  <Icon className="w-6 h-6" style={{ color: m.accent }} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap text-[10px]">
                    <span className="font-mono font-semibold uppercase tracking-wide" style={{ color: m.accent }}>Module {m.number}</span>
                    <span className="px-1.5 py-0.5 rounded font-medium" style={{ background: `${m.accent}1a`, color: m.accent }}>{m.duration}</span>
                    <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{m.level}</span>
                  </div>
                  <div className="font-bold text-sm md:text-[15px] mb-0.5 group-hover:text-primary transition-colors">{m.title}</div>
                  <div className="text-xs text-muted-foreground italic truncate">{m.subtitle}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" style={{ color: `${m.accent}aa` }} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Philosophy */}
      <section className="rounded-2xl p-5 md:p-6 bg-primary/5 border border-primary/15">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">Course Philosophy</h2>
        <p className="text-sm leading-[1.8] text-foreground/80 mb-2.5">
          This course rests on four non-negotiable principles: (1) AI tools serve the teacher, they never replace professional judgement; (2) every prompt, activity, and rubric must be reviewed and edited by the teacher before it reaches learners; (3) all content is contextualised to the reality of Kenyan classrooms, including resource constraints, large class sizes, and connectivity limitations; and (4) the goal of AI-assisted teaching is not efficiency alone, it is the quality of learning and the depth of competency development that CBC demands.
        </p>
        <p className="text-sm leading-[1.8] text-foreground/80">
          The Kenya National AI Strategy (2025-2030) supports AI integration in classrooms, and the first CBC Senior School cohort entered Grade 10 in January 2026. This is the moment for Kenyan teachers to lead the AI revolution in education.
        </p>
      </section>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────── */
export default function AiToolkitPage() {
  const { user } = useProfile()
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => { recordToolUsed('ai-toolkit', user?.id) }, [user?.id])

  const open = (i: number) => { setActive(i); window.scrollTo(0, 0) }
  const close = () => { setActive(null); window.scrollTo(0, 0) }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        {active === null
          ? <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
          : <button onClick={close} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> All modules
            </button>}
      </div>

      {active === null
        ? <Overview onSelect={open} />
        : <ModuleView mod={AI_MODULES[active]} />}

      {active !== null && (
        <div className="flex items-center justify-between gap-3 mt-8 flex-wrap">
          <button
            onClick={() => active > 0 ? open(active - 1) : close()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {active > 0 ? `Module ${AI_MODULES[active - 1].number}` : 'Overview'}
          </button>
          {active < AI_MODULES.length - 1 && (
            <button
              onClick={() => open(active + 1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: `${AI_MODULES[active].accent}1a`, color: AI_MODULES[active].accent, border: `1px solid ${AI_MODULES[active].accent}4d` }}
            >
              Module {AI_MODULES[active + 1].number} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
