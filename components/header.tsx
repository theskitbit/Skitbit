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
      setHidden(currentScrollY > 72 && scrollingDown ? true : !scrollingDown || currentScrollY <= 72 ? false : hidden)
      lastScrollY.current = currentScrollY
    }
    const handleAnnouncement = (event: Event) => setAnnouncementVisible((event as CustomEvent<{ visible: boolean }>).detail.visible)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('skitbit-announcement', handleAnnouncement)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('skitbit-announcement', handleAnnouncement)
    }
  }, [hidden])

  return (
    <header className={`fixed inset-x-0 ${announcementVisible ? 'top-[28px]' : 'top-0'} z-40 flex justify-center px-3 pt-2 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="flex h-11 w-full max-w-3xl items-center justify-between rounded-full border border-border bg-foreground px-3 text-background shadow-lg shadow-foreground/10 sm:px-4">
        <Link href="/" aria-label="Skitbit Home" className="group flex shrink-0 items-center gap-2">
          <Image src="/Black icon - without symbol.svg" alt="Skitbit Logo" width={20} height={20} priority className="h-5 w-auto invert transition-transform duration-300 group-hover:scale-105" />
          <span className="text-sm font-semibold tracking-[-0.025em] sm:text-base">Skitbit<span className="ml-0.5 align-top text-[0.45rem] font-medium">®</span><BadgeCheck aria-label="Verified Skitbit account" className="ml-1 inline-block h-4 w-4 fill-[var(--verified)] text-foreground align-middle" strokeWidth={2.5} /></span>
        </Link>
        <div className="hidden items-center gap-1 md:flex" role="navigation" aria-label="Primary navigation">
          <Link href="/#about" className="rounded-full px-3.5 py-2 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background">About</Link>
          <Link href="/works" className="rounded-full px-3.5 py-2 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background">Our Work</Link>
          <Link href="/pricing" className="rounded-full px-3.5 py-2 text-sm font-medium text-background/70 transition-colors hover:bg-background/10 hover:text-background">Pricing</Link>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => open()} className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background sm:inline-flex">Contact</button>
          <div className="md:hidden"><MobileNavigationDrawer content={mobileNavigation ?? undefined} /></div>
        </div>
      </nav>
    </header>
  )
}
