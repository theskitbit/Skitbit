'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HERO_STILLS = [
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/3d-watch-rendering-patria-tourbillon-scaled.jpg",
    alt: "Patria Tourbillon 3D Watch Rendering"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/6903dfc74a058950106038a7_5.Lifestyle%20%26%20Marketing%20%201.jpg",
    alt: "Lifestyle and Marketing 3D Visualization"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/SKEIN%20%E2%80%94%20Microneedling%2C%20reimagined.We%20built%20the%20full%20product%20visualization%20for%20this%20launch-%20clean.jpg",
    alt: "SKEIN Microneedling Product Visualization"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/do-fine-jewelry-realistic-render-animation-360.jpg",
    alt: "Fine Jewelry Realistic Render"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/f5b4a9206962625.Y3JvcCwyNzMzLDIxMzgsNTM0LDA.jpg",
    alt: "3D Product Showcase Asset"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/image%203.png",
    alt: "Premium Brand Render"
  },
  {
    src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/images.jfif",
    alt: "Product Concept Render"
  }
]

export function ProductShowcase() {
  const [position, setPosition] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cardWidth = typeof window !== 'undefined' ? 
    (window.innerWidth < 768 ? 260 + 24 : 340 + 24) : 340 + 24
  const totalWidth = HERO_STILLS.length * cardWidth
  const maxPosition = -totalWidth / 2

  const startAutoplay = () => {
    if (autoplayRef.current) clearTimeout(autoplayRef.current)
    if (prefersReducedMotion) return
    
    autoplayRef.current = setTimeout(() => {
      setPosition(prev => {
        const newPos = prev - cardWidth
        return newPos <= maxPosition ? maxPosition + cardWidth : newPos
      })
    }, 3000)
  }

  const handleNext = () => {
    setIsAutoplay(false)
    setPosition(prev => {
      const newPos = prev - cardWidth
      return newPos <= maxPosition ? 0 : newPos
    })
  }

  const handlePrev = () => {
    setIsAutoplay(false)
    setPosition(prev => {
      const newPos = prev + cardWidth
      return newPos > 0 ? maxPosition : newPos
    })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setIsAutoplay(true)
  }

  useEffect(() => {
    if (isAutoplay && !isDragging) {
      startAutoplay()
    }
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current)
    }
  }, [isAutoplay, isDragging, cardWidth, maxPosition])

  return (
    <section className="w-full bg-[#FAF9F5] py-16 overflow-hidden">
      {/* Header Container */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-10">
        <div>
          <h2 className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium border border-zinc-200 text-zinc-600 shadow-xs m-0">
            3D Product Visualization
          </h2>
          <p className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl m-0">
            Hero Stills → <span className="text-zinc-500 font-normal">Improve Conversions</span>
          </p>
        </div>
      </div>

      {/* Full Width Slider Wrapper */}
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        {/* Soft edge fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#FAF9F5] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#FAF9F5] to-transparent" />

        {/* Controls */}
        <div className="absolute bottom-4 right-6 z-20 flex gap-2 sm:bottom-6 sm:right-8">
          <button
            onClick={handlePrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-900 transition-all hover:bg-zinc-50 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-900 transition-all hover:bg-zinc-50 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Track */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: position }}
          transition={{ type: 'spring', damping: 20, mass: 1, stiffness: 100 }}
          drag="x"
          dragElastic={0.2}
          onDragStart={() => {
            setIsDragging(true)
            setIsAutoplay(false)
            if (autoplayRef.current) clearTimeout(autoplayRef.current)
          }}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => {
            setIsAutoplay(false)
            if (autoplayRef.current) clearTimeout(autoplayRef.current)
          }}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {[...HERO_STILLS, ...HERO_STILLS].map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/5] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-white sm:w-[340px] border border-zinc-100 shadow-xs transition-all duration-300 hover:scale-[1.02] cursor-grab active:cursor-grabbing"
              whileHover={{ y: -4 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, 340px"
                unoptimized
                priority={index < 4}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
