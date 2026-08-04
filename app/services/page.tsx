'use client'

import { Header } from '@/components/header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Footer } from '@/components/footer'
import { ServicesHero } from '@/components/services-hero'
import { ServiceCollection } from '@/components/service-collection'
import { CTA } from '@/components/cta'

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Breadcrumbs />
      <ServicesHero />
      
      {/* Collection 01: 3D Product Rendering */}
      <ServiceCollection
        number="01"
        title="3D Product Rendering"
        description="Hyperrealistic 3D assets engineered for conversion. Every product rendered with pixel-perfect precision."
        services={[
          { id: 1, name: '3D Product Rendering for Beauty & Makeup Brands', description: 'Hyperrealistic cosmetics and skincare visuals that convert.', slug: '3d-rendering-beauty' },
          { id: 2, name: '3D Product Rendering for Wellness & Supplements', description: 'Precision-engineered product visualization for the supplement space.', slug: '3d-rendering-wellness' },
          { id: 3, name: '3D Product Rendering for Luxury Watch Brands', description: 'Premium watch rendering with mechanical precision and luxury finishes.', slug: 'luxury-watches' },
          { id: 4, name: '3D Product Rendering for Fine Jewelry Brands', description: 'Diamond and precious metal visualization with optical accuracy.', slug: 'fine-jewelry' },
          { id: 5, name: '3D Product Rendering for Early-Seed CPG Startups', description: 'Cost-effective 3D assets for emerging consumer brands.', slug: 'seed-startups' },
        ]}
      />

      {/* Collection 02: High-Performance Product Videos */}
      <ServiceCollection
        number="02"
        title="High-Performance Product Videos"
        description="Scroll-stopping video content designed for maximum engagement and conversions."
        services={[
          { id: 6, name: 'Social-First Ad Creatives for Beauty & Wellness', description: 'Vertical video ads optimized for TikTok, Instagram, and Pinterest.', slug: 'social-ads-beauty' },
          { id: 7, name: '3D Product Explainer Videos for Supplements', description: 'Cinematic product demos that explain benefits and drive purchase intent.', slug: 'supplement-explainers' },
          { id: 8, name: 'Cinematic Brand Films for Luxury & Jewelry', description: 'Premium narrative-driven content for high-end brand storytelling.', slug: 'luxury-brand-films' },
        ]}
      />

      {/* Collection 03: E-commerce & Marketplace Solutions */}
      <ServiceCollection
        number="03"
        title="E-commerce & Marketplace Solutions"
        description="Specialized visuals designed to dominate listings and maximize marketplace conversions."
        services={[
          { id: 10, name: 'Amazon Listing Gold Packs for Wellness Brands', description: 'Complete listing optimization with hero imagery and lifestyle shots.', slug: 'amazon-wellness' },
          { id: 11, name: 'Amazon A+ Content Design for Beauty Brands', description: 'Enhanced brand content that stands out and drives conversion lift.', slug: 'amazon-beauty-aplus' },
        ]}
      />

      {/* Collection 04: Scale & Strategy (Retainers) */}
      <ServiceCollection
        number="04"
        title="Scale & Strategy (Retainers)"
        description="Ongoing creative partnerships that keep your brand performing at peak efficiency."
        services={[
          { id: 14, name: 'Performance Creative Retainer for Scaling Brands', description: 'Continuous creative production optimized for ad performance.', slug: 'performance-retainer' },
        ]}
      />

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight text-balance">
              Your Creatives Are Costing You Sales. Fix That Now.
            </h2>
            <p className="text-lg sm:text-xl text-background/80 leading-relaxed font-medium max-w-3xl">
              Stop settling for mediocre visuals. Partner with Skitbit to build high-performance product creatives that drive clicks, conversions, and scale.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  // This will use the ContactOverlay hook
                  const event = new Event('contact-overlay:open')
                  window.dispatchEvent(event)
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
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
