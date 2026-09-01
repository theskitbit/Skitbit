'use client'

import { useContactOverlay } from './contact-overlay'

export function CTA() {
  const { open } = useContactOverlay()

  return (
    <section
      id="contact"
      className="border-t border-border bg-background py-24 sm:py-28 lg:py-32"
      aria-label="Call to action - get your first 3D product concept"
    >
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <h2 className="mx-auto m-0 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
          Scale Your E-commerce Sales Today.
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
          High-performing product creatives built to increase clicks, conversions, and sales. Delivered in days, not weeks — no photoshoots, no delays.
        </p>

        <div className="mt-10 flex justify-center sm:mt-11">
          <button
            type="button"
            onClick={open}
            data-tooltip="Get a reply in 60secs" data-tooltip-position="below"
            aria-label="Get in touch — Get a reply in 60secs"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus-ring active:scale-[0.98]"
          >
            Get Your First Concept
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
