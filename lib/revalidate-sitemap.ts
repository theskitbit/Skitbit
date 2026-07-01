'use server'

import { revalidateTag } from 'next/cache'

/**
 * On-demand sitemap revalidation
 * Call this whenever you update:
 * - Country pages in data/country-pages.ts
 * - Blog posts in Sanity
 * - Locations in Sanity or data/locations.ts
 * 
 * Usage:
 * import { revalidateSitemap } from '@/lib/revalidate-sitemap'
 * await revalidateSitemap()
 */
export async function revalidateSitemap() {
  try {
    // Revalidate all sitemap-related tags
    revalidateTag('sitemap')
    revalidateTag('sanity-content')
    console.log('[Revalidate] Sitemap cache cleared')
    return { success: true, message: 'Sitemap revalidated' }
  } catch (error) {
    console.error('[Revalidate] Sitemap revalidation failed:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Selective revalidation - use when only specific content changed
 */
export async function revalidateSitemapFor(contentType: 'blog' | 'locations' | 'countries' | 'all') {
  try {
    switch (contentType) {
      case 'blog':
        revalidateTag('sitemap')
        revalidateTag('sanity-content')
        break
      case 'locations':
        revalidateTag('sitemap')
        revalidateTag('sanity-content')
        break
      case 'countries':
        revalidateTag('sitemap')
        break
      case 'all':
        revalidateTag('sitemap')
        revalidateTag('sanity-content')
        break
    }
    console.log(`[Revalidate] Sitemap revalidated for: ${contentType}`)
    return { success: true }
  } catch (error) {
    console.error(`[Revalidate] Failed to revalidate ${contentType}:`, error)
    return { success: false, error: String(error) }
  }
}
