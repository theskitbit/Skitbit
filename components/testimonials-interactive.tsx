'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface TestimonialImage {
  image: any
  quote: string
  attribution: string
}

interface Stat {
  percentage: string
  label: string
  isIncrease: boolean
  companyLogo: any
}

interface TestimonialsInteractiveProps {
  title: string
  mainHeading: string
  testimonialImages: TestimonialImage[]
  stats: Stat[]
  backgroundColor?: string
}

export function TestimonialsInteractive({
  title = 'Our Community',
  mainHeading = 'We make it easy for companies and their employees to contribute and manage compensation',
  testimonialImages = [],
  stats = [],
  backgroundColor = 'bg-gray-50',
}: TestimonialsInteractiveProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  // Fallback data if no Sanity data provided
  const defaultStats: Stat[] = [
    {
      percentage: '80%',
      label: 'manual payment tasks',
      isIncrease: false,
      companyLogo: null,
    },
    {
      percentage: '30%',
      label: 'international fees',
      isIncrease: false,
      companyLogo: null,
    },
    {
      percentage: '25%',
      label: 'payment reconciliation',
      isIncrease: false,
      companyLogo: null,
    },
    {
      percentage: '$100K',
      label: 'saved per year',
      isIncrease: true,
      companyLogo: null,
    },
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats
  const displayImages = testimonialImages.length > 0 ? testimonialImages : []

  return (
    <div className={`${backgroundColor} min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative`}>
      <div className="max-w-6xl mx-auto">
        {/* Community Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#f1efec] text-black px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            {title}
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-neutral-900">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight">
            {mainHeading.split('[IMG]').map((text, idx) => (
              <span key={idx}>
                {text}
                {idx < mainHeading.split('[IMG]').length - 1 && displayImages[idx] && (
                  <TooltipProvider key={`img-${idx}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-block mx-2 align-middle relative">
                          <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:w-24 rounded-full border-2 border-white">
                            <Image
                              src={urlFor(displayImages[idx].image).width(96).height(96).url()}
                              alt={displayImages[idx].attribution}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="max-w-xs bg-white text-black p-4 rounded-lg shadow-lg border-none"
                      >
                        <p className="mb-2 text-sm">"{displayImages[idx].quote}"</p>
                        <p className="font-medium text-sm">{displayImages[idx].attribution}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="sm:flex grid grid-cols-2 gap-8 bg-neutral-100 mt-8 w-full mx-auto px-8 py-6 border rounded-md border-neutral-200">
          {displayStats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex-1 flex gap-4 pl-10 relative"
            >
              {index !== 0 && (
                <div className="w-0.5 h-9 border border-dashed border-neutral-200 absolute left-0" />
              )}
              <div className="w-full h-full group">
                {stat.companyLogo ? (
                  <Image
                    src={urlFor(stat.companyLogo).width(200).height(40).url()}
                    alt="company"
                    width={200}
                    height={40}
                    className="w-[85%] h-10 object-contain grayscale mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out"
                  />
                ) : (
                  <div className="w-[85%] h-10 bg-gray-300 rounded mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />
                )}
                <div className="absolute left-0 top-8 opacity-0 flex flex-col items-center justify-center w-full group-hover:-top-3.5 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="flex items-center justify-center gap-2 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-gray-800" />
                    )}
                    <span className="md:text-4xl text-2xl font-semibold text-gray-800">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-gray-800 md:text-sm text-xs text-center capitalize">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
