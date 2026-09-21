"use client"

import Script from "next/script"

import AnnouncementBanner from "@/components/Announcement-banner"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LogoStrip } from "@/components/logo-strip"
import { FireworkWidget } from "@/components/firework-widget"
import { ProductShowcase } from "@/components/product-showcase"
import { AboutEvent } from "@/components/about-event"
import { WhatWeOffer } from "@/components/what-we-offer"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

type FAQ = {
  question: string
  answer: string
}

type LocationLandingTemplateProps = {
  location: {
    slug: string
    pageTitle: string
    heroTitle: string
    heroSubtitle?: string
    locationName: string
    serviceName: string
    ctaTitle?: string
    ctaDescription?: string
    faqs?: FAQ[]
  }
}

export function LocationLandingTemplate({ location }: LocationLandingTemplateProps) {
  const canonical = `https://theskitbit.com/locations/${location.slug}/`
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${canonical}#business`,
        name: "Skitbit",
        description: location.heroSubtitle || `3D product visuals and CGI services for brands in ${location.locationName}.`,
        url: canonical,
        areaServed: { "@type": "City", name: location.locationName },
        serviceType: location.serviceName || "3D product visualization",
        image: "https://theskitbit.com/images/Black-icon.svg",
        logo: "https://theskitbit.com/images/Black-icon.svg",
        sameAs: [
          "https://www.instagram.com/theskitbit/",
          "https://uk.linkedin.com/company/theskitbit",
        ],
      },
      ...(location.faqs?.length
        ? [{
            "@type": "FAQPage",
            "@id": `${canonical}#faq`,
            mainEntity: location.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }]
        : []),
    ],
  }

  return (
    <main className="bg-background text-foreground">
      <Script id={`location-schema-${location.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>
      <AnnouncementBanner />
      <Header hasAnnouncement />
      <Hero
        locationName={location.locationName}
        locationTitle={location.heroTitle}
        locationSubtitle={location.heroSubtitle || `Your ${location.serviceName || "3D product visualization"} partner for brands in ${location.locationName}.`}
      />
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
