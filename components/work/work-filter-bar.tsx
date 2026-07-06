// components/work/work-filter-bar.tsx
'use client'

import type { WorkType } from '@/lib/work-data'

const TYPE_TABS: { key: 'all' | WorkType; label: string }[] = [
  { key: 'all', label: 'All Work' },
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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 w-full">
      
      {/* Left side: Type tabs */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {TYPE_TABS.map((tab) => {
          const isActive = typeFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTypeChange(tab.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border ${
                isActive
                  // Using your theme's primary color, assuming it's mapped to the neon green/yellow
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-transparent text-foreground border-border hover:border-foreground/30 hover:bg-foreground/5'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Right side: Industry chips */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {/* Industry Label from screenshots */}
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase mr-1 sm:mr-2">
          Industry:
        </span>
        
        {/* Notice: "All Industries" button is removed to match the visual design 100%. 
          Instead, clicking an already active industry will toggle it off (back to 'all').
        */}
        {industries.map((industry) => {
          const isActive = industryFilter === industry;
          return (
            <button
              key={industry}
              type="button"
              onClick={() => {
                // Allow toggling off to reset the filter
                onIndustryChange(isActive ? 'all' : industry)
              }}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 border ${
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
  )
}