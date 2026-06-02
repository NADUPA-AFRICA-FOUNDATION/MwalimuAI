'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, MessageSquare, Users, Trophy, FileText, Home, Settings, Download, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  isOpen?: boolean
  onClose?: () => void
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/modules', label: 'Learning Modules', icon: BookOpen },
  { href: '/dashboard/assessment', label: 'Needs Assessment', icon: FileText },
  { href: '/dashboard/ai-coach', label: 'AI Coach', icon: Sparkles },
  { href: '/dashboard/community', label: 'Community', icon: Users },
  { href: '/dashboard/resources', label: 'Resources', icon: Download },
  { href: '/dashboard/achievements', label: 'Achievements', icon: Trophy },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function SidebarNav({ isOpen = true, onClose }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <nav
        className={cn(
          'fixed md:static left-0 top-0 h-screen md:h-auto md:border-r border-border/50 bg-sidebar w-64 md:w-auto pt-16 md:pt-0 transform transition-all duration-300 ease-in-out md:transform-none z-30',
          isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full md:translate-x-0'
        )}
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
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-0.5'
                )}
              >
                <Icon className={cn('w-4 h-4 transition-transform duration-200', isActive ? '' : 'group-hover:scale-110')} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
