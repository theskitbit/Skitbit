'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

export function FireworkWidget() {
  const [isReady, setIsReady] = useState(false)

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      
      {/* 1. Next.js Native Script Loader */}
      <Script 
        src="https://asset.fwcdn3.com/js/fwn.js" 
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      />

      {/* 2. Aggressive CSS to force the Shadow DOM element to respect height */}
      <style jsx global>{`
        fw-widget {
          display: block !important;
          width: 100% !important;
          min-height: 400px !important;
          height: 100% !important;
        }
        fw-widget > div, 
        fw-widget iframe {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our 3D Product Rendering Portfolio
          </h2>

          <Link
            href="/works"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-[1.03] hover:border-foreground/30 hover:bg-foreground/5 focus:outline-none focus-ring active:scale-[0.98]"
          >
            View All
          </Link>
        </div>
        
        {/* 3. The container that holds the space */}
        <div className="w-full min-h-[400px] relative">
          {isReady && (
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ 
                __html: '<fw-widget widget_config_id="95D10o_efc" class="w-full h-full" autoplay="true" loop="true" muted="true"></fw-widget>' 
              }} 
            />
          )}
        </div>

      </div>
    </section>
  )
}