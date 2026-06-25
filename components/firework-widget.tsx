'use client'

import { useEffect, useState } from 'react'

export function FireworkWidget() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 1. Force a delay so the browser fully builds and sizes the section first
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 150)

    // 2. Safely load the external tracking script
    if (!document.querySelector('script[data-firework]')) {
      const script = document.createElement('script')
      script.src = 'https://asset.fwcdn3.com/js/fwn.js'
      script.async = true
      script.setAttribute('data-firework', 'true')
      document.body.appendChild(script)
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="w-full pb-12 sm:pb-14 lg:pb-16">
      
      {/* Bruteforce CSS to smash hidden inner-element boundaries */}
      <style jsx global>{`
        fw-widget, 
        fw-widget > div, 
        fw-widget iframe {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
          display: block !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our 3D Product Rendering Portfolio
          </h2>
        </div>
        
        {/* Dynamic Widget Container */}
        <div className="w-full block min-h-[300px]">
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