'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { useContactOverlay } from './contact-overlay'

export function FullyBookedGate() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { open: openContact } = useContactOverlay()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Trigger popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isMounted])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsVisible(false)}
            className="fully-booked-backdrop fixed inset-0 z-[100000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[100001] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fully-booked-title"
          >
            <div className="fully-booked-modal relative w-full max-w-md">
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-5 top-5 p-1 text-white/60 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X size={20} weight="bold" />
              </button>

              {/* Content */}
              <div className="px-8 py-10">
                {/* Status indicator */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
                    Currently Fully Booked
                  </div>
                </div>

                {/* Main headline */}
                <div className="mb-4 text-center">
                  <h2 id="fully-booked-title" className="m-0 text-[42px] font-regular leading-[0.92] tracking-[-0.065em] text-foreground sm:text-[48px]">
                    We&apos;re at capacity.
                  </h2>
                </div>

                {/* Subheading */}
                <p className="mb-8 text-center text-base text-white/70 leading-relaxed max-w-sm mx-auto">
                  Our production calendar is currently full, so we are not taking on new client work. If your launch can wait for the right partner, you can still submit an enquiry for future availability.
                </p>

                {/* Value prop */}
                <div className="mb-8 space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm text-white/80">
                      We prioritise corporate enquiries from D2C product brands
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm text-white/80">
                      Every enquiry is reviewed by our strategy team
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm text-white/80">
                      Priority consideration when capacity opens
                    </span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      openContact()
                      setIsVisible(false)
                    }}
                    className="btn-primary inline-flex h-11 w-full items-center justify-center rounded-full px-7 text-[15px] font-medium transition-transform active:scale-95"
                  >
                    Get in touch
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="btn-ghost inline-flex h-11 w-full items-center justify-center rounded-full border border-border px-7 text-[15px] font-medium transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
