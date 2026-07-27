'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ProcessStep } from '../ui/process-step'

interface ProcessStepData {
  number: string
  label: string
  title: string
  description: string
}

const steps: ProcessStepData[] = [
  {
    number: '01',
    label: 'DATA IN',
    title: 'Deep platform analysis.',
    description:
      'We pull signal from Meta, Shopify, GA, Clarity and every other platform that matters. Heatmaps, funnels, drop-offs, session recordings — the full picture before we touch a pixel.',
  },
  {
    number: '02',
    label: 'DESIGN OUT',
    title: 'Mobile-first, perfected.',
    description:
      "Unlimited rounds of iteration until it's right. Real copy, real assets, the exact strategy that will go live. Misuse it — we refund. That's the deal.",
  },
  {
    number: '03',
    label: 'SHIPPED LIVE',
    title: 'Development + live link.',
    description:
      "Hand-coded, speed-tuned, QA'd on real devices. You get a live link to test, click, break. We don't call it done until the numbers do.",
  },
]

export function Process() {
  return (
    <section className="border-t border-neutral-900/20 bg-[#F4F4F0] py-24 md:py-32">
      <Container>
        {/* Split Header matching the design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <h2 className="text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            How the sausage<br />gets made.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-neutral-500 lg:pb-4">
            Data in. Design out. Shipped live. No "creative exploration phase." No 40-slide decks.
            We're builders who happen to be researchers.
          </p>
        </motion.div>

        {/* Process Steps Grid with solid white background */}
        <div className="grid grid-cols-1 border border-neutral-900/20 bg-white md:grid-cols-3">
          {steps.map((step, idx) => (
            <ProcessStep
              key={idx}
              number={step.number}
              label={step.label}
              title={step.title}
              description={step.description}
              delay={idx * 0.1}
              isLast={idx === steps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}