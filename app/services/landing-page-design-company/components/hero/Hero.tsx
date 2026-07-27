'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { HeroBackground } from './HeroBackground'
import { HeroHeading } from './HeroHeading'
import { HeroButtons } from './HeroButtons'
import { HeroStats } from './HeroStats'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-28 md:pt-36 lg:pt-40">
      {/* Background */}
      <HeroBackground />

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <HeroHeading />

          {/* Flex Container for Description & Stats */}
          <div className="mt-8 flex flex-col gap-8 border-t border-neutral-800 pt-6 lg:mt-12 lg:flex-row lg:justify-between lg:items-start lg:pt-8">
            
            {/* Description */}
            <div className="w-full lg:max-w-[460px]">
              <p className="text-base leading-relaxed md:text-lg md:leading-relaxed">
                We're India's biggest CRO-led landing page company.
                We ship pages that convert <strong className="font-semibold">at least 20% better</strong> than what's running today or we keep working until they do.
              </p>
              
              {/* Buttons */}
              <div className="mt-6 md:mt-8">
                <HeroButtons />
              </div>
            </div>

            {/* Stats */}
            <div className="w-full lg:flex-1 lg:max-w-[600px]">
              <HeroStats />
            </div>
            
          </div>

          {/* Connecting Divider to Case Studies */}
          <div className="mt-8 border-t border-neutral-800/50 md:mt-10 lg:mt-12" />

        </div>
      </Container>
    </section>
  )
}