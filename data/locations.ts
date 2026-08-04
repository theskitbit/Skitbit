export interface LocationData {
  slug: string
  city: string
  country: string
  region: 'india' | 'western'
  h1: string
  subheading: string
  introText: string
  whyUsPoints: string[]
  clientsLocal: string[]
  clientsGlobal?: string[]
  locationText: string
  ctaPrimary: string
  ctaSecondary: string
}

export const locations: Record<string, LocationData> = {
  'mumbai-video-production': {
    slug: 'mumbai-video-production',
    city: 'Mumbai',
    country: 'India',
    region: 'india',
    h1: 'Video Production in Mumbai',
    subheading: 'High-converting product videos and ad creatives designed to drive engagement and sales.',
    introText: 'Most video production in Mumbai focuses on shooting content.\n\nWe focus on performance.\n\nSkitbit International helps brands create video content designed to convert across ads, social media, and e-commerce.',
    whyUsPoints: [
      'Built for D2C brands running ads',
      'Focus on conversion, not just visuals',
      'Faster turnaround without reshoots',
      'Scalable creative production',
    ],
    clientsLocal: ['BellaVita', 'Myntra', 'Digitek', 'Freakins', 'Greenberry Organics'],
    locationText: 'We support Mumbai-based brands through fast, remote production systems designed for modern e-commerce.',
    ctaPrimary: 'Your creatives are costing you sales.',
    ctaSecondary: 'Get your first concept today.',
  },
  'bangalore-digital-marketing': {
    slug: 'bangalore-digital-marketing',
    city: 'Bangalore',
    country: 'India',
    region: 'india',
    h1: 'Digital Marketing Agency in Bangalore',
    subheading: 'Performance-driven ad creatives, 3D visuals, and conversion-focused systems designed to scale D2C brands.',
    introText: 'Most digital marketing agencies in Bangalore focus only on running ads.\n\nSkitbit International focuses on what actually makes ads convert—creatives.\n\nWe help D2C brands improve performance through high-converting visuals, 3D rendering, and creative strategy.',
    whyUsPoints: [
      'Focus on conversion, not just traffic',
      'Designed to improve CTR, ROAS, and AOV',
      'Faster creative production cycles',
      'Built for scaling D2C brands',
    ],
    clientsLocal: ['Myntra', 'BellaVita', 'Greenberry Organics', "Neeman's", 'The Man Company'],
    locationText: 'We support Bangalore-based brands through remote execution, enabling faster turnaround and scalable creative production without agency delays.',
    ctaPrimary: 'Stop wasting ad spend on underperforming creatives.',
    ctaSecondary: 'Transform your creative performance.',
  },
  'london-video-production': {
    slug: 'london-video-production',
    city: 'London',
    country: 'UK',
    region: 'western',
    h1: 'Video Production Company in London',
    subheading: 'High-converting product videos, ad creatives, and 3D content designed to increase clicks, conversions, and sales for D2C brands.',
    introText: 'Looking for a video production company in London that actually drives results—not just visuals?\n\nSkitbit International helps e-commerce and D2C brands create performance-driven video content used across ads, product pages (PDPs), and social media.\n\nUnlike traditional production companies, we focus on conversion—ensuring every creative is built to improve CTR, ROAS, and engagement.',
    whyUsPoints: [
      'Built specifically for D2C brands running ads',
      'Faster production without physical reshoots',
      'Designed to improve ad performance and conversions',
      'Scalable creative systems for ongoing campaigns',
    ],
    clientsGlobal: ['Messika Paris', 'Rimowa', 'Bellroy', 'Skyborne', 'Shakeup Cosmetics'],
    locationText: 'We work with brands in London and across the UK through a remote-first production model, allowing faster turnaround, lower costs, and scalable creative output without traditional production delays.',
    ctaPrimary: 'Your creatives are costing you sales.',
    ctaSecondary: 'Turn your product into high-performing visuals that actually convert.',
  },
  'mumbai-3d-animation': {
    slug: 'mumbai-3d-animation',
    city: 'Mumbai',
    country: 'India',
    region: 'india',
    h1: '3D Animation Company in Mumbai',
    subheading: 'High-converting 3D product renders and animations designed to drive clicks, engagement, and sales for D2C brands.',
    introText: 'Looking for a 3D animation company in Mumbai that actually impacts your sales?\n\nSkitbit International specializes in performance-driven 3D product rendering and animation for e-commerce brands.\n\nInstead of traditional production, we create scalable, high-quality visuals that improve ad performance and product page conversions.',
    whyUsPoints: [
      'Built for D2C brands running paid ads',
      'Faster production without reshoots',
      'Designed to improve CTR, ROAS, and conversions',
      'Scalable creative systems for ongoing campaigns',
    ],
    clientsLocal: ['Myntra', 'BellaVita', 'The Man Company', "Neeman's", 'Digitek', 'Freakins'],
    locationText: 'We work with brands in Mumbai through a remote-first production system, allowing faster delivery and scalable creative output without traditional production delays.',
    ctaPrimary: 'Your creatives are costing you sales.',
    ctaSecondary: 'Upgrade to high-performing 3D visuals that actually convert.',
  },
  'toronto-animation-studios': {
    slug: 'toronto-animation-studios',
    city: 'Toronto',
    country: 'Canada',
    region: 'western',
    h1: 'Animation Studios in Toronto',
    subheading: 'High-performance 3D animations and product creatives designed to increase engagement and conversions.',
    introText: 'Searching for animation studios in Toronto that focus on results, not just visuals?\n\nSkitbit International helps e-commerce brands create high-converting animations and ad creatives used across paid campaigns and product pages.',
    whyUsPoints: [
      'Built for performance marketing',
      'Faster production without traditional constraints',
      'Designed to improve CTR and conversions',
      'Scalable creative systems',
    ],
    clientsGlobal: ['Bellroy', 'Rimowa', 'Messika Paris', 'Skyborne'],
    locationText: 'We work with Toronto-based brands through a remote-first model, enabling fast delivery and scalable creative production globally.',
    ctaPrimary: 'Turn your product into high-performing visuals.',
    ctaSecondary: 'Start your creative transformation.',
  },
}
