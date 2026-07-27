'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProcessStepProps {
  number: string
  label: string
  title: string
  description: string
  delay?: number
  isLast?: boolean
}

export function ProcessStep({
  number,
  label,
  title,
  description,
  delay = 0,
  isLast = false,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className={cn(
        'flex flex-col p-8 md:p-10 lg:p-12',
        !isLast && 'border-b border-neutral-900/20 md:border-b-0 md:border-r'
      )}
    >
      {/* Massive Blue Mono Number */}
      <div className="font-mono text-[64px] font-bold leading-none tracking-tighter text-blue-600 lg:text-[80px]">
        {number}
      </div>

      {/* Label */}
      <div className="mb-4 mt-12 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        {label}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-xl font-medium tracking-tight text-neutral-900">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </motion.div>
  )
}