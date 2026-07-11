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

export function TestimonialsSanity({ testimonials }: TestimonialsProps) {
  const [loaded, setLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hasShuffledOnce, setHasShuffledOnce] = useState(false)

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

  // Initial load animation
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoaded(true)
    }, 80)
    return () => window.clearTimeout(timeout)
  }, [])

  // Auto-shuffle on view and every 2 seconds after
  useEffect(() => {
    const sectionRef = document.getElementById('testimonials')
    if (!sectionRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Shuffle once when first entering view
          if (!hasShuffledOnce) {
            setHasShuffledOnce(true)
            next()
          }
          observer.unobserve(sectionRef)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef)
    return () => observer.unobserve(sectionRef)
  }, [hasShuffledOnce, sortedTestimonials.length])

  // Auto-shuffle every 2 seconds after being in view
  useEffect(() => {
    if (!isInView || !hasShuffledOnce) return

    const interval = setInterval(() => {
      next()
    }, 2000)

    return () => clearInterval(interval)
  }, [isInView, hasShuffledOnce, sortedTestimonials.length])

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
                      {active.image && (
                        <Image
                          src={urlFor(active.image).width(48).height(48).url()}
                          alt={active.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
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
      </div>
    </section>
  )
}
