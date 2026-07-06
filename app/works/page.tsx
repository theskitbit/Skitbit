// app/work/page.tsx
'use client'

import { useMemo, useState, useEffect } from 'react'
import { workItems, type WorkItem, type WorkType } from '@/lib/work-data'
import { WorkFilterBar } from '@/components/work/work-filter-bar'
import { WorkMedia } from '@/components/work/work-media'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function WorkPage() {
  const [typeFilter, setTypeFilter] = useState<'all' | WorkType>('all')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState(6)
  
  // 1. Initialize with real data so the Server HTML matches the Client HTML
  const [displayItems, setDisplayItems] = useState<WorkItem[]>(workItems)
  const [isMounted, setIsMounted] = useState(false)

  const industries = useMemo(
    () => Array.from(new Set(workItems.map((i) => i.industry))).sort(),
    []
  )

  // 2. Mark as mounted on the client safely
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const filtered = workItems.filter((item) => {
      const typeMatch = typeFilter === 'all' || item.type === typeFilter
      const industryMatch = industryFilter === 'all' || item.industry === industryFilter
      return typeMatch && industryMatch
    })

    // 3. Only run the random shuffle AFTER the component mounts to avoid hydration errors
    if (typeFilter === 'all' && isMounted) {
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      setDisplayItems(shuffled)
    } else {
      setDisplayItems(filtered)
    }
    
    setVisibleCount(6)
  }, [typeFilter, industryFilter, isMounted])

  const visibleItems = displayItems.slice(0, visibleCount)

  // Prevent rendering the UI until the client is mounted to absolutely guarantee no mismatch
  if (!isMounted) {
    return null // or a simple loading spinner if preferred
  }

  return (
    <main className="min-h-screen bg-[#F9F9F6] text-[#0A192F]">
      <Header />

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-12 md:pb-20">
        
        <div className="max-w-2xl mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] mb-4 text-[#0A192F]">
            Our Work
          </h1>
          <p className="text-lg text-gray-600/80 leading-relaxed md:max-w-md">
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

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {visibleItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <WorkMedia item={item} />
            </div>
          ))}
        </div>

        {displayItems.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No work found for this filter.
          </p>
        )}

        {displayItems.length > visibleCount && (
          <div className="mt-16 flex justify-center pb-10">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-[#0A192F] transition-colors flex items-center gap-2"
            >
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