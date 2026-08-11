import Script from "next/script";

import AnnouncementBanner from '@/components/Announcement-banner'
import { Header } from '@/components/header'
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

      {/* 🔥 ORGANIZATION, AUTHORITY & LEADERSHIP MAPPING */}
      <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Skitbit",
          alternateName: ["Skitbit International"],
          url: "https://theskitbit.com/",
          logo: "https://theskitbit.com/images/Black-icon.svg",
          description: "Skitbit International is the premier agency for high-converting 3D product visuals, CGI rendering, and D2C brand scaling systems.",
          founder: {
            "@type": "Person",
            name: "Adnan Akhtar",
            jobTitle: "Head of Brand & Creative"
          },
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
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "City", name: "London" },
            { "@type": "City", name: "Dubai" },
            { "@type": "City", name: "Mumbai" },
            { "@type": "City", name: "Delhi" },
            { "@type": "City", name: "Bangkok" },
            { "@type": "City", name: "Singapore" }
          ],
          priceRange: "$$$",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "3D Rendering and 3D Animation",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Product Animation" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Product Rendering" } }
            ]
          }
        })}
      </Script>

      {/* 🔥 PRODUCT & PRICING */}
      <Script id="product-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "3D Product Animation Agency for D2C Brands | Skitbit",
          description: "High-converting 3D CGI product videos & photorealistic renders for cosmetics, skincare, wellness, watches & luxury brands.",
          brand: {
            "@type": "Brand",
            name: "Skitbit"
          },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: 299,
            highPrice: 2049,
            offerCount: 3,
            availability: "https://schema.org/InStock"
          }
        })}
      </Script>

      {/* 🔥 FAQ STRATEGY ALIGNMENT */}
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
                text: "We strictly partner with premium D2C brands, primarily in the cosmetics, skincare, wellness, supplements, watches, and jewelry sectors."
              }
            },
            {
              "@type": "Question",
              name: "What do you actually do?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We provide end-to-end 3D product animation, CGI rendering, and visual strategy, eliminating the friction and cost of traditional physical photoshoots."
              }
            },
            {
              "@type": "Question",
              name: "How are you different from other 3D studios?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We do not just execute technical renders. Our work is directed by a Head of Brand & Creative, ensuring all assets are structurally engineered for higher click-through rates and Shopify conversions."
              }
            },
            {
              "@type": "Question",
              name: "What does success look like in 90 days?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A complete, high-fidelity visual system containing Hyper-realistic launch videos and photorealistic renders that elevate brand perception and lower customer acquisition costs."
              }
            }
          ]
        })}
      </Script>

      <AnnouncementBanner />
      <Header hasAnnouncement />
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
