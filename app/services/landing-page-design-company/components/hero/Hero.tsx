'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { HeroBackground } from './HeroBackground'
import { HeroHeading } from './HeroHeading'
import { HeroButtons } from './HeroButtons'
import { HeroStats } from './HeroStats'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-24 md:pt-36 lg:pt-44">
      {/* Background */}
      <HeroBackground />

      <Container className="relative z-10">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <HeroHeading />

          {/* Flex Container for Description & Stats */}
          <div className="mt-12 flex flex-col justify-between gap-12 border-t border-neutral-800 pt-8 lg:mt-16 lg:flex-row lg:items-start lg:pt-10">
            
            {/* Description */}
            <div className="max-w-[460px]">
              <p className="text-base leading-relaxed md:text-lg md:leading-relaxed">
                We're India's biggest CRO-led landing page company.
                We ship pages that convert <strong className="font-semibold">at least 20% better</strong> than what's running today or we keep working until they do.
              </p>
              
              {/* Buttons */}
              <div className="mt-8 md:mt-10">
                <HeroButtons />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 lg:max-w-[600px]">
              <HeroStats />
            </div>
            
          </div>

          {/* Connecting Divider to Case Studies */}
          <div className="mt-16 border-t border-neutral-800/50 md:mt-24 lg:mt-28" />

        </div>
      </Container>
    </section>
  )
}