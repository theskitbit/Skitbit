import { LocationLandingTemplate } from "@/components/templates/location-landing-template"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { client } from "@/lib/sanity/client"
import {
  SERVICE_PAGE_BY_SLUG_QUERY,
  SERVICE_PAGE_SLUGS_QUERY,
} from "@/lib/sanity/queries"
import { servicesData } from "@/data/services-data"

export const revalidate = 60
export const dynamicParams = true

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type FAQ = {
  question: string
  answer: string
}

type ServiceHighlight = {
  title?: string
  description?: string
}

type SanityServicePage = {
  _id: string
  title?: string
  slug?: {
    current?: string
  }
  excerpt?: string
  eyebrow?: string
  heroTitle?: string
  heroDescription?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  serviceHighlights?: ServiceHighlight[]
  faqs?: FAQ[]
  seoTitle?: string
  seoDescription?: string
  _updatedAt?: string
}

type LegacyService = {
  title: string
  description: string
  problem: string
  benefit: string
}

async function getSanityServicePage(slug: string) {
  try {
    const page = await client.fetch<SanityServicePage | null>(
      SERVICE_PAGE_BY_SLUG_QUERY,
      {
        slug,
      },
      {
        next: {
          revalidate: 60,
        },
      }
    )

    return page
  } catch (error) {
    console.error("Failed to fetch Sanity service page:", error)
    return null
  }
}

function serviceTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function sanityServiceToLocationTemplate(page: SanityServicePage, slug: string) {
  const serviceName = page.title || page.heroTitle || serviceTitleFromSlug(slug)

  return {
    slug,
    pageTitle: page.title || serviceName,
    heroTitle: page.heroTitle || page.title || serviceName,
    heroSubtitle:
      page.heroDescription ||
      page.excerpt ||
      "Premium 3D rendering, CGI visuals, and product animation services by Skitbit.",
    locationName: "Global",
    serviceName,
    ctaTitle: `Ready to create premium ${serviceName.toLowerCase()} visuals?`,
    ctaDescription:
      page.excerpt ||
      page.heroDescription ||
      "Let’s build product visuals that make your brand look sharper, cleaner, and more premium.",
    faqs: Array.isArray(page.faqs) ? page.faqs : [],
  }
}

function legacyServiceToLocationTemplate(
  service: LegacyService,
  slug: string
) {
  return {
    slug,
    pageTitle: service.title,
    heroTitle: service.title,
    heroSubtitle: service.description,
    locationName: "Global",
    serviceName: service.title,
    ctaTitle: "Ready to Scale Your Creatives?",
    ctaDescription:
      "Let’s build high-performance product visuals that drive conversions and scale your growth.",
    faqs: [
      {
        question: `What is ${service.title}?`,
        answer: service.description,
      },
      {
        question: "What problem does this solve?",
        answer: service.problem,
      },
      {
        question: "What is the main benefit?",
        answer: service.benefit,
      },
    ],
  }
}

export async function generateStaticParams() {
  const legacySlugs = Object.keys(servicesData)

  let sanitySlugs: string[] = []

  try {
    const result = await client.fetch<string[]>(SERVICE_PAGE_SLUGS_QUERY)

    sanitySlugs = Array.isArray(result) ? result : []
  } catch (error) {
    console.error("Failed to fetch service page slugs:", error)
  }

  const allSlugs = Array.from(new Set([...legacySlugs, ...sanitySlugs]))

  return allSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const sanityPage = await getSanityServicePage(slug)

  if (sanityPage) {
    const title =
      sanityPage.seoTitle ||
      sanityPage.heroTitle ||
      sanityPage.title ||
      "Skitbit Service"

    const description =
      sanityPage.seoDescription ||
      sanityPage.heroDescription ||
      sanityPage.excerpt ||
      "Premium 3D rendering, CGI visuals, and product animation services by Skitbit."

    return {
      title,
      description,
      alternates: {
        canonical: `/services/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://www.theskitbit.com/services/${slug}`,
        siteName: "Skitbit",
      },
    }
  }

  const legacyService =
    servicesData[slug as keyof typeof servicesData] as LegacyService | undefined

  if (!legacyService) {
    return {
      title: "Service Not Found | Skitbit",
      description: "The requested Skitbit service page could not be found.",
    }
  }

  return {
    title: `${legacyService.title} | Skitbit`,
    description: legacyService.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${legacyService.title} | Skitbit`,
      description: legacyService.description,
      url: `https://www.theskitbit.com/services/${slug}`,
      siteName: "Skitbit",
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params

  const sanityPage = await getSanityServicePage(slug)

  if (sanityPage) {
    return (
      <LocationLandingTemplate
        location={sanityServiceToLocationTemplate(sanityPage, slug)}
      />
    )
  }

  const legacyService =
    servicesData[slug as keyof typeof servicesData] as LegacyService | undefined

  if (!legacyService) {
    notFound()
  }

  return (
    <LocationLandingTemplate
      location={legacyServiceToLocationTemplate(legacyService, slug)}
    />
  )
}