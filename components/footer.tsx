// components/footer.tsx
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
      {/* Replaced inline style with text-foreground */}
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            {/* Replaced inline style with text-muted-foreground and Tailwind transition */}
            <Link
              href={href}
              className="text-sm transition-colors duration-200 hover:opacity-100 hover:text-foreground text-muted-foreground"
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
  const handlePrivacyReset = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear the stored consent and refresh so the banner reappears
    localStorage.removeItem('skitbit-cookie-consent');
    window.location.reload();
  };

  return (
    // Replaced inline background and border colors
    <footer className="border-t mt-24 bg-background border-border">
      
      {/* Partner logos - Converted specific hex codes to arbitrary Tailwind classes */}
      <div className="w-full py-10 border-b bg-[#0E1410] border-[#1a1f1b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 md:flex md:flex-wrap md:justify-between md:gap-12">
            {PARTNER_LOGOS.map((logo) => (
              // Replaced inline transition with Tailwind utilities
              <div
                key={logo.id}
                className="relative flex items-center justify-center opacity-60 transition-opacity duration-200 hover:opacity-90"
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
            {/* Replaced inline styles */}
            <h3 className="font-semibold text-lg mb-3 text-foreground">
              Skitbit<span className="text-xs">®</span>
            </h3>
            <p className="text-xs mt-2 leading-relaxed text-muted-foreground">
              Trusted by brands including Messika Paris, Myntra, BellaVita, Rimowa, and The Man Company.
            </p>
          </div>
          <FooterNav title="3D Rendering" links={NAV_3D} />
          <FooterNav title="Growth Assets" links={NAV_GROWTH} />
          <FooterNav title="Markets" links={NAV_MARKETS} />
        </div>

        {/* Replaced inline border color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-8 border-t border-border">
          <FooterNav title="Europe" links={NAV_EUROPE} />
          <FooterNav title="Studio Locations" links={NAV_STUDIO} />
        </div>

        {/* Legal - Replaced inline borders, text colors, and transitions */}
        <div className="border-t border-border pt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-center font-medium text-muted-foreground">
            © {new Date().getFullYear()} Skitbit International Group. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center text-xs font-medium text-muted-foreground">
            <Link
              href="/privacy-policy"
              className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <span className="opacity-30">•</span>
            <Link
              href="/terms-of-service"
              className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
            >
              Terms of Service
            </Link>
            <span className="opacity-30">•</span>
            <Link
              href="/cookie-policy"
              className="hover:opacity-100 opacity-70 transition-opacity duration-200 hover:text-foreground"
            >
              Cookie Policy
            </Link>
            <span className="opacity-30">•</span>
            <button
              onClick={handlePrivacyReset}
              className="hover:opacity-100 opacity-70 cursor-pointer transition-opacity duration-200 hover:text-foreground"
            >
              Do Not Sell or Share My Personal Information
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}