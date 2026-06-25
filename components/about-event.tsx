'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useContactOverlay } from './contact-overlay'

export function AboutEvent() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const { open } = useContactOverlay()

  useEffect(() => {
    const currentRef = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        rootMargin: '-100px',
        threshold: 0,
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <section id="about" className="py-0 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">

        {/* ── Row 1: Yellow banner (HIDDEN ON MOBILE) ── */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden">

          {/* Left – text */}
          <div className="bg-primary p-10 lg:p-14 flex flex-col justify-between min-h-[320px]">
            <div>
              {/* 🔥 SEO FIX: The section label is now a powerful H2 keyword target */}
              <h2 className="inline-block text-xs font-medium text-primary-foreground border border-primary-foreground/40 rounded-full px-3 py-1 mb-6 m-0">
                High-Performing Ad Creatives
              </h2>
              
              {/* 🔥 SEO FIX: The long descriptive text is now a standard <p> instead of an <h2> */}
              <p className="text-4xl lg:text-[2.55rem] font-bold tracking-tight leading-[1.15] text-primary-foreground m-0">
                Turn underperforming product visuals into high-converting creatives that drive clicks and sales.
              </p>
            </div>
            <div className="mt-8">
              <button onClick={open} className="bg-primary-foreground text-primary font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200">
                Get Your First Concept
              </button>
            </div>
          </div>

          {/* Right – images */}
          <div className="bg-primary p-4 flex flex-row gap-3">
            <div
              className={`relative flex-1 rounded-2xl overflow-hidden min-h-[280px] transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
            >
              <Image
                src="/images/Before.webp"
                alt="3D PRODUCT RENDER"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div
              className={`relative flex-1 rounded-2xl overflow-hidden min-h-[280px] transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              style={{ transitionDelay: isInView ? '120ms' : '0ms' }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NFLISap2AXhmkRhChmwRQqs4rsrzKd.png"
                alt="SKEIN 3D product render - microneedling infusion device"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Row 2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Dark card (HIDDEN ON MOBILE) */}
          <div className="hidden md:flex bg-foreground rounded-3xl p-8 flex-col justify-between overflow-hidden">
            <p className="text-white text-xl font-bold leading-snug max-w-sm m-0">
              Designed to increase engagement, improve click-through rates, and drive conversions across paid ads and PDPs.
            </p>

            <div className="relative mt-6 rounded-2xl overflow-hidden h-64 group hover:shadow-lg transition-shadow duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2013-5lpuqIlB59bcQXgo5mYokPFVVUrkPT.png"
                alt="DERAFIRM and DERMIRM skincare product line collection"
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <span className="absolute bottom-16 left-4 bg-foreground text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
                +32% Higher CTR
              </span>
              <span className="absolute bottom-24 right-4 bg-foreground text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
                2x Engagement
              </span>
              <span className="absolute bottom-6 left-1/3 bg-foreground text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
                Built for Paid Ads
              </span>
            </div>
          </div>

          {/* CTA card (STAYS VISIBLE ON MOBILE) */}
          <div className="bg-primary rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[360px]">
            <div>
              {/* 🔥 SEO FIX: This is now an H3 nested beneath the section's top H2 */}
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-primary-foreground mb-4 m-0">
                Start Fast –<br />Sell faster.
              </h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs m-0 mt-4">
                Go from product to conversion-ready creatives in days, not weeks.
              </p>
            </div>

            {/* Mobile Stack layout, Desktop Row layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 gap-6 sm:gap-0">
              <button onClick={open} className="bg-foreground text-white font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95">
                Start now!
              </button>

              <div className="flex items-center -space-x-3 pl-2 sm:pl-0">
                {[
                  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-1-aiD8IySOPrg7hJ0AIVftIYR5lTbyAK.png',
                  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-2-nRbzEiUGuaM0mZixvKVBgF1kGgC4Bo.png',
                  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-3-8Ai7YBJSqDUkVbOOhzQuK80RP4gzi8.png',
                  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-4-bflG6jzoJhrfIHOacDFexeQ5YcGF6b.png',
                  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-5-jsvwxSzyghpC3MwShbFxOHsckB4Iiy.png',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-10 h-10 rounded-full border-2 border-primary overflow-hidden hover:scale-125 hover:z-10 transition-all duration-200 cursor-default"
                  >
                    <Image
                      src={src}
                      alt={`Brand logo ${i + 1}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}