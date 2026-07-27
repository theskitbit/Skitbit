'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

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
          <div className="flex items-center justify-center border-b border-neutral-900/20 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            {/*
              Single SVG — circles, labels, badges all live here so text
              scales in lockstep with the diagram on every screen size.
              ViewBox: 580 × 620, circles r=165, symmetric around x=290:
                Brand  cx=175 cy=190
                Tech   cx=405 cy=190
                Mkt    cx=290 cy=365
              Overlaps: Brand↔Tech = 100px, Brand↔Mkt = Tech↔Mkt ≈ 121px.
              Font sizes bumped up (title 18 / badge 11 / descriptor 13)
              vs. the previous pass so the message reads clearly even when
              the SVG is scaled down on narrow mobile viewports.
            */}
            <svg
              viewBox="0 0 580 620"
              className="w-full max-w-[520px]"
              style={{ display: 'block' }}
            >
              <defs>
                <pattern
                  id="btm-hatch"
                  width="8"
                  height="8"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#d4d4d8" strokeWidth="1.5" />
                </pattern>

                <clipPath id="btm-brand-clip"><circle cx="175" cy="190" r="165" /></clipPath>
                <clipPath id="btm-tech-clip"><circle cx="405" cy="190" r="165" /></clipPath>
                <clipPath id="btm-mkt-clip"><circle cx="290" cy="365" r="165" /></clipPath>

                <clipPath id="btm-brand-tech-clip">
                  <circle cx="175" cy="190" r="165" clipPath="url(#btm-tech-clip)" />
                </clipPath>
                <clipPath id="btm-center-clip">
                  <circle cx="290" cy="365" r="165" clipPath="url(#btm-brand-tech-clip)" />
                </clipPath>
              </defs>

              {/* Pairwise hatch overlaps */}
              <circle cx="175" cy="190" r="165" fill="url(#btm-hatch)" clipPath="url(#btm-tech-clip)" />
              <circle cx="175" cy="190" r="165" fill="url(#btm-hatch)" clipPath="url(#btm-mkt-clip)" />
              <circle cx="405" cy="190" r="165" fill="url(#btm-hatch)" clipPath="url(#btm-mkt-clip)" />

              {/* Center yellow fill */}
              <circle cx="290" cy="365" r="165" fill="#E5FF00" clipPath="url(#btm-center-clip)" />

              {/* Circle strokes */}
              <circle cx="175" cy="190" r="165" fill="none" stroke="#2563eb" strokeWidth="2" />
              <circle cx="405" cy="190" r="165" fill="none" stroke="#10b981" strokeWidth="2" />
              <circle cx="290" cy="365" r="165" fill="none" stroke="#a855f7" strokeWidth="2" />

              {/* Center black border on yellow zone */}
              <circle cx="175" cy="190" r="165" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />
              <circle cx="405" cy="190" r="165" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />
              <circle cx="290" cy="365" r="165" fill="none" stroke="#171717" strokeWidth="3" clipPath="url(#btm-center-clip)" />

              {/* ── BRAND label — upper-left exclusive zone, anchor x=140 ── */}
              <circle cx="140" cy="105" r="17" fill="#eff6ff" />
              <g transform="translate(132,97)" stroke="#2563eb" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.8 2.6l1.1-1.1a1.2 1.2 0 011.7 1.7L4.4 12.4a3 3 0 01-1.3.75l-1.8.54.54-1.8a3 3 0 01.75-1.3L10.8 2.6z" />
              </g>
              <text x="140" y="139" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="700" fill="#171717">BRAND</text>
              <rect x="90" y="147" width="100" height="22" rx="11" fill="#2563eb" />
              <text x="140" y="162" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.5">NARRATIVE</text>
              <text x="140" y="191" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Story. Positioning.</text>
              <text x="140" y="207" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Identity.</text>

              {/* ── TECH label — upper-right exclusive zone, anchor x=440 (mirror of 140) ── */}
              <circle cx="440" cy="105" r="17" fill="#ecfdf5" />
              <g transform="translate(432,97)" stroke="#10b981" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4.5L15 8l-4 3.5M5 4.5L1 8l4 3.5M9 2l-3 11" />
              </g>
              <text x="440" y="139" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="700" fill="#171717">TECH</text>
              <rect x="390" y="147" width="100" height="22" rx="11" fill="#10b981" />
              <text x="440" y="162" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.5">SPEED · UX</text>
              <text x="440" y="191" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Code. Product.</text>
              <text x="440" y="207" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Performance.</text>

              {/* ── TLPC center label — centroid of 3-circle overlap (290, 248) ── */}
              <rect x="276" y="234" width="28" height="28" rx="0" fill="#F4F4F0" stroke="#171717" strokeWidth="1.6" />
              <text x="290" y="253" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#171717">L</text>
              <text x="290" y="290" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="700" fill="#171717">TLPC</text>

              {/* ── MARKETING label — lower exclusive zone, anchor x=290 ── */}
              <circle cx="290" cy="440" r="17" fill="#faf5ff" />
              <g transform="translate(282,432)" stroke="#a855f7" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8.75h2.25v6.75H2zM6.5 5.5h2.25v10H6.5zM11 2.75H13.25v12.75H11z" />
              </g>
              <text x="290" y="474" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="700" fill="#171717">MARKETING</text>
              <rect x="220" y="482" width="140" height="22" rx="11" fill="#9333ea" />
              <text x="290" y="497" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.5">CAC · FUNNELS</text>
              <text x="290" y="527" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Growth. Funnels.</text>
              <text x="290" y="543" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="13" fill="#666663">Efficiency.</text>
            </svg>
          </div>

          {/* Positions List + Overlap CTA */}
          <div className="flex flex-col p-8 md:p-12 lg:p-16">
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

            {/* "The overlap" yellow CTA block — matches reference image exactly */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-[#E5FF00] p-6"
            >
              <p className="mb-1 text-base font-bold text-neutral-900">
                The overlap<span className="font-normal">.</span>
              </p>
              <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-neutral-900 uppercase">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="8" r="6" />
                  <line x1="8" y1="5" x2="8" y2="8" />
                  <line x1="8" y1="8" x2="11" y2="10" />
                </svg>
                Where we live. Where pages convert +20% better on day one.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}