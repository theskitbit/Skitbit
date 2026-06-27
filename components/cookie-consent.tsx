'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLogging, setIsLogging] = useState(false)

  useEffect(() => {
    // Only show if user hasn't consented yet
    const consent = localStorage.getItem('skitbit-cookie-consent')
    if (!consent) setIsVisible(true)
  }, [])

  const logConsentToServer = async (choice: 'accept' | 'reject') => {
    try {
      setIsLogging(true)
      await fetch('/api/log-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          choice,
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
        }),
      }).catch(() => {
        // Fail silently
      })
    } catch (e) {
      console.log('Consent logging skipped')
    } finally {
      setIsLogging(false)
    }
  }

  const accept = async () => {
    localStorage.setItem('skitbit-cookie-consent', JSON.stringify(true))
    await logConsentToServer('accept')
    setIsVisible(false)
    // Reload to trigger tracking scripts
    window.location.reload()
  }

  const reject = async () => {
    localStorage.setItem('skitbit-cookie-consent', JSON.stringify(false))
    await logConsentToServer('reject')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-[100] max-w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use cookies and tracking pixels to improve ad relevance and site experience. By clicking accept, you agree to our{' '}
            <Link href="/privacy-policy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/cookie-policy" className="underline hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            .
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={reject}
              disabled={isLogging}
              className="flex-1 rounded-full border border-border bg-transparent py-2 text-xs font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={accept}
              disabled={isLogging}
              className="flex-1 rounded-full bg-[#D4F05A] py-2 text-xs font-semibold text-[#0B1A28] transition hover:opacity-90 disabled:opacity-50"
            >
              {isLogging ? 'Saving...' : 'Accept'}
            </button>
          </div>

          <p className="mt-3 text-[10px] text-foreground/40 text-center">
            <Link href="/terms-of-service" className="underline hover:text-foreground/60">
              Terms of Service
            </Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}