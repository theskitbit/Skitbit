// components/work/work-filter-bar.tsx
'use client'

import type { WorkType } from '@/lib/work-data'

const TYPE_TABS: { key: 'all' | WorkType; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'animation', label: '3D Animations' },
  { key: 'render', label: '3D Renders' },
]

interface WorkFilterBarProps {
  typeFilter: 'all' | WorkType
  onTypeChange: (t: 'all' | WorkType) => void
  industries: string[]
  industryFilter: string
  onIndustryChange: (industry: string) => void
}

export function WorkFilterBar({
  typeFilter,
  onTypeChange,
  industries,
  industryFilter,
  onIndustryChange,
}: WorkFilterBarProps) {
  return (
    // Note: Removed "overflow-hidden" from the parent so the negative margins can escape!
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 w-full">
      
      {/* Left side: Type tabs 
        - Bleeds off BOTH left and right edges on mobile (-mx-5)
        - Re-aligns the first/last item with padding (px-5)
      */}
      <div className="-mx-5 sm:-mx-6 lg:mx-0 w-full lg:w-auto">
        <div className="flex items-center overflow-x-auto gap-2 md:gap-3 pb-2 lg:pb-0 px-5 sm:px-6 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TYPE_TABS.map((tab) => {
            const isActive = typeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTypeChange(tab.key)}
                className={`whitespace-nowrap shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#D9FF00] text-[#0A192F] border-[#D9FF00]'
                    : 'bg-transparent text-foreground border-border hover:border-foreground/30 hover:bg-foreground/5'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right side: Industry chips
        - The text label stays locked in place.
        - The scrollable track bleeds off ONLY the right edge (-mr-5).
      */}
      <div className="flex items-center w-full lg:w-auto">
        <span className="shrink-0 text-[10px] sm:text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase mr-3">
          Industry:
        </span>
        
        {/* min-w-0 prevents the flex child from blowing past the screen width */}
        <div className="flex-1 min-w-0 -mr-5 sm:-mr-6 lg:mr-0">
          <div className="flex items-center overflow-x-auto gap-2 md:gap-3 pb-2 lg:pb-0 pr-5 sm:pr-6 lg:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {industries.map((industry) => {
              const isActive = industryFilter === industry;
              return (
                <button
                  key={industry}
                  type="button"
                  onClick={() => onIndustryChange(isActive ? 'all' : industry)}
                  className={`whitespace-nowrap shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-foreground/70 border-border hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {industry}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}