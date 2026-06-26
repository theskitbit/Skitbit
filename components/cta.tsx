'use client'

import { useContactOverlay } from './contact-overlay'

export function CTA() {
  const { open } = useContactOverlay()

  const handleWorkClick = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="contact"
      className="py-24 bg-background border-t border-border"
      aria-label="Call to action - get your first 3D product concept"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

        <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground m-0">
          Scale Your E-commerce Sales Today.
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium m-0 mt-6">
          High-performing product creatives built to increase clicks, conversions, and sales. Delivered in days, not weeks — no photoshoots, no delays.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            type="button"
            onClick={open}
            className="btn-primary inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus-ring active:scale-[0.98]"
          >
            Get Your First Concept
            <span aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            onClick={handleWorkClick}
            className="btn-ghost inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-ring active:scale-[0.98]"
          >
            See the work
          </button>
        </div>

        <p className="mt-5 text-sm text-foreground/40">
          Free visual audit included. No commitment.
        </p>
      </div>
    </section>
  )
}