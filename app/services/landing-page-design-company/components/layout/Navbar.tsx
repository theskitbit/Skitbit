'use client'

import { useState } from 'react'
import { useScroll } from '../../hooks/useScroll'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from './Container'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Receipts', href: '#receipts' },
  { label: 'Services', href: '#services' },
  { label: 'Why CRO', href: '#why-cro' },
  { label: 'Process', href: '#process' },
  { label: 'Brand', href: '#brand' },
]

export function Navbar() {
  const { isScrolled } = useScroll()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-[#F4F4F0]/90 backdrop-blur-lg border-neutral-900/20'
          : 'bg-[#F4F4F0] border-neutral-900/20'
      )}
    >
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 text-sm font-bold tracking-tight text-neutral-900 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-7 w-7 items-center justify-center border border-neutral-900 bg-[#E5FF00] text-sm font-bold text-neutral-900">
            L
          </div>
          <span className="hidden sm:inline">The Landing Page Co.</span>
          <span className="sm:hidden">TLPC</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-900">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-neutral-500"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side: Status + CTA */}
        <div className="hidden md:flex items-center gap-8">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <div className="h-2 w-2 rounded-full bg-emerald-700"></div>
            <span>
              Shipping &middot; Q2 '26 &middot; <span className="text-blue-600">+34%</span> AVG LIFT
            </span>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#"
            className="inline-flex items-center justify-center gap-2 border border-neutral-900 bg-[#E5FF00] px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#D4EC00]"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a call &rarr;
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 text-neutral-900"
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1.5">
            <motion.span
              className="block h-0.5 w-6 bg-current"
              animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-current"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-current"
              animate={isOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-neutral-900/20 bg-[#F4F4F0] md:hidden"
          >
            <Container className="py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-mono uppercase tracking-widest text-neutral-900 hover:text-neutral-500 transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <motion.a
                href="#"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 border border-neutral-900 bg-[#E5FF00] px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#D4EC00] mt-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a call &rarr;
              </motion.a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
