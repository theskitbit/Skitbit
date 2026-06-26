'use client'

import Image from 'next/image'
import Link from 'next/link'

const PARTNER_LOGOS = [
  { id: 'top-rated', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/top%20rated%20agency.png", alt: "Top Rated Agency", width: 110, height: 45 },
  { id: 'meta', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/meta.png", alt: "Meta Partner", width: 115, height: 35 },
  { id: 'shopify-premier', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/69a92c79726adfa89004b8bf_Badge%20Premier%20wht%20transpSmall%20%281%29.png", alt: "Shopify Premier", width: 140, height: 45 },
  { id: 'google', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/google.png", alt: "Google Partner", width: 120, height: 40 },
]

const NAV_3D = [
  { href: '/services/3d-rendering-beauty', label: 'Beauty & Makeup' },
  { href: '/services/3d-rendering-wellness', label: 'Wellness & Supplements' },
  { href: '/services/luxury-watches', label: 'Luxury Watches' },
  { href: '/services/fine-jewelry', label: 'Fine Jewelry' },
  { href: '/services/seed-startups', label: 'Seed Startups' },
]

const NAV_GROWTH = [
  { href: '/services/performance-creative-management', label: 'Performance Management' },
  { href: '/services/social-ads-beauty', label: 'Social Ad Creatives' },
  { href: '/services/supplement-explainers', label: '3D Explainer Videos' },
  { href: '/services/amazon-wellness', label: 'Amazon Listing Packs' },
  { href: '/services/luxury-brand-films', label: 'Cinematic Brand Films' },
]

const NAV_MARKETS = [
  { href: '/us', label: 'United States' },
  { href: '/uk', label: 'United Kingdom' },
  { href: '/ca', label: 'Canada' },
  { href: '/au', label: 'Australia' },
  { href: '/ae', label: 'UAE' },
]

const NAV_EUROPE = [
  { href: '/de', label: 'Germany' },
  { href: '/fr', label: 'France' },
  { href: '/nl', label: 'Netherlands' },
  { href: '/se', label: 'Sweden' },
  { href: '/ch', label: 'Switzerland' },
]

const NAV_STUDIO = [
  { href: '/locations', label: 'All Locations' },
  { href: '/services', label: 'All Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

function FooterNav({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4
        className="mb-4 text-xs font-semibold uppercase tracking-wider"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm transition-colors duration-[var(--transition-base)] hover:opacity-100"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
    >
      {/* Partner logos */}
      <div className="w-full py-10 border-b" style={{ background: '#0E1410', borderColor: '#1a1f1b' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 md:flex md:flex-wrap md:justify-between md:gap-12">
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.id}
                className="relative flex items-center justify-center opacity-60 hover:opacity-90"
                style={{ transition: 'opacity var(--transition-base)' }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain max-h-10 md:max-h-11 w-auto"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3
              className="font-semibold text-lg mb-3"
              style={{ color: 'var(--foreground)' }}
            >
              Skitbit<span className="text-xs">®</span>
            </h3>
            <p
              className="text-xs mt-2 leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Trusted by brands including Messika Paris, Myntra, BellaVita, Rimowa, and The Man Company.
            </p>
          </div>
          <FooterNav title="3D Rendering" links={NAV_3D} />
          <FooterNav title="Growth Assets" links={NAV_GROWTH} />
          <FooterNav title="Markets" links={NAV_MARKETS} />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <FooterNav title="Europe" links={NAV_EUROPE} />
          <FooterNav title="Studio Locations" links={NAV_STUDIO} />
        </div>

        {/* Legal */}
        <div
          className="border-t pt-8 flex flex-col items-center gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p
            className="text-sm text-center font-medium"
            style={{ color: 'var(--muted-foreground)' }}
          >
            © {new Date().getFullYear()} Skitbit International Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
            <Link
              href="/privacy-policy"
              className="hover:opacity-100 opacity-70"
              style={{ transition: 'opacity var(--transition-base)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:opacity-100 opacity-70"
              style={{ transition: 'opacity var(--transition-base)' }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}