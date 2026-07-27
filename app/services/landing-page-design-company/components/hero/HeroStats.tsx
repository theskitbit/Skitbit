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
  { value: 98, label: 'NPS · 2025', suffix: '+' },
]

export function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-3 w-full items-start gap-3 sm:gap-6 md:gap-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          className="flex flex-col gap-1 sm:gap-2"
        >
          <div className="flex items-baseline gap-0.5 text-2xl font-light text-blue-600 sm:text-4xl md:text-5xl lg:text-6xl">
            <Counter
              from={0}
              to={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              duration={2.5}
              delay={0.5 + index * 0.1}
            />
          </div>
          <p className="text-[9px] font-medium tracking-wider text-neutral-500 uppercase leading-snug sm:text-[10px] md:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}