'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function CaseStudies() {
  return (
    <section className="bg-[#F4F4F0] py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Blue Tab */}
          <div className="flex">
            <div className="bg-[#2563EB] px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white">
              Featured Case Study
            </div>
          </div>

          {/* Main Peach Container */}
          <div className="flex flex-col gap-6 border border-neutral-900 bg-[#F8EFE6] p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
            
            {/* Left Sidebar */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-8 lg:w-[280px]">
              {/* Stats Box */}
              <div className="border border-neutral-900 bg-white p-6 sm:p-8">
                {/* Logo Image */}
                <div className="mb-10 flex items-center">
                  <img 
                    src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp" 
                    alt="Gruns Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
                
                {/* Stat 1 */}
                <div className="border-t border-neutral-900/30 pt-6 pb-8">
                  <div className="text-5xl font-medium tracking-tighter text-[#2563EB] sm:text-6xl">+33%</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-700">CR</div>
                </div>

                {/* Stat 2 */}
                <div className="border-t border-neutral-900/30 pt-6">
                  <div className="text-5xl font-medium tracking-tighter text-[#2563EB] sm:text-6xl">+14%</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-700">AOV</div>
                </div>
              </div>

              {/* Visit Website Button */}
              <a
                href="#"
                className="flex items-center justify-between border border-transparent bg-[#0A0A0A] px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Visit Website <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Right Area - Images */}
            <div className="grid h-[400px] w-full grid-cols-1 gap-4 overflow-hidden sm:h-[500px] md:grid-cols-3 lg:h-[640px] lg:gap-6">
              {/* Strip 1 - Top */}
              <div className="h-full w-full border border-neutral-900/20 bg-white">
                <img
                  src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_landingpage.webp"
                  alt="Gruns Case Study Top"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              {/* Strip 2 - Middle */}
              <div className="hidden h-full w-full border border-neutral-900/20 bg-white md:block">
                <img
                  src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_2_landingpage.webp"
                  alt="Gruns Case Study Middle"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* Strip 3 - Bottom */}
              <div className="hidden h-full w-full border border-neutral-900/20 bg-white md:block">
                <img
                  src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Gruns_mobile_landingpage.webp"
                  alt="Gruns Case Study Bottom"
                  className="h-full w-full object-cover object-bottom"
                />
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}