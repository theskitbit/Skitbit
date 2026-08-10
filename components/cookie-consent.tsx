'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check if user previously consented
    const consent = localStorage.getItem('skitbit-cookie-consent')
    if (consent === 'true') {
      setHasConsent(true)
    } else if (!consent) {
      setIsVisible(true)
    }
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
      }).catch(() => {})
    } finally {
      setIsLogging(false)
    }
  }

  const accept = async () => {
    localStorage.setItem('skitbit-cookie-consent', 'true')
    setHasConsent(true) // Instantly mounts scripts
    setIsVisible(false)
    await logConsentToServer('accept')
  }

  const reject = async () => {
    localStorage.setItem('skitbit-cookie-consent', 'false')
    setHasConsent(false)
    setIsVisible(false)
    await logConsentToServer('reject')
  }

  return (
    <>
      {/* HARD BLOCKING: Scripts do not exist until hasConsent is true */}
      {hasConsent && (
        <>
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-3K1XLE2F7M"
          />
          <Script
            id="tracking-scripts"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                gtag('consent', 'default', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted'
                });

                gtag('js', new Date());
                gtag('config', 'G-3K1XLE2F7M');
                gtag('config', 'AW-10791428257');

                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;
                b.head.appendChild(t);
                }(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '936091006015773');
                fbq('track', 'PageView');
              `,
            }}
          />
        </>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            // 👇 left-4 right-4 perfectly centers it on mobile, sm:left-auto sm:w-[320px] snaps it to the right on desktop
            className="fixed bottom-4 left-4 right-4 z-[100] sm:left-auto sm:w-[320px] rounded-2xl border border-border bg-card p-5 shadow-2xl"
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

            {/* Vertical Button Layout */}
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={accept}
                disabled={isLogging}
                className="w-full rounded-full bg-[#D4F05A] py-2.5 text-xs font-semibold text-[#0B1A28] transition hover:opacity-90 disabled:opacity-50"
              >
                {isLogging ? 'Saving...' : 'Accept All'}
              </button>
              
              <button
                onClick={reject}
                disabled={isLogging}
                className="w-full py-2 text-[11px] font-normal text-foreground/40 transition hover:text-foreground/70 disabled:opacity-50"
              >
                Continue without accepting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}