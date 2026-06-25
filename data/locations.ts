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
    h1: 'Video Production Company in Mumbai',
    subheading: 'High-converting product videos, ad creatives, and UGC content designed to drive engagement, clicks, and sales for D2C brands.',
    introText: 'Looking for a video production company in Mumbai that delivers results—not just visuals?\n\nMost production houses in Mumbai focus on shooting content. We focus on performance.\n\nSkitbit International helps D2C brands create high-converting video content that improves CTR, ROAS, and product page conversions across ads, social media, and e-commerce.',
    whyUsPoints: [
      'Built specifically for D2C brands running Meta, Google, and TikTok ads',
      'Focus on conversion metrics, not just production quality',
      'Faster turnaround without costly reshoots or studio delays',
      'Scalable creative production systems for ongoing campaigns',
      'Remote-first model enabling faster execution for Mumbai and global brands',
    ],
    clientsLocal: ['BellaVita', 'Myntra', 'Digitek', 'Freakins', 'Greenberry Organics', 'The Man Company', "Neeman's"],
    locationText: 'We partner with Mumbai-based D2C brands, wellness companies, and e-commerce businesses through a remote-first production model that eliminates studio delays and enables scalable, high-quality video production without geographical constraints.',
    ctaPrimary: 'Stop wasting budget on videos that don\'t convert.',
    ctaSecondary: 'Get your first high-converting concept in 5 days.',
  },
  'bangalore-digital-marketing': {
    slug: 'bangalore-digital-marketing',
    city: 'Bangalore',
    country: 'India',
    region: 'india',
    h1: 'Digital Marketing Agency in Bangalore',
    subheading: 'Performance-driven ad creatives, 3D product renders, and conversion-focused creative systems designed to scale D2C brands across Meta, Google, and TikTok.',
    introText: 'Searching for a digital marketing agency in Bangalore that focuses on results, not just media buying?\n\nMost digital marketing agencies in Bangalore focus only on ad spend management. Skitbit International focuses on what actually drives results—high-converting creatives.\n\nWe help Bangalore-based D2C brands improve ad performance through strategic 3D rendering, data-driven creative production, and conversion-focused systems that improve CTR, ROAS, and AOV.',
    whyUsPoints: [
      'Focus on creative performance and conversion metrics, not just traffic',
      'Designed to improve CTR, ROAS, and AOV for paid ads',
      'Faster creative iteration and testing cycles',
      'Built for scaling D2C brands doing $100k+ in monthly revenue',
      'Remote production enabling seamless Bangalore-based collaboration',
    ],
    clientsLocal: ['Myntra', 'BellaVita', 'Greenberry Organics', "Neeman's", 'The Man Company', 'Digitek', 'Freakins'],
    locationText: 'We support Bangalore-based D2C brands, wellness companies, and beauty startups through remote creative production, enabling faster turnaround, lower overhead, and scalable output without traditional agency delays.',
    ctaPrimary: 'Your creative strategy is costing you sales.',
    ctaSecondary: 'Transform your ad performance with conversion-focused creatives.',
  },
  'london-video-production': {
    slug: 'london-video-production',
    city: 'London',
    country: 'UK',
    region: 'western',
    h1: 'Video Production Company in London',
    subheading: 'High-converting product videos, ad creatives, and 3D content designed to increase clicks, conversions, and sales for European and global D2C brands.',
    introText: 'Looking for a video production company in London that actually drives business results—not just high production value?\n\nSkitbit International specializes in performance-driven video production for e-commerce and D2C brands, creating content that converts across paid ads, product pages (PDPs), social media, and marketplaces.\n\nUnlike traditional London production houses, we focus on conversion optimization—ensuring every video is engineered to improve CTR, ROAS, and average order value.',
    whyUsPoints: [
      'Built specifically for D2C brands scaling on Meta, Google, TikTok, and Pinterest',
      'Faster production cycles without costly studio reshoots',
      'Designed to improve ad performance, CTR, and product page conversions',
      'Scalable creative systems for ongoing campaign optimization',
      'Trusted by London-based and global luxury brands',
    ],
    clientsGlobal: ['Messika Paris', 'Rimowa', 'Bellroy', 'Skyborne', 'Shakeup Cosmetics', 'Notino', 'Cult Beauty'],
    locationText: 'We partner with brands in London and across Europe through a remote-first production model, delivering faster turnaround, lower production overhead, and scalable creative output without the constraints of traditional London production studios.',
    ctaPrimary: 'Your production value doesn\'t matter if your videos don\'t convert.',
    ctaSecondary: 'Start with your first high-converting concept.',
  },
  'mumbai-3d-animation': {
    slug: 'mumbai-3d-animation',
    city: 'Mumbai',
    country: 'India',
    region: 'india',
    h1: '3D Animation & Product Rendering Company in Mumbai',
    subheading: 'High-converting 3D product renders, animations, and visual effects designed to drive clicks, engagement, and conversions for e-commerce and D2C brands.',
    introText: 'Searching for a 3D animation company in Mumbai that delivers business results, not just artistic renders?\n\nSkitbit International specializes in conversion-driven 3D product rendering and animation services for e-commerce brands and D2C companies.\n\nWe create scalable, high-quality 3D visuals and animations engineered to improve ad performance, increase product page engagement, and drive sales—not for portfolio aesthetics.',
    whyUsPoints: [
      'Built for D2C brands running paid campaigns on Meta, Google, and marketplaces',
      'Faster production and iteration without costly design feedback loops',
      'Designed to improve CTR, ROAS, and product page conversion rates',
      'Scalable 3D asset production for ongoing product launches',
      'Proven with Mumbai-based beauty, wellness, and fashion brands',
    ],
    clientsLocal: ['Myntra', 'BellaVita', 'The Man Company', "Neeman's", 'Digitek', 'Freakins', 'Greenberry Organics'],
    locationText: 'We partner with Mumbai-based D2C brands, cosmetics companies, and fashion startups through a remote-first 3D production model, delivering faster turnaround, cost-effective rendering, and scalable visual asset creation without studio constraints.',
    ctaPrimary: 'Beautiful renders don\'t sell products—conversion-focused ones do.',
    ctaSecondary: 'Get your first high-converting 3D render in 3 days.',
  },
  'toronto-animation-studios': {
    slug: 'toronto-animation-studios',
    city: 'Toronto',
    country: 'Canada',
    region: 'western',
    h1: 'Animation Studios in Toronto | 3D & Motion Design',
    subheading: 'High-performance 3D animations, product renders, and motion design creatives designed to increase engagement, clicks, and conversions for North American and global brands.',
    introText: 'Looking for animation studios in Toronto that prioritize business results over artistic showreels?\n\nSkitbit International specializes in high-converting 3D animations and motion design for e-commerce brands, creating assets that improve ad performance across paid campaigns and product pages.\n\nUnlike traditional Toronto animation houses, we engineer every animation for conversion, focusing on CTR, ROAS, and customer acquisition metrics.',
    whyUsPoints: [
      'Built for North American and global D2C brands scaling on paid ads',
      'Faster production and iteration without traditional animation delays',
      'Designed to improve ad CTR, ROAS, and product page conversion rates',
      'Scalable motion design systems for ongoing campaign optimization',
      'Trusted by luxury and DTC brands across North America',
    ],
    clientsGlobal: ['Bellroy', 'Rimowa', 'Messika Paris', 'Skyborne', 'Brightland', 'Kinto'],
    locationText: 'We partner with Toronto-based brands and North American companies through a remote-first model, enabling fast delivery, cost-effective production, and scalable animation asset creation for global campaigns.',
    ctaPrimary: 'Your animation looks great but doesn\'t drive conversions.',
    ctaSecondary: 'Switch to conversion-focused motion design that actually sells.',
  },
}
