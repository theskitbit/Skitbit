'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function AIBenefits() {
  return (
    <section className="bg-foreground text-background py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="text-yellow-400">AI is coming for your profits.</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Every brand now has access to the same tools, the same stock copy, the same landing
                page template with a gradient and a dog. Good enough is free. Good enough also doesn't convert.
              </p>
              <p>
                The moat moved. It&apos;s not in "having a website". It&apos;s in having a page so
                specific to your customer, so precise on the one thing they need to hear, that a model couldn't generate it without you in the room.
              </p>
              <p>
                We don&apos;t sell you an AI workflow. We sell you a point of view, translated into pixels,
                measured in rupees, shipped in three weeks. The part no model can do for you is decide what you actually believe.
              </p>
              <p>
                Pages that convert are pages with <span className="text-yellow-400">opinions</span>. Opinions that cost money to form. Which is why everyone else won&apos;t.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 items-start"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center border border-transparent bg-yellow-400 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-yellow-500"
            >
              Let's form opinions together &rarr;
            </a>
            <div className="text-sm text-gray-400 pt-2 sm:pt-3">
              OR READ IT AGAIN. WE'LL WAIT.
            </div>
          </motion.div>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-background/20 text-sm text-gray-500"
          >
            — TLPC · APR 2026
          </motion.div>
        </div>
      </Container>
    </section>
  )
}