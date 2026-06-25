import Script from 'next/script'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CountryPageContent } from '@/data/country-pages'
import Link from 'next/link'

interface CountryPageTemplateProps {
  content: CountryPageContent
  canonical: string
}

export function CountryPageTemplate({ content, canonical }: CountryPageTemplateProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
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
    <main className="bg-background text-foreground">
      <Script
        id={`country-${content.code}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schemaData)}
      </Script>

      <Header />

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{content.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          {content.hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-pretty">
          {content.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition">
            {content.hero.primaryCta}
          </button>
          <button className="px-8 py-3 border border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground/10 transition">
            {content.hero.secondaryCta}
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">{content.trustSection.heading}</h2>
        <p className="text-lg text-muted-foreground">{content.trustSection.description}</p>
      </section>

      {/* Problem Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">{content.problemSection.headline}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.problemSection.problems.map((problem, idx) => (
            <div key={idx} className="p-6 border border-foreground/10 rounded-lg">
              <p className="text-foreground font-medium">{problem}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">{content.servicesSection.headline}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.servicesSection.description}
        </p>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4 text-center">{content.useCasesSection.headline}</h2>
        <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          {content.useCasesSection.description}
        </p>
        <div className="space-y-4">
          {content.useCasesSection.useCases.map((useCase, idx) => (
            <div key={idx} className="p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="text-foreground font-medium">{useCase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">{content.whySection.headline}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.whySection.benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-foreground">✓</span>
              </div>
              <p className="text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">{content.processSection.headline}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {content.processSection.steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -top-4 left-0 right-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
              </div>
              <div className="pt-8 p-6 border border-foreground/10 rounded-lg bg-foreground/5">
                <p className="text-foreground font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">{content.pricingSection.headline}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.pricingSection.description}
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">{content.faqSection.headline}</h2>
        <div className="space-y-6">
          {content.faqSection.faqs.map((faq, idx) => (
            <details
              key={idx}
              className="border border-foreground/10 rounded-lg p-6 cursor-pointer group"
            >
              <summary className="font-semibold text-foreground cursor-pointer group-open:text-foreground/80">
                {faq.question}
              </summary>
              <p className="mt-4 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">{content.finalCta.headline}</h2>
        <p className="text-lg text-muted-foreground mb-10">{content.finalCta.description}</p>
        <button className="px-10 py-4 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition text-lg">
          {content.finalCta.primaryCta}
        </button>
      </section>

      <Footer />
    </main>
  )
}
