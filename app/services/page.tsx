/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { groq } from "next-sanity"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import { servicesData } from "@/data/services-data"

type SanityImage = {
  asset?: {
    _ref?: string
    _type?: string
  }
  alt?: string
}

type ServicePage = {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  eyebrow?: string
  heroTitle?: string
  heroDescription?: string
  heroImage?: SanityImage
  _updatedAt?: string
}

type LegacyService = {
  title: string
  description: string
  problem?: string
  benefit?: string
}

const SERVICES_QUERY = groq`
  *[
    _type == "servicePage" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    eyebrow,
    heroTitle,
    heroDescription,
    heroImage,
    _updatedAt
  }
`

export const metadata: Metadata = {
  metadataBase: new URL("https://theskitbit.com"),
  title: "Services | Skitbit – 3D Product Rendering, Animation, and CGI Creative",
  description:
    "Explore Skitbit services for 3D product rendering, product animation, CGI visuals, performance creative, Shopify product visuals, and D2C launch content.",
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://theskitbit.com/services",
    title: "Services | Skitbit – 3D Product Rendering, Animation, and CGI Creative",
    description:
      "Explore Skitbit services for 3D product rendering, product animation, CGI visuals, performance creative, Shopify product visuals, and D2C launch content.",
    images: [
      {
        url: "/skien.jpg",
        width: 1200,
        height: 630,
        alt: "Skitbit Services",
      },
    ],
    siteName: "Skitbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Skitbit – 3D Product Rendering, Animation, and CGI Creative",
    description:
      "Explore Skitbit services for 3D product rendering, product animation, CGI visuals, performance creative, Shopify product visuals, and D2C launch content.",
    creator: "@skitbit",
    images: ["/skien.jpg"],
  },
}

async function getServices(): Promise<ServicePage[]> {
  try {
    const sanityServices = await client.fetch<ServicePage[]>(
      SERVICES_QUERY,
      {},
      {
        cache: "no-store",
      }
    )

    if (Array.isArray(sanityServices) && sanityServices.length > 0) {
      return sanityServices
    }

    return Object.entries(servicesData).map(([slug, service]) => {
      const legacy = service as LegacyService

      return {
        _id: `legacy-${slug}`,
        title: legacy.title,
        slug: {
          current: slug,
        },
        excerpt: legacy.description,
        heroTitle: legacy.title,
        heroDescription: legacy.description,
      }
    })
  } catch (error) {
    console.error("Failed to fetch service pages:", error)

    return Object.entries(servicesData).map(([slug, service]) => {
      const legacy = service as LegacyService

      return {
        _id: `legacy-${slug}`,
        title: legacy.title,
        slug: {
          current: slug,
        },
        excerpt: legacy.description,
        heroTitle: legacy.title,
        heroDescription: legacy.description,
      }
    })
  }
}

function getImageUrl(image?: SanityImage, width = 900, height = 700) {
  if (!image?.asset?._ref) return null

  try {
    return urlFor(image).width(width).height(height).url()
  } catch (error) {
    console.error("Failed to build service image URL:", error)
    return null
  }
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  )
}

