'use client'

import { Container } from '../layout/Container'
import { motion } from 'framer-motion'

interface LogoGridData {
  title?: string
  badge: string
  description?: string
  logos: string[]
}

// Updated data array to perfectly match the brands shown in the screenshots
const logoGrids: LogoGridData[] = [
  {
    title: 'The guest list.',
    badge: 'SHARK TANK BRANDS',
    description:
      "Brands we've shipped for. Twenty+ Shark Tank alumni. The kind of names that wouldn't sit still for mediocre work. Now you can be one of them.",
    logos: [
      'oye happy',
      'Gladful',
      'GOOD MONK',
      'ADILQADRI',
      'CONSCIOUS CHEMIST',
      'moder/ate',
      'Beautywise',
      'PERSONAL TOUCH SKINCARE',
      'koparo clean',
      'Creme Castle',
      'allter',
      'krvvy',
      'YAAN MAN',
      'HealthFab',
    ],
  },
  {
    badge: 'BEST BRANDS',
    logos: [
      'The GoodBug',
      'WELLBEING NUTRITION',
      'Bold Care',
      'SUPERYOU',
      'MUSCLEBLAZE MB',
      'Emma',
      'yourhappylife',
      'frido',
      'jade forest',
      'ZLADE',
      'The GOOD Stuff',
      "Leezu's",
      'D2C x Inc42',
      'THE HEALTH FACTORY',
      'PLUSH',
      'Trunativ',
      'One Percent Club',
      'SUROSKIE',
      'foodstories',
      'BABY FOREST',
      'ZEROHARM',
      'SIRONA',
      'LightYears',
      'REVA DIAMONDS',
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
                    {/* 
                      Placeholder span for brands. 
                      Once you have the actual SVG/PNG logos, you can replace this span with an <img /> tag. 
                    */}
                    <span className="text-center font-sans text-sm font-bold tracking-tight text-neutral-800 opacity-60 md:text-base">
                      {logo}
                    </span>
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