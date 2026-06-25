/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import type { ReactNode } from "react"
import { groq } from "next-sanity"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"

type SanityImage = {
  asset?: {
    _ref?: string
    _type?: string
  }
  alt?: string
}

type LocationPage = {
  _id: string
  pageTitle?: string
  title?: string
  slug: {
    current: string
  }
  seoDescription?: string
  heroTitle?: string
  heroSubtitle?: string
  locationName?: string
  serviceName?: string
  ctaTitle?: string
  ctaDescription?: string
  heroImage?: SanityImage
  image?: SanityImage
  _updatedAt?: string
}

const LOCATIONS_QUERY = groq`
  *[
    _type == "location" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ] | order(coalesce(locationName, pageTitle, heroTitle, slug.current) asc) {
    _id,
    pageTitle,
    title,
    slug,
    seoDescription,
    heroTitle,
    heroSubtitle,
    locationName,
    serviceName,
    ctaTitle,
    ctaDescription,
    heroImage,
    image,
    _updatedAt
  }
`

export const metadata = {
  title: "Locations | Skitbit",
  description:
    "Explore Skitbit location pages for 3D product rendering, CGI visuals, product animation, ecommerce visuals, and premium D2C creative services.",
}

async function getLocations(): Promise<LocationPage[]> {
  try {
    const locations = await client.fetch<LocationPage[]>(
      LOCATIONS_QUERY,
      {},
      {
        cache: "no-store",
      }
    )

    return Array.isArray(locations) ? locations : []
  } catch (error) {
    console.error("Failed to fetch location pages:", error)
    return []
  }
}

function getImageUrl(image?: SanityImage, width = 900, height = 700) {
  if (!image?.asset?._ref) return null

  try {
    return urlFor(image).width(width).height(height).url()
  } catch (error) {
    console.error("Failed to build location image URL:", error)
    return null
  }
}

function getLocationTitle(location: LocationPage) {
  return (
    location.heroTitle ||
    location.pageTitle ||
    location.title ||
    location.locationName ||
    "Skitbit Location"
  )
}

function getLocationDescription(location: LocationPage) {
  return (
    location.heroSubtitle ||
    location.seoDescription ||
    location.ctaDescription ||
    `Premium ${location.serviceName || "3D product visuals"} for brands in ${
      location.locationName || "this market"
    }.`
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  )
}

