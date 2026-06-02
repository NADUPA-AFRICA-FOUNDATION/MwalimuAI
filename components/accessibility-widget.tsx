'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import {
  Accessibility, X, Type, Contrast, ZapOff, AlignJustify,
  Moon, Sun, RotateCcw, BookOpen,
} from 'lucide-react'
import { getA11y, saveA11y, applyA11y, DEFAULT_A11Y, type A11ySettings } from '@/lib/a11y-settings'

const TEXT_SIZES: Array<{ key: A11ySettings['textSize']; px: number; label: string }> = [
  { key: 'normal',  px: 13, label: 'Normal'   },
  { key: 'large',   px: 16, label: 'Large'    },
  { key: 'xlarge',  px: 19, label: 'X-Large'  },
  { key: 'xxlarge', px: 23, label: 'XX-Large' },
]

const TOGGLES = [
  {
    key:   'highContrast' as const,
    icon:  Contrast,
    label: 'High Contrast',
    desc:  'Stronger colours, clearer edges',
  },
  {
    key:   'wideSpacing' as const,
    icon:  AlignJustify,
    label: 'Wide Line Spacing',
    desc:  'More space between lines of text',
  },
  {
    key:   'reduceMotion' as const,
    icon:  ZapOff,
    label: 'Reduce Motion',
    desc:  'Removes all animations',
  },
  {
    key:   'dyslexiaFont' as const,
    icon:  BookOpen,
    label: 'Dyslexia-Friendly Font',
    desc:  'Easier-to-read typeface with spacing',
  },
]

function Indicator({ on }: { on: boolean }) {
  return (
    <div
      className={`w-9 h-5 rounded-full flex items-center transition-colors duration-200 flex-shrink-0 ${
        on ? 'bg-primary justify-end' : 'bg-muted-foreground/25 justify-start'
      }`}
      style={{ padding: '2px' }}
    >
      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
    </div>
  )
}

export function AccessibilityWidget() {
  const [open, setOpen]           = useState(false)
  const [settings, setSettings]   = useState<A11ySettings>(DEFAULT_A11Y)
  const [mounted, setMounted]     = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef   = useRef<HTMLButtonElement>(null)
  const { theme, setTheme } = useTheme()

  // Load + apply on mount, and re-apply whenever the component re-mounts
  // (Next.js App Router preserves the provider tree on navigation so the
  //  injected <style> elements survive, but we still re-apply on mount to
  //  handle hard refreshes or the first page load)
  useEffect(() => {
    const s = getA11y()
    setSettings(s)
    applyA11y(s)
    setMounted(true)
  }, [])

  // Re-apply when settings change (belt-and-suspenders: saveA11y already calls
  // applyA11y but this catches any missed re-hydration cycles)
  useEffect(() => {
    if (mounted) applyA11y(settings)
  }, [settings, mounted])

  // Close panel on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Keyboard shortcut: Alt + A
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const update = (patch: Partial<A11ySettings>) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    saveA11y(next)
  }

  const reset = () => {
    setSettings(DEFAULT_A11Y)
    saveA11y(DEFAULT_A11Y)
  }

  if (!mounted) return null

  const anyActive = settings.textSize !== 'normal' || settings.highContrast ||
    settings.reduceMotion || settings.dyslexiaFont || settings.wideSpacing

  return (
    <>
      {/* Skip to main content — screen reader / keyboard only */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-xl focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Floating trigger button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility options — press Alt+A"
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="Accessibility options (Alt+A)"
        className={`fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full shadow-xl flex items-center justify-center transition-[background-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:scale-110 group ${
          open
            ? 'bg-foreground text-background scale-110'
            : 'bg-primary text-primary-foreground hover:shadow-primary/40'
        }`}
        style={{ width: 52, height: 52 }}
      >
        {/* Active indicator dot */}
        {anyActive && !open && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background" />
        )}
        <Accessibility className="w-5 h-5" />
      </button>

      {/* Panel */}
      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility options"
          className="fixed bottom-[76px] right-6 z-50 w-76 bg-background border border-border/60 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
          style={{ width: 296, animation: 'a11yPanelIn 0.18s cubic-bezier(0.16,1,0.3,1)' }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4" />
              <span className="font-bold text-sm tracking-tight">Accessibility Options</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close accessibility panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-5 max-h-[70vh] overflow-y-auto">

            {/* ── Text Size ── */}
            <section aria-labelledby="a11y-text-label">
              <p id="a11y-text-label" className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" />
                Text Size
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {TEXT_SIZES.map(({ key, px, label }) => (
                  <button
                    key={key}
                    onClick={() => update({ textSize: key })}
                    aria-pressed={settings.textSize === key}
                    aria-label={`Text size: ${label}`}
                    className={`py-3 rounded-xl font-bold transition-all duration-150 flex items-center justify-center border ${
                      settings.textSize === key
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30'
                        : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/60 hover:text-foreground'
                    }`}
                    style={{ fontSize: px }}
                  >
                    A
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-1.5 tracking-wide">
                {['Normal', 'Large', 'X-Large', 'XX-Large'].join('  ·  ')}
              </p>
            </section>

            {/* ── Display Toggles ── */}
            <section aria-labelledby="a11y-display-label">
              <p id="a11y-display-label" className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Display Options
              </p>
              <div className="space-y-1.5">
                {TOGGLES.map(({ key, icon: Icon, label, desc }) => (
                  <button
                    key={key}
                    onClick={() => update({ [key]: !settings[key] })}
                    aria-pressed={settings[key]}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left border ${
                      settings[key]
                        ? 'bg-primary/8 border-primary/30 text-primary'
                        : 'border-transparent bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold leading-none mb-0.5">{label}</p>
                      <p className="text-[11px] opacity-60 leading-tight">{desc}</p>
                    </div>
                    <Indicator on={settings[key]} />
                  </button>
                ))}

                {/* Dark Mode — separate since it uses next-themes */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-pressed={theme === 'dark'}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left border ${
                    theme === 'dark'
                      ? 'bg-primary/8 border-primary/30 text-primary'
                      : 'border-transparent bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70'
                  }`}
                >
                  {theme === 'dark'
                    ? <Moon className="w-4 h-4 shrink-0" />
                    : <Sun  className="w-4 h-4 shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-none mb-0.5">Dark Mode</p>
                    <p className="text-[11px] opacity-60 leading-tight">Switch to dark background</p>
                  </div>
                  <Indicator on={theme === 'dark'} />
                </button>
              </div>
            </section>

            {/* ── Reset ── */}
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 border border-border/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All to Default
            </button>
          </div>

          {/* Footer hint */}
          <p className="text-center text-[10.5px] text-muted-foreground py-2.5 border-t border-border/30 tracking-wide">
            Settings saved automatically &nbsp;·&nbsp; Alt+A to toggle
          </p>
        </div>
      )}
    </>
  )
}
