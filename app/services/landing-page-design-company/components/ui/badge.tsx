'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
        variant === 'default'
          ? 'bg-foreground/10 text-foreground'
          : 'border border-foreground/20 text-foreground/80',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
