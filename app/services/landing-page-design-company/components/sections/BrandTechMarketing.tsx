'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'

interface Position {
  number: string
  title: string
  description: string
}

const positions: Position[] = [
  {
    number: '01',
    title: 'Brand without tech',
    description: 'Looks like a Pinterest board. Loads in 8 seconds. Converts at 0.9%.',
  },
  {
    number: '02',
    title: 'Tech without brand',
    description: 'Ships in 3 days. Says nothing. Gets ignored in 4 seconds.',
  },
  {
    number: '03',
    title: 'Marketing without either',
    description: 'Great targeting. Lands people on a wall. CAC goes up. ROAS goes down.',
  },
]

export function BrandTechMarketing() {
  return (
    <section className="bg-[#F4F4F0] py-24 text-neutral-900 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          {/* Header with custom SVG arcs to match the "∩" symbol exactly */}
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Brand
            <svg
              viewBox="0 0 24 24"
              className="mx-2 inline-block h-[0.9em] w-auto -translate-y-[0.05em] text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path d="M4 24 V12 A8 8 0 0 1 20 12 V24" />
            </svg>
            Tech
            <svg
              viewBox="0 0 24 24"
              className="mx-2 inline-block h-[0.9em] w-auto -translate-y-[0.05em] text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path d="M4 24 V12 A8 8 0 0 1 20 12 V24" />
            </svg>
            <br className="hidden md:block" />
            Marketing. Most agencies <br className="hidden md:block" /> pick two.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-500">
            The ones that convert live in the centre. Narrative that means something. Code
            that ships fast. Funnels that respect a rupee. We're allergic to handoffs.
          </p>
        </motion.div>

        {/* 2-Column Split Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 border border-neutral-900/20 lg:grid-cols-2"
        >
          {/* Venn Diagram Section */}
          <div className="flex items-center justify-center border-b border-neutral-900/20 p-8 lg:border-b-0 lg:border-r">
            <div className="relative aspect-square w-full max-w-[460px]">
              {/* SVG Background Layer */}
              <svg viewBox="0 0 500 500" className="h-full w-full">
                <defs>
                  {/* Diagonal Hatch Pattern for overlaps */}
                  <pattern
                    id="btm-hatch"
                    width="8"
                    height="8"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#d4d4d8" strokeWidth="1.5" />
                  </pattern>

                  {/* Circle Clip Paths for intersection math */}
                  <clipPath id="btm-brand-clip"><circle cx="175" cy="190" r="150" /></clipPath>
                  <clipPath id="btm-tech-clip"><circle cx="325" cy="190" r="150" /></clipPath>
                  <clipPath id="btm-mkt-clip"><circle cx="250" cy="320" r="150" /></clipPath>

                  {/* Intersections */}
                  <clipPath id="btm-brand-tech-clip">
                    <circle cx="175" cy="190" r="150" clipPath="url(#btm-tech-clip)" />
                  </clipPath>
                  <clipPath id="btm-brand-mkt-clip">
                    <circle cx="175" cy="190" r="150" clipPath="url(#btm-mkt-clip)" />
                  </clipPath>
                  <clipPath id="btm-tech-mkt-clip">
                    <circle cx="325" cy="190" r="150" clipPath="url(#btm-mkt-clip)" />
                  </clipPath>
                  <clipPath id="btm-center-clip">
                    <circle cx="250" cy="320" r="150" clipPath="url(#btm-brand-tech-clip)" />
                  </clipPath>
                </defs>

                {/* Overlap Fills (Hatched) */}
                <circle cx="175" cy="190" r="150" fill="url(#btm-hatch)" clipPath="url(#btm-tech-clip)" />
                <circle cx="175" cy="190" r="150" fill="url(#btm-hatch)" clipPath="url(#btm-mkt-clip)" />
                <circle cx="325" cy="190" r="150" fill="url(#btm-hatch)" clipPath="url(#btm-mkt-clip)" />

                {/* Center Solid Yellow Fill */}
                <circle cx="250" cy="320" r="150" fill="#E5FF00" clipPath="url(#btm-center-clip)" />

                {/* Base Circle Strokes */}
                <circle cx="175" cy="190" r="150" fill="none" stroke="#2563eb" strokeWidth="2" />
                <circle cx="325" cy="190" r="150" fill="none" stroke="#10b981" strokeWidth="2" />
                <circle cx="250" cy="320" r="150" fill="none" stroke="#a855f7" strokeWidth="2" />

                {/* Center Black Border Trick (Strokes the inner boundaries of the intersection) */}
                <circle cx="175" cy="190" r="150" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />
                <circle cx="325" cy="190" r="150" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />
                <circle cx="250" cy="320" r="150" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />
              </svg>

              {/* Absolute DOM Elements for UI text (Better rendering than SVG text) */}
              
              {/* BRAND Content */}
              <div className="absolute left-[29%] top-[34%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </div>
                <div className="mb-1 text-sm font-bold text-neutral-900">BRAND</div>
                <div className="mb-2 rounded-full bg-blue-600 px-2 py-[2px] font-mono text-[8px] font-bold tracking-wider text-white uppercase">
                  NARRATIVE
                </div>
                <div className="text-center text-[10px] leading-tight text-neutral-500">
                  Story. Positioning.<br />Identity.
                </div>
              </div>

              {/* TECH Content */}
              <div className="absolute left-[71%] top-[34%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div className="mb-1 text-sm font-bold text-neutral-900">TECH</div>
                <div className="mb-2 rounded-full bg-emerald-500 px-2 py-[2px] font-mono text-[8px] font-bold tracking-wider text-white uppercase">
                  SPEED • UX
                </div>
                <div className="text-center text-[10px] leading-tight text-neutral-500">
                  Code. Product.<br />Performance.
                </div>
              </div>

              {/* TLPC Center Content */}
              <div className="absolute left-[50%] top-[46.5%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="mb-1 flex h-5 w-5 items-center justify-center border border-neutral-900 text-[10px] font-bold text-neutral-900">
                  L
                </div>
                <div className="text-[13px] font-bold text-neutral-900">TLPC</div>
              </div>

              {/* MARKETING Content */}
              <div className="absolute bottom-[2%] left-[50%] flex -translate-x-1/2 flex-col items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Positions List */}
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col">
              {positions.map((pos, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-8 border-b border-neutral-900/20 pb-8 last:mb-0 last:border-b-0 last:pb-0"
                >
                  <p className="mb-2 font-mono text-[10px] text-neutral-500">{pos.number}</p>
                  <h3 className="mb-2 text-2xl font-medium text-neutral-900">{pos.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{pos.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
