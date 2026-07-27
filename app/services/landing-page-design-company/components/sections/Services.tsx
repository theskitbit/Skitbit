'use client'

import { Container } from '../layout/Container'
import { ServiceCard } from '@/components/ui/service-card'
import { motion } from 'framer-motion'

interface Service {
  title: string
  label: string
  description: string
  price?: string
  features: string[]
  highlighted?: boolean
}

const services: Service[] = [
  {
    label: 'TIER · 01 · SNIPER',
    title: 'Single landing page.',
    description: 'One page. Research → copy → design → build → ship. Guaranteed +20% or we keep working.',
    features: [
      'Customer interviews (n≥5)',
      'Competitive teardown',
      'Copy + design + build',
      '30-day post-launch care',
    ],
  },
  {
    label: 'TIER · 02 · THE RETAINER · MOST PICKED',
    title: 'CRO retainer for each Landing Page',
    description: 'Choose the number of landing pages you wish. For every landing page we create you get a high converting version + test variation.',
    highlighted: true,
    features: [
      'Create a high converting version + test variation',
      'Unlimited tasks, one task at a time',
      'From Meta creatives to cross sell message',
      'Weekly async, monthly live',
    ],
  },
  {
    label: 'TIER · 03 · FULL REVAMP',
    title: 'Full Shopify Store Development',
    description: 'Sitemap, narrative, proof, polish. Your site stops being a brochure and starts earning.',
    features: [
      'UI/UX + Content + Graphics + Development',
      '12-24 pages, all tested',
      '8-10 week sprint',
      'You share brand guidelines and Photo Assets.',
    ],
  },
  {
    label: 'TIER · 04 · DIAGNOSTIC',
    title: 'Live audit. 60 mins.',
    price: '₹0',
    description: "Only if you get selected* Send us the URL. We'll audit live on a call. If you don't get selected, you can still pay for it.",
    features: [
      'Conversion teardown',
      '10 things you can do to imrove',
      'No deck. No upsell.',
      'No Recording + doc, yours',
    ],
  },
]

export function Services() {
  return (
    <section className="bg-[#F4F4F0] py-24 md:py-32">
      <Container>
        
        {/* Custom Split Header matching the design */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <h2 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            Our services. <span className="text-blue-600 block lg:inline">All<br className="hidden lg:block"/> about money</span>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-neutral-500 lg:mt-4">
            Pick the one that matches your problem. All services includes UI/UX, Content, Graphics, Design, & Development. AI Photoshoots & 3D animations optional*
          </p>
        </div>

        {/* 4-Column Grid with unified borders */}
        <div className="mb-12 grid grid-cols-1 border border-neutral-900/30 lg:grid-cols-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="border-b border-neutral-900/30 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <ServiceCard
                title={service.title}
                label={service.label}
                description={service.description}
                features={service.features}
                price={service.price}
                highlighted={service.highlighted}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA aligned to the left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex justify-start"
        >
          <button className="flex items-center justify-center gap-2 bg-neutral-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-neutral-800">
            Schedule a call &rarr;
          </button>
        </motion.div>
        
      </Container>
    </section>
  )
}