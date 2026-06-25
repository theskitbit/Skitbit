import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration
 * Points to the dynamic sitemap which automatically includes:
 * - All static pages
 * - All country landing pages (/us, /uk, /ca, /au, /ae, /de, /fr, /nl, /se, /ch)
 * - All service pages (/services/*)
 * - All location pages (/locations/*)
 * 
 * Excludes private routes and admin areas
 */

const publicDisallow = [
  '/admin',
  '/admin/',
  '/private',
  '/private/',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: publicDisallow,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: publicDisallow,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: publicDisallow,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: publicDisallow,
      },
    ],
    // Dynamic sitemap with all public routes
    sitemap: 'https://www.theskitbit.com/sitemap.xml',
  }
}
