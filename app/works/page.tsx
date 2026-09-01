// app/works/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getWorkItems, getUniqueIndustries, type WorkItem } from '@/lib/sanity/client'
import { WorkFilterBar } from '@/components/work/work-filter-bar'
import { WorkCard } from '@/components/work/work-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function WorkPage({ campaigns }: { campaigns?: WorkItem[] }) {
  const [items, setItems] = useState<WorkItem[]>(campaigns ?? [])
  const [loading, setLoading] = useState(!campaigns)
  const [typeFilter, setTypeFilter] = useState<'all' | 'animation' | 'render'>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [pendingSlug, setPendingSlug] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    if (campaigns) {
      setItems(campaigns)
      setLoading(false)
      return
    }

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
  }, [campaigns])

  const industries = useMemo(() => {
    const all = new Set<string>()
    items.forEach((item) => {
      item.industries.forEach((ind) => all.add(ind))
    })
    return Array.from(all).sort()
  }, [items])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter
      const industryMatch = industryFilter === 'all' || item.industries.includes(industryFilter)
      return typeMatch && industryMatch
    })
  }, [items, typeFilter, industryFilter])

  useEffect(() => {
    setVisibleCount(6)
  }, [typeFilter, industryFilter])

  const visibleItems = filtered.slice(0, visibleCount)

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        {/* MATCHED PADDING HERE: pt-32 mobile, pt-40 desktop */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24" aria-busy="true">
          <header className="mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] mb-2">
              Our Work
            </h1>
          </header>
          <p className="text-foreground/50">Loading projects...</p>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* INCREASED PADDING: pt-32 (128px) on mobile, pt-40 (160px) on desktop to clear fixed header */}
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        
        {/* INCREASED MARGIN: mb-12 on mobile, mb-16 on desktop for breathing room before filters */}
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] mb-3">
            Our Work
          </h1>
          <p className="text-foreground/60 text-lg">
            Precision-crafted 3D experiences for high-growth brands.
          </p>
        </header>

        <WorkFilterBar
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          industries={industries}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
        />

        <div className="mt-12 md:mt-16" aria-live="polite">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {visibleItems.map((item) => (
              <Link
                key={item._id}
                href={`/works/${item.slug.current}`}
                onClick={() => setPendingSlug(item.slug.current)}
                aria-label={`Open project: ${item.title}`}
                className={`group relative block break-inside-avoid rounded-lg transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 active:scale-[0.985] ${pendingSlug === item.slug.current ? 'pointer-events-none' : ''}`}
                aria-busy={pendingSlug === item.slug.current}
              >
                <WorkCard item={item} />
                {pendingSlug === item.slug.current && (
                  <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-background/35 backdrop-blur-[2px]" role="status" aria-live="polite">
                    <span className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg">Opening project…</span>
                  </span>
                )}
              </Link>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center break-inside-avoid">
              <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full border border-foreground/20 bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                Load More
              </button>
            </div>
          )}

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
