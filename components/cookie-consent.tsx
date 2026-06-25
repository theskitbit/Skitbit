'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't consented yet
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setIsVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 right-4 z-[100] max-w-[300px] rounded-2xl border border-border bg-card p-5 shadow-2xl"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use cookies and tracking pixels to improve ad relevance and site experience. By clicking accept, you agree to our <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
          <button 
            onClick={accept}
            className="mt-4 w-full rounded-full bg-[#D4F05A] py-2 text-xs font-semibold text-[#0B1A28] transition hover:opacity-90"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}