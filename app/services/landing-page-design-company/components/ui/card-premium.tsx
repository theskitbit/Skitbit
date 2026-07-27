import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardPremiumProps {
  children: ReactNode
  className?: string
  highlighted?: boolean
  variant?: 'default' | 'dark' | 'bordered'
  delay?: number
}

export function CardPremium({
  children,
  className,
  highlighted = false,
  variant = 'default',
  delay = 0,
}: CardPremiumProps) {
  const variantStyles = {
    default:
      'border-2 border-border bg-background hover:border-foreground/30 transition-colors',
    dark: 'bg-foreground text-background border-2 border-foreground',
    bordered: 'border-2 border-border',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className={cn(
        'p-6 flex flex-col',
        highlighted ? variantStyles.dark : variantStyles[variant],
        className
      )}
    >
      {children}
    </motion.div>
  )
}