function ServiceImage({
  service,
  width = 900,
  height = 700,
  className = "object-cover object-center",
}: {
  service: ServicePage
  width?: number
  height?: number
  className?: string
}) {
  const imageUrl = getImageUrl(service.heroImage, width, height)

  if (!imageUrl) {
    return (
      <div
        className={[
          "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(219,230,76,0.78),transparent_32%),linear-gradient(135deg,var(--secondary),var(--background))]",
          className,
        ].join(" ")}
      >
        <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          Skitbit
        </span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={service.heroImage?.alt || service.heroTitle || service.title}
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
        No service pages yet.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
        Publish your first Sanity Service Page and it will appear here
        automatically.
      </p>
    </section>
  )
}

function FeaturedService({ service }: { service: ServicePage }) {
  return (
    <article className="group mx-auto max-w-6xl rounded-[1.55rem] border border-border bg-card p-3 shadow-[0_28px_90px_rgba(0,31,63,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_38px_120px_rgba(0,31,63,0.12)] sm:rounded-[2rem] sm:p-4 lg:p-5">
      <Link
        href={`/services/${service.slug.current}`}
        className="grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-stretch"
      >
        <div className="order-1 aspect-[1.05/1] overflow-hidden rounded-[1.2rem] bg-secondary sm:aspect-[16/10] sm:rounded-[1.55rem] lg:order-2 lg:aspect-auto lg:min-h-[455px]">
          <ServiceImage
            service={service}
            width={1200}
            height={900}
            className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="order-2 flex min-h-0 flex-col px-2 pb-3 pt-1 sm:px-4 sm:pb-5 sm:pt-2 lg:order-1 lg:min-h-[455px] lg:px-5 lg:py-5">
          <div className="mb-5 flex flex-wrap items-center gap-2 lg:mb-8">
            <Pill>Featured</Pill>

            <span className="text-xs font-semibold text-muted-foreground">
              • {service.eyebrow || "Service"}
            </span>
          </div>

          <h2 className="max-w-xl text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.065em] text-foreground sm:text-[2.25rem] lg:text-[2.9rem]">
            {service.heroTitle || service.title}
          </h2>

          {(service.heroDescription || service.excerpt) && (
            <p className="mt-4 hidden max-w-xl text-sm leading-7 text-muted-foreground sm:block lg:text-base">
              {service.heroDescription || service.excerpt}
            </p>
          )}

          <div className="mt-6 hidden lg:block">
            <span className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition duration-300 group-hover:translate-x-1">
              View service
              <span className="ml-2">→</span>
            </span>
          </div>

          <div className="mt-6 border-t border-border pt-5 lg:mt-auto">
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <div>
                <p>Built for</p>
                <p className="mt-1 font-semibold text-foreground">
                  D2C & Ecommerce Brands
                </p>
              </div>

              <div className="text-right">
                <p>Studio</p>
                <p className="mt-1 font-semibold text-foreground">
                  Skitbit International
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function CompactServiceCard({ service }: { service: ServicePage }) {
  return (
    <article className="group rounded-[1.15rem] border border-border bg-card p-3 shadow-[0_18px_55px_rgba(0,31,63,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,31,63,0.09)] sm:rounded-[1.4rem]">
      <Link href={`/services/${service.slug.current}`} className="block">
        <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1">
          <div className="aspect-square overflow-hidden rounded-[0.9rem] bg-secondary sm:rounded-[1.1rem] lg:aspect-[1.25/1]">
            <ServiceImage
              service={service}
              width={800}
              height={650}
              className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
            />
          </div>

          <div className="min-w-0 py-1 lg:px-2 lg:pb-3 lg:pt-4">
            <div className="mb-2 flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <span className="truncate text-xs font-semibold text-muted-foreground">
                {service.eyebrow || "Skitbit Service"}
              </span>
            </div>

            <h3 className="overflow-hidden text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.035em] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-lg lg:text-2xl lg:leading-[1.16] lg:tracking-[-0.055em]">
              {service.heroTitle || service.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex justify-between gap-4 text-xs text-muted-foreground">
            <div className="min-w-0">
              <p className="truncate">
                For{" "}
                <span className="font-semibold text-foreground">
                  premium product brands
                </span>
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p>
                View{" "}
                <span className="font-semibold text-foreground">
                  service →
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

function FinalServicesCTA() {
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
            We help product brands look premium before the customer ever touches
            the product.
          </h2>
        </div>

        <div className="rounded-[1.65rem] border border-border bg-card p-3 shadow-[0_24px_80px_rgba(0,31,63,0.07)] sm:rounded-[2rem]">
          <div className="rounded-[1.35rem] bg-background p-6 sm:p-8">
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.045em] text-foreground sm:text-2xl">
              Need a custom visual system for your product?
            </h3>

            <p className="mt-8 text-base leading-8 text-foreground/85">
              Tell us what you’re launching, what assets you need, and where the
              visuals will be used. We’ll suggest the fastest production path.
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

export default async function ServicesPage() {
  const services = await getServices()

  const featuredService = services[0]
  const freshServices = services.slice(1, 5)
  const moreServices = services.slice(5, 9)

  const fallbackMoreServices =
    moreServices.length > 0 ? moreServices : services.slice(1, 4)

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
              Services for D2C founders & brand teams
            </div>

            <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.08em] text-foreground sm:text-[4.25rem] lg:text-[5.25rem]">
              Better product visuals. Sharper ads. Stronger launches.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-8 text-muted-foreground sm:text-lg">
              Explore Skitbit services for 3D product rendering, product
              animation, CGI ads, Shopify visuals, and performance creative
              systems.
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
            {services.length === 0 ? (
              <EmptyState />
            ) : (
              featuredService && <FeaturedService service={featuredService} />
            )}
          </div>
        </div>
      </section>

      {freshServices.length > 0 && (
        <section
          id="fresh-services"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        >
          <SectionIntro
            title="Core Services, Built for Product Brands."
            body="Each service is designed to improve how your product looks, sells, and performs across ecommerce pages, paid ads, and launch campaigns."
            linkLabel="Start a project"
            linkHref="/contact-form"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {freshServices.map((service) => (
              <CompactServiceCard key={service._id} service={service} />
            ))}
          </div>
        </section>
      )}

      {fallbackMoreServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionIntro
            title="Handpicked for Premium Product Perception."
            body="Use these services when your brand needs better product pages, stronger campaign visuals, cleaner launch assets, and more scroll-stopping ads."
            linkLabel="Talk to us"
            linkHref="/contact-form"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {fallbackMoreServices.map((service) => (
              <CompactServiceCard key={service._id} service={service} />
            ))}
          </div>
        </section>
      )}

      <FinalServicesCTA />

      <Footer />
    </main>
  )
}
