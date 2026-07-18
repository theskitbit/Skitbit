'use client'

import Script from 'next/script'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LogoStrip } from '@/components/logo-strip'
import { FireworkWidget } from '@/components/firework-widget'
import { ProductShowcase } from '@/components/product-showcase'
import { TestimonialsSanity } from '@/components/testimonials-sanity'
import { useContactOverlay } from '@/components/contact-overlay'
import { CountryPageContent } from '@/data/country-pages'

interface CountryPageTemplateProps {
  content: CountryPageContent
  canonical: string
  testimonials?: any[]
}

export function CountryPageTemplate({ content, canonical, testimonials = [] }: CountryPageTemplateProps) {
  // Pull the open function from your overlay context
  const { open } = useContactOverlay()

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Skitbit',
            item: 'https://theskitbit.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: content.name,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqSection.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <Script
        id={`country-${content.code}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schemaData)}
      </Script>

      <Header />

      {/* Semantic Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 py-6">
        <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-muted-foreground/70">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Skitbit
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-semibold" aria-current="page">
            {content.name}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 text-balance">
          {content.hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty font-medium leading-relaxed">
          {content.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-20 relative">
          <button 
            onClick={open} 
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-lg cursor-pointer"
          >
            Start Project
          </button>
          <Link 
            href="/works" 
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Work
          </Link>
        </div>
      </section>

      <LogoStrip />
      <FireworkWidget />
      <ProductShowcase />

      {/* Trust Section */}
      <section className="border-y border-border bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-sm uppercase tracking-widest font-semibold text-muted-foreground mb-6">
            {content.trustSection.heading}
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-4xl mx-auto text-balance">
            {content.trustSection.description}
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{content.problemSection.headline}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.problemSection.problems.map((problem, idx) => (
            <article 
              key={idx} 
              className="group p-8 rounded-2xl bg-background border border-border hover:border-foreground/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <span className="text-destructive font-bold text-lg">!</span>
              </div>
              <h3 className="text-foreground/90 font-medium leading-relaxed">{problem}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-8">{content.servicesSection.headline}</h2>
          <p className="text-lg md:text-xl text-background/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {content.servicesSection.description}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{content.processSection.headline}</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-10 left-6 right-6 h-[1px] bg-border -z-10" />
          {content.processSection.steps.map((step, idx) => (
            <article 
              key={idx} 
              className="relative flex flex-col items-center text-center md:items-start md:text-left pt-4"
            >
              <div className="w-14 h-14 rounded-xl bg-background border-2 border-foreground text-foreground flex items-center justify-center font-bold text-xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-foreground/90 font-semibold text-lg md:text-xl">{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <div className="py-12 border-t border-border">
        <TestimonialsSanity testimonials={testimonials} />
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 border-t border-border/50">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-12 text-center">{content.faqSection.headline}</h2>
        <div className="space-y-4">
          {content.faqSection.faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group border border-border rounded-xl bg-background overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer text-lg font-semibold text-foreground">
                {faq.question}
                <span className="ml-6 flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground font-medium leading-relaxed">
                <div className="pt-2 border-t border-border/50">
                  {faq.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative border-t border-border bg-foreground/[0.02] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">{content.finalCta.headline}</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={open} 
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-md bg-foreground px-10 text-base font-medium text-background transition-all hover:scale-105 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shadow-xl shadow-foreground/20 cursor-pointer"
            >
              Start Project
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}