'use client'

import { motion } from 'framer-motion'
import { Counter } from './Counter'
import { cn } from '@/lib/utils'

interface StatItem {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

const stats: StatItem[] = [
  { prefix: '+', value: 20, label: 'Min. Guaranteed Lift', suffix: '%' },
  { value: 450, label: 'Pages Shipped', suffix: '+' },
  { value: 98, label: 'NPS · 2025', suffix: '+' }, // Added the + suffix to match the image
]

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          className="flex flex-col gap-2"
        >
          {/* Applied the blue color and large font sizing to the Counter wrapper */}
          <div className="flex items-baseline gap-1 text-4xl font-light text-blue-600 sm:text-5xl md:text-6xl">
            <Counter
              from={0}
              to={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              duration={2.5}
              delay={0.5 + index * 0.1}
            />
          </div>
          {/* Updated to muted neutral color, uppercase, and wider tracking */}
          <p className="mt-1 text-[10px] font-medium tracking-widest text-neutral-500 uppercase sm:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
