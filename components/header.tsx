'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useContactOverlay } from './contact-overlay'

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { open } = useContactOverlay()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current

      if (currentScrollY > 72 && scrollingDown) {
        setHidden(true)
      } else if (!scrollingDown || currentScrollY <= 72) {
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    // 👇 Removed 'sticky top-0' and changed to 'relative z-40'
    <header className={`fixed inset-x-0 top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="mx-auto flex h-[50px] max-w-[964px] items-center justify-between px-6 lg:px-4">
        
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
          className="btn-primary focus-ring group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:opacity-90 active:scale-[0.98]"
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
