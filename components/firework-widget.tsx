'use client'

import { useState } from 'react'
import Script from 'next/script'

export function FireworkWidget() {
  // We start false, and only flip to true when Next.js confirms the script is fully downloaded
  const [isReady, setIsReady] = useState(false)

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      
      {/* 1. Next.js Native Script Loader */}
      <Script 
        src="https://asset.fwcdn3.com/js/fwn.js" 
        strategy="afterInteractive"
        // 2. This is the magic bullet. It triggers our widget ONLY when the script is fully ready
        onReady={() => setIsReady(true)}
      />

      <style jsx global>{`
        fw-widget, 
        fw-widget > div, 
        fw-widget iframe {
          width: 100% !important;
          display: block !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our 3D Product Rendering Portfolio
          </h2>
        </div>
        
        <div className="w-full min-h-[300px] relative">
          {/* 3. The widget only renders when isReady is true */}
          {isReady && (
            <div 
              dangerouslySetInnerHTML={{ 
                __html: '<fw-widget widget_config_id="95D10o_efc" class="w-full" autoplay="true" loop="true" muted="true"></fw-widget>' 
              }} 
            />
          )}
        </div>

      </div>
    </section>
  )
}