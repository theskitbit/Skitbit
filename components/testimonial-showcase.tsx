'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface StatItem {
  percentage: string
  company: string
  label: string
  isIncrease: boolean
  logo: string
}

export function TestimonialShowcase() {
  const [hoveredImage] = useState<string | null>(null)

  const stats: StatItem[] = [
    {
      percentage: '92%',
      company: 'Luxury Brand A',
      label: 'CTR increase on ad creatives',
      isIncrease: true,
      logo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    },
    {
      percentage: '78%',
      company: 'E-commerce Leader',
      label: 'faster product launch cycle',
      isIncrease: true,
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    },
    {
      percentage: '$450K',
      company: 'Beauty Direct',
      label: 'cost savings annually',
      isIncrease: true,
      logo: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=400&h=300&fit=crop',
    },
    {
      percentage: '3.5x',
      company: 'Fashion Retailer',
      label: 'ROI improvement',
      isIncrease: true,
      logo: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop',
    },
  ]

  return (
    <div className="bg-background min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">
            Client Success
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-screen-xl mx-auto relative text-foreground mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Brands trust Skitbit to
            <br className="sm:hidden" />
            <span className="text-primary"> transform their visuals</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to conversion, we deliver CGI that drives results
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-card border border-border rounded-xl p-6 w-full">
          {stats.map((stat, index) => (
            <div key={stat?.label} className="flex flex-col gap-4">
              {index !== 0 && (
                <div className="hidden lg:block absolute top-0 left-0 h-full w-0.5 border border-dashed border-border" />
              )}
              <div className="group relative h-full">
                {/* Logo view */}
                <img
                  src={stat?.logo}
                  alt={stat?.company}
                  className="w-full h-32 object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-300 mb-3"
                />

                {/* Stats overlay on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.isIncrease ? (
                      <ArrowUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-foreground/60" />
                    )}
                    <span className="text-3xl font-bold text-white">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm text-center font-medium">
                    {stat.label}
                  </p>
                </div>

                {/* Company name */}
                <p className="text-sm font-semibold text-foreground truncate">
                  {stat.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Ready to see similar results? Let's create your success story.
          </p>
          <button className="btn-primary rounded-full px-8 py-3 text-lg font-semibold">
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  )
}
