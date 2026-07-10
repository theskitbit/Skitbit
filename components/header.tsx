'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useContactOverlay } from './contact-overlay'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { open } = useContactOverlay()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
          SKITBIT<span className="text-xs">®</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#about" className="text-sm text-foreground hover:text-muted-foreground transition">
            About
          </Link>
          
          <Link 
            href="/works"
            className="text-sm text-foreground hover:text-muted-foreground transition"
          >
            Our Work
          </Link>
          
          <Link href="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition">
            Pricing
          </Link>
        </div>

        <button
          type="button"
          onClick={() => open()}
          className="btn-primary rounded-full group relative inline-flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus-ring active:scale-[0.98] px-6 py-3 text-sm font-semibold"
        >
          <span
            aria-hidden="true"
            className="skitbit-button-shimmer pointer-events-none absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/35 blur-md"
          />
          <span className="relative z-10">Contact</span>
        </button>
      </nav>
    </header>
  )
}
