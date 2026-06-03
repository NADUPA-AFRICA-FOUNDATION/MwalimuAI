'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen, Users, Trophy, FileText, Home, Settings,
  Download, Sparkles, Wand2, TrendingUp, BookMarked, PenLine,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProfile } from '@/context/profile-context'
import { getT, type TranslationKey } from '@/lib/i18n'

interface SidebarNavProps {
  isOpen?: boolean
  onClose?: () => void
}

const navItems: { href: string; labelKey: TranslationKey; icon: React.FC<{ className?: string }> }[] = [
  { href: '/dashboard',              labelKey: 'nav.dashboard',    icon: Home       },
  { href: '/dashboard/learning',     labelKey: 'nav.learning',     icon: BookMarked },
  { href: '/dashboard/modules',      labelKey: 'nav.modules',      icon: BookOpen   },
  { href: '/dashboard/assessment',   labelKey: 'nav.assessment',   icon: FileText   },
  { href: '/dashboard/ai-coach',     labelKey: 'nav.aiCoach',      icon: Sparkles   },
  { href: '/dashboard/tools',        labelKey: 'nav.tools',        icon: Wand2      },
  { href: '/dashboard/journal',      labelKey: 'nav.journal',      icon: PenLine    },
  { href: '/dashboard/community',    labelKey: 'nav.community',    icon: Users      },
  { href: '/dashboard/resources',    labelKey: 'nav.resources',    icon: Download   },
  { href: '/dashboard/achievements', labelKey: 'nav.achievements', icon: Trophy     },
  { href: '/dashboard/progress',     labelKey: 'nav.progress',     icon: TrendingUp },
  { href: '/dashboard/settings',     labelKey: 'nav.settings',     icon: Settings   },
]

export function SidebarNav({ isOpen = true, onClose }: SidebarNavProps) {
  const pathname = usePathname()
  const { lang } = useProfile()
  const t = getT(lang)

  // Close sidebar on Escape key when open
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          'fixed md:static left-0 top-0 h-screen md:h-auto md:border-r border-border/50 bg-sidebar w-64 md:w-auto pt-16 md:pt-0 transform transition-all duration-300 ease-in-out md:transform-none z-30',
          isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'
        )}
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-1.5 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:translate-x-0.5'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{t(item.labelKey)}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
