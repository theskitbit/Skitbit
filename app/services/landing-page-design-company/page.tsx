'use client'

import { LandingContactProvider } from './landing-contact'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { CaseStudies } from './components/sections/CaseStudies'
import { GuestList } from './components/sections/GuestList'
import { Testimonials } from './components/sections/Testimonials'
import { BrandTechMarketing } from './components/sections/BrandTechMarketing'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { Qualifications } from './components/sections/Qualifications'

function LandingPageContent() {
  return (
    <main className="relative min-h-screen bg-[#F4F4F0] text-neutral-900 selection:bg-[#E5FF00] selection:text-neutral-900">
      <Navbar />
      <Hero />
      <div id="receipts">
        <CaseStudies />
      </div>
      <GuestList />
      <Testimonials />
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