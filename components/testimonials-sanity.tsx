'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface Testimonial {
  _id: string
  name: string
  role: string
  category: string
  headline: string
  description: string
  image: any
  metric1Label?: string
  metric1Value?: string
  metric2Label?: string
  metric2Value?: string
  rating: number
  order?: number
  active?: boolean
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-foreground"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary/10 to-transparent p-6 sm:p-8 border border-primary/20 transition-all duration-300 hover:border-primary/40">
      {/* Metric overlays */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {testimonial.metric1Label && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="text-4xl font-bold">{testimonial.metric1Value}</div>
              <div className="text-sm mt-2">{testimonial.metric1Label}</div>
            </div>
          </div>
        )}
      </div>

      {/* Image background */}
      {testimonial.image && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          <Image
            src={urlFor(testimonial.image).width(600).height(400).url()}
            alt={testimonial.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="relative z-10">
        <Stars count={testimonial.rating} />

        <blockquote className="mt-6 text-xl sm:text-2xl font-bold leading-tight text-foreground">
          "{testimonial.headline}"
        </blockquote>

        <div className="mt-4 flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary/20">
            <Image
              src={urlFor(testimonial.image).width(48).height(48).url()}
              alt={testimonial.name}
              fill
              sizes="48px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            <p className="text-xs text-primary mt-1">{testimonial.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSanity({ testimonials }: TestimonialsProps) {
  const [loaded, setLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const sortedTestimonials = testimonials
    .filter((t) => t.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  const active = sortedTestimonials[activeIndex]

  const prev = () => {
    setActiveIndex((value) => (value - 1 + sortedTestimonials.length) % sortedTestimonials.length)
  }

  const next = () => {
    setActiveIndex((value) => (value + 1) % sortedTestimonials.length)
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoaded(true)
    }, 80)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!sortedTestimonials.length) {
    return null
  }

  return (
    <section
      id="testimonials"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`mx-auto mb-12 max-w-[1040px] transition-all duration-700 ease-out lg:mb-14 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">
            Client Proof
          </span>
          <h2
            id="testimonials-heading"
            className="mt-6 max-w-[760px] text-[34px] font-bold leading-[1] tracking-[-0.055em] text-foreground sm:text-[44px] lg:text-[50px]"
          >
            Client Success & Performance
          </h2>
        </div>

        {/* Main testimonial */}
        <div
          className={`mx-auto max-w-[1040px] rounded-[34px] bg-white/60 p-3 shadow-[0_20px_64px_rgba(0,0,0,0.04)] ring-1 ring-foreground/5 transition-all duration-700 ease-out sm:p-4 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <article className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-background blur-3xl"
            />

            <div className="relative z-10">
              <Stars count={active.rating} />

              <div className="mt-7 transition-all duration-500">
                <blockquote
                  key={active._id}
                  aria-live="polite"
                  className="max-w-[820px] text-[26px] font-bold leading-[1.12] tracking-[-0.055em] text-foreground sm:text-[34px] lg:text-[44px]"
                >
                  "{active.headline}"
                </blockquote>
                <p className="mt-4 max-w-[760px] text-lg font-medium text-muted-foreground leading-relaxed">
                  "{active.description}"
                </p>
              </div>

              <footer className="mt-8 border-t border-border pt-5 lg:mt-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
                      <Image
                        src={urlFor(active.image).width(48).height(48).url()}
                        alt={active.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 text-left">
                      <h3 className="m-0 truncate text-base font-semibold text-foreground">
                        {active.name}
                      </h3>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {active.role} · {active.category}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-opacity duration-300 hover:opacity-70 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <svg
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next testimonial"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-opacity duration-300 hover:opacity-70 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <svg
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </footer>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-opacity duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-opacity duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Next
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Grid of testimonial cards */}
        {sortedTestimonials.length > 1 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
