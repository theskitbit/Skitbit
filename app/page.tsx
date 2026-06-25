'use client'

import Script from "next/script";

import { Header } from '@/components/header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Hero } from '@/components/hero'
import { LogoStrip } from '@/components/logo-strip'
import { FireworkWidget } from '@/components/firework-widget'
import { ProductShowcase } from '@/components/product-showcase'
import { AboutEvent } from '@/components/about-event'
import { WhatWeOffer } from '@/components/what-we-offer'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">

      {/* 🔥 ORGANIZATION */}
      <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Skitbit",
          alternateName: "Skitbit International",
          url: "https://theskitbit.com/",
          logo: "https://theskitbit.com/images/Black-icon.svg",
          sameAs: [
            "https://www.instagram.com/theskitbit/",
            "https://uk.linkedin.com/company/theskitbit",
            "https://www.youtube.com/@skitbitinternational",
            "https://www.facebook.com/theskitbit/"
          ]
        })}
      </Script>

      {/* 🔥 PRODUCT */}
      <Script id="product-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "3D Product Rendering for E-commerce",
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
      <Breadcrumbs />
      <Hero />
      <LogoStrip />
      <FireworkWidget />
      <AboutEvent />
      <ProductShowcase />
      <WhatWeOffer />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}