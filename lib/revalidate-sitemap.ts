'use server'

import { revalidateTag } from 'next/cache'

/**
 * On-demand sitemap revalidation
 * Call this whenever you update:
 * - Country pages in data/country-pages.ts
 * - Blog posts in Sanity
 * - Locations in Sanity or data/locations.ts
 * * Usage:
 * import { revalidateSitemap } from '@/lib/revalidate-sitemap'
 * await revalidateSitemap()
 */
export async function revalidateSitemap() {
  try {
    // ✅ Next.js 16 requires the second argument ('max')
    revalidateTag('sitemap', 'max')
    revalidateTag('sanity-content', 'max')
    
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
        revalidateTag('sitemap', 'max')
        revalidateTag('sanity-content', 'max')
        break
      case 'locations':
        revalidateTag('sitemap', 'max')
        revalidateTag('sanity-content', 'max')
        break
      case 'countries':
        revalidateTag