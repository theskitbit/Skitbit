'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

type Currency = 'INR' | 'USD'

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('INR')
  const [openBreakdown, setOpenBreakdown] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code !== 'IN') setCurrency('USD')
      })
      .catch(() => { })
  }, [])

  const getWhatsAppLink = (plan: string, price: string, intent: string) => {
    const message = encodeURIComponent(
      `Hey, I'm interested in the ${plan} (${price}). ${intent}`
    )
    return `https://wa.me/91XXXXXXXXXX?text=${message}`
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Header />

      {/* TITLE */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Simple pricing. <span className="italic font-light">No guesswork.</span>
          </h1>

          <p className="text-muted-foreground max-w-md">
            Send your product once — get everything needed for ads, website, and campaigns.
          </p>

          <p className="text-xs text-muted-foreground">
            Fixed scope. Fast delivery. No surprises.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">

          {/* HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden">

            {/* CORE */}
            <div className="bg-primary p-10 lg:p-14 flex flex-col justify-between">

              <div>
                <span className="text-xs border border-primary-foreground/40 text-primary-foreground rounded-full px-3 py-1 mb-6 inline-block">
                  Core Offer
                </span>

                <h2 className="text-4xl font-bold text-primary-foreground">
                  Product Content System
                </h2>

                <p className="text-primary-foreground/80 mt-4 max-w-md">
                  Complete product content system — built once, reused everywhere.
                </p>
              </div>

              {/* 💣 BULLETPROOF CTA */}
              <div className="mt-10 w-full">

                <div className="text-5xl font-bold text-primary-foreground mb-4">
                  {currency === 'INR' ? '₹69,000' : '$850'}
                </div>

                <div className="w-full max-w-full">
                  <button
                    onClick={() =>
                      window.open(
                        getWhatsAppLink(
                          'Product Content System',
                          currency === 'INR' ? '₹69,000' : '$850',
                          'We need a complete system.'
                        ),
                        '_blank'
                      )
                    }
                    className="w-full md:w-[260px] block mx-auto md:mx-0 text-center
                    bg-primary-foreground text-primary px-6 py-3.5 rounded-full text-sm font-semibold
                    hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition"
                  >
                    Get Started
                  </button>
                </div>

                <button
                  onClick={() => setOpenBreakdown('core')}
                  className="mt-3 w-full text-center md:text-left text-xs text-primary-foreground/70 underline"
                >
                  See what’s included →
                </button>

              </div>
            </div>

            {/* VISUAL */}
            <div className="bg-primary p-4 flex gap-3">
              <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[260px]">
                <Image src="/images/Before.webp" alt="" fill className="object-cover" />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[260px]">
                <Image src="/images/After.webp" alt="" fill className="object-cover" />
              </div>
            </div>

          </div>

          {/* LOWER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* STARTER */}
            <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between">

              <div>
                <h3 className="text-2xl font-bold">Starter System</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Build your base.
                </p>
              </div>

              <div className="mt-8 w-full">

                <div className="text-3xl font-bold mb-4">
                  {currency === 'INR' ? '₹29,000' : '$350'}
                </div>

                <button
                  className="w-full md:w-[200px] block mx-auto md:mx-0 text-center
                  bg-foreground text-white py-3.5 rounded-full text-sm font-semibold
                  hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  Try This
                </button>

                <button
                  onClick={() => setOpenBreakdown('starter')}
                  className="mt-3 w-full text-center md:text-left text-xs underline text-muted-foreground"
                >
                  See what’s included →
                </button>

              </div>
            </div>

            {/* GROWTH */}
            <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between">

              <div>
                <h3 className="text-2xl font-bold">Growth Content Engine</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Scale faster.
                </p>
              </div>

              <div className="mt-8 w-full">

                <div className="text-3xl font-bold mb-4">
                  {currency === 'INR' ? '₹99,000' : '$1200'}
                </div>

                <button
                  className="w-full md:w-[220px] block mx-auto md:mx-0 text-center
                  bg-foreground text-white py-3.5 rounded-full text-sm font-semibold
                  hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  Scale Now
                </button>

                <button
                  onClick={() => setOpenBreakdown('growth')}
                  className="mt-3 w-full text-center md:text-left text-xs underline text-muted-foreground"
                >
                  See what’s included →
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}