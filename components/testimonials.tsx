'use client'

import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'MESSIKA Paris',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Messika-qejIUYic4Yr2Ll5RU7os9DNNdgGIqJ.png',
    text: '"The biggest win was consistency. Every product, every campaign—everything finally looks like one brand."',
  },
  {
    name: 'SKYBORNE',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skyborne-p4ezaqFZ5OfdsvHpwahK8hQpOCamyf.png',
    text: '"We went from struggling with creatives to a full pipeline of high-performing assets for ads, PDPs, and social — without reshoots."',
  },
  {
    name: 'Skinny.rx',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skinny.rx-8WN3MckWWMQPMDKhdXo8iASOv4vQKK.png',
    text: '"Faster launches, better creatives, and no dependency on shoots. This completely changed how we produce content."',
  },
  {
    name: 'HerFantasyBox',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HerFantasyBox-B6XxTEH5jYtYcPFtMaxBWX2xIarg4t.png',
    text: '"Our team saves so much time now. What used to take multiple vendors is handled in one streamlined process."',
  },
  {
    name: 'PLAN B',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plan%20B-pZTphn7CFyGcxlfnSqeXbfzbouJQZI.png',
    text: '"I was very satisfied with the work. they did everything according to my ideas and responded to every request. I will book the services again in the future and can recommend them."',
  },
  {
    name: 'PALLADIO',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palladio-4gVgAm7yrCStetxUP88iEXM1CTtJkY.png',
    text: '"We\'re thrilled with the work done by this agency! They took our idea and turned it into a wonderful project with great precision and creativity."',
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(1) // Wade Warren active by default (matches screenshot)
  const [direction, setDirection] = useState(0)

  const prev = () => {
    setDirection(-1)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection(1)
    setCurrent((current + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background" aria-label="Testimonials section - client success stories">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Pill label */}
          <div className="mb-8">
            <span className="inline-block text-sm font-medium text-foreground bg-muted rounded-full px-6 py-2">
              Trusted by brands scaling with better creatives
            </span>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-12">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote text */}
          <p className="text-2xl font-bold text-foreground text-center leading-relaxed mb-12 px-4">
            {testimonials[current].text}
          </p>

          {/* Navigation buttons */}
          <div className="flex gap-6">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          {/* Pill label */}
          <div className="flex justify-center mb-8">
            <span className="inline-block text-xs font-medium text-foreground border border-border rounded-full px-4 py-1.5">
              Trusted by brands scaling with better creatives
            </span>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote + arrows */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0 hover:bg-muted/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Quote text - FIXED HEIGHT to prevent jumping */}
            <div className="flex-1 h-32 flex items-center justify-center">
              <p className="text-xl font-bold text-foreground text-center leading-relaxed transition-all duration-300">
                {testimonials[current].text}
              </p>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0 hover:bg-muted/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Avatar cards row */}
          <div className="grid grid-cols-6 gap-3">
            {testimonials.map((t, i) => {
              const isActive = i === current
              return (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  className={`rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 ${isActive ? 'bg-primary scale-105 shadow-lg' : 'bg-primary/20 hover:bg-primary/40 hover:shadow-md'
                    }`}
                >
                  {/* Avatar circle */}
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/60 shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${isActive ? 'text-primary-foreground' : 'text-foreground/70'}`}>
                    {t.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
