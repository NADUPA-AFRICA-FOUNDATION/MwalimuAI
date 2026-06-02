'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ProfileProvider } from '@/context/profile-context'
import { AccessibilityWidget } from '@/components/accessibility-widget'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ProfileProvider>
        {children}
        <AccessibilityWidget />
      </ProfileProvider>
    </ThemeProvider>
  )
}
