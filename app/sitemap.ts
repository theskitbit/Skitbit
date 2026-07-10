import { MetadataRoute } from 'next'
import { getAllPublicRoutes } from "@/lib/public-routes"
import { getAllCountryCodes } from "@/data/country-pages"

/**
 * NEXT.JS 16 CACHING FIX:
 * - Removed `force-dynamic` (was preventing proper ISR)
 * - Changed `revalidate = 0` to `revalidate = 3600` (1 hour ISR)
 * - Added explicit revalidation tags for on-demand updates
 * - Updated fetch calls with proper cache strategy
 * * This ensures:
 * 1. Sitemap pre-generates at build time
 * 2. Revalidates automatically every 1 hour
 * 3. Can be manually revalidated via revalidateTag('sitemap')
 * 4. Respects updates to country pages, blog posts, and locations
 */
export const revalidate = 3600 // Revalidate every 1 hour (ISR)

const baseUrl = "https://theskitbit.com"

// --- Helper Functions ---
async function fetchSanity(query: string) {
  try {
    const url = new URL(`https://rhuq6lk0.api.sanity.io/v2024-01-01/data/query/production`)
    url.searchParams.set("query", query)
    // Proper caching config: revalidate every 1 hour with tags for on-demand updates
    const res = await fetch(url.toString(), { 
      next: { revalidate: 3600, tags: ['sitemap', 'sanity-content'] }
    })
    if (!res.ok) {
      console.warn("Sanity fetch non-OK:", res.status)
      return []
    }
    const json = await res.json()
    return Array.isArray(json.result) ? json.result : []
  } catch (e) {
    console.error("Sanity fetch error:", e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  
  // Explicitly add your primary top-level routes here
  const sitemapEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 }, // Added the works page
  ]

  // 1. Static Routes
  try {
    const routes = await getAllPublicRoutes()
    if (routes && Array.isArray(routes)) {
      routes.forEach((route) => {
        // Prevent duplicates if /works or /blog are somehow also returned by getAllPublicRoutes
        const cleanPath = route.path.startsWith('/') ? route.path : '/' + route.path
        if (cleanPath !== '/blog' && cleanPath !== '/works' && cleanPath !== '/') {
          sitemapEntries.push({
            url: `${baseUrl}${cleanPath}`,
            lastModified: route.lastModified ? new Date(route.lastModified) : now,
            changeFrequency: route.changeFrequency || "monthly",
            priority: route.priority || 0.7,
          })
        }
      })
    }
  } catch (e) { 
    console.error("[Sitemap] Static routes error:", e) 
  }

  // 2. Country Pages
  try {
    const countryCodes = getAllCountryCodes()
    if (countryCodes && Array.isArray(countryCodes)) {
      countryCodes.forEach((code) => {
        sitemapEntries.push({
          url: `${baseUrl}/${code}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        })
      })
    }
  } catch (e) { 
    console.error("[Sitemap] Country pages error:", e) 
  }

  // 3. Blog Posts (from Sanity)
  try {
    const blogQuery = `*[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    const blogPosts = await fetchSanity(blogQuery)
    if (blogPosts && Array.isArray(blogPosts)) {
      blogPosts.forEach((post: any) => {
        if (post.slug) {
          sitemapEntries.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.75,
          })
        }
      })
    }
  } catch (e) { 
    console.error("[Sitemap] Blog posts error:", e) 
  }

  // 4. Locations (from Sanity)
  try {
    const locQuery = `*[_type == "location" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt }`
    const locations = await fetchSanity(locQuery)
    if (locations && Array.isArray(locations)) {
      locations.forEach((loc: any) => {
        if (loc.slug) {
          sitemapEntries.push({
            url: `${baseUrl}/locations/${loc.slug}`,
            lastModified: loc.updatedAt ? new Date(loc.updatedAt) : now,
            changeFrequency: "monthly",
            priority: 0.8,
          })
        }
      })
    }
  } catch (e) { 
    console.error("[Sitemap] Locations error:", e) 
  }

  console.log(`[Sitemap] Generated ${sitemapEntries.length} entries`)
  return sitemapEntries
}
