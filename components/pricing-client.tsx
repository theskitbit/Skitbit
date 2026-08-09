'use client'

// Uses @phosphor-icons/react for icons (never hand-roll icon SVGs).
//   npm install @phosphor-icons/react

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Check, CaretLeft, CaretRight } from '@phosphor-icons/react'

type Currency = 'INR' | 'USD'
type Category = 'images' | 'video'

type IncludedItem = {
  title: string
  description: string
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
  // Images tiers: 5–6 real example stills. TODO: replace with actual
  // portfolio shots per tier at /images/pricing/<id>/1.webp ... 6.webp
  sliderImages?: string[]
  // Video tiers: one looping example clip. TODO: replace with a real
  // export at /videos/pricing/<id>.mp4 (poster falls back automatically).
  previewVideoSrc?: string
  included: IncludedItem[]
  notIncluded?: string[]
}

const FALLBACK_IMAGE = '/images/After.webp'
const fallbackSlider = Array(6).fill(FALLBACK_IMAGE)

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
    sliderImages: fallbackSlider,
    included: [
      { title: '3D model setup', description: 'Built or prepared in 3D for consistent angles.' },
      { title: '5–6 white bg renders', description: 'Full listing set, Amazon-compliant.' },
      { title: 'Marketplace-ready export', description: 'Sized for direct Seller Central upload.' },
      { title: '1 revision round', description: 'Angle, framing, or lighting corrections.' },
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
    sliderImages: fallbackSlider,
    included: [
      { title: '3D model setup', description: 'Built to a higher finish standard.' },
      { title: '4–5 grey bg renders', description: 'Styled to match your PDP aesthetic.' },
      { title: 'Hero + hover pairing', description: 'Matched pair for every product.' },
      { title: 'Brand-matched lighting', description: 'Tuned to your existing brand visuals.' },
      { title: '1 revision round', description: 'Framing, lighting, or material tweaks.' },
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
    sliderImages: fallbackSlider,
    included: [
      { title: 'Reusable 3D model', description: 'Built once, reused for future assets.' },
      { title: 'Full render set', description: 'Hero, hover, detail, in-use, scale shots.' },
      { title: 'Hero + hover across set', description: 'Consistent pairing, every slot.' },
      { title: 'One art direction', description: 'Applied across the full set.' },
      { title: '2 revision rounds', description: 'Room to refine the full set.' },
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
    sliderImages: fallbackSlider,
    included: [
      { title: 'Creative direction', description: 'Planned as a scene, not just an angle.' },
      { title: 'Full environment build', description: 'Custom scenes, not template backdrops.' },
      { title: 'Priced per image', description: 'Scoped to complexity.' },
      { title: 'Scoped revisions', description: 'Agreed upfront per project.' },
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
    previewVideoSrc: '/videos/pricing/turntable.mp4',
    included: [
      { title: '3D modelling', description: 'Skipped (and cheaper) if a model exists.' },
      { title: '360° rotation', description: 'A smooth, continuous turntable.' },
      { title: 'Marketplace export', description: 'Sized for direct Amazon upload.' },
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
    // TODO(Adnan): swap this tier's preview block for <FireworkWidget /> once
    // you share the component — see the commented slot in the render below.
    previewVideoSrc: '/videos/pricing/social-promo.mp4',
    included: [
      { title: '3D model setup', description: 'Prepared for animation.' },
      { title: 'Up to 15 sec', description: 'Camera movement, product highlights.' },
      { title: 'Simple environment', description: 'Clean, brand-relevant setting.' },
      { title: '1 revision round', description: 'Timing, framing, or pacing.' },
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
    previewVideoSrc: '/videos/pricing/full-animation.mp4',
    included: [
      { title: 'Reusable 3D model', description: 'Supports future renders too.' },
      { title: '25–30 sec animation', description: 'Full scene direction, camera movement.' },
      { title: 'Scene direction', description: 'Planned like a brand asset.' },
      { title: 'Sound-ready edit', description: 'Ready for hero sections, ads, social.' },
      { title: '2 revision rounds', description: 'After preview and direction lock.' },
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
    previewVideoSrc: '/videos/pricing/launch-video.mp4',
    included: [
      { title: 'Full creative direction', description: 'Concept, scenes, shot list.' },
      { title: 'Multi-scene animation', description: 'More than one environment, one film.' },
      { title: 'Sound design & mix', description: 'Fully finished, launch-ready.' },
      { title: 'Scoped revisions', description: 'Agreed upfront per brief.' },
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

// Real, currently-live partner/certification badges. Wrapped in a dark chip
// below since the Shopify badge asset is a white/transparent PNG that's
// invisible on a light background otherwise.
const trustBadges = [
  { src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/top%20rated%20agency.png', alt: 'Top Rated Agency' },
  { src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/meta.png', alt: 'Meta Partner' },
  { src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/69a92c79726adfa89004b8bf_Badge%20Premier%20wht%20transpSmall%20%281%29.png', alt: 'Shopify Premier Partner' },
  { src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/google.png', alt: 'Google Partner' },
]

const categoryCopy: Record<Category, { eyebrow: string; heading: string; sub: string }> = {
  images: {
    eyebrow: 'Renders',
    heading: 'Every render tier, fully laid out.',
    sub: 'Pick by where the image will live — Amazon, Shopify, or a campaign.',
  },
  video: {
    eyebrow: 'Video',
    heading: 'Every video tier, fully laid out.',
    sub: 'Pick by where it will run — a marketplace slot, a feed, or a launch.',
  },
}

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length)

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-secondary">
        <Image
          src={images[index]}
          alt={`${alt} — example ${index + 1} of ${images.length}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 560px"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous example"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next example"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show example ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-foreground' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function VideoPreview({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-secondary">
      <video
        src={src}
        poster={FALLBACK_IMAGE}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
        Example — {label}
      </span>
    </div>
  )
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
    // overflow-x-clip, not overflow-x-hidden — `hidden` creates a scroll
    // container that breaks position:sticky for descendants on mobile
    // Safari; `clip` prevents the horizontal bleed without that side effect.
    <main className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />

      {/* Minimal top — a small H1 for a11y/SEO, real content starts fast */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,230,76,0.25),transparent_46%)]" />

        <div className="relative mx-auto max-w-4xl px-4 pb-4 pt-12 text-center sm:px-6 sm:pt-16 lg:px-8">
          <h1 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Pricing
          </h1>
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 px-4 pb-8 sm:px-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.alt}
              className="flex h-9 items-center rounded-lg bg-foreground px-3.5"
            >
              <img src={badge.src} alt={badge.alt} loading="lazy" className="h-5 w-auto object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Category switcher — fixed to the bottom of the viewport, off the
          document flow entirely. Doesn't fight the Header's own sticky
          top-0 for stacking, costs zero vertical space in the content
          column, and needs no horizontal room next to anything else. Same
          behaviour on mobile and desktop. Safe-area padding for iOS. */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <div className="pointer-events-auto inline-flex rounded-full border border-border bg-card/95 p-1 shadow-[0_12px_36px_rgba(0,31,63,0.18)] backdrop-blur">
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

      {/* Section intro line */}
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl border-b border-border pb-8">
          <p className="mb-2 text-sm font-semibold text-muted-foreground">{copy.eyebrow}</p>
          <h2 className="text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-3xl">
            {copy.heading}
          </h2>
          <p className="mt-3 text-base leading-7 text-foreground/85">{copy.sub}</p>
        </div>
      </section>

      {/* One full section per tier */}
      {activePlans.map((plan, idx) => (
        <section
          key={plan.id}
          className={`border-b border-border ${idx % 2 === 1 ? 'bg-secondary/40' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            {/* Buy box + proof, side by side */}
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="lg:order-2">
                <div className="mb-3 flex flex-wrap items-center gap-2.5">
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

                <h3 className="text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.05em] text-foreground sm:text-[2.2rem]">
                  {plan.name}
                </h3>

                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-[2.7rem]">
                    {getPrice(plan)}
                  </span>
                  <span className="pb-1.5 text-sm font-semibold text-muted-foreground">starts at</span>
                </div>

                {plan.priceNote && <p className="mt-2 text-sm text-muted-foreground">{plan.priceNote}</p>}

                <p className="mt-4 max-w-md text-sm leading-7 text-foreground/80">{plan.bestFor}</p>

                <div className="mt-6">
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

              {/* "Here's what you'll get" — real proof, not a description */}
              <div className="lg:order-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Here's what you'll get
                </p>

                {plan.category === 'images' ? (
                  <ImageSlider images={plan.sliderImages ?? fallbackSlider} alt={plan.name} />
                ) : plan.id === 'social-promo' ? (
                  // TODO(Adnan): drop <FireworkWidget /> in here once you
                  // share the component — falls back to a video preview
                  // in the meantime so the section still works.
                  <VideoPreview src={plan.previewVideoSrc ?? ''} label={plan.name} />
                ) : (
                  <VideoPreview src={plan.previewVideoSrc ?? ''} label={plan.name} />
                )}
              </div>
            </div>

            {/* Checkmark cards — scannable, not paragraphs */}
            <div className="mt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What's included
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {plan.included.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-secondary/60 p-5 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                      <Check size={18} weight="bold" />
                    </div>
                    <p className="mt-3 text-sm font-medium leading-5 text-foreground">{item.title}</p>
                  </div>
                ))}
              </div>

              {plan.notIncluded && plan.notIncluded.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                  <span className="text-xs font-semibold text-muted-foreground">Not included:</span>
                  {plan.notIncluded.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground line-through decoration-muted-foreground/50"
                    >
                      {item}
                    </span>
                  ))}
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