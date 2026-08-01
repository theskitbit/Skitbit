'use client'

import { Container } from '../layout/Container'
import { motion } from 'framer-motion'

interface LogoItem {
  name: string
  src?: string // if present, renders as an image logo; otherwise falls back to text
}

interface LogoGridData {
  title?: string
  badge: string
  description?: string
  logos: LogoItem[]
}

const logoGrids: LogoGridData[] = [
  {
    title: 'The guest list.',
    badge: 'SHARK TANK BRANDS',
    description:
      "Brands we've shipped for. Twenty+ Shark Tank alumni. The kind of names that wouldn't sit still for mediocre work. Now you can be one of them.",
    logos: [
      {
        name: 'Gruns',
        src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp',
      },
      {
        name: 'Hexagon',
        src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/hexagon_logo_new_115x.avif',
      },
      { name: 'GOOD MONK' },
      { name: 'ADILQADRI' },
      { name: 'CONSCIOUS CHEMIST' },
      { name: 'moder/ate' },
      { name: 'Beautywise' },
      { name: 'PERSONAL TOUCH SKINCARE' },
      { name: 'koparo clean' },
      { name: 'Creme Castle' },
      { name: 'allter' },
      { name: 'krvvy' },
      { name: 'YAAN MAN' },
      { name: 'HealthFab' },
    ],
  },
  {
    badge: 'BEST BRANDS',
    logos: [
      { name: 'The GoodBug' },
      { name: 'WELLBEING NUTRITION' },
      { name: 'Bold Care' },
      { name: 'SUPERYOU' },
      { name: 'MUSCLEBLAZE MB' },
      { name: 'Emma' },
      { name: 'yourhappylife' },
      { name: 'frido' },
      { name: 'jade forest' },
      { name: 'ZLADE' },
      { name: 'The GOOD Stuff' },
      { name: "Leezu's" },
      { name: 'D2C x Inc42' },
      { name: 'THE HEALTH FACTORY' },
      { name: 'PLUSH' },
      { name: 'Trunativ' },
      { name: 'One Percent Club' },
      { name: 'SUROSKIE' },
      { name: 'foodstories' },
      { name: 'BABY FOREST' },
      { name: 'ZEROHARM' },
      { name: 'SIRONA' },
      { name: 'LightYears' },
      { name: 'REVA DIAMONDS' },
    ],
  },
]

export function GuestList() {
  return (
    <section className="bg-[#F4F4F0] py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-24">
          {logoGrids.map((grid, idx) => (
            <div key={idx} className="flex flex-col items-center">

              {/* Optional Header Section */}
              {grid.title && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="mb-16 flex flex-col items-center text-center"
                >
                  <h2 className="mb-4 text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-[72px]">
                    {grid.title}
                  </h2>
                  {grid.description && (
                    <p className="max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
                      {grid.description}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Badge / Tab positioned perfectly on top of the grid's top border */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.1 }}
                className="relative z-10 flex translate-y-[1px] justify-center"
              >
                <span className="bg-[#2563EB] px-5 py-2.5 font-mono text-[11px] font-bold tracking-widest text-white uppercase sm:text-xs">
                  {grid.badge}
                </span>
              </motion.div>

              {/* Logos Grid using flex-wrap and negative margins for perfect seamless borders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.2 }}
                className="relative z-0 flex w-full flex-wrap justify-center px-1 pb-1 pt-1"
              >
                {grid.logos.map((logo, logoIdx) => (
                  <div
                    key={logoIdx}
                    className="-ml-[1px] -mt-[1px] flex h-28 w-1/2 items-center justify-center border border-neutral-900/30 bg-white p-6 transition-colors hover:bg-neutral-50 sm:w-1/3 md:h-32 lg:w-[16.666667%]"
                  >
                    {logo.src ? (
                      <img
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        className="max-h-10 w-auto max-w-[80%] object-contain opacity-80"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="text-center font-sans text-sm font-bold tracking-tight text-neutral-800 opacity-60 md:text-base">
                        {logo.name}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>

            </div>
          ))}

          {/* See More Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-[-2rem] text-center"
          >
            <a href="#" className="text-sm font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-blue-600">
              See more
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}