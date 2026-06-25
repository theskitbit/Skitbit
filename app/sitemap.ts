import { MetadataRoute } from 'next'
import { getAllPublicRoutes } from "@/lib/public-routes"
import { getAllCountryCodes } from "@/data/country-pages"

export const dynamic = "force-dynamic"
export const revalidate = 0

const baseUrl = "https://www.theskitbit.com"

const projectId = "rhuq6lk0"
const dataset = "production"
const apiVersion = "2024-01-01"

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

function cleanPath(path: string) {
  if (!path || path === "/") return ""
  return path.startsWith("/") ? path : `/${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllPublicRoutes()
  const countryCodes = getAllCountryCodes()
  const blogPosts = await getBlogPosts()
  const locations = await getLocations()

  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/sitemap-index`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  // Add Static Pages
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${cleanPath(route.path)}`,
      lastModified: route.lastModified ?? new Date(),
      changeFrequency: route.changeFrequency ?? "monthly",
      priority: route.priority ?? 0.7,
    })
  })

  // Add Country Pages
  countryCodes.forEach((code) => {
    sitemapEntries.push({
      url: `${baseUrl}/${code}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  })

  // Add Location Pages
  locations.forEach((location) => {
    sitemapEntries.push({
      url: `${baseUrl}/locations/${location.slug}`,
      // TS Fix: Cast to string since the ternary checks existence
      lastModified: location.updatedAt ? new Date(location.updatedAt as string) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  })

  // Add Blog Pages
  blogPosts.forEach((post) => {
    const postDate = post.updatedAt || post.publishedAt;
    sitemapEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      // TS Fix: Cast to string since the ternary checks existence
      lastModified: postDate ? new Date(postDate as string) : new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    })
  })

  return sitemapEntries
}