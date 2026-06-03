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
  /** Mobile drawer: is it open? */
  isOpen?: boolean
  /** Desktop: icon-only collapsed mode */
  isCollapsed?: boolean
  /** Mobile: close the drawer */
  onClose?: () => void
  /** Desktop: toggle collapsed ↔ expanded */
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

export function SidebarNav({
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
}: SidebarNavProps) {
  const pathname = usePathname()
  const { lang }  = useProfile()
  const t         = getT(lang)

  // Close mobile drawer on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <TooltipProvider delayDuration={350}>
      {/* ── Mobile overlay ──────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar panel ────────────────────────────────────────────── */}
      <nav
        className={cn(
          // sidebar-nav: width is controlled by globals.css via [data-sidebar] on root div
          'sidebar-nav',
          // Position: fixed on both mobile & desktop
          'fixed top-0 left-0 z-30',
          // On desktop, start below the 57px sticky header
          'md:top-[57px]',
          // Height
          'h-[100dvh] md:h-[calc(100dvh-57px)]',
          // Flex column so the items list can grow and the collapse button stays at bottom
          'flex flex-col',
          // Visual
          'bg-sidebar border-r border-border/50',
          // Clip content that's wider than the sidebar (e.g. text during collapse)
          'overflow-x-hidden',
          // Smooth mobile slide transition (width handled by globals.css)
          'transition-transform duration-300 ease-in-out',
          // Mobile open/close; desktop always visible
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0',
        )}
        aria-label="Main navigation"
      >
        {/* ── Nav items ────────────────────────────────────────────── */}
        {/*
          overflow-y-auto so all 12 items are reachable on small screens.
          pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] clears the mobile
          bottom nav bar (z-40, ~72px) so "My Progress" & "Settings" are never
          hidden behind it.
        */}
        <div
          className={cn(
            'flex-1 flex flex-col gap-0.5 overflow-y-auto',
            'py-3 scrollbar-none',
            // On mobile, pad bottom enough to clear the fixed bottom nav
            'pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-3',
            isCollapsed ? 'px-2' : 'px-2.5',
          )}
        >
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
            const label    = t(labelKey)
            const isActive =
              pathname === href ||
              (href !== '/dashboard' && pathname.startsWith(href))

            const linkCls = cn(
              'flex items-center gap-3 rounded-xl text-sm font-medium',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              // Height + horizontal padding
              'h-9',
              isCollapsed
                ? 'md:justify-center md:px-0 md:w-9 md:mx-auto px-3'
                : 'px-3',
              // Active vs idle state
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted/80',
            )

            // Collapsed desktop → wrap with tooltip; mobile always shows label
            if (isCollapsed) {
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={label}
                      className={linkCls}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {/* Label visible on mobile even in "collapsed" mode (sidebar is always full-width on mobile) */}
                      <span className="md:hidden truncate">{label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={linkCls}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate leading-none">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* ── Desktop-only collapse toggle ─────────────────────────── */}
        <div className="hidden md:flex items-center justify-end shrink-0 border-t border-border/40 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleCollapse}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted/80 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed
                  ? <ChevronRight className="w-4 h-4" />
                  : <ChevronLeft  className="w-4 h-4" />
                }
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  )
}
