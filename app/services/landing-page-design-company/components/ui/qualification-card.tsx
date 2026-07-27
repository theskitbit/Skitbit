'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QualificationCardProps {
  icon: string
  title: string
  colorClass: string
  items: string[]
  delay?: number
  isLast?: boolean
}

// Helper to split the text and mute the parenthetical parts automatically
function formatListItem(text: string) {
  const parts = text.split(' (')
  if (parts.length === 2) {
    return (
      <>
        <span className="text-white">{parts[0]}</span>{' '}
        <span className="text-neutral-500">({parts[1]}</span>
      </>
    )
  }
  return <span className="text-white">{text}</span>
}

export function QualificationCard({
  icon,
  title,
  colorClass,
  items,
  delay = 0,
  isLast = false,
}: QualificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className={cn(
        "flex flex-col p-8 md:p-12 lg:p-16",
        !isLast && "border-b border-neutral-800 lg:border-b-0 lg:border-r"
      )}
    >
      {/* Card Heading */}
      <h3 className={cn('mb-12 flex items-center gap-3 text-3xl font-medium tracking-tight', colorClass)}>
        <span className="text-2xl font-semibold">{icon}</span>
        {title}
      </h3>

      {/* Monospace List */}
      <ul className="flex flex-col">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-4 border-b border-dashed border-neutral-800 py-6 first:border-t"
          >
            <span className="shrink-0 font-mono text-white">→</span>
            <span className="font-mono text-[11px] leading-relaxed tracking-wide sm:text-xs">
              {formatListItem(item)}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}