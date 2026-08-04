import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // The asterisk (*) allows ALL bots, including AI search agents
        userAgent: '*',
        allow: '/',
      },
      // OPTIONAL: If you ever want to block bots from training on your brand data, 
      // while still allowing AI search, you would add this block:
      // {
      //   userAgent: ['GPTBot', 'Google-Extended'],
      //   disallow: '/',
      // }
    ],
    sitemap: 'https://theskitbit.com/sitemap.xml',
  }
}