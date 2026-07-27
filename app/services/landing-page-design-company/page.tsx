'use client'

import { LandingContactProvider } from './landing-contact'

// Ensure you move these v0 components into a local folder within this route
// e.g., app/services/landing-page-design-company/components/
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { CaseStudies } from './components/CaseStudies'
import { GuestList } from './components/GuestList'
import { BrandTechMarketing } from './components/BrandTechMarketing'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Qualifications } from './components/Qualifications'

function LandingPageContent() {
  return (
    <main className="relative min-h-screen bg-[#F4F4F0] text-neutral-900 selection:bg-[#E5FF00] selection:text-neutral-900">
      <Navbar />
      <Hero />
      <div id="receipts">
        <CaseStudies />
      </div>
      <GuestList />
      <div id="brand">
        <BrandTechMarketing />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="process">
        <Process />
      </div>
      <div id="why-cro">
        <Qualifications />
      </div>
      <Footer />
    </main>
  )
}

export default function D2CLandingPageRoute() {
  return (
    <LandingContactProvider>
      <LandingPageContent />
    </LandingContactProvider>
  )
}