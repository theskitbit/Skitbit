// app/work/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { getWorkItems, getUniqueIndustries, type WorkItem } from '@/lib/sanity/client'
import { WorkFilterBar } from '@/components/work/work-filter-bar'
import { WorkCard } from '@/components/work/work-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function WorkPage() {
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<'all' | 'animation' | 'render'>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')

  // Fetch work items from Sanity
  useEffect(() => {
    async function fetchWork() {
      try {
        const data = await getWorkItems()
        setItems(data)
      } catch (error) {
        console.error('Failed to fetch work items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWork()
  }, [])

  // Extract unique industries
  const industries = useMemo(() => {
    const all = new Set<string>()
    items.forEach((item) => {
      item.industries.forEach((ind) => all.add(ind))
    })
    return Array.from(all).sort()
  }, [items])

  // Apply filters
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter
      const industryMatch = industryFilter === 'all' || item.industries.includes(industryFilter)
      return typeMatch && industryMatch
    })
  }, [items, typeFilter, industryFilter])

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] mb-12">
            Our Work
          </h1>
          <p className="text-foreground/50">Loading...</p>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] mb-2">
            Our Work
          </h1>
          <p className="text-foreground/60">
            Precision-crafted 3D experiences for high-growth brands.
          </p>
        </div>

        <WorkFilterBar
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          industries={industries}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
        />

        {/* Masonry grid */}
        <div className="mt-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filtered.map((item) => (
              <WorkCard key={item._id} item={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-foreground/50 py-20">
              No work found for this filter. Try adjusting your selections.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}