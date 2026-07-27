'use client'

import { Container } from '@/components/layout/Container'
import { FooterColumn } from '@/components/ui/footer-column'
import { motion } from 'framer-motion'

const footerSections = [
  {
    title: 'THE PROMISE',
    links: [
      { label: 'Work', href: '#' },
      { label: 'Receipts', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Process', href: '#' },
    ],
  },
  {
    title: 'WORDS',
    links: [
      { label: 'The math', href: '#' },
      { label: 'Why CRO', href: '#' },
      { label: 'Hall of Fame', href: '#' },
    ],
  },
  {
    title: 'WORK',
    links: [
      { label: 'Surat · IN', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'X / Twitter', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <FooterColumn isBrand>
            <p className="text-sm text-gray-400">
              We ship landing pages that convert at least 20% better or we keep working.
            </p>
          </FooterColumn>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
          <p>© THE LANDING PAGE COMPANY · EST. 2024 · 2026</p>
          <p>BUILT IN INDIA · UNDER 1.85 PUBLIC · WE PRACTISE WHAT WE PITCH.</p>
        </motion.div>
      </Container>
    </footer>
  )
}
