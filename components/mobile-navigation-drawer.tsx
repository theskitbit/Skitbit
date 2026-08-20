'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useContactOverlay } from './contact-overlay'

export type MobileNavLink = { _key?: string; label: string; href: string }
export type MobileNavCard = { _key?: string; title: string; subtitle?: string; href: string; imageUrl?: string; alt?: string }
export type MobileNavGroup = { _key?: string; title: string; links?: MobileNavLink[] }
export type MobileNavContent = { primaryLinks: MobileNavLink[]; featuredCards: MobileNavCard[]; groups: MobileNavGroup[]; utilityLinks: MobileNavLink[] }

const fallbackContent: MobileNavContent = {
  primaryLinks: [{ label: 'About', href: '/#about' }, { label: 'Our Work', href: '/works' }, { label: 'Pricing', href: '/pricing' }],
  featuredCards: [
    { title: '3D Product Visualization', subtitle: 'Make products impossible to ignore', href: '/#work', imageUrl: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/3d-watch-rendering-patria-tourbillon-scaled.jpg', alt: '3D product visualization' },
    { title: 'Performance Creative', subtitle: 'Visual systems built to convert', href: '/services/performance-creative-management', imageUrl: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/6903dfc74a058950106038a7_5.Lifestyle%20%26%20Marketing%20%201.jpg', alt: 'Performance creative visual' },
  ],
  groups: [{ title: 'Services', links: [{ label: 'All Services', href: '/services' }, { label: 'Performance Creative Management', href: '/services/performance-creative-management' }] }, { title: 'Studio Locations', links: [{ label: 'All Locations', href: '/locations' }] }, { title: 'About', links: [{ label: 'About Skitbit', href: '/#about' }, { label: 'Blog', href: '/blog' }] }],
  utilityLinks: [{ label: 'Contact', href: '#contact' }, { label: 'Privacy Policy', href: '/privacy-policy' }],
}

export function MobileNavigationDrawer({ content = fallbackContent }: { content?: MobileNavContent }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { open: openContact } = useContactOverlay()
  const data = content.primaryLinks?.length ? content : fallbackContent

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [open])

  const close = () => setOpen(false)
  const contact = () => { close(); openContact() }
  const linkProps = { onClick: close }

  return (
    <>
      <button type="button" className="inline-flex items-center justify-center rounded-full p-2 md:hidden" aria-label="Open navigation menu" onClick={() => setOpen(true)}><Menu className="h-6 w-6" aria-hidden="true" /></button>
      {mounted && createPortal(
        <AnimatePresence>
          {open && <div className="fixed inset-0 z-[100000] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <motion.button type="button" aria-label="Close navigation menu" className="absolute inset-0 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
            <motion.aside className="relative flex h-full w-full flex-col overflow-y-auto bg-card px-4 pb-8 pt-5 text-card-foreground shadow-2xl" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <header className="flex items-center justify-between px-2 pb-5">
                <h2 className="text-[38px] font-bold leading-none tracking-[-0.04em]">Shop</h2>
                <button ref={closeButtonRef} type="button" onClick={close} className="rounded-full border-2 border-foreground p-2" aria-label="Close navigation menu"><X className="h-5 w-5" /></button>
              </header>

              <nav className="flex flex-col gap-5" aria-label="Mobile primary navigation">
                {data.primaryLinks.map((link, index) => <Link key={link._key ?? `${link.href}-${index}`} href={link.href} {...linkProps} className="flex min-h-[100px] items-center justify-between rounded-lg bg-muted px-8 py-6 text-[30px] font-bold leading-tight tracking-[-0.03em]">{link.label}<ChevronRight className="h-8 w-8 shrink-0 rounded-full border-2 border-foreground p-1" /></Link>)}
                <button type="button" onClick={contact} className="flex min-h-[100px] items-center justify-between rounded-lg bg-muted px-8 py-6 text-left text-[30px] font-bold leading-tight tracking-[-0.03em]">Contact<ChevronRight className="h-8 w-8 shrink-0 rounded-full border-2 border-foreground p-1" /></button>
              </nav>

              <div className="mt-5 flex flex-col gap-5">
                {data.featuredCards.map((card, index) => <Link key={card._key ?? `${card.href}-${index}`} href={card.href} {...linkProps} className={`group relative min-h-[178px] overflow-hidden rounded-lg p-8 ${index === 0 ? 'bg-secondary' : 'bg-muted'}`}>
                  {card.imageUrl && <Image src={card.imageUrl} alt={card.alt || card.title} fill sizes="390px" className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" unoptimized />}
                  {card.imageUrl && <div className="absolute inset-0 bg-background/35" />}
                  <div className="relative z-10 flex min-h-[115px] flex-col justify-between"><span className="max-w-[75%] text-[26px] font-bold leading-tight">{card.title}</span>{card.subtitle && <span className="max-w-[88%] text-base font-medium">{card.subtitle}</span>}</div>
                </Link>)}
              </div>

              <div className="mt-5 flex flex-col gap-5">
                {data.groups.map((group, index) => { const key = group._key ?? group.title; const isExpanded = expanded === key; return <div key={key} className="rounded-lg bg-muted"><button type="button" className="flex min-h-[100px] w-full items-center justify-between px-8 py-6 text-left text-[24px] font-bold leading-tight" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : key)}>{group.title}<ChevronDown className={`h-8 w-8 shrink-0 rounded-full border-2 border-foreground p-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-8 pb-6">{group.links?.map((link, linkIndex) => <Link key={link._key ?? `${link.href}-${linkIndex}`} href={link.href} {...linkProps} className="block border-t border-border py-3 text-base font-medium">{link.label}</Link>)}</motion.div>}</AnimatePresence></div> })}
              </div>

              <div className="flex flex-col gap-3 px-2 pt-7 text-sm text-muted-foreground">{data.utilityLinks.map((link, index) => link.href === '#contact' ? <button key={link._key ?? `${link.href}-${index}`} type="button" onClick={contact} className="text-left underline underline-offset-4">{link.label}</button> : <Link key={link._key ?? `${link.href}-${index}`} href={link.href} {...linkProps} className="underline underline-offset-4">{link.label}</Link>)}</div>
            </motion.aside>
          </div>}
        </AnimatePresence>, document.body,
      )}
    </>
  )
}
