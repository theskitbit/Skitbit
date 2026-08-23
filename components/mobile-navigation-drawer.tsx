'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useContactOverlay } from './contact-overlay'

export type MobileNavLink = { _key?: string; label: string; href: string }
export type MobileNavCard = { _key?: string; title: string; subtitle?: string; href: string; imageUrl?: string; alt?: string }
export type MobileNavGroup = { _key?: string; title: string; links?: MobileNavLink[] }
export type MobileNavContent = { primaryLinks: MobileNavLink[]; featuredCards: MobileNavCard[]; groups: MobileNavGroup[]; utilityLinks: MobileNavLink[] }

const fallbackContent: MobileNavContent = {
  primaryLinks: [
    { label: 'About', href: '/#about' },
    { label: 'Our Work', href: '/works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  featuredCards: [
    { title: '3D Product Visualization', subtitle: 'Make products impossible to ignore', href: '/#work', imageUrl: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/3d-watch-rendering-patria-tourbillon-scaled.jpg', alt: '3D product visualization' },
    { title: 'Performance Creative', subtitle: 'Visual systems built to convert', href: '/services/performance-creative-management', imageUrl: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/6903dfc74a058950106038a7_5.Lifestyle%20%26%20Marketing%20%201.jpg', alt: 'Performance creative visual' },
  ],
  groups: [
    { title: 'Services', links: [{ label: 'All Services', href: '/services' }, { label: '3D Product Animation', href: '/services/3d-product-animation' }, { label: 'Performance Creative Management', href: '/services/performance-creative-management' }] },
    { title: 'Studio Locations', links: [{ label: 'All Locations', href: '/locations' }, { label: 'Mumbai', href: '/locations/mumbai' }, { label: 'London', href: '/locations/london' }] },
    { title: 'About', links: [{ label: 'About Skitbit', href: '/#about' }, { label: 'Blog', href: '/blog' }] },
  ],
  utilityLinks: [{ label: 'Contact', href: '#contact' }, { label: 'Privacy Policy', href: '/privacy-policy' }],
}

export function MobileNavigationDrawer({ content = fallbackContent }: { content?: MobileNavContent }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { open: openContact } = useContactOverlay()
  const data: MobileNavContent = {
    primaryLinks: content.primaryLinks?.length ? content.primaryLinks : fallbackContent.primaryLinks,
    featuredCards: content.featuredCards?.length ? content.featuredCards : fallbackContent.featuredCards,
    groups: content.groups?.length ? content.groups : fallbackContent.groups,
    utilityLinks: content.utilityLinks?.length ? content.utilityLinks : fallbackContent.utilityLinks,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus()
      return
    }
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Tab') {
        const focusable = document.querySelectorAll<HTMLElement>('[data-mobile-drawer] a, [data-mobile-drawer] button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const navigate = (href: string) => {
    setOpen(false)
    if (href === '#contact') openContact()
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="inline-flex items-center justify-center rounded-full p-2 md:hidden" aria-label="Open navigation menu" title="Open navigation menu" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      {mounted && createPortal(
        <AnimatePresence>
          {open && (
          <div className="fixed inset-0 z-[100000] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <motion.button type="button" aria-label="Close navigation menu" title="Close navigation menu" className="absolute inset-0 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside data-mobile-drawer className="relative flex h-full w-[min(88vw,390px)] flex-col overflow-y-auto bg-background px-5 pb-8 pt-5 shadow-2xl" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <div className="flex items-center justify-between border-b border-border/70 pb-5">
                <Link href="/" onClick={() => setOpen(false)} aria-label="Skitbit Home" className="flex items-center">
                  <Image src="/Black icon - without symbol.svg" alt="Skitbit Logo" width={20} height={20} className="mr-2 h-5 w-auto" />
                  <span className="text-xl font-semibold tracking-tight">Skitbit<span className="text-xs align-top">®</span></span>
                </Link>
                <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="rounded-full border border-border p-2" aria-label="Close navigation menu" title="Close navigation menu"><X className="h-5 w-5" /></button>
              </div>

              <nav className="flex flex-col gap-2 py-5" aria-label="Mobile primary navigation">
                {data.primaryLinks.map((link, index) => <Link key={link._key ?? `${link.href}-${index}`} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border/60 py-3 text-2xl font-medium">{link.label}<ArrowUpRight className="h-5 w-5 text-muted-foreground" /></Link>)}
                <button type="button" onClick={() => { setOpen(false); openContact() }} className="flex items-center justify-between border-b border-border/60 py-3 text-left text-2xl font-medium">Contact<ArrowUpRight className="h-5 w-5 text-muted-foreground" /></button>
              </nav>

              <div className="flex flex-col gap-3">
                {data.featuredCards.map((card, index) => <Link key={card._key ?? `${card.href}-${index}`} href={card.href} onClick={() => setOpen(false)} className="group relative min-h-40 overflow-hidden rounded-2xl bg-muted p-5">{card.imageUrl && <Image src={card.imageUrl} alt={card.alt || card.title} fill sizes="390px" className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />}<div className="absolute inset-0 bg-black/35" /><div className="relative z-10 flex min-h-32 flex-col justify-end text-background"><span className="text-xl font-semibold">{card.title}</span>{card.subtitle && <span className="mt-1 text-sm text-background/80">{card.subtitle}</span>}<ChevronRight className="absolute right-0 top-0 h-5 w-5" /></div></Link>)}
              </div>

              <div className="mt-5 flex flex-col border-y border-border/70">
                {data.groups.map((group, index) => { const isExpanded = expanded === (group._key ?? group.title); return <div key={group._key ?? `${group.title}-${index}`} className="border-b border-border/60 last:border-b-0"><button type="button" className="flex w-full items-center justify-between py-4 text-left text-lg font-medium" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : (group._key ?? group.title))}>{group.title}<ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-3">{group.links?.map((link, linkIndex) => <Link key={link._key ?? `${link.href}-${linkIndex}`} href={link.href} onClick={() => setOpen(false)} className="block py-2 text-muted-foreground">{link.label}</Link>)}</motion.div>}</AnimatePresence></div> })}
              </div>

              <div className="flex flex-col gap-3 pt-5 text-sm text-muted-foreground">{data.utilityLinks.map((link, index) => link.href === '#contact' ? <button key={link._key ?? `${link.href}-${index}`} type="button" onClick={() => { setOpen(false); openContact() }} className="text-left">{link.label}</button> : <Link key={link._key ?? `${link.href}-${index}`} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</div>
            </motion.aside>
          </div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
