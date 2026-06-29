'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export function FireworkWidget() {
  const [isReady, setIsReady] = useState(false)

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      
      {/* 1. Script injection */}
      <Script 
        src="https://asset.fwcdn3.com/js/fwn.js" 
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      />

      {/* 2. Optimized CSS for Shadow DOM */}
      <style jsx global>{`
        fw-widget {
          display: flex !important;
          flex: 1 1 100% !important;
          width: 100% !important;
          min-height: 450px !important; /* Force min-height here */
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our 3D Product Rendering Portfolio
          </h2>
        </div>
        
        {/* 3. Flex container to force-push children to expand */}
        <div className="w-full flex flex-col min-h-[450px]">
          {isReady && (
            <div 
              className="flex-1 w-full"
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