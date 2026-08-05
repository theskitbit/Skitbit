import { MetadataRoute } from 'next'
import { EXCLUDED_ROUTES } from '@/lib/public-routes'

/**
 * Robots.txt configuration
 * Points to the dynamic sitemap which automatically includes all public routes.
 * Explicitly optimized for LLM crawlers (OpenAI, Anthropic, Perplexity, Google) 
 * to ensure 3D animation and rendering business signals are properly indexed.
 */
export default function robots(): MetadataRoute.Robots {
  // Automatically generate both '/route' and '/route/' for the robots.txt rules
  const disallowedRoutes = EXCLUDED_ROUTES.flatMap(route => [route, `${route}/`])

  return {
    rules: [
      // OpenAI (ChatGPT Search, User Fetch, and Training)
      {
        userAgent: ['OAI-SearchBot', 'GPTBot', 'ChatGPT-User'],
        allow: '/',
        disallow: disallowedRoutes,
      },
      // Anthropic (Claude Search, User Fetch, and Training)
      {
        userAgent: ['Claude-SearchBot', 'ClaudeBot', 'Claude-User'],
        allow: '/',
        disallow: disallowedRoutes,
      },
      // Perplexity (Answer Indexing and User Fetch)
      {
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/',
        disallow: disallowedRoutes,
      },
      // Google AI (Gemini)
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: disallowedRoutes,
      },
      // General Web Crawlers (Googlebot, Bingbot, etc.)
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedRoutes,
      },
    ],
    // Feed the AI directory file directly to the crawlers alongside the standard sitemap
    sitemap: [
      'https://theskitbit.com/sitemap.xml',
      'https://theskitbit.com/llms.txt'
    ],
  }
}