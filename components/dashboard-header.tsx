'use client'

import Link from 'next/link'
import {
  LogOut, Menu, GraduationCap, Sun, Moon, Monitor, Languages,
  PanelLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationCenter } from '@/components/notification-center'
import { useTheme } from 'next-themes'
import { useProfile } from '@/context/profile-context'
import { getT } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface DashboardHeaderProps {
  onLogout: () => void
  onMenuToggle?: () => void
  /** Desktop: current collapsed state (to set correct aria-pressed) */
  sidebarCollapsed?: boolean
  /** Desktop: toggle sidebar collapsed ↔ expanded */
  onToggleCollapse?: () => void
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const cycleMap = { light: 'dark', dark: 'system', system: 'light' } as const
  const next = cycleMap[theme as keyof typeof cycleMap] ?? 'light'
  const Icon = { light: Sun, dark: Moon, system: Monitor }[theme as keyof typeof cycleMap] ?? Monitor

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
      aria-label={`Switch to ${next} mode`}
      title={`Currently: ${theme} mode`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  )
}

export function DashboardHeader({
  onLogout,
  onMenuToggle,
  sidebarCollapsed,
  onToggleCollapse,
}: DashboardHeaderProps) {
  const { profile, lang, toggleLang, mounted } = useProfile()
  const t = getT(lang)

  const displayName = mounted && profile?.name ? profile.name : 'Teacher'
  const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const AVATAR_PALETTES = [
    'bg-rose-500 text-white',
    'bg-amber-500 text-white',
    'bg-emerald-600 text-white',
    'bg-sky-500 text-white',
    'bg-violet-500 text-white',
    'bg-pink-500 text-white',
    'bg-orange-500 text-white',
    'bg-teal-600 text-white',
  ]
  const avatarColor = AVATAR_PALETTES[(displayName.charCodeAt(0) || 84) % AVATAR_PALETTES.length]

  return (
    <header className="sticky top-0 z-40 h-[57px] border-b border-border/50 bg-background/90 backdrop-blur-md">
      <div className="flex items-center h-full px-4 gap-2">

        {/* ── Left side ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mobile hamburger — opens drawer */}
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-muted rounded-xl transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          )}

          {/* Desktop collapse toggle — sits where the hamburger would be */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-pressed={sidebarCollapsed}
            >
              <PanelLeft className={cn('w-5 h-5 transition-transform duration-200', sidebarCollapsed && 'rotate-180')} aria-hidden="true" />
            </button>
          )}

          {/* Brand */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group ml-1">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 group-hover:shadow-primary/35 transition-all duration-200">
              <GraduationCap className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-bold text-base hidden sm:inline tracking-tight">Mwalimu AI</span>
          </Link>
        </div>

        {/* ── Right side ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            title={t('header.langToggle')}
            aria-label={t('header.langToggle')}
          >
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('header.langToggle')}</span>
          </button>

          <ThemeToggle />
          <NotificationCenter />

          {/* User avatar chip */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors cursor-default select-none">
            <div className={`w-6 h-6 ${avatarColor} rounded-full flex items-center justify-center shrink-0`}>
              <span className="font-bold text-[10px] leading-none" aria-hidden="true">{initials}</span>
            </div>
            <span className="font-medium text-sm hidden md:inline truncate max-w-[120px]">{displayName}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200 px-2 sm:px-3"
          >
            <LogOut className="w-4 h-4 sm:mr-1.5" aria-hidden="true" />
            <span className="hidden sm:inline text-sm">{t('header.logout')}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
