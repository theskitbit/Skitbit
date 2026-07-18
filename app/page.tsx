import Script from "next/script";

import { Header } from '@/components/header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Hero } from '@/components/hero'
import { LogoStrip } from '@/components/logo-strip'
import { FireworkWidget } from '@/components/firework-widget'
import { ProductShowcase } from '@/components/product-showcase'
import { AboutEvent } from '@/components/about-event'
import { WhatWeOffer } from '@/components/what-we-offer'
import { TestimonialsSanity } from '@/components/testimonials-sanity'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'

const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && active == true] | order(order asc) {
    _id,
    name,
    role,
    category,
    headline,
    description,
    image,
    metric1Label,
    metric1Value,
    metric2Label,
    metric2Value,
    rating,
    order,
    active
  }
`

export default async function Home() {
  let testimonials = []
  
  try {
    testimonials = await client.fetch(TESTIMONIALS_QUERY)
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)
  }

  return (
    <main className="bg-background text-foreground">

{/* 🔥 ORGANIZATION & AUTHORITY MAPPING */}
<Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Skitbit",
    // We add the 'copy' and 'agency' terms here to capture the intent
    alternateName: [
      "Skitbit International", 
      "Skitbit International Agency", 
      "Skitbit website", 
      "Skitbit agency"
      "Skitbit agency uk"
      "Skitbit agency delhi"
      "Skitbit agency london"
      "Skitbit agency dubai"
      "Skitbit agency"
    ],
    url: "https://theskitbit.com/",
    logo: "https://theskitbit.com/images/Black-icon.svg",
    description: "Skitbit International is the premier agency for high-converting 3D product visuals and D2C brand scaling systems.",
    sameAs: [
      "https://www.instagram.com/theskitbit/",
      "https://uk.linkedin.com/company/theskitbit",
      "https://www.youtube.com/@skitbitinternational",
      "https://www.facebook.com/theskitbit/"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN"
    },
    // This defines your specific authority for these services
    priceRange: "$$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "3D Rendering and Creative Strategy",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Product Animation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "D2C Creative Strategy" } }
      ]
    }
  })}
</Script>

      {/* 🔥 PRODUCT */}
      <Script id="product-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "3D Product Animation Company | Photoreal CGI | Skitbit",
          description: "High-end 3D product rendering and ad creatives for DTC brands to improve CTR, ROAS, and conversions.",
          brand: {
            "@type": "Brand",
            name: "Skitbit"
          },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: 120,
            highPrice: 950,
            offerCount: 4,
            availability: "https://schema.org/InStock"
          }
        })}
      </Script>

      {/* 🔥 FAQ */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What kind of brands do you work with?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We work with DTC brands doing $100k+ per month, primarily in wellness, beauty, and e-commerce."
              }
            },
            {
              "@type": "Question",
              name: "What do you actually do?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We handle 3D rendering, ad creatives, UGC coordination, and Meta ads scaling systems."
              }
            },
            {
              "@type": "Question",
              name: "How are you different from other agencies?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We focus on creative systems and high-volume testing instead of just media buying."
              }
            },
            {
              "@type": "Question",
              name: "What does success look like in 90 days?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A repeatable Meta system with consistent creatives, structured testing, and predictable scaling."
              }
            }
          ]
        })}
      </Script>

      <Header />
      <Hero />
      <LogoStrip />
      <FireworkWidget />
      <AboutEvent />
      <ProductShowcase />
      <WhatWeOffer />
      <TestimonialsSanity testimonials={testimonials} />
      <CTA />
      <Footer />
    </main>
  )
}
