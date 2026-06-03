'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { SidebarNav } from '@/components/sidebar-nav'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { OfflineIndicator } from '@/components/offline-indicator'
import { useProfile } from '@/context/profile-context'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { user, authLoading, profile, mounted, signOut } = useProfile()

  useEffect(() => {
    if (authLoading) return        // wait for Firebase to resolve auth state
    if (!user) {
      router.push('/auth/login')   // not authenticated → login
      return
    }
    if (!user.emailVerified) {
      router.push('/auth/sign-up-success')  // authenticated but unverified → verify
      return
    }
    if (mounted && !profile?.completed) {
      router.push('/onboarding')   // authenticated but no profile → onboarding
    }
  }, [authLoading, user, mounted, profile, router])

  // Show a full-screen spinner while Firebase resolves auth (prevents login flash)
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div role="status" className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin motion-reduce:animate-none" aria-label="Loading…" />
      </div>
    )
  }

  if (!user) return null  // redirect already triggered above

  const handleLogout = async () => {
    await signOut()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader
        onLogout={handleLogout}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex">
        <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main id="main-content" className="flex-1 overflow-auto" tabIndex={-1}>
          <div className="p-4 md:p-8 pb-safe-nav md:pb-8">{children}</div>
        </main>
      </div>
      <MobileBottomNav />
      <OfflineIndicator />
    </div>
  )
}