function LocationImage({
  location,
  width = 900,
  height = 700,
  className = "object-cover object-center",
}: {
  location: LocationPage
  width?: number
  height?: number
  className?: string
}) {
  const imageUrl =
    getImageUrl(location.heroImage, width, height) ||
    getImageUrl(location.image, width, height)

  if (!imageUrl) {
    return (
      <div
        className={[
          "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(219,230,76,0.78),transparent_32%),linear-gradient(135deg,var(--secondary),var(--background))]",
          className,
        ].join(" ")}
      >
        <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          {location.locationName || "Skitbit"}
        </span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={
        location.heroImage?.alt ||
        location.image?.alt ||
        getLocationTitle(location)
      }
      className={["h-full w-full", className].join(" ")}
    />
  )
}

function EmptyState() {
  return (
    <section className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-card px-6 py-14 text-center shadow-[0_24px_80px_rgba(0,31,63,0.06)] sm:rounded-[2rem]">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
        ✦
      </div>

      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
        No location pages yet.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
        Publish your first Sanity Location Page and it will appear here
        automatically.
      </p>
    </section>
  )
}

function FeaturedLocation({ location }: { location: LocationPage }) {
  return (
    <article className="group mx-auto max-w-6xl rounded-[1.55rem] border border-border bg-card p-3 shadow-[0_28px_90px_rgba(0,31,63,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_38px_120px_rgba(0,31,63,0.12)] sm:rounded-[2rem] sm:p-4 lg:p-5">
      <Link
        href={`/locations/${location.slug.current}`}
        className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-stretch"
      >
        <div className="order-1 aspect-[1.05/1] overflow-hidden rounded-[1.2rem] bg-secondary sm:aspect-[16/10] sm:rounded-[1.55rem] lg:order-2 lg:aspect-auto lg:min-h-[455px]">
          <LocationImage
            location={location}
            width={1200}
            height={900}
            className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="order-2 flex min-h-0 flex-col px-2 pb-3 pt-1 sm:px-4 sm:pb-5 sm:pt-2 lg:order-1 lg:min-h-[455px] lg:px-5 lg:py-5">
          <div className="mb-5 flex flex-wrap items-center gap-2 lg:mb-8">
            <Pill>Featured</Pill>

            <span className="text-xs font-semibold text-muted-foreground">
              • {location.locationName || "Location"}
            </span>

            <span className="text-xs font-semibold text-muted-foreground">
              • {location.serviceName || "3D Product Visuals"}
            </span>
          </div>

          <h2 className="max-w-xl text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.065em] text-foreground sm:text-[2.25rem] lg:text-[2.9rem]">
            {getLocationTitle(location)}
          </h2>

          <p className="mt-4 hidden max-w-xl text-sm leading-7 text-muted-foreground sm:block lg:text-base">
            {getLocationDescription(location)}
          </p>

          <div className="mt-6 hidden lg:block">
            <span className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition duration-300 group-hover:translate-x-1">
              View location
              <span className="ml-2">→</span>
            </span>
          </div>

          <div className="mt-6 border-t border-border pt-5 lg:mt-auto">
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <div>
                <p>Market</p>
                <p className="mt-1 font-semibold text-foreground">
                  {location.locationName || "Global"}
                </p>
              </div>

              <div className="text-right">
                <p>Service</p>
                <p className="mt-1 font-semibold text-foreground">
                  {location.serviceName || "Creative Production"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function CompactLocationCard({ location }: { location: LocationPage }) {
  return (
    <article className="group rounded-[1.15rem] border border-border bg-card p-3 shadow-[0_18px_55px_rgba(0,31,63,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,31,63,0.09)] sm:rounded-[1.4rem]">
      <Link href={`/locations/${location.slug.current}`} className="block">
        <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1">
          <div className="aspect-square overflow-hidden rounded-[0.9rem] bg-secondary sm:rounded-[1.1rem] lg:aspect-[1.25/1]">
            <LocationImage
              location={location}
              width={800}
              height={650}
              className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
            />
          </div>

          <div className="min-w-0 py-1 lg:px-2 lg:pb-3 lg:pt-4">
            <div className="mb-2 flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <span className="truncate text-xs font-semibold text-muted-foreground">
                {location.locationName || "Location"}
              </span>

              <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                •
              </span>

              <span className="truncate text-xs font-semibold text-muted-foreground">
                {location.serviceName || "3D Visuals"}
              </span>
            </div>

            <h3 className="overflow-hidden text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.035em] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-lg lg:text-2xl lg:leading-[1.16] lg:tracking-[-0.055em]">
              {getLocationTitle(location)}
            </h3>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex justify-between gap-4 text-xs text-muted-foreground">
            <div className="min-w-0">
              <p className="truncate">
                For{" "}
                <span className="font-semibold text-foreground">
                  product brands
                </span>
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p>
                View{" "}
                <span className="font-semibold text-foreground">
                  market →
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function SectionIntro({
  eyebrow,
  title,
  body,
  linkLabel,
  linkHref = "/contact-form",
}: {
  eyebrow?: string
  title: string
  body: string
  linkLabel: string
  linkHref?: string
}) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          {eyebrow}
        </p>
      )}

      <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.07em] text-foreground sm:text-5xl">
        {title}
      </h2>

      <p className="mt-6 text-base leading-8 text-foreground/85 sm:text-lg">
        {body}
      </p>

      <Link
        href={linkHref}
        className="mt-6 inline-flex items-center gap-3 text-xl font-semibold tracking-[-0.04em] text-foreground transition hover:opacity-75"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
          +
        </span>
        {linkLabel}
      </Link>
    </div>
  )
}

function FinalLocationsCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/20 text-xs">
              ?
            </span>
            Why Skitbit
          </div>

          <h2 className="max-w-3xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.06em] text-foreground sm:text-5xl">
            We create premium product visuals for brands selling across markets.
          </h2>
        </div>

        <div className="rounded-[1.65rem] border border-border bg-card p-3 shadow-[0_24px_80px_rgba(0,31,63,0.07)] sm:rounded-[2rem]">
          <div className="rounded-[1.35rem] bg-background p-6 sm:p-8">
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.045em] text-foreground sm:text-2xl">
              Need a location-specific landing page or visual campaign?
            </h3>

            <p className="mt-8 text-base leading-8 text-foreground/85">
              Tell us which market you are targeting and what product visuals
              you need. We’ll help shape the right creative direction.
            </p>

            <Link
              href="/contact-form"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-foreground px-6 py-4 text-sm font-semibold text-background transition hover:opacity-90 sm:w-auto"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function LocationsPage() {
  const locations = await getLocations()

  const featuredLocation = locations[0]
  const freshLocations = locations.slice(1, 5)
  const moreLocations = locations.slice(5, 9)

  const fallbackMoreLocations =
    moreLocations.length > 0 ? moreLocations : locations.slice(1, 4)

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,230,76,0.26),transparent_42%)] sm:h-[560px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-7 hidden max-w-full items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur sm:inline-flex">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs">
                ✦
              </span>
              Location pages for premium product brands
            </div>

            <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.08em] text-foreground sm:text-[4.25rem] lg:text-[5.25rem]">
              Premium product visuals for every market you sell in.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
              Explore Skitbit location pages for 3D product rendering, CGI ads,
              product animation, ecommerce visuals, and launch content across
              different markets.
            </p>

            <div className="mt-7 flex items-center justify-center gap-1.5 text-primary">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            {locations.length === 0 ? (
              <EmptyState />
            ) : (
              featuredLocation && (
                <FeaturedLocation location={featuredLocation} />
              )
            )}
          </div>
        </div>
      </section>

      {freshLocations.length > 0 && (
        <section
          id="fresh-locations"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionIntro
            title="Market Pages, Built for Search and Conversion."
            body="Each location page helps brands discover Skitbit for a specific service, city, or market while keeping the design sharp and premium."
            linkLabel="Start a project"
            linkHref="/contact-form"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {freshLocations.map((location) => (
              <CompactLocationCard key={location._id} location={location} />
            ))}
          </div>
        </section>
      )}

      {fallbackMoreLocations.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionIntro
            title="Handpicked for Brands Expanding Across Markets."
            body="Use these pages to support local search demand, brand discovery, and lead generation for product rendering, animation, and CGI creative services."
            linkLabel="Talk to us"
            linkHref="/contact-form"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {fallbackMoreLocations.map((location) => (
              <CompactLocationCard key={location._id} location={location} />
            ))}
          </div>
        </section>
      )}

      <FinalLocationsCTA />

      <Footer />
    </main>
  )
}