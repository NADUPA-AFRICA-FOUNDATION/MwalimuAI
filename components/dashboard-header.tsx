import Link from 'next/link'
import { LogOut, Menu, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationCenter } from '@/components/notification-center'

interface DashboardHeaderProps {
  userName: string
  onLogout: () => void
  onMenuToggle?: () => void
}

export function DashboardHeader({ userName, onLogout, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-muted rounded-xl"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Mwalimu AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="flex items-center gap-3 px-3 py-1.5 bg-muted/50 rounded-xl">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-sm text-primary">
                {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="font-medium text-sm hidden sm:inline">{userName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
