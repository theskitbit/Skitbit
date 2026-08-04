'use client'

import Link from 'next/link'
import { useContactOverlay } from './contact-overlay'

export function Header() {
  const { open } = useContactOverlay()

  const handleContactClick = () => {
    open();
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">

        <Link href="/" className="text-lg font-medium tracking-tight text-foreground">
          SKITBIT<span className="text-xs">®</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#about" className="text-sm text-foreground hover:text-muted-foreground transition">
            Work
          </Link>
          <Link href="/#membership" className="text-sm text-foreground hover:text-muted-foreground transition">
            How it works
          </Link>
          <Link href="/#events" className="text-sm text-foreground hover:text-muted-foreground transition">
            Case studies
          </Link>
          {/* Functional Link to your /pricing route */}
          <Link href="/pricing" className="text-sm text-foreground hover:text-muted-foreground transition">
            Pricing
          </Link>
        </div>

        <button onClick={handleContactClick} className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
          Contact Us
        </button>

      </nav>
    </header>
  )
}