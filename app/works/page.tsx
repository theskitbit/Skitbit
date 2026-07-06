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
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] mb-10">
          Our Work
        </h1>

        <WorkFilterBar
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          industries={industries}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
        />

        {/* Masonry via CSS columns — handles mixed 9:16 / 4:5 without gaps */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <WorkMedia item={item} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/50 py-20">
            No work found for this filter.
          </p>
        )}
      </section>

      <Footer />
    </main>
  )
}