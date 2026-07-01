'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateSitemap() {
  try {
    revalidateTag('sitemap', 'max')
    revalidateTag('sanity-content', 'max')
    console.log('[Revalidate] Sitemap cache cleared')
    return { success: true, message: 'Sitemap revalidated' }
  } catch (error) {
    console.error('[Revalidate] Sitemap revalidation failed:', error)
    return { success: false, error: String(error) }
  }
}

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
        revalidateTag('sitemap', 'max')
        break
      case 'all':
        revalidateTag('sitemap', 'max')
        revalidateTag('sanity-content', 'max')
        break
    }
    console.log(`[Revalidate] Sitemap revalidated for: ${contentType}`)
    return { success: true }
  } catch (error) {
    console.error(`[Revalidate] Failed to revalidate ${contentType}:`, error)
    return { success: false, error: String(error) }
  }
}