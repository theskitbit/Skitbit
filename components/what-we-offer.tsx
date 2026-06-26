'use client'

import { useState, useEffect } from 'react'
import { VideoModal } from './video-modal'
import { GalleryModal } from './gallery-modal'
import { galleryData } from '@/data/gallery-images'

type Offering = {
  title: string
  inr: string
  usd: string
}

const offerings: Offering[] = [
  {
    title: 'Shopify → Product Renders',
    inr: 'High-converting, flawless 3D product images built for your Shopify store and PDPs. Designed to replace expensive photoshoots and increase clicks. From ₹8,000.',
    usd: 'High-converting, flawless 3D product images built for your Shopify store and PDPs. Designed to replace expensive photoshoots and increase clicks. From $300.',
  },
  {
    title: 'Lifestyle Product Renders',
    inr: 'Photorealistic 3D environments that place your product in the perfect setting. Build premium brand aesthetics without the cost of a physical set. From ₹15,000.',
    usd: 'Photorealistic 3D environments that place your product in the perfect setting. Build premium brand aesthetics without the cost of a physical set. From $800.',
  },
  {
    title: 'Meta-ready Ad Creatives',
    inr: 'High-performance visual assets specifically formatted and designed to lower CPA and drive conversions across Instagram and Meta. From ₹12,000.',
    usd: 'High-performance visual assets specifically formatted and designed to lower CPA and drive conversions across Instagram and Meta. From $350.',
  },
  {
    title: 'Boost Engagement → Product Videos',
    inr: 'Scroll-stopping 3D animations and motion graphics built to drive engagement and sales. Optimized for Reels, TikTok, and paid social. From ₹30,000.',
    usd: 'Scroll-stopping 3D animations and motion graphics built to drive engagement and sales. Optimized for Reels, TikTok, and paid social. From $1500.',
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedGalleryTitle, setSelectedGalleryTitle] = useState<string>('')

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
                      <div className="px-4 pb-7">
                        <p className="text-base text-primary-foreground/80 max-w-2xl leading-relaxed m-0">
                          {highlightPrice(description)}
                        </p>
                        <button
                          onClick={() => {
                            if (item.title.includes('Product Videos')) setIsVideoModalOpen(true)
                            else {
                              // Fixed the string array split error here
                              const galleryTitle = item.title.split(' → ').pop()?.trim() || item.title
                              setSelectedGalleryTitle(galleryTitle)
                              setGalleryOpen(true)
                            }
                          }}
                          className="w-full sm:w-auto mt-6 px-6 py-3 rounded-full bg-background text-foreground text-sm font-medium transition-all hover:opacity-90 hover:shadow-md hover:scale-105 active:scale-95"
                        >
                          View Examples →
                        </button>
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

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={selectedGalleryTitle}
        images={galleryData[selectedGalleryTitle as keyof typeof galleryData] || []}
      />
    </section>
  )
}