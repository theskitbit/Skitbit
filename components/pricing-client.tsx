'use client'

// NOTE: uses @phosphor-icons/react for the quick-fact glyphs (per design-system
// convention — never hand-roll icon SVGs). If not already a dependency:
//   npm install @phosphor-icons/react

import { useEffect, useMemo, useState, type ElementType } from 'react'
import Image from 'next/image'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Cube,
  ImagesSquare,
  ArrowsClockwise,
  SealCheck,
  FilmStrip,
  PaintBrush,
  MusicNotes,
  Tag,
} from '@phosphor-icons/react'

type Currency = 'INR' | 'USD'
type Category = 'images' | 'video'

type IncludedItem = {
  title: string
  description: string
}

type QuickFact = {
  icon: ElementType
  label: string
}

type PricingPlan = {
  id: string
  category: Category
  eyebrow: string
  name: string
  description: string
  priceInr: string
  priceUsd: string
  priceNote?: string
  cta: string
  intent: string
  featured?: boolean
  bestFor: string
  // TODO: swap in a real still from Adnan's portfolio for each tier.
  // Suggested files (4:3, min 1200px wide): /images/pricing/<id>.webp
  // Falls back to the existing hero visual until those exist.
  imageSrc: string
  imageAlt: string
  quickFacts: QuickFact[]
  included: IncludedItem[]
  notIncluded?: string[]
}

const FALLBACK_IMAGE = '/images/After.webp'

const plans: PricingPlan[] = [
  // ---------- IMAGES ----------
  {
    id: 'amazon-renders',
    category: 'images',
    eyebrow: 'Amazon',
    name: 'Amazon Listing Renders',
    description: 'White background renders built for marketplace compliance.',
    priceInr: '₹25,000',
    priceUsd: '$300',
    cta: 'Get Listing Renders',
    intent: 'We need white background Amazon listing renders.',
    bestFor:
      'For brands that need a compliant, complete Amazon listing image set — clean white background, marketplace-ready.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example Amazon-ready white background product render',
    quickFacts: [
      { icon: Cube, label: '3D model included' },
      { icon: ImagesSquare, label: '5–6 renders' },
      { icon: ArrowsClockwise, label: '1 revision round' },
      { icon: SealCheck, label: 'Fixed price' },
    ],
    included: [
      {
        title: '3D model setup',
        description:
          'Your product is built or prepared in 3D so every angle stays consistent across the listing.',
      },
      {
        title: '5–6 white background renders',
        description:
          'A complete listing set — front, angle, top, detail, and back views, all Amazon-compliant.',
      },
      {
        title: 'Marketplace-ready export',
        description: 'Sized and formatted for direct upload to Amazon Seller Central.',
      },
      {
        title: '1 minor revision round',
        description: 'Small corrections to angle, framing, label placement, or lighting.',
      },
    ],
    notIncluded: ['Branded grey background', 'Hero/hover pairing', 'Lifestyle scene', 'Video'],
  },
  {
    id: 'shopify-renders',
    category: 'images',
    eyebrow: 'Shopify',
    name: 'Shopify Brand Renders',
    description: 'Branded grey background renders with consistent hero and hover pairs.',
    priceInr: '₹35,000',
    priceUsd: '$420',
    cta: 'Get Started',
    intent: 'We need branded grey background renders for Shopify with hero and hover images.',
    featured: true,
    bestFor:
      'For D2C brands that need a stronger, more consistent brand look than Amazon requires — hero and hover pairs included.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example branded grey background render with hero and hover pairing',
    quickFacts: [
      { icon: Cube, label: '3D model included' },
      { icon: ImagesSquare, label: '4–5 renders' },
      { icon: Tag, label: 'Hero + hover pairing' },
      { icon: ArrowsClockwise, label: '1 revision round' },
    ],
    included: [
      {
        title: '3D model setup',
        description:
          'Your product is built to a higher finish standard, since Shopify visuals carry more brand weight than marketplace listings.',
      },
      {
        title: '4–5 grey background renders',
        description:
          'A brand-consistent set — not just clean, but styled to match your product page aesthetic.',
      },
      {
        title: 'Hero + hover image pairing',
        description:
          'Each product gets a matched hero and hover render, so your PDP grid looks consistent across the whole catalog.',
      },
      {
        title: 'Brand-consistent lighting & material pass',
        description:
          'Reflections, shadows, and finish are tuned to match your existing brand visuals, not generic studio lighting.',
      },
      {
        title: '1 minor revision round',
        description: 'Corrections to framing, lighting, or material tweaks.',
      },
    ],
    notIncluded: ['Full PDP set', 'Lifestyle/environment scene', 'Video'],
  },
  {
    id: 'full-pdp',
    category: 'images',
    eyebrow: 'Shopify',
    name: 'Full PDP Listing',
    description: 'Complete Shopify product page visual set, brand-consistent end to end.',
    priceInr: '₹55,000',
    priceUsd: '$660',
    cta: 'Get Full Listing',
    intent: 'We need a full Shopify PDP listing image set.',
    bestFor:
      'For brands that want their entire product page — not just a few renders — to look like one cohesive shoot.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example of a complete brand-consistent Shopify PDP render set',
    quickFacts: [
      { icon: Cube, label: 'Reusable 3D model' },
      { icon: ImagesSquare, label: 'Full render set' },
      { icon: Tag, label: 'Hero + hover across set' },
      { icon: ArrowsClockwise, label: '2 revision rounds' },
    ],
    included: [
      {
        title: 'Reusable 3D model setup',
        description: 'Built once, reused across every image and future asset for this product.',
      },
      {
        title: 'Full listing render set',
        description:
          'Every angle your PDP needs — hero, hover, detail, in-use, and scale shots — all matching in lighting and finish.',
      },
      {
        title: 'Hero + hover pairing across the set',
        description: 'Consistent pairing for every product image slot on the page.',
      },
      {
        title: 'Brand-consistent art direction',
        description: 'One creative direction applied across the full set so nothing feels stitched together.',
      },
      {
        title: '2 minor revision rounds',
        description: 'Room to refine framing, lighting, and finish across the full set.',
      },
    ],
    notIncluded: ['Lifestyle/environment scene', 'Video'],
  },
  {
    id: 'campaign-visuals',
    category: 'images',
    eyebrow: 'Campaign',
    name: 'Campaign Visuals',
    description: 'High-end, multi-angle renders in full environments with creative direction.',
    priceInr: '₹8,000–10,000',
    priceUsd: '$95–120',
    priceNote: 'per image',
    cta: 'Discuss Campaign',
    intent: 'We need high-end campaign visuals with environments and creative direction.',
    bestFor:
      'For launches, ad campaigns, and hero content that needs full environments, not just product-on-background.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example high-end campaign render with full environment',
    quickFacts: [
      { icon: PaintBrush, label: 'Creative direction' },
      { icon: Cube, label: 'Custom environment' },
      { icon: Tag, label: 'Priced per image' },
      { icon: ArrowsClockwise, label: 'Scoped revisions' },
    ],
    included: [
      {
        title: 'Creative direction per image',
        description:
          'Each render is planned as a scene — environment, mood, and story, not just an angle change.',
      },
      {
        title: 'Full environment builds',
        description: 'Custom scenes designed around your brand, not template backdrops.',
      },
      {
        title: 'Priced per image',
        description:
          'Scope varies by complexity, so campaign work is quoted per render rather than as a fixed bundle.',
      },
      {
        title: 'Revision rounds scoped per project',
        description: 'Agreed upfront based on scene complexity.',
      },
    ],
  },

  // ---------- VIDEO ----------
  {
    id: 'turntable',
    category: 'video',
    eyebrow: 'Amazon',
    name: 'Turntable Video',
    description: 'Simple 360° turntable video for the Amazon video slot.',
    priceInr: '₹10,000',
    priceUsd: '$120',
    priceNote: '₹8,000 if model already exists',
    cta: 'Get Turntable',
    intent: 'We need a simple turntable video for Amazon.',
    bestFor:
      'For sellers who need the Amazon video slot filled with a clean, simple rotating product shot.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example 360 degree turntable product video frame',
    quickFacts: [
      { icon: FilmStrip, label: '360° turntable' },
      { icon: Cube, label: 'Model incl. (or reused)' },
      { icon: SealCheck, label: 'Marketplace-ready export' },
    ],
    included: [
      {
        title: '3D modelling (if needed)',
        description:
          'If you already have a model from a prior render order, this step is skipped and priced lower.',
      },
      {
        title: '360° turntable animation',
        description: 'A smooth, continuous product rotation.',
      },
      {
        title: 'Marketplace-ready export',
        description: 'Sized and formatted for direct Amazon upload.',
      },
    ],
    notIncluded: ['Scene/environment', 'Camera movement', 'Sound design'],
  },
  {
    id: 'social-promo',
    category: 'video',
    eyebrow: 'Social',
    name: 'Social Promo Animation',
    description: 'Product animation built for reels, stories, and social ads.',
    priceInr: '₹55,000',
    priceUsd: '$660',
    priceNote: 'up to ~15 sec',
    cta: 'Get Started',
    intent: 'We need a social media product promo animation.',
    bestFor:
      'For brands running paid social or organic content that needs a short, scroll-stopping product animation.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example still from a social product promo animation',
    quickFacts: [
      { icon: FilmStrip, label: 'Up to 15 sec' },
      { icon: Cube, label: '3D model included' },
      { icon: PaintBrush, label: 'Simple environment' },
      { icon: ArrowsClockwise, label: '1 revision round' },
    ],
    included: [
      {
        title: '3D model setup',
        description: 'Prepared for animation, not just static renders.',
      },
      {
        title: 'Up to 15 sec product animation',
        description: 'Camera movement and product highlights suited to a social feed.',
      },
      {
        title: 'Simple environment',
        description: 'A clean, brand-relevant setting — not a full campaign scene.',
      },
      {
        title: '1 minor revision round',
        description: 'Adjustments to timing, framing, or pacing.',
      },
    ],
    notIncluded: ['Full campaign scene design', 'Sound-ready final mix'],
  },
  {
    id: 'full-animation',
    category: 'video',
    eyebrow: 'Brand',
    name: 'Full Product Animation',
    description: 'A proper hero brand video, longer and more directed than a social cut.',
    priceInr: '₹75,000',
    priceUsd: '$900',
    priceNote: '25–30 sec',
    cta: 'Get Started',
    intent: 'We need a full product animation, 25-30 seconds.',
    featured: true,
    bestFor:
      'For brands that want one strong hero video reusable across the website, ads, and launch posts.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example still from a full 25 to 30 second product animation',
    quickFacts: [
      { icon: FilmStrip, label: '25–30 sec' },
      { icon: Cube, label: 'Reusable 3D model' },
      { icon: MusicNotes, label: 'Sound-ready edit' },
      { icon: ArrowsClockwise, label: '2 revision rounds' },
    ],
    included: [
      {
        title: 'Reusable 3D model setup',
        description: 'Built to support both this video and future renders from the same asset.',
      },
      {
        title: '25–30 sec animation',
        description: 'Full scene direction, camera movement, and product highlights.',
      },
      {
        title: 'Scene design and animation direction',
        description: 'Planned like a proper brand asset, not a rotating product clip.',
      },
      {
        title: 'Music/sound-ready final edit',
        description: 'Delivered ready for website hero sections, ads, and social.',
      },
      {
        title: '2 minor revision rounds',
        description: 'Refinement after preview and final direction lock.',
      },
    ],
  },
  {
    id: 'launch-video',
    category: 'video',
    eyebrow: 'Launch',
    name: 'Product Launch Video',
    description: 'Full launch creative — multi-scene, campaign-grade direction.',
    priceInr: '₹1,60,000',
    priceUsd: '$1,930',
    cta: 'Discuss Launch',
    intent: 'We need a full product launch video.',
    bestFor:
      'For a real product launch moment — multiple scenes, full creative direction, campaign-level polish.',
    imageSrc: FALLBACK_IMAGE,
    imageAlt: 'Example still from a multi-scene product launch film',
    quickFacts: [
      { icon: FilmStrip, label: 'Multi-scene film' },
      { icon: PaintBrush, label: 'Full creative direction' },
      { icon: MusicNotes, label: 'Sound design & mix' },
      { icon: ArrowsClockwise, label: 'Scoped revisions' },
    ],
    included: [
      {
        title: 'Full creative direction',
        description: 'Concept, scene breakdown, and shot list built around your launch story.',
      },
      {
        title: 'Multi-scene animation',
        description: 'More than one environment or setup, edited into a single launch film.',
      },
      {
        title: 'Sound design & final mix',
        description: 'Fully finished, launch-ready edit.',
      },
      {
        title: 'Revision rounds scoped per project',
        description: 'Agreed upfront based on the launch brief.',
      },
    ],
  },
]

const customScopeItems = [
  'Multiple products or bundles',
  'More than one stylized scene',
  'Animation longer than 30 seconds',
  'Advanced glass, liquid, fabric, or mechanical detail',
  'Multiple ad cutdowns or campaign versions',
  'Full launch creative direction',
]

// Real, currently-live partner/certification badges (same assets used
// sitewide) — reused here as a pre-purchase trust strip, PDP-style.
const trustBadges = [
  {
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/top%20rated%20agency.png',
    alt: 'Top Rated Agency',
  },
  {
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/meta.png',
    alt: 'Meta Partner',
  },
  {
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/69a92c79726adfa89004b8bf_Badge%20Premier%20wht%20transpSmall%20%281%29.png',
    alt: 'Shopify Premier Partner',
  },
  {
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/google.png',
    alt: 'Google Partner',
  },
]

const categoryCopy: Record<Category, { eyebrow: string; heading: string; sub: string }> = {
  images: {
    eyebrow: 'Renders',
    heading: 'Every render tier, fully laid out.',
    sub: 'Amazon needs compliant white-background listings. Shopify needs a consistent brand look. Campaigns need full environments. Scroll through and pick by where the image will live.',
  },
  video: {
    eyebrow: 'Video',
    heading: 'Every video tier, fully laid out.',
    sub: 'A turntable fills the Amazon slot. A promo cut works for social. A full animation or launch film carries the brand.',
  },
}

export function PricingContent() {
  const [currency, setCurrency] = useState<Currency>('INR')
  const [category, setCategory] = useState<Category>('images')

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

  const activePlans = useMemo(() => plans.filter((plan) => plan.category === category), [category])

  const getPrice = (plan: PricingPlan) => (currency === 'INR' ? plan.priceInr : plan.priceUsd)

  const getWhatsAppLink = (plan: PricingPlan) => {
    const message = encodeURIComponent(
      `Hey, I'm interested in the ${plan.name} (${getPrice(plan)}${
        plan.priceNote ? `, ${plan.priceNote}` : ''
      }). ${plan.intent}`
    )
    return `https://wa.me/918384092211?text=${message}`
  }

  const copy = categoryCopy[category]

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      {/* Hero — text only, no interactive controls trapped in here */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,230,76,0.3),transparent_46%)]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-24 text-center sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">
          <h1 className="text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.09em] text-foreground sm:text-[4.6rem] lg:text-[5.6rem]">
            Simple pricing. No guesswork.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
            Renders for Amazon and Shopify, campaign visuals, and product
            animation — every tier, fully broken down below.
          </p>
        </div>

        {/* Trust strip — real certification badges, functions as a
            pre-purchase credibility check before the buyer reads a single tier. */}
        <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 pb-10 sm:px-6">
          {trustBadges.map((badge) => (
            <img
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              loading="lazy"
              className="h-7 w-auto object-contain opacity-80 sm:h-8"
            />
          ))}
        </div>
      </section>

      {/* Sticky category switcher — its own full-width bar, outside any
          overflow-hidden ancestor, so it stays pinned for the entire scroll
          instead of disappearing once you leave the hero. If <Header /> is
          itself position:sticky/fixed, bump `top-0` below to match its
          height so the two bars don't overlap. */}
      <div className="sticky top-0 z-40 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-3 sm:px-6 lg:px-8">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {(['images', 'video'] as Category[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition ${
                  category === cat
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat === 'images' ? 'Images' : 'Video'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section intro line */}
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl border-b border-border pb-10">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">{copy.eyebrow}</p>
          <h2 className="text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.06em] text-foreground sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/85">{copy.sub}</p>
        </div>
      </section>

      {/* One full section per tier — image + buy box up top (PDP pattern),
          full breakdown below. Nothing behind a click. */}
      {activePlans.map((plan, idx) => (
        <section
          key={plan.id}
          className={`border-b border-border ${idx % 2 === 1 ? 'bg-secondary/40' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            {/* Image + buy box */}
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-secondary lg:order-1">
                <Image
                  src={plan.imageSrc}
                  alt={plan.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>

              <div className="lg:order-2">
                <div className="mb-4 flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {String(idx + 1).padStart(2, '0')} / {String(activePlans.length).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">·</span>
                  <span className="text-xs font-semibold text-muted-foreground">{plan.eyebrow}</span>
                  {plan.featured && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-foreground">
                      Most chosen
                    </span>
                  )}
                </div>

                <h3 className="text-[1.9rem] font-semibold leading-[1.06] tracking-[-0.06em] text-foreground sm:text-[2.5rem]">
                  {plan.name}
                </h3>

                <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-7 flex items-end gap-3">
                  <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.07em] text-foreground sm:text-[3rem]">
                    {getPrice(plan)}
                  </span>
                  <span className="pb-1.5 text-sm font-semibold text-muted-foreground">starts at</span>
                </div>

                {plan.priceNote && (
                  <p className="mt-2 text-sm text-muted-foreground">{plan.priceNote}</p>
                )}

                {/* Quick facts — icon row, scan the whole tier in one glance,
                    same job as "free shipping / secure checkout" badges on a PDP. */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {plan.quickFacts.map((fact) => {
                    const Icon = fact.icon
                    return (
                      <span
                        key={fact.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/80"
                      >
                        <Icon size={14} weight="bold" />
                        {fact.label}
                      </span>
                    )
                  })}
                </div>

                <p className="mt-6 max-w-md text-sm leading-7 text-foreground/80">{plan.bestFor}</p>

                <div className="mt-7">
                  <a
                    href={getWhatsAppLink(plan)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-90"
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </div>

            {/* Full breakdown — kept inline, no accordion */}
            <div className="mt-12 border-t border-border pt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What's included
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {plan.included.map((item) => (
                  <div key={item.title} className="rounded-[1.1rem] border border-border bg-card p-5">
                    <p className="text-sm font-semibold leading-6 text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>

              {plan.notIncluded && plan.notIncluded.length > 0 && (
                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Not included
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {plan.notIncluded.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-muted-foreground line-through decoration-muted-foreground/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Bundle cross-sell */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-border bg-[linear-gradient(135deg,rgba(219,230,76,0.12),transparent)] p-6 sm:flex-row sm:items-center sm:rounded-[1.75rem] sm:p-8">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Bundle & save</p>
            <h3 className="mt-2 max-w-xl text-xl font-semibold leading-[1.2] tracking-[-0.04em] text-foreground sm:text-2xl">
              Need renders and a video for the same product? Bundle both from one
              3D setup.
            </h3>
          </div>

          <a
            href="https://wa.me/918384092211?text=I'd%20like%20to%20bundle%20renders%20and%20video%20for%20one%20product%20to%20save%20on%20a%20shared%203D%20setup."
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Ask About Bundling
          </a>
        </div>
      </section>

      {/* Custom scope */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
              Custom scope
            </div>
            <h2 className="max-w-3xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.06em] text-foreground sm:text-5xl">
              Custom quotes are only for work outside the fixed tiers.
            </h2>
          </div>

          <div className="rounded-[1.65rem] border border-border bg-card p-3 shadow-[0_24px_80px_rgba(0,31,63,0.07)] sm:rounded-[2rem]">
            <div className="rounded-[1.35rem] bg-background p-6 sm:p-8">
              <h3 className="text-xl font-semibold leading-snug tracking-[-0.045em] text-foreground sm:text-2xl">
                Fixed scope first.
              </h3>

              <p className="mt-3 leading-8 text-muted-foreground">
                We start with our fixed tiers to keep everything simple and
                transparent. Custom scope is only when something can't be covered
                by the tiers above.
              </p>

              <ul className="mt-6 space-y-2.5">
                {customScopeItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm leading-7 text-foreground/85">
                    <span className="shrink-0 text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(219,230,76,0.1),transparent)] p-5 sm:rounded-[2.2rem] sm:p-8">
          <h2 className="max-w-2xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.06em] text-foreground sm:text-4xl">
            Know exactly what you're getting.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            No hourly rates. No surprises. We price fixed tiers based on scope and
            complexity. You get clear deliverables. We stay committed to that scope.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/918384092211?text=I%20want%20to%20discuss%20pricing%20for%20a%203D%20product%20rendering%20project."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Get a Quote
            </a>

            <a
              href="/works"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              See the Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}