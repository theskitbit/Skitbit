'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { QualificationCard } from '@/components/ui/qualification-card'

interface QualificationItem {
  icon: string
  title: string
  colorClass: string
  items: string[]
}

const qualifications: QualificationItem[] = [
  {
    icon: 'X',
    title: 'Not for you if',
    colorClass: 'text-[#0000ff]', // Pure blue to match the design
    items: [
      'Your CEO has a doc of 47 things the page must say. (It should say one.)',
      "You haven't talked to a customer in 90 days. (We won't guess for you.)",
      'You need deliverables measured in pages, not revenue. (Hire a freelancer.)',
      "You treat agencies like vendors, not partners. (Life's too short.)",
      'You sell vapes, predatory lending, or MLMs. (Hard no.)',
    ],
  },
  {
    icon: '✓',
    title: 'For you if',
    colorClass: 'text-[#E5FF00]', // Highlighter yellow
    items: [
      "You've hit a ceiling on CVR and don't know why.",
      "You have a product that actually works. (We can't fix a bad one.)",
      "You'd rather see a 14-day test than a 40-slide deck.",
      "You want the person writing the page to take the first call.",
      "You think design and performance are the same fight.",
    ],
  },
]

export function Qualifications() {
  return (
    <section className="bg-[#F4F4F0] py-24 md:py-32">
      <Container>
        {/* Split Header matching the design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-center"
        >
          <h2 className="text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            Who we don't<br />work with.
          </h2>
          <p className="max-w-[420px] text-sm leading-relaxed text-neutral-500 md:text-base">
            Saying no is a competitive advantage. Here's ours, in writing, so we can both save everyone a discovery call.
          </p>
        </motion.div>

        {/* Unified Dark Container for Cards */}
        <div className="grid grid-cols-1 bg-[#0A0A0A] lg:grid-cols-2">
          {qualifications.map((qual, idx) => (
            <QualificationCard
              key={idx}
              icon={qual.icon}
              title={qual.title}
              colorClass={qual.colorClass}
              items={qual.items}
              delay={idx * 0.1}
              isLast={idx === qualifications.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}