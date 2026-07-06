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
    <div className="flex flex-col gap-4 mb-10">
      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTypeChange(tab.key)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              typeFilter === tab.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-foreground/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Industry chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onIndustryChange('all')}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
            industryFilter === 'all'
              ? 'bg-foreground text-background'
              : 'bg-transparent text-foreground/60 ring-1 ring-border hover:text-foreground'
          }`}
        >
          All Industries
        </button>
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => onIndustryChange(industry)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              industryFilter === industry
                ? 'bg-foreground text-background'
                : 'bg-transparent text-foreground/60 ring-1 ring-border hover:text-foreground'
            }`}
          >
            {industry}
          </button>
        ))}
      </div>
    </div>
  )
}