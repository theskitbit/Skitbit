'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function CaseStudies() {
  return (
    <section className="bg-[#F4F4F0] pt-0 pb-12 md:pb-16">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Blue Tab */}
          <div className="flex">
            <div className="bg-[#2563EB] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
              Featured Case Study
            </div>
          </div>

          {/* Main Peach Container */}
          <div className="flex flex-col gap-4 border border-neutral-900 bg-[#F8EFE6] p-4 lg:flex-row lg:gap-6 lg:p-6">
            
            {/* Left Sidebar */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-4 lg:w-[260px]">
              {/* Stats Box */}
              <div className="border border-neutral-900 bg-white p-5 sm:p-6">
                {/* Logo Image */}
                <div className="mb-6 flex items-center">
                  <img 
                    src="https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp" 
                    alt="Gruns Logo" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
                
                {/* Stat 1 */}
                <div className="border-t border-neutral-900/30 pt-4 pb-4">
                  <div className="text-4xl font-medium tracking-tighter text-[#2563EB] sm:text-5xl">+33%</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-700">CR</div>
                </div>

                {/* Stat 2 */}
                <div className="border-t border-neutral-900/30 pt-4">
                  <div className="text-4xl font-medium tracking-tighter text-[#2563EB] sm:text-5xl">+14%</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-700">AOV</div>
                </div>
              </div>

              {/* Visit Website Button */}
              <a
                href="#"
                className="flex items-center justify-between border border-transparent bg-[#0A0A0A] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Visit Website <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Right Area - Images */}
            <div className="grid h-[350px] w-full grid-cols-1 gap-3 overflow-hidden sm:h-[420px] md:grid-cols-3 lg:h-[520px] lg:gap-4">
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