'use client'

import Link from 'next/link'
import { LogOut, Menu, GraduationCap, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationCenter } from '@/components/notification-center'
import { useTheme } from 'next-themes'
import { useProfile } from '@/context/profile-context'
import { getT } from '@/lib/i18n'
import { useEffect, useState } from 'react'

interface DashboardHeaderProps {
  onLogout: () => void
  onMenuToggle?: () => void
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const icons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
  const Icon = icons[(theme as keyof typeof icons) ?? 'system']

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
      aria-label={`Switch to ${next} mode`}
      title={`Currently: ${theme} mode`}
    >
      <Icon className="w-4.5 h-4.5" aria-hidden="true" />
    </button>
  )
}

export function DashboardHeader({ onLogout, onMenuToggle }: DashboardHeaderProps) {
  const { profile, lang, toggleLang, mounted } = useProfile()
  const t = getT(lang)

  const displayName = mounted && profile?.name ? profile.name : 'Teacher'
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-muted rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 group-hover:shadow-primary/40 transition-all duration-200">
              <GraduationCap className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Mwalimu AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            title={t('header.langToggle')}
            aria-label={t('header.langToggle')}
          >
            <span className="text-base leading-none" aria-hidden="true">{lang === 'en' ? '🇰🇪' : '🇬🇧'}</span>
            {t('header.langToggle')}
          </button>

          {/* Dark mode toggle */}
          <ThemeToggle />

          <NotificationCenter />

          {/* User avatar */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-xl transition-colors cursor-default">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-sm text-primary" aria-hidden="true">{initials}</span>
            </div>
            <span className="font-medium text-sm hidden sm:inline">{displayName}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">{t('header.logout')}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
