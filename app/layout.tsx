import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { GradientBackground } from '@/components/gradient-background'
import { SWRegister } from '@/components/sw-register'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Mwalimu AI - Teacher Professional Development',
  description: 'AI-powered professional development platform for Kenyan CBC teachers',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mwalimu AI',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fcfb' },
    { media: '(prefers-color-scheme: dark)',  color: '#1e2528' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background ${geist.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      {/*
        Tailwind v4 + Turbopack strips all custom CSS written after @import 'tailwindcss'
        in globals.css, so layout-critical rules that can't be expressed as scanned
        Tailwind classes are injected here as a plain <style> tag instead.
      */}
      {/*
        Tailwind v4 + Turbopack strips custom CSS from globals.css.
        These rules are injected via <style> to bypass that entirely.
      */}
      <style href="mwalimu-layout" precedence="default">{`
        /* ── Font ─────────────────────────────────────────── */
        body { font-family: var(--font-geist-sans, 'Geist', system-ui, sans-serif); }

        /* ── Text wrapping ────────────────────────────────── */
        h1, h2, h3, h4, h5, h6 { text-wrap: balance; }
        p, li, figcaption        { text-wrap: pretty;  }

        /* ── Stagger entrance for stat cards ──────────────── */
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(10px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        .stagger-1 { animation: card-rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .stagger-2 { animation: card-rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
        .stagger-3 { animation: card-rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both; }
        .stagger-4 { animation: card-rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both; }
        @media (prefers-reduced-motion: reduce) {
          .stagger-1, .stagger-2, .stagger-3, .stagger-4 { animation: none; }
        }

        /* ── Sidebar / layout ─────────────────────────────── */
        .pb-safe-nav { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px)); }
        .sidebar-nav  { width: 16rem; }
        .layout-main  { transition: margin-left 300ms ease-in-out; }
        @media (min-width: 768px) {
          .sidebar-nav { transition: width 300ms ease-in-out; }
          [data-sidebar="expanded"]  .sidebar-nav { width: 14rem; }
          [data-sidebar="collapsed"] .sidebar-nav { width: 4rem;  }
          [data-sidebar="expanded"]  .layout-main { margin-left: 14rem; }
          [data-sidebar="collapsed"] .layout-main { margin-left: 4rem;  }
        }
      `}</style>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-xl focus:shadow-lg focus:border focus:border-border"
        >
          Skip to main content
        </a>
        <GradientBackground />
        <Providers>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>
        <SWRegister />
      </body>
    </html>
  )
}
