'use client'

import Image from 'next/image'
import Link from 'next/link'

const PARTNER_LOGOS = [
  { id: 'top-rated', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/top%20rated%20agency.png", alt: "Top Rated Agency", width: 110, height: 45 },
  { id: 'meta', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/meta.png", alt: "Meta Partner", width: 115, height: 35 },
  { id: 'shopify-premier', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/69a92c79726adfa89004b8bf_Badge%20Premier%20wht%20transpSmall%20%281%29.png", alt: "Shopify Premier", width: 140, height: 45 },
  { id: 'google', src: "https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/google.png", alt: "Google Partner", width: 120, height: 40 }
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-24">
      {/* Logos Strip */}
      <div className="w-full bg-[#0E1410] py-10 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 md:flex md:flex-wrap md:justify-between md:gap-12">
            {PARTNER_LOGOS.map((logo) => (
              <div key={logo.id} className="relative flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="object-contain max-h-10 md:max-h-11 w-auto" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Skitbit<span className="text-xs">®</span></h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Trusted by brands including Messika Paris, Myntra, BellaVita, Rimowa, and The Man Company.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">3D Rendering</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services/3d-rendering-beauty" className="hover:text-foreground transition-all">Beauty & Makeup</Link></li>
              <li><Link href="/services/3d-rendering-wellness" className="hover:text-foreground transition-all">Wellness & Supplements</Link></li>
              <li><Link href="/services/luxury-watches" className="hover:text-foreground transition-all">Luxury Watches</Link></li>
              <li><Link href="/services/fine-jewelry" className="hover:text-foreground transition-all">Fine Jewelry</Link></li>
              <li><Link href="/services/seed-startups" className="hover:text-foreground transition-all">Seed Startups</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Growth Assets</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services/performance-creative-management" className="hover:text-foreground transition-all">Performance Management</Link></li>
              <li><Link href="/services/social-ads-beauty" className="hover:text-foreground transition-all">Social Ad Creatives</Link></li>
              <li><Link href="/services/supplement-explainers" className="hover:text-foreground transition-all">3D Explainer Videos</Link></li>
              <li><Link href="/services/amazon-wellness" className="hover:text-foreground transition-all">Amazon Listing Packs</Link></li>
              <li><Link href="/services/luxury-brand-films" className="hover:text-foreground transition-all">Cinematic Brand Films</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Markets</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/us" className="hover:text-foreground transition-all">United States</Link></li>
              <li><Link href="/uk" className="hover:text-foreground transition-all">United Kingdom</Link></li>
              <li><Link href="/ca" className="hover:text-foreground transition-all">Canada</Link></li>
              <li><Link href="/au" className="hover:text-foreground transition-all">Australia</Link></li>
              <li><Link href="/ae" className="hover:text-foreground transition-all">UAE</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-8 border-t border-border">
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Europe</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/de" className="hover:text-foreground transition-all">Germany</Link></li>
              <li><Link href="/fr" className="hover:text-foreground transition-all">France</Link></li>
              <li><Link href="/nl" className="hover:text-foreground transition-all">Netherlands</Link></li>
              <li><Link href="/se" className="hover:text-foreground transition-all">Sweden</Link></li>
              <li><Link href="/ch" className="hover:text-foreground transition-all">Switzerland</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground uppercase tracking-wider">Studio Locations</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/locations" className="hover:text-foreground transition-all">All Locations</Link></li>
              <li><Link href="/services" className="hover:text-foreground transition-all">All Services</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-all">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-all">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-all">Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-border pt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground text-center font-medium">
            © {new Date().getFullYear()} Skitbit International Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-medium text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}