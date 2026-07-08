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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 w-full min-w-0">
      
      {/* Left side: Type tabs */}
      <div className="flex items-center w-full lg:w-auto min-w-0">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center overflow-x-auto gap-2 md:gap-3 pb-2 lg:pb-0 pr-5 sm:pr-6 lg:pr-0 scrollbar-none">
            {TYPE_TABS.map((tab) => {
              const isActive = typeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onTypeChange(tab.key)}
                  className={`whitespace-nowrap shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-transparent text-foreground border-border hover:border-foreground/30 hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
            <div className="w-5 sm:w-6 lg:w-0 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Right side: Industry chips */}
      <div className="flex items-center w-full lg:w-auto min-w-0">
        <span className="shrink-0 text-[10px] sm:text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase mr-3">
          Industry:
        </span>
        
        <div className="flex-1 min-w-0 -mr-5 sm:-mr-6 lg:mr-0">
          <div className="flex items-center overflow-x-auto gap-2 md:gap-3 pb-2 lg:pb-0 scrollbar-none">
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
                      : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {industry}
                </button>
              )
            })}
            <div className="w-5 sm:w-6 lg:w-0 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
      
    </div>
  )
}