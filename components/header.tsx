'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useContactOverlay } from './contact-overlay'
import { BadgeCheck } from 'lucide-react'
import { MobileNavigationDrawer, type MobileNavContent } from './mobile-navigation-drawer'

export function Header({ hasAnnouncement = false, mobileNavigation }: { hasAnnouncement?: boolean; mobileNavigation?: MobileNavContent | null }) {
  const [announcementVisible, setAnnouncementVisible] = useState(hasAnnouncement)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { open } = useContactOverlay()

  useEffect(() => {
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

    const handleAnnouncement = (event: Event) => setAnnouncementVisible((event as CustomEvent<{ visible: boolean }>).detail.visible)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('skitbit-announcement', handleAnnouncement)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('skitbit-announcement', handleAnnouncement)
    }
  }, [])

  return (
    // 👇 Removed 'sticky top-0' and changed to 'relative z-40'
    <header className={`fixed inset-x-0 ${announcementVisible ? 'top-[28px]' : 'top-0'} z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="mx-auto flex h-[48px] w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          aria-label="Skitbit Home"
          className="group flex shrink-0 items-center"
        >
          <Image
            src="/Black icon - without symbol.svg"
            alt="Skitbit Logo"
            width={20}
            height={20}
            priority
            className="mr-2 h-5 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
          />

          <div className="text-[1.35rem] font-semibold tracking-[-0.025em] leading-none text-foreground">
            Skitbit
            <span className="ml-0.5 align-top text-[0.55rem] font-medium">®</span>
            <BadgeCheck aria-label="Verified Skitbit account" className="ml-1.5 inline-block h-4 w-4 fill-[var(--verified)] text-background align-middle" strokeWidth={2.5} />
          </div>
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

        {/* CTA and mobile menu: desktop navigation remains unchanged. */}
        <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => open()}
          className="btn-primary focus-ring group relative hidden items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:opacity-90 active:scale-[0.98] min-[360px]:inline-flex md:inline-flex"
        >
          <span
            aria-hidden="true"
            className="skitbit-button-shimmer pointer-events-none absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/35 blur-md"
          />
          <span className="relative z-10">Contact</span>
        </button>
        <div className="md:hidden">
          <MobileNavigationDrawer content={mobileNavigation ?? undefined} />
        </div>
        </div>
      </nav>
    </header>
  )
}
