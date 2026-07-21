'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Testimonial = {
  name: string;
  image: string;
  category: string;
  role: string;
  headline: string;
  text: string;
};

// 🔥 SEO & Copy Fix: Added punchy 'headline' for humans, kept 'text' for context
const testimonials: Testimonial[] = [
  {
    name: 'SKYBORNE',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skyborne-p4ezaqFZ5OfdsvHpwahK8hQpOCamyf.png',
    category: 'Travel & carry',
    role: 'Premium D2C brand',
    headline: 'Endless assets. Zero reshoots.',
    text: 'We went from struggling with creatives to a full pipeline of high-performing assets for ads, PDPs, and social.',
  },
  {
    name: 'MESSIKA Paris',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Messika-qejIUYic4Yr2Ll5RU7os9DNNdgGIqJ.png',
    category: 'Luxury jewellery',
    role: 'Luxury brand',
    headline: 'Perfect brand consistency.',
    text: 'The biggest win was consistency. Every product and every campaign finally looks like one cohesive brand.',
  },
  {
    name: 'Skinny.rx',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skinny.rx-8WN3MckWWMQPMDKhdXo8iASOv4vQKK.png',
    category: 'Wellness',
    role: 'Wellness brand',
    headline: 'No more photoshoot delays.',
    text: 'Faster launches, better creatives, and no dependency on shoots. This changed how we produce content.',
  },
  {
    name: 'HerFantasyBox',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HerFantasyBox-B6XxTEH5jYtYcPFtMaxBWX2xIarg4t.png',
    category: 'Womens Wellness',
    role: 'D2C brand',
    headline: 'One streamlined workflow.',
    text: 'Our team saves so much time now. What used to take multiple vendors is handled in one streamlined process.',
  },
  {
    name: 'PLAN B',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plan%20B-pZTphn7CFyGcxlfnSqeXbfzbouJQZI.png',
    category: 'Cosmetics brand',
    role: 'D2C brand',
    headline: 'Flawless execution.',
    text: 'They did everything according to my ideas, responded to every request, and I would book the service again.',
  },
  {
    name: 'PALLADIO',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palladio-4gVgAm7yrCStetxUP88iEXM1CTtJkY.png',
    category: 'Beauty',
    role: 'Beauty brand',
    headline: 'Precision and creativity.',
    text: 'They took our idea and turned it into a wonderful project with great precision and creativity.',
  },
];

const proofPoints = [
  'Beauty, wellness, luxury and D2C',
  'Ads, PDPs and social assets',
  'Strategy + visual production',
];

function Stars() {
  return (
    <div className="flex items-center gap-1.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
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
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const active = testimonials[activeIndex];

  const prev = () => {
    setActiveIndex(
      (value) => (value - 1 + testimonials.length) % testimonials.length
    );
  };

  const next = () => {
    setActiveIndex((value) => (value + 1) % testimonials.length);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoaded(true);
    }, 80);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`mx-auto mb-12 max-w-[1040px] transition-all duration-700 ease-out lg:mb-14 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >
          <span className="inline-flex rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground">
            Client Proof
          </span>

          {/* 🔥 SEO FIX: Updated H2 text */}
          <h2
            id="testimonials-heading"
            className="mt-6 max-w-[760px] text-[34px] font-bold leading-[1] tracking-[-0.055em] text-foreground sm:text-[44px] lg:text-[50px]"
          >
            Client Success & Performance
          </h2>
        </div>

        <div
          className={`mx-auto max-w-[1040px] rounded-[34px] bg-white/60 p-3 shadow-[0_20px_64px_rgba(0,0,0,0.04)] ring-1 ring-foreground/5 transition-all duration-700 ease-out sm:p-4 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
        >
          <article className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.05)] sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-background blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-5">
                <Stars />
              </div>

              {/* 🔥 SEO FIX: Split into short headline and context paragraph */}
              <div className="mt-7 transition-all duration-500">
                <blockquote
                  key={active.headline}
                  aria-live="polite"
                  className="max-w-[820px] text-[26px] font-bold leading-[1.12] tracking-[-0.055em] text-foreground sm:text-[34px] lg:text-[44px]"
                >
                  “{active.headline}”
                </blockquote>
                <p className="mt-4 max-w-[760px] text-lg font-medium text-muted-foreground leading-relaxed">
                  "{active.text}"
                </p>
              </div>

              <footer className="mt-8 border-t border-border pt-5 lg:mt-9">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      {/* 🔥 SEO FIX: Client name is now an H3 */}
                      <h3 className="m-0 truncate text-base font-semibold text-foreground">
                        {active.name}
                      </h3>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {active.role} · {active.category}
                      </p>
                    </div>
                  </div>

                  {/* Desktop nav only */}
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

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-full border border-foreground/10 bg-background px-3.5 py-2 text-center"
                  >
                    <p className="text-[11px] font-semibold leading-tight text-foreground/65">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile nav at bottom */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
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
  );
}