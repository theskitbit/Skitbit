'use client'

import Image from 'next/image'

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

// Duplicate the array to create a flawless, gapless repeating loop mirror
const SCROLL_ITEMS = [...HERO_STILLS, ...HERO_STILLS]

export function ProductShowcase() {
  return (
    <section className="w-full bg-[#FAF9F5] py-16 overflow-hidden">
      
      {/* CSS Injection for Universal Right-to-Left Infinite Loop */}
      <style jsx global>{`
        @keyframes universalMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-global-marquee {
          animation: universalMarquee 30s linear infinite;
        }
      `}</style>

      {/* Header Container */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-10">
        <div>
          {/* 🔥 SEO FIX: Eyebrow is now an H2 packed with a core keyword */}
          <h2 className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium border border-zinc-200 text-zinc-600 shadow-xs m-0">
            3D Product Visualization
          </h2>
          
          {/* 🔥 SEO FIX: The styling remains identical, but this is now a <p> tag */}
          <p className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl m-0">
            Hero Stills → <span className="text-zinc-500 font-normal">Improve Conversions</span>
          </p>
        </div>
      </div>

      {/* Full Width Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        
        {/* Soft edge fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#FAF9F5] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#FAF9F5] to-transparent" />

        {/* Dynamic Track: Auto-animates on both mobile and desktop seamlessly */}
        <div className="flex gap-6 w-max animate-global-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {SCROLL_ITEMS.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/5] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-white sm:w-[340px] border border-zinc-100 shadow-xs transition-all duration-300 hover:scale-[1.02]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 260px, 340px"
                unoptimized
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
