'use client'

import { motion } from 'framer-motion'
import { Button } from './button-premium'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  label: string
  description: string
  features: string[]
  price?: string
  highlighted?: boolean
  cta?: string
  delay?: number
  onCtaClick?: () => void
}

export function ServiceCard({
  title,
  label,
  description,
  features,
  price,
  highlighted = false,
  cta = 'Learn more',
  delay = 0,
  onCtaClick,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className={cn(
        'flex h-full flex-col p-8 transition-all md:p-10',
        highlighted
          ? 'bg-[#0A0A0A] text-white'
          : 'bg-transparent text-neutral-900'
      )}
    >
      {/* Top Section: Label & Title */}
      <div className={cn(
        "pb-8 border-b",
        highlighted ? "border-neutral-800" : "border-neutral-900/20"
      )}>
        <div
          className={cn(
            'mb-6 text-[10px] font-mono tracking-widest uppercase',
            highlighted ? 'text-[#E5FF00]' : 'text-neutral-500'
          )}
        >
          {label}
        </div>
        <h3 className="text-3xl font-medium leading-tight tracking-tight pr-4">
          {title}
        </h3>
      </div>

      {/* Middle Section: Price & Description */}
      <div className="pt-8 flex-1">
        {price && (
          <div className="mb-6 flex items-center justify-between">
            <span className="text-neutral-600">Free</span>
            <span className="text-3xl font-medium text-blue-600">{price}</span>
          </div>
        )}
        <p
          className={cn(
            'text-sm leading-relaxed',
            highlighted ? 'text-neutral-300' : 'text-neutral-600'
          )}
        >
          {description}
        </p>
      </div>

      {/* Bottom Section: Features List */}
      <ul className="mt-12 flex flex-col">
        {features.map((feature, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-4 py-5 border-b border-dashed first:border-t",
              highlighted ? "border-neutral-800" : "border-neutral-300"
            )}
          >
            <span className="text-blue-600 shrink-0 font-sans">&rarr;</span>
            <span className="font-mono text-[11px] leading-relaxed tracking-wide">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}