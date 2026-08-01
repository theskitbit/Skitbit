'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CASE_STUDIES = [
  {
    id: 'gruns',
    name: 'Gruns',
    logo: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp',
    stats: [
      { value: '+33%', label: 'CR' },
      { value: '+14%', label: 'AOV' },
    ],
    website: 'https://gruns.co',
    images: [
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_landingpage.webp',
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_2_landingpage.webp',
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_mobile_landingpage.webp',
    ],
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    logo: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/hexagon_logo_new_115x.avif',
    stats: [
      { value: '+__%', label: 'CR' }, // TODO: real number
      { value: '+__%', label: 'AOV' }, // TODO: real number
    ],
    website: 'https://hexagonsupplements.co/',
    images: [
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Hexagon_landingpage.jpg',
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Hexagon_2_landingpage.jpg',
      'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Hexagon_mobile_landingpage.jpg',
    ],
  },

  // TODO — send me: logo URL, 3 image URLs, website URL, CR/AOV, and I'll fill these in
  // {
  //   id: 'brand-3',
  //   name: '',
  //   logo: '',
  //   stats: [
  //     { value: '+__%', label: 'CR' },
  //     { value: '+__%', label: 'AOV' },
  //   ],
  //   website: '',
  //   images: ['', '', ''],
  // },
  // {
  //   id: 'brand-4',
  //   name: '',
  //   logo: '',
  //   stats: [
  //     { value: '+__%', label: 'CR' },
  //     { value: '+__%', label: 'AOV' },
  //   ],
  //   website: '',
  //   images: ['', '', ''],
  // },
  // {
  //   id: 'brand-5',
  //   name: '',
  //   logo: '',
  //   stats: [
  //     { value: '+__%', label: 'CR' },
  //     { value: '+__%', label: 'AOV' },
  //   ],
  //   website: '',
  //   images: ['', '', ''],
  // },
]

const INTERVAL_MS = 5000

export function CaseStudies() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || CASE_STUDIES.length < 2) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CASE_STUDIES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused])

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % CASE_STUDIES.length)
  }

  const current = CASE_STUDIES[index]
  const easing = [0.22, 1, 0.36, 1] as const

  return (
    <section
      className="bg-[#F4F4F0] pt-0 pb-12 md:pb-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Blue Tab */}
          <div className="flex">
            <div className="bg-[#2563EB] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
              Featured Case Study
            </div>
          </div>

          {/* Main Peach Container */}
          <div className="flex flex-col gap-4 border border-neutral-900 bg-[#F8EFE6] p-4 lg:flex-row lg:gap-6 lg:p-6">

            {/* Left Sidebar */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-4 lg:w-[260px]">
              {/* Stats Box */}
              <div className="border border-neutral-900 bg-white p-5 sm:p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: easing }}
                  >
                    <div className="mb-6 flex items-center">
                      <img
                        src={current.logo}
                        alt={`${current.name} Logo`}
                        className="h-8 w-auto object-contain"
                      />
                    </div>

                    {current.stats.map((stat, i) => (
                      <div
                        key={stat.label}
                        className={`border-t border-neutral-900/30 pt-4 ${
                          i === current.stats.length - 1 ? '' : 'pb-4'
                        }`}
                      >
                        <div className="text-4xl font-medium tracking-tighter text-[#2563EB] sm:text-5xl">
                          {stat.value}
                        </div>
                        <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-700">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom controls: Visit Website (pushed up) + Next below it */}
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="wait">
                  <motion.a
                    key={current.id}
                    href={current.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between border border-transparent bg-[#0A0A0A] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Visit Website <span className="text-lg leading-none">&rarr;</span>
                  </motion.a>
                </AnimatePresence>

                <button
                  onClick={handleNext}
                  className="flex items-center justify-between border border-neutral-900 bg-transparent px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                  aria-label="Next case study"
                >
                  Next <span className="text-lg leading-none">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Area - Images */}
            <div className="grid h-[350px] w-full grid-cols-1 gap-3 overflow-hidden sm:h-[420px] md:grid-cols-3 lg:h-[520px] lg:gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="contents"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {current.images.map((img, i) => (
                    <motion.div
                      key={i}
                      className={`h-full w-full border border-neutral-900/20 bg-white ${
                        i > 0 ? 'hidden md:block' : ''
                      }`}
                      variants={{
                        hidden: { opacity: 0, scale: 1.03 },
                        show: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.45, ease: easing }}
                    >
                      <img
                        src={img}
                        alt={`${current.name} Case Study ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover ${
                          i === 0 ? 'object-top' : i === 2 ? 'object-bottom' : 'object-center'
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-4 flex justify-center gap-2">
            {CASE_STUDIES.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-neutral-900' : 'w-1.5 bg-neutral-900/20'
                }`}
                aria-label={`Show ${cs.name} case study`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}