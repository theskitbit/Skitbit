import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  highlight?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  highlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className={cn(centered && 'text-center', 'mb-16 md:mb-20', className)}
    >
      <h2 className="text-4xl md:text-5xl font-black mb-4">
        {title}
        {highlight && <span className="text-blue-accent"> {highlight}</span>}
      </h2>
      {subtitle && <p className="text-2xl font-bold mb-4">{subtitle}</p>}
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  )
}
