// app/work/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { workItems, type WorkType } from '@/lib/work-data'
import { WorkFilterBar } from '@/components/work/work-filter-bar'
import { WorkMedia } from '@/components/work/work-media'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function WorkPage() {
  const [typeFilter, setTypeFilter] = useState<'all' | WorkType>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')

  const industries = useMemo(
    () => Array.from(new Set(workItems.map((i) => i.industry))).sort(),
    []
  )

  const filtered = useMemo(() => {
    return workItems.filter((item) => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter
      const industryMatch = industryFilter === 'all' || item.industry === industryFilter
      return typeMatch && industryMatch
    })
  }, [typeFilter, industryFilter])

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-[#0A192F]"> {/* Adjusted to match the cream/navy theme in your screenshots */}
      <Header />

      <section className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header & Subtitle */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] mb-4 text-[#0A192F]">
            Our Work
          </h1>
          <p className="text-lg text-gray-600/80 leading-relaxed md:max-w-md">
            Precision-crafted 3D experiences for high-growth brands.
          </p>
        </div>

        {/* Filter Bar */}
        <WorkFilterBar
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          industries={industries}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
        />

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <WorkMedia item={item} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No work found for this filter.
          </p>
        )}

        {/* Load More Button */}
        {filtered.length > 0 && (
          <div className="mt-20 flex justify-center pb-10">
            <button className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2">
              Load More
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}