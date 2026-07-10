'use client'

import { useState, useEffect } from 'react'

type Offering = {
  title: string
  galleryKey: string
  isVideo?: boolean
  inr: string
  usd: string
}

const offerings: Offering[] = [
  {
    title: 'Product Renders',
    galleryKey: 'Product Renders',
    inr: 'Photorealistic 3D product shots built for Shopify and Amazon PDPs — no photoshoot required. From ₹8,000.',
    usd: 'Photorealistic 3D product shots built for Shopify and Amazon PDPs — no photoshoot required. From $300.',
  },
  {
    title: 'Lifestyle Renders',
    galleryKey: 'Lifestyle Product Renders',
    inr: 'Your product placed in premium, styled environments — full-set visuals without the studio cost. From ₹15,000.',
    usd: 'Your product placed in premium, styled environments — full-set visuals without the studio cost. From $800.',
  },
  {
    title: 'Packaging Renders',
    galleryKey: 'Packaging Renders',
    inr: 'Pre-production packaging and bundle visuals — see the box before you print a single unit. From ₹12,000.',
    usd: 'Pre-production packaging and bundle visuals — see the box before you print a single unit. From $350.',
  },
  {
    title: '3D Animation',
    galleryKey: '3D Animation',
    isVideo: true,
    inr: 'Scroll-stopping 3D animation and motion graphics built for Reels, TikTok, and paid social. From ₹30,000.',
    usd: 'Scroll-stopping 3D animation and motion graphics built for Reels, TikTok, and paid social. From $750.',
  },
]

function highlightPrice(text: string) {
  const regex = /(₹[\d,kK]+|\$[\d,]+)/g
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[#0B3C5D] font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export function WhatWeOffer() {
  const [active, setActive] = useState<number | null>(null)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        if (data?.country !== 'IN') setCurrency('USD')
      } catch {
        setCurrency('INR')
      }
    }
    detectCountry()
  }, [])

  return (
    <section id="services" className="py-24 bg-background" aria-label="Services section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          {/* 🔥 SEO FIX: THIS PILL IS NOW AN H2 */}
          <h2 className="inline-block text-xs font-medium text-foreground border border-border rounded-full px-4 py-1.5 m-0">
            What we offer
          </h2>
        </div>

        <div className="flex flex-col">
          {offerings.map((item, i) => {
            const isActive = active === i
            const description = currency === 'INR' ? item.inr : item.usd

            return (
              <div key={i}>
                <div
                  className={`rounded-xl cursor-pointer transition-all duration-200 group ${isActive ? 'bg-primary shadow-lg' : 'hover:bg-primary hover:shadow-md hover:scale-[1.02]'}`}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  <div className="flex items-center justify-between px-4 py-7">
                    
                    {/* 🔥 SEO FIX: THE SERVICE TITLES ARE NOW H3s */}
                    <h3 className={`m-0 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight transition-colors duration-200 ${isActive ? 'text-primary-foreground' : 'text-foreground group-hover:text-primary-foreground'}`}>
                      {item.title}
                    </h3>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-6 transition-all duration-200 ${isActive ? 'bg-foreground text-background shadow-lg' : 'bg-muted text-foreground/50 group-hover:bg-foreground group-hover:text-background group-hover:shadow-md'}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-200 ${isActive ? 'rotate-45' : ''}`}>
                        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {isActive && (
                    <div className="overflow-hidden transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                      <div className="px-4 pb-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <p className="text-base text-primary-foreground/80 max-w-2xl leading-relaxed m-0">
                          {highlightPrice(description)}
                        </p>
                        <a
                          href="/works"
                          className="w-full sm:w-auto inline-flex justify-center sm:justify-start mt-0 px-6 py-3 rounded-full bg-background text-foreground text-sm font-medium transition-all hover:opacity-90 hover:shadow-md hover:scale-105 active:scale-95 shrink-0"
                        >
                          View Examples →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {i < offerings.length - 1 && <div className="border-t border-border my-1" />}
              </div>
            )
          })}
          <div className="border-t border-border my-1" />
        </div>
      </div>


    </section>
  )
}
