import { LocationLandingTemplate } from "@/components/templates/location-landing-template"
import { notFound } from "next/navigation"
import { Metadata } from "next"

type SanityBlockChild = {
  text?: string
}

type SanityBlock = {
  _type: string
  children?: SanityBlockChild[]
}

type FAQ = {
  question: string
  answer: string
}

type LocationPageData = {
  pageTitle: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle?: string
  locationName: string
  serviceName: string
  mainContent?: SanityBlock[]
  faqs?: FAQ[]
  ctaTitle?: string
  ctaDescription?: string
  updatedAt?: string
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = "2024-01-01"

async function sanityFetch<T>(
  query: string,
  params: Record<string, string> = {}
): Promise<T> {
  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
  }

  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
  )

  url.searchParams.set("query", query)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value))
  })

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Sanity fetch failed: ${res.status}`)
  }

  const json = await res.json()
  return json.result
}

const locationQuery = `
*[_type == "location" && slug.current == $slug][0]{
  pageTitle,
  "slug": slug.current,
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  locationName,
  serviceName,
  mainContent,
  faqs,
  ctaTitle,
  ctaDescription,
  "updatedAt": _updatedAt
}
`

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(`
    *[_type == "location" && defined(slug.current)]{
      "slug": slug.current
    }
  `)

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const location = await sanityFetch<LocationPageData | null>(locationQuery, {
    slug,
  })

  if (!location) return {}

  const title = location.seoTitle || `${location.heroTitle} | Skitbit`
  const description =
    location.seoDescription ||
    location.heroSubtitle ||
    "3D rendering, CGI visuals, and product animation services by Skitbit."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.theskitbit.com/locations/${location.slug}`,
      siteName: "Skitbit",
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const location = await sanityFetch<LocationPageData | null>(locationQuery, {
    slug,
  })

  if (!location) {
    notFound()
  }

  return (
    <LocationLandingTemplate
      location={{
        slug: location.slug,
        pageTitle: location.pageTitle,
        heroTitle: location.heroTitle || location.pageTitle,
        heroSubtitle: location.heroSubtitle,
        locationName: location.locationName || "",
        serviceName: location.serviceName || "",
        ctaTitle: location.ctaTitle,
        ctaDescription: location.ctaDescription,
        faqs: location.faqs || [],
      }}
    />
  )
}