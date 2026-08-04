import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.theskitbit.com'

  const serviceSlugs = [
    '3d-rendering-beauty',
    '3d-rendering-wellness',
    'luxury-watches',
    'fine-jewelry',
    'seed-startups',
    'social-ads-beauty',
    'supplement-explainers',
    'luxury-brand-films',
    'amazon-wellness',
    'amazon-beauty-aplus',
    'performance-retainer',
  ]

  const serviceUrls = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // FUTURE GEO DOMINATION (add as you build pages)
  const geoPages = [
    '3d-product-rendering-dubai',
    '3d-product-rendering-london',
    '3d-product-rendering-india',
  ]

  const geoUrls = geoPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // 🔥 NEW PRICING PAGE 
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority because this is a core conversion page
    },

    // 🔥 AI CONTROL FILE
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },

    ...serviceUrls,
    ...geoUrls,
  ]
}