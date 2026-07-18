'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
<Link
  href="/"
  aria-label="Skitbit Home"
  className="group flex items-center"
>
  <Image
    src="/Black icon - without symbol.svg"
    alt="Skitbit Logo"
    width={20}
    height={20}
    priority
    className="mr-2 h-5 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
  />

<h1 className="text-[1.35rem] font-semibold tracking-[-0.025em] leading-none text-foreground">
  Skitbit
  <span className="ml-0.5 align-top text-[0.55rem] font-medium">®</span>
</h1>
</Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#about"
            className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
          >
            About
          </Link>

          <Link
            href="/works"
            className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
          >
            Our Work
          </Link>

          <Link
            href="/pricing"
            className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground"
          >
            Pricing
          </Link>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => open()}
          className="btn-primary focus-ring group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
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