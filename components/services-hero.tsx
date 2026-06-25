'use client'

import { useContactOverlay } from './contact-overlay'

export function ServicesHero() {
  const { open } = useContactOverlay()

  return (
    <section id="services-hero" className="py-32 lg:py-48 bg-background" aria-label="Services hero section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-10 max-w-5xl">
          {/* Main H1 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            High-Performance Product Creative Services
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-foreground/70 leading-relaxed max-w-4xl font-medium">
            Stop wasting ad spend on ignored visuals. We build 3D assets, video creatives, and marketplace solutions designed to drive clicks, conversions, and scale.
          </p>

          {/* CTA Button */}
          <div className="pt-6">
            <button
              onClick={open}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Explore All Services →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
