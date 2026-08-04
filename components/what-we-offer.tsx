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
    title: 'Improve Conversions → Hero Stills',
    inr:
      'High-converting product images built for ads and PDPs. Designed to increase clicks and conversions across Shopify, Instagram, and Meta. From ₹8,000.',
    usd:
      'High-converting product images built for ads and PDPs. Designed to increase clicks and conversions across Shopify, Instagram, and Meta. From $100.',
  },
  {
    title: 'Scale Ads → Product Videos',
    inr:
      'Scroll-stopping product videos built to drive engagement and sales. Optimized for Reels, paid ads, and social. From ₹30,000.',
    usd:
      'Scroll-stopping product videos built to drive engagement and sales. Optimized for Reels, paid ads, and social. From $500.',
  },
  {
    title: 'Win on Amazon → Listing Packs',
    inr:
      'Conversion-optimized Amazon visuals designed to improve click-through and purchase rates. Includes hero image + 6 high-performing infographics. ₹35,000 flat.',
    usd:
      'Conversion-optimized Amazon visuals designed to improve click-through and purchase rates. Includes hero image + 6 high-performing infographics. $520 flat.',
  },
  {
    title: 'Scale Content → Retainers',
    inr:
      'Ongoing high-performing creatives for brands that are scaling. Consistent visuals for ads, launches, and growth. Starter ₹30k · Growth ₹55k · Scale ₹90k/month.',
    usd:
      'Ongoing high-performing creatives for brands that are scaling. Consistent visuals for ads, launches, and growth. Starter $360 · Growth $660 · Scale $1,080/month.',
  },
]

// 🔥 Helper to highlight pricing
function highlightPrice(text: string) {
  const regex = /(₹[\d,kK]+|\$[\d,]+)/g

  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[#0B3C5D] font-semibold">
        {part}
      </span>
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
        if (data?.country !== 'IN') {
          setCurrency('USD')
        }
      } catch {
        setCurrency('INR')
      }
    }

    detectCountry()
  }, [])

  return (
    <section id="services" className="py-24 bg-background" aria-label="Services section - 3D rendering packages and pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="mb-10">
          <span className="inline-block text-xs font-medium text-foreground border border-border rounded-full px-4 py-1.5">
            What we offer
          </span>
        </div>

        <div className="flex flex-col">
          {offerings.map((item, i) => {
            const isActive = active === i
            const description = currency === 'INR' ? item.inr : item.usd

            return (
              <div key={i}>

                <div
                  className={`rounded-xl cursor-pointer transition-all duration-200 group ${isActive
                    ? 'bg-primary shadow-lg'
                    : 'hover:bg-primary hover:shadow-md hover:scale-[1.02]'
                    }`}
                  onClick={() => setActive(isActive ? null : i)}
                >

                  <div className="flex items-center justify-between px-4 py-7">
                    <span
                      className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight transition-colors duration-200 ${isActive
                        ? 'text-primary-foreground'
                        : 'text-foreground group-hover:text-primary-foreground'
                        }`}
                    >
                      {item.title}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-6 transition-all duration-200 ${isActive
                        ? 'bg-foreground text-background shadow-lg'
                        : 'bg-muted text-foreground/50 group-hover:bg-foreground group-hover:text-background group-hover:shadow-md'
                        }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`transition-transform duration-200 ${isActive ? 'rotate-45' : ''
                          }`}
                      >
                        <path
                          d="M8 1v14M1 8h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {isActive && (
                    <div
                      className="overflow-hidden transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 pb-7">
                        <p className="text-base text-primary-foreground/80 max-w-2xl leading-relaxed">
                          {highlightPrice(description)}
                        </p>

                        <button
                          onClick={() => {
                            if (item.title.includes('Product Videos')) {
                              setIsVideoModalOpen(true)
                            } else {
                              const galleryTitle = item.title
                                .split(' → ')[1]
                                ?.trim() || item.title
                              setSelectedGalleryTitle(galleryTitle)
                              setGalleryOpen(true)
                            }
                          }}
                          className="
                            w-full sm:w-auto mt-6
                            px-6 py-3
                            rounded-full
                            bg-background
                            text-foreground
                            text-sm font-medium
                            transition-all
                            hover:opacity-90 hover:shadow-md hover:scale-105
                            active:scale-95
                          "
                        >
                          View Examples →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {i < offerings.length - 1 && (
                  <div className="border-t border-border my-1" />
                )}
              </div>
            )
          })}

          <div className="border-t border-border my-1" />
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={selectedGalleryTitle}
        images={
          galleryData[selectedGalleryTitle as keyof typeof galleryData] || []
        }
      />
    </section>
  )
}
