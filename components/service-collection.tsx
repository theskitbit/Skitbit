'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useContactOverlay } from './contact-overlay'

interface Service {
  id: number
  name: string
  description: string
  slug: string
}

interface ServiceCollectionProps {
  number: string
  title: string
  description: string
  services: Service[]
}

export function ServiceCollection({
  number,
  title,
  description,
  services,
}: ServiceCollectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { open } = useContactOverlay()

  return (
    <section className="py-20 lg:py-28 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Collection Header */}
        <div className="space-y-6 mb-20">
          {/* Number Badge */}
          <div className="inline-block px-3 py-1.5 border border-border rounded-full">
            <span className="text-xs font-semibold text-foreground/60 uppercase tracking-widest">
              Section {number}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed max-w-3xl font-medium">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative p-8 rounded-2xl bg-background border border-border/50 hover:border-foreground/30 transition-all duration-300 text-left cursor-pointer hover:shadow-xl hover:-translate-y-2 backdrop-blur-sm block"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  {/* Service Name (H3) */}
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="text-base text-foreground/60 group-hover:text-foreground/75 transition-colors duration-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border/50 group-hover:border-foreground/30 group-hover:bg-foreground/5 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground/60 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
