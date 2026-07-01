import { MetadataRoute } from 'next'
import { EXCLUDED_ROUTES } from '@/lib/public-routes'

/**
 * Robots.txt configuration
 * Points to the dynamic sitemap which automatically includes all public routes.
 * * Explicitly optimized for LLM crawlers (OpenAI, ChatGPT) to ensure
 * business signals and public documentation are properly indexed.
 */
export default function robots(): MetadataRoute.Robots {
  // Automatically generate both '/route' and '/route/' for the robots.txt rules
  const disallowedRoutes = EXCLUDED_ROUTES.flatMap(route => [route, `${route}/`])

  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: disallowedRoutes,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: disallowedRoutes,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: disallowedRoutes,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedRoutes,
      },
    ],
    // Dynamic sitemap with all public routes
    sitemap: 'https://www.theskitbit.com/sitemap.xml',
  }
}