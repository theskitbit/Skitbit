'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

type Currency = 'INR' | 'USD'

type IncludedItem = {
  title: string
  description: string
}

type PricingPlan = {
  id: string
  eyebrow: string
  name: string
  shortName: string
  description: string
  priceInr: string
  priceUsd: string
  cta: string
  intent: string
  featured?: boolean
  bestFor: string
  included: IncludedItem[]
  notIncluded?: string[]
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    eyebrow: 'Starter',
    name: 'Starter System',
    shortName: 'Starter',
    description: 'Clean ecommerce basics for one simple product.',
    priceInr: '₹39,000',
    priceUsd: '$475',
    cta: 'Try This',
    intent: 'We need basic ecommerce product visuals.',
    bestFor:
      'For brands that need clean product listing visuals and want to test 3D before building a full content system.',
    included: [
      {
        title: '3D model setup',
        description:
          'We create or prepare one simple product model for clean ecommerce visuals.',
      },
      {
        title: '3 white/grey background renders',
        description:
          'Front view, angle view, and hero/detail view for Shopify, Amazon, or marketplace use.',
      },
      {
        title: '5–8 sec 360° turntable animation',
        description:
          'A simple rotating product animation for PDPs, reels, or product previews.',
      },
      {
        title: 'Basic studio lighting',
        description:
          'Clean product lighting focused on clarity, shape, and label visibility.',
      },
      {
        title: '1 minor revision round',
        description:
          'Small corrections for label placement, angle, framing, lighting, or material tweaks.',
      },
    ],
    notIncluded: [
      'Stylized render',
      'Lifestyle scene',
      'Promo video',
      'Ad creative variations',
      'Complex material work',
    ],
  },
  {
    id: 'core',
    eyebrow: 'Recommended',
    name: 'Product Content System',
    shortName: 'Content System',
    description:
      'Complete product content system — built once, reused across PDPs, ads, launch posts, and website sections.',
    priceInr: '₹79,000',
    priceUsd: '$950',
    cta: 'Get Started',
    intent: 'We need a complete product content system.',
    featured: true,
    bestFor:
      'For D2C brands that want premium product pages, launch visuals, and reusable creative assets.',
    included: [
      {
        title: 'Reusable 3D model setup',
        description:
          'Your product is built properly in 3D so future renders, angles, and animations become easier to create.',
      },
      {
        title: '5 ecommerce renders',
        description:
          'Front, back, left/right side, top/detail, and premium angle/hero view on white or grey background.',
      },
      {
        title: '1 stylized hero render',
        description:
          'A premium CGI visual designed for ads, website sections, launch posts, and hero sections.',
      },
      {
        title: '10–12 sec looping product animation',
        description:
          'A short product animation inside a simple environment. Useful for PDPs, reels, ads, and website sections.',
      },
      {
        title: 'Simple environment setup',
        description:
          'A clean brand-relevant 3D environment. Not a full promo film, but enough to make the product feel premium.',
      },
      {
        title: 'Lighting and material refinement',
        description:
          'We refine reflections, shadows, materials, labels, and product finish so the product looks more valuable online.',
      },
      {
        title: '2 minor revision rounds',
        description:
          'Enough refinement room to polish the content system without turning it into a fully custom campaign scope.',
      },
    ],
  },
  {
    id: 'growth',
    eyebrow: 'Launch',
    name: 'Growth Content Engine',
    shortName: 'Growth',
    description: 'Launch-ready promo video plus premium campaign assets.',
    priceInr: '₹1,29,000',
    priceUsd: '$1,550',
    cta: 'Scale Now',
    intent: 'We need a product launch promo video and campaign assets.',
    bestFor:
      'For brands launching a product, running paid ads, or needing a proper CGI promo video.',
    included: [
      {
        title: '3D model setup',
        description:
          'A polished product model prepared for renders, animation, and campaign visuals.',
      },
      {
        title: '5 white/grey background renders',
        description:
          'Clean ecommerce-ready renders for PDPs, marketplaces, decks, and website sections.',
      },
      {
        title: '1 stylized campaign render',
        description:
          'A premium CGI render with stronger art direction. Individually, stylized renders can cost around ₹7k+ each.',
      },
      {
        title: '20–25 sec product promo animation',
        description:
          'A proper product promo video with scene direction, camera movement, product highlights, and final edit.',
      },
      {
        title: 'Scene design and animation direction',
        description:
          'The video is planned like a campaign asset, not just a basic rotating product animation.',
      },
      {
        title: 'Music / sound-ready final edit',
        description:
          'Final edited animation ready for website hero sections, launch pages, ads, and social platforms.',
      },
      {
        title: '2 minor revision rounds',
        description:
          'Small corrections and refinements after preview stages and final direction lock.',
      },
    ],
  },
]

const customScopeItems = [
  'Multiple products or bundles',
  'More than one stylized scene',
  'Animation longer than 25 seconds',
  'Advanced glass, liquid, fabric, or mechanical detail',
  'Multiple ad cutdowns or campaign versions',
  'Full launch creative direction',
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('INR')
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [openItem, setOpenItem] = useState<number | null>(0)

  useEffect(() => {
    let isMounted = true

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return

        if (data?.country_code && data.country_code !== 'IN') {
          setCurrency('USD')
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedPlan) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeBreakdown()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPlan])

  const featuredPlan = useMemo(
    () => plans.find((plan) => plan.featured) || plans[1],
    []
  )

  const starterPlan = useMemo(
    () => plans.find((plan) => plan.id === 'starter') || plans[0],
    []
  )

  const growthPlan = useMemo(
    () => plans.find((plan) => plan.id === 'growth') || plans[2],
    []
  )

  const getPrice = (plan: PricingPlan) =>
    currency === 'INR' ? plan.priceInr : plan.priceUsd

  const getWhatsAppLink = (plan: PricingPlan) => {
    const message = encodeURIComponent(
      `Hey, I'm interested in the ${plan.name} (${getPrice(plan)}). ${plan.intent}`
    )

    return `https://wa.me/918384092211?text=${message}`
  }

  const openBreakdown = (plan: PricingPlan) => {
    setSelectedPlan(plan)
    setOpenItem(0)
  }

  const closeBreakdown = () => {
    setSelectedPlan(null)
    setOpenItem(0)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,230,76,0.34),transparent_46%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance text-[3rem] font-semibold leading-[0.98] tracking-[-0.09em] text-foreground sm:text-[5.2rem] lg:text-[6.4rem]">
              Simple pricing. No guesswork.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
              Send your product once — get the renders, animation, and campaign
              assets needed for ecommerce, ads, websites, and launches.
            </p>
          </div>

          <div className="mt-16 sm:mt-20">
            <article className="group mx-auto max-w-6xl rounded-[1.55rem] border border-border bg-card p-3 shadow-[0_28px_90px_rgba(0,31,63,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_38px_120px_rgba(0,31,63,0.12)] sm:rounded-[2rem] sm:p-4 lg:p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
                <div className="order-1 aspect-[1.05/1] overflow-hidden rounded-[1.2rem] bg-secondary sm:aspect-[16/10] sm:rounded-[1.55rem] lg:order-2 lg:aspect-auto lg:min-h-[455px]">
                  <Image
                    src="/images/After.webp"
                    alt="Premium product visual example"
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority
                  />
                </div>

                <div className="order-2 flex min-h-0 flex-col px-2 pb-3 pt-1 sm:px-4 sm:pb-5 sm:pt-2 lg:order-1 lg:min-h-[455px] lg:px-5 lg:py-5">
                  <div className="mb-5 flex flex-wrap items-center gap-2 lg:mb-8">
                    <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {featuredPlan.eyebrow}
                    </span>

                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-foreground">
                      Most chosen
                    </span>
                  </div>

                  <h2 className="max-w-xl text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.065em] text-foreground sm:text-[2.25rem] lg:text-[2.9rem]">
                    {featuredPlan.name}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {featuredPlan.description}
                  </p>

                  <div className="mt-7 text-[3.1rem] font-semibold leading-none tracking-[-0.08em] text-foreground sm:text-[4rem]">
                    {getPrice(featuredPlan)}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={getWhatsAppLink(featuredPlan)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-90"
                    >
                      {featuredPlan.cta}
                    </a>

                    <button
                      type="button"
                      onClick={() => openBreakdown(featuredPlan)}
                      className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
                    >
                      What’s included
                    </button>
                  </div>

                  <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-2 lg:mt-auto">
                    {[
                      '5 ecommerce renders',
                      '1 stylized hero render',
                      '10–12 sec product animation',
                      'Reusable 3D setup',
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => openBreakdown(featuredPlan)}
                        className="rounded-full bg-secondary px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground transition hover:bg-primary hover:text-foreground"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">
            Compare Packages
          </p>

          <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.07em] text-foreground sm:text-5xl">
            Pick the package based on how much content the product needs.
          </h2>

          <p className="mt-6 text-base leading-8 text-foreground/85 sm:text-lg">
            Starter covers clean listing assets. Product Content System gives
            the best all-round value. Growth adds a proper promo video.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {[starterPlan, growthPlan].map((plan) => (
            <article
              key={plan.id}
              className="group rounded-[1.15rem] border border-border bg-card p-3 shadow-[0_18px_55px_rgba(0,31,63,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,31,63,0.09)] sm:rounded-[1.4rem]"
            >
              <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1">
                <div className="aspect-square overflow-hidden rounded-[0.9rem] bg-secondary sm:rounded-[1.1rem] lg:aspect-[1.25/1]">
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_35%_20%,rgba(219,230,76,0.85),transparent_34%),linear-gradient(135deg,var(--secondary),var(--background))]">
                    <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                      {plan.eyebrow}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 py-1 lg:px-2 lg:pb-3 lg:pt-4">
                  <div className="mb-2 flex items-center gap-2 overflow-hidden whitespace-nowrap">
                    <span className="truncate text-xs font-semibold text-muted-foreground">
                      {plan.eyebrow}
                    </span>

                    <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                      •
                    </span>

                    <span className="truncate text-xs font-semibold text-muted-foreground">
                      Fixed scope
                    </span>
                  </div>

                  <h3 className="overflow-hidden text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.035em] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-lg lg:text-2xl lg:leading-[1.16] lg:tracking-[-0.055em]">
                    {plan.name}
                  </h3>

                  <p className="mt-3 hidden text-sm leading-7 text-muted-foreground sm:block">
                    {plan.description}
                  </p>

                  <div className="mt-4 text-3xl font-semibold tracking-[-0.07em] text-foreground">
                    {getPrice(plan)}
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getWhatsAppLink(plan)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    {plan.cta}
                  </a>

                  <button
                    type="button"
                    onClick={() => openBreakdown(plan)}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
                  >
                    What’s included
                  </button>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {plan.bestFor}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
              Custom scope
            </div>

            <h2 className="max-w-3xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.06em] text-foreground sm:text-5xl">
              Custom quotes are only for work outside the fixed packages.
            </h2>
          </div>

          <div className="rounded-[1.65rem] border border-border bg-card p-3 shadow-[0_24px_80px_rgba(0,31,63,0.07)] sm:rounded-[2rem]">
            <div className="rounded-[1.35rem] bg-background p-6 sm:p-8">
              <h3 className="text-xl font-semibold leading-snug tracking-[-0.045em] text-foreground sm:text-2xl">
                Fixed scope first.
              </h3>

              <p className="mt-6 text-base leading-8 text-foreground/85">
                Most product content needs should fit into one of the three
                packages. A separate quote only makes sense when the project
                clearly needs more than the package limits.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {customScopeItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-end bg-foreground/45 p-3 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
          role="dialog"
          aria-modal="true"
          onMouseDown={closeBreakdown}
        >
          <div
            className="relative max-h-[92vh] w-full overflow-hidden rounded-[1.5rem] border border-border bg-background shadow-[0_32px_120px_rgba(0,31,63,0.28)] sm:max-w-3xl sm:rounded-[2rem]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-5 py-5 backdrop-blur sm:px-8">
              <button
                type="button"
                onClick={closeBreakdown}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-foreground transition hover:opacity-75"
                aria-label="Close modal"
              >
                ×
              </button>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                What’s included
              </p>

              <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.055em] text-foreground sm:text-4xl">
                {selectedPlan.name}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {selectedPlan.bestFor}
              </p>
            </div>

            <div className="max-h-[68vh] overflow-y-auto px-5 py-5 sm:px-8 sm:py-8">
              <div className="space-y-3">
                {selectedPlan.included.map((item, index) => {
                  const isOpen = openItem === index

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setOpenItem(isOpen ? null : index)}
                      className="w-full rounded-[1.1rem] border border-border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,31,63,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                              {index + 1}
                            </span>

                            <h3 className="text-base font-semibold tracking-[-0.035em] text-foreground sm:text-lg">
                              {item.title}
                            </h3>
                          </div>

                          {isOpen && (
                            <p className="mt-4 pl-9 text-sm leading-7 text-muted-foreground sm:text-base">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <span className="mt-0.5 text-xl font-semibold text-foreground">
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedPlan.notIncluded &&
                selectedPlan.notIncluded.length > 0 && (
                  <div className="mt-6 rounded-[1.15rem] border border-border bg-secondary/50 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Not included
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedPlan.notIncluded.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppLink(selectedPlan)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Start with {selectedPlan.shortName}
                </a>

                <button
                  type="button"
                  onClick={closeBreakdown}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-card px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
                >
                  Compare packages
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}