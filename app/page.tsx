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
import { getHomepageSettings, getMobileNavigation, getWorkItems } from '@/lib/sanity/client'

export default async function Home() {
  const [mobileNavigation, homepageSettings, workItems] = await Promise.all([
    getMobileNavigation(),
    getHomepageSettings(),
    getWorkItems(),
  ])
  const selectedHeroStills = homepageSettings?.heroStills?.length
    ? homepageSettings.heroStills
    : workItems.slice(0, 6)
  return (
    <main className="bg-background text-foreground">

      <AnnouncementBanner />
      <Header hasAnnouncement mobileNavigation={mobileNavigation} />
      <Hero />
      <LogoStrip />
      <FireworkWidget />
      <AboutEvent />
      <ProductShowcase campaigns={selectedHeroStills} />
      <WhatWeOffer />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
