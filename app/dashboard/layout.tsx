'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { SidebarNav } from '@/components/sidebar-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName="Teacher"
        onLogout={handleLogout}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex">
        <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
