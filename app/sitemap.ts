import { MetadataRoute } from 'next'
import { getAllPublicRoutes } from "@/lib/public-routes"
import { getAllCountryCodes } from "@/data/country-pages"

export const dynamic = "force-dynamic"
export const revalidate = 0

const baseUrl = "https://www.theskitbit.com"

// --- Helper Functions ---
async function fetchSanity(query: string) {
  try {
    const url = new URL(`https://rhuq6lk0.api.sanity.io/v2024-01-01/data/query/production`)
    url.searchParams.set("query", query)
    const res = await fetch(url.toString(), { cache: "no-store" })
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json.result) ? json.result : []
  } catch (e) {
    console.error("Sanity fetch failed", e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ]

  // 1. Static Routes (Safe)
  try {
    const routes = await getAllPublicRoutes()
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}${route.path.startsWith('/') ? route.path : '/' + route.path}`,
        lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  } catch (e) { console.error("Routes error", e) }

  // 2. Country Pages (Safe)
  try {
    const countryCodes = getAllCountryCodes()
    countryCodes.forEach((code) => {
      sitemapEntries.push({
        url: `${baseUrl}/${code}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    })
  } catch (e) { console.error("Countries error", e) }

  // 3. Blog Pages (Sanity Fetch - Wrapped)
  try {
    const blogQuery = `*[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    const blogPosts = await fetchSanity(blogQuery)
    blogPosts.forEach((post: any) => {
      sitemapEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    })
  } catch (e) { console.error("Blog fetch error", e) }

  // 4. Locations (Sanity Fetch - Wrapped)
  try {
    const locQuery = `*[_type == "location" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    const locations = await fetchSanity(locQuery)
    locations.forEach((loc: any) => {
      sitemapEntries.push({
        url: `${baseUrl}/locations/${loc.slug}`,
        lastModified: loc.updatedAt ? new Date(loc.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    })
  } catch (e) { console.error("Location fetch error", e) }

  return sitemapEntries
}