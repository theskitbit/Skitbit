import { cn } from '@/lib/utils'

interface StatBadgeProps {
  label: string
  value: string
  className?: string
}

export function StatBadge({ label, value, className }: StatBadgeProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-lg md:text-2xl font-black text-blue-600 mb-1">
        {value}
      </p>
      <p className="text-xs md:text-sm font-mono text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  )
}
