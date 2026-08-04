'use client'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { useContactOverlay } from '@/components/contact-overlay'
import { servicesData } from '@/data/services-data'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = servicesData[slug as keyof typeof servicesData]
  const { open } = useContactOverlay()

  if (!service) {
    return (
      <main className="bg-background text-foreground">
        <Header />
        <Breadcrumbs />
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-foreground/60">The service you're looking for doesn't exist.</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background text-foreground">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="py-32 lg:py-48 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                  {service.title}
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={open}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Get Started →
                </button>
              </div>
            </div>

            {/* Right - Visual Placeholder */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl text-foreground/20">◆</div>
                  <p className="text-foreground/40 font-medium">Service Visual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div>
              <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">The Problem</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                {service.problem}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Benefit Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div>
              <p className="text-sm font-semibold text-background/60 uppercase tracking-widest mb-4">The Solution</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                {service.benefit}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 lg:py-32 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            <div>
              <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">Why Skitbit</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                Built for Performance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Lightning Fast Turnaround', value: '5-7 Days', desc: 'From concept to delivery' },
                { label: 'Conversion Optimized', value: '3.2x', desc: 'Average CTR improvement' },
                { label: 'Scalable', value: '∞', desc: 'Unlimited iterations & revisions' },
              ].map((metric) => (
                <div key={metric.label} className="space-y-4 p-8 rounded-2xl border border-border/50 bg-muted/30">
                  <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">
                    {metric.label}
                  </p>
                  <div className="space-y-2">
                    <p className="text-5xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-foreground/60 font-medium">{metric.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
              Ready to Scale Your Creatives?
            </h2>
            <p className="text-lg sm:text-xl text-background/80 leading-relaxed font-medium max-w-3xl">
              Let's build high-performance product visuals that drive conversions and scale your growth.
            </p>
            <div className="pt-4">
              <button
                onClick={open}
                className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Get Your First Concept →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
