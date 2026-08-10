'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)
  
  // State for the toggle switch, defaulted to true (Opted-in)
  const [isToggled, setIsToggled] = useState(true)

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
    setHasConsent(true) // This instantly mounts the scripts without reloading!
    setIsVisible(false)
    await logConsentToServer('accept')
  }

  const reject = async () => {
    localStorage.setItem('skitbit-cookie-consent', 'false')
    setHasConsent(false)
    setIsVisible(false)
    await logConsentToServer('reject')
  }

  // Handle the single primary button click based on toggle state
  const handleSavePreferences = () => {
    if (isToggled) {
      accept()
    } else {
      reject()
    }
  }

  return (
    <>
      {/* 
        HARD BLOCKING: These scripts physically do not exist on the page 
        until hasConsent becomes true. The GDPR scanner will see a completely 
        clean network tab on load.
      */}
      {hasConsent && (
        <>
          {/* Base Google Tag Library */}
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
                
                // Explicitly tell Google that consent WAS granted to clear dashboard warnings
                gtag('consent', 'default', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted'
                });

                gtag('js', new Date());
                
                // Initialize GA4
                gtag('config', 'G-3K1XLE2F7M');
                
                // Initialize Google Ads
                gtag('config', 'AW-10791428257');

                // Initialize Meta Pixel
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

            <div className="mt-4 flex flex-col gap-3">
              {/* Optional Tracking Toggle */}
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 px-3 py-2">
                <span className="text-[11px] font-medium text-foreground">Analytics & Ad Tracking</span>
                <button
                  type="button"
                  onClick={() => setIsToggled(!isToggled)}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
                    isToggled ? 'bg-blue-500' : 'bg-muted-foreground/30'
                  }`}
                  aria-label="Toggle tracking"
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform shadow-sm ${
                      isToggled ? 'translate-x-[18px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleSavePreferences}
                disabled={isLogging}
                className="w-full rounded-full bg-[#D4F05A] py-2.5 text-xs font-semibold text-[#0B1A28] transition hover:opacity-90 disabled:opacity-50"
              >
                {isLogging ? 'Saving...' : 'Accept & Continue'}
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
    </>
  )
}