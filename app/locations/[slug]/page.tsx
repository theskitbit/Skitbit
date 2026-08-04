import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Footer } from '@/components/footer'
import { locations, LocationData } from '@/data/locations'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return Object.keys(locations).map((slug) => ({
    slug,
  }))
}

function LocationPageClient({ location }: { location: LocationData }) {

  return (
    <main className="bg-background text-foreground">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section id="hero" className="py-32 lg:py-48 bg-background" aria-label="Location hero section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-10 max-w-5xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {location.h1}
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/70 leading-relaxed max-w-4xl font-medium">
              {location.subheading}
            </p>
            <div className="pt-6">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                Get Your First Concept →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">About Our Service</h2>
            {location.introText.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-lg text-foreground/70 leading-relaxed mb-6 font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-balance">Our Services in {location.city}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              '3D Product Rendering for E-commerce',
              'High-Performance Ad Creatives',
              'Product Explainer Videos',
              'PDP & Marketplace Optimization',
              'Brand Storytelling Films',
              'Scalable Creative Systems',
            ].map((service, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-lg font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-balance">Why Choose Skitbit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {location.whyUsPoints.map((point, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-muted border border-border/50">
                <p className="text-lg font-medium text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-balance">Brands We Work With</h2>
          <div className="space-y-12">
            {location.clientsLocal && (
              <div>
                <h3 className="text-xl font-semibold text-foreground/60 uppercase tracking-widest mb-6">
                  {location.region === 'india' ? 'Indian Brands' : 'Local Brands'}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {location.clientsLocal.map((client, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-muted border border-border text-foreground font-medium">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {location.clientsGlobal && (
              <div>
                <h3 className="text-xl font-semibold text-foreground/60 uppercase tracking-widest mb-6">Global Brands</h3>
                <div className="flex flex-wrap gap-4">
                  {location.clientsGlobal.map((client, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-muted border border-border text-foreground font-medium">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Relevance Section */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-balance">Serving Brands in {location.city}</h2>
          <p className="text-xl leading-relaxed max-w-3xl font-medium">{location.locationText}</p>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Explore Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/services/3d-rendering-beauty"
              className="p-6 rounded-xl border border-border/50 hover:border-foreground/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">3D Product Rendering</h3>
              <p className="text-sm text-foreground/60">Hyperrealistic 3D assets for beauty, wellness, and luxury brands.</p>
            </Link>
            <Link
              href="/services/social-ads-beauty"
              className="p-6 rounded-xl border border-border/50 hover:border-foreground/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">Ad Creatives</h3>
              <p className="text-sm text-foreground/60">High-converting ads for Meta, TikTok, and Instagram.</p>
            </Link>
            <Link
              href="/services/performance-retainer"
              className="p-6 rounded-xl border border-border/50 hover:border-foreground/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">Creative Retainers</h3>
              <p className="text-sm text-foreground/60">Ongoing creative production for scaling brands.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
              {location.ctaPrimary}
            </h2>
            <p className="text-lg sm:text-xl text-background/80 leading-relaxed font-medium max-w-3xl">
              {location.ctaSecondary}
            </p>
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
                Get Your First Concept →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = locations[params.slug]

  if (!location) {
    notFound()
  }

  return <LocationPageClient location={location} />
}
