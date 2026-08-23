'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const FIREWORK_SCRIPT = 'https://asset.fwcdn3.com/js/fwn.js'

export function FireworkWidget() {
  const [isReady, setIsReady] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  useEffect(() => {
    if (customElements.get('fw-widget')) setIsReady(true)
  }, [])

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      <Script
        src={FIREWORK_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
        onReady={() => setIsReady(true)}
        onError={() => setHasFailed(true)}
      />
      <style jsx global>{`
        fw-widget { display: block !important; width: 100% !important; min-height: 400px !important; height: 100% !important; }
        fw-widget > div, fw-widget iframe { width: 100% !important; height: 100% !important; }
      `}</style>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our 3D Product Rendering Portfolio</h2>
          <Link href="/works" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/5 focus:outline-none focus-ring active:scale-[0.98]">View All</Link>
        </div>
        <div className="relative min-h-[400px] w-full overflow-hidden rounded-2xl bg-muted/40">
          {isReady && !hasFailed ? (
            <div
              className="block h-full w-full"
              dangerouslySetInnerHTML={{
                __html: '<fw-widget widget_config_id="95D10o_efc" class="block h-full w-full" autoplay="true" loop="true" muted="true"></fw-widget>',
              }}
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
              {hasFailed ? 'Portfolio video unavailable. View the full portfolio instead.' : 'Loading portfolio video…'}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
