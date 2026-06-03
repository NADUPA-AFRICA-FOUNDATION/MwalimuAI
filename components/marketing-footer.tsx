import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">Mwalimu AI</span>
          </Link>

          <p className="text-xs text-muted-foreground order-last md:order-none">
            &copy; 2026 Mwalimu AI. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy"  className="hover:text-foreground transition-colors">Privacy policy</Link>
            <Link href="/docs"     className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="/contact"  className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
