import { getAllPublicRoutes } from "@/lib/public-routes"
import { getAllCountryCodes } from "@/data/country-pages"

export const dynamic = "force-dynamic"
export const revalidate = 0

const baseUrl = "https://www.theskitbit.com"

const projectId = "rhuq6lk0"
const dataset = "production"
const apiVersion = "2024-01-01"

type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

type SanityBlogPost = {
  slug: string
  updatedAt?: string
  publishedAt?: string
}

type SanityLocation = {
  slug: string
  updatedAt?: string
}

const fallbackLocationPages: SanityLocation[] = [
  { slug: "3d-rendering-company-mumbai" },
  { slug: "3d-rendering-company-delhi" },
  { slug: "3d-rendering-company-bangalore" },
]

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function formatDate(date?: string | Date) {
  if (!date) return new Date().toISOString()
  try { return new Date(date).toISOString() } catch { return new Date().toISOString() }
}

function cleanPath(path: string) {
  if (!path || path === "/") return ""
  return path.startsWith("/") ? path : `/${path}`
}

function normalizeUrl(url: string) {
  return url.replace(/([^:]\/)\/+/g, "$1")
}

function toSitemapXml(entries: SitemapEntry[]) {
  const uniqueEntries = Array.from(
    new Map(entries.map((entry) => [normalizeUrl(entry.url), entry])).values()
  )

  const urls = uniqueEntries
    .map((entry) => `
  <url>
    <loc>${escapeXml(normalizeUrl(entry.url))}</loc>
    <lastmod>${formatDate(entry.lastModified)}</lastmod>
    <changefreq>${entry.changeFrequency || "monthly"}</changefreq>
    <priority>${entry.priority ?? 0.7}</priority>
  </url>`).join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
}

async function fetchSanity<T>(query: string): Promise<T[]> {
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
  url.searchParams.set("query", query)
  try {
    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json.result) ? json.result : []
  } catch (error) {
    return []
  }
}

async function getBlogPosts() {
  const query = `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) { "slug": slug.current, "updatedAt": _updatedAt, "publishedAt": coalesce(publishedAt, _createdAt) }`
  return fetchSanity<SanityBlogPost>(query)
}

async function getLocations() {
  const query = `*[_type == "location" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
  const locations = await fetchSanity<SanityLocation>(query)
  return locations.length === 0 ? fallbackLocationPages : locations
}

export async function GET() {
  const routes = await getAllPublicRoutes()
  const countryCodes = getAllCountryCodes()
  const blogPosts = await getBlogPosts()
  const locations = await getLocations()

  const requiredPages: SitemapEntry[] = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sitemap-index`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const staticPages: SitemapEntry[] = routes.map((route) => ({
    url: `${baseUrl}${cleanPath(route.path)}`,
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency ?? "monthly",
    priority: route.priority ?? 0.7,
  }))

  const countryPages: SitemapEntry[] = countryCodes.map((code) => ({
    url: `${baseUrl}/${code}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8,
  }))

  const locationPages: SitemapEntry[] = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`, lastModified: location.updatedAt || new Date(), changeFrequency: "monthly", priority: 0.8,
  }))

  const blogPages: SitemapEntry[] = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`, lastModified: post.updatedAt || post.publishedAt || new Date(), changeFrequency: "weekly", priority: 0.75,
  }))

  const xml = toSitemapXml([
    ...requiredPages,
    ...staticPages,
    ...countryPages,
    ...locationPages,
    ...blogPages,
  ])

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  })
}