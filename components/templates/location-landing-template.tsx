"use client"

import Script from "next/script"
import Link from "next/link"

import { Header } from "@/components/header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LogoStrip } from "@/components/logo-strip"
import { FireworkWidget } from "@/components/firework-widget"
import { ProductShowcase } from "@/components/product-showcase"
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

export function LocationLandingTemplate({
  location,
}: LocationLandingTemplateProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `https://www.theskitbit.com/locations/${location.slug}/#business`,
        name: `Skitbit - ${location.heroTitle}`,
        description: location.heroSubtitle,
        url: `https://www.theskitbit.com/locations/${location.slug}`,
        email: "hello@theskitbit.com",
        areaServed: {
          "@type": "City",
          name: location.locationName,
        },
        serviceType: location.serviceName,
        image: "https://www.theskitbit.com/images/Black-icon.svg",
        logo: "https://www.theskitbit.com/images/Black-icon.svg",
        sameAs: [
          "https://www.instagram.com/theskitbit/",
          "https://uk.linkedin.com/company/theskitbit",
        ],
      },
      location.faqs?.length
        ? {
            "@type": "FAQPage",
            "@id": `https://www.theskitbit.com/locations/${location.slug}/#faq`,
            mainEntity: location.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }
        : null,
    ].filter(Boolean),
  }

  return (
    <main className="bg-background text-foreground">
      <Script
        id={`location-schema-${location.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schemaData)}
      </Script>

      <Header />
      <Breadcrumbs />

      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,31,63,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,31,63,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-1 items-center gap-14 px-6 py-28 lg:grid-cols-2 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" />
              For brands looking for {location.serviceName}
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
              {location.heroTitle}
            </h1>

            {location.heroSubtitle ? (
              <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-foreground/65 sm:text-xl">
                {location.heroSubtitle}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact-form"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:scale-[1.03] hover:shadow-lg active:scale-95"
              >
                Get Your First Concept →
              </Link>

              <Link
                href="/#work"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-7 py-4 text-sm font-bold text-foreground transition hover:border-foreground/30 hover:shadow-md active:scale-95"
              >
                View Our Work
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-foreground/45">
              <span>Premium CGI visuals</span>
              <span>•</span>
              <span>Product renders</span>
              <span>•</span>
              <span>Launch creatives</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-border bg-background/70 p-3 shadow-2xl backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-muted p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(219,230,76,0.45),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(0,31,63,0.20),transparent_35%)]" />

                <div className="relative min-h-[480px] rounded-[1.25rem] border border-border bg-background/70 p-6 backdrop-blur">
                  <div className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-bold text-foreground shadow-sm">
                    3D Product Visuals
                  </div>

                  <div className="mt-16 grid gap-4">
                    <div className="ml-auto h-40 w-40 rounded-[2rem] bg-primary shadow-xl" />
                    <div className="h-28 w-64 rounded-[2rem] bg-foreground shadow-xl" />
                    <div className="ml-20 h-24 w-48 rounded-[2rem] border border-border bg-background shadow-xl" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-border bg-background/90 p-6 shadow-xl backdrop-blur">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-foreground/50">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Visual Audit
                    </div>

                    <h2 className="max-w-lg text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                      Find the leaks before spending more on ads.
                    </h2>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {["Hook", "Clarity", "Trust"].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <p className="text-sm font-bold text-foreground">
                            {item}
                          </p>
                          <div className="mt-3 h-2 rounded-full bg-muted">
                            <div className="h-2 w-3/4 rounded-full bg-primary" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoStrip />

      <FireworkWidget />
      <ProductShowcase />

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">
              {location.locationName} / {location.serviceName}
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
              Built for brands that need premium product perception.
            </h2>

            <p className="mt-6 text-lg font-medium leading-relaxed text-foreground/65">
              Whether you are launching a product, improving ecommerce visuals,
              or creating performance creatives, Skitbit helps you build assets
              that make your product look expensive before the customer even
              reads the copy.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Launch Visuals",
                text: "Hero images, campaign visuals, and CGI scenes for new product launches.",
              },
              {
                title: "Product Renders",
                text: "Photorealistic product images for websites, ads, decks, and ecommerce.",
              },
              {
                title: "Ad Creatives",
                text: "Conversion-focused visuals built for Meta, Google, PDPs, and landing pages.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[1.5rem] border border-border bg-background p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-4 text-base font-medium leading-relaxed text-foreground/60">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {location.faqs?.length ? (
        <section className="bg-foreground py-24 text-background lg:py-32">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Frequently asked questions
            </h2>

            <div className="mt-12 space-y-4">
              {location.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-background/10 bg-background/5 p-6"
                >
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-background/65">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-primary py-24 text-primary-foreground lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-bold leading-tight tracking-[-0.05em] lg:text-7xl">
              {location.ctaTitle || "Start your 3D rendering project."}
            </h2>

            {location.ctaDescription ? (
              <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-primary-foreground/75">
                {location.ctaDescription}
              </p>
            ) : null}

            <Link
              href="/contact-form"
              className="mt-10 inline-flex rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background shadow-lg"
            >
              Get Your First Concept →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
