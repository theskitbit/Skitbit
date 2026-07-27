import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
  className?: string
}

export function NavLink({ href, label, className }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60',
        className
      )}
      whileHover={{ color: 'var(--foreground)' }}
    >
      {label}
    </motion.a>
  )
}
