'use client'

import { useContactOverlay } from './contact-overlay'

export function CTA() {
  const { open } = useContactOverlay()

  return (
    <section id="contact" className="py-24 bg-background border-t border-border" aria-label="Call to action - get your first 3D product concept">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-10">
        
        {/* 🔥 SEO FIX: Updated H2 to match the keyword-rich blueprint */}
        <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground m-0">
          Scale Your E-commerce Sales Today.
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium m-0 mt-6">
          Get high-performing product creatives built to increase clicks, conversions, and sales — without delays or reshoots.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button onClick={open} className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full text-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-md">
            Get Your First Concept →
          </button>
          <button className="px-8 py-3 bg-muted text-foreground font-semibold rounded-full text-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-md">
            See our work
          </button>
        </div>
      </div>
    </section>
  )
}