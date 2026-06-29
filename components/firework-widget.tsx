'use client'

import { useEffect, useState } from 'react'
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
          min-height: 400px !important; /* Force the widget to stay open */
          height: 100% !important;
        }
        fw-widget > div, 
        fw-widget iframe {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our 3D Product Rendering Portfolio
          </h2>
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