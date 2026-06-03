'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen, Users, Trophy, FileText, Home, Settings,
  Download, Sparkles, Wand2, TrendingUp, BookMarked, PenLine,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useProfile } from '@/context/profile-context'
import { getT, type TranslationKey } from '@/lib/i18n'

export interface SidebarNavProps {
  isOpen?: boolean
  isCollapsed?: boolean
  onClose?: () => void
  onToggleCollapse?: () => void
}

const NAV_ITEMS: { href: string; labelKey: TranslationKey; icon: React.FC<{ className?: string }> }[] = [
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

const BASE_NAV = 'flex flex-col bg-sidebar border-r border-border/50 overflow-x-hidden'

export function SidebarNav({
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
}: SidebarNavProps) {
  const pathname = usePathname()
  const { lang } = useProfile()
  const t        = getT(lang)

  useEffect(() => {
    if (!isOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [isOpen, onClose])

  function NavItems({ collapsed }: { collapsed: boolean }) {
    return (
      <>
        {/* Scrollable items list */}
        <div className={cn(
          'flex-1 flex flex-col gap-0.5 overflow-y-auto py-3 scrollbar-none',
          // Mobile: pad bottom so last items aren't behind the fixed bottom nav
          'pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-3',
          collapsed ? 'px-2' : 'px-2.5',
        )}>
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
            const label    = t(labelKey)
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

            const linkCls = cn(
              'flex items-center gap-3 rounded-xl text-sm font-medium h-9',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              collapsed ? 'justify-center px-0 w-9 mx-auto' : 'px-3',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted/80',
            )

            if (collapsed) {
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link href={href} onClick={onClose} aria-current={isActive ? 'page' : undefined} aria-label={label} className={linkCls}>
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>{label}</TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link key={href} href={href} onClick={onClose} aria-current={isActive ? 'page' : undefined} className={linkCls}>
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate leading-none">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden md:flex items-center justify-end shrink-0 border-t border-border/40 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleCollapse}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted/80 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>
      </>
    )
  }

  return (
    <TooltipProvider delayDuration={350}>

      {/* ── Mobile backdrop ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile: fixed overlay drawer (hidden on desktop) ─────────
          Slides in/out via transform. Width always 256px (full label).
          pt-16 pushes items below the sticky header.                  */}
      <nav
        className={cn(
          BASE_NAV,
          'md:hidden fixed top-0 left-0 z-30 h-[100dvh] w-64 pt-16',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
        )}
        aria-label="Main navigation"
      >
        <NavItems collapsed={false} />
      </nav>

      {/* ── Desktop: sticky sidebar in flex flow (hidden on mobile) ──
          Width set via inline style → bypasses Tailwind v4 JIT.
          sticky + flex-1 parent means no margin-left on <main>.      */}
      <nav
        className={cn(BASE_NAV, 'hidden md:flex shrink-0 sticky top-[57px]')}
        style={{
          width:       isCollapsed ? '4rem' : '14rem',
          height:      'calc(100dvh - 57px)',
          alignSelf:   'flex-start',
          transition:  'width 300ms ease-in-out',
        }}
        aria-label="Main navigation"
      >
        <NavItems collapsed={isCollapsed} />
      </nav>

    </TooltipProvider>
  )
}
