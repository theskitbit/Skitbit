'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'default' | 'outline' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  isExternal?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  isExternal = false,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-bold tracking-tight',
    'transition-all duration-200 ease-out',
    'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground',
    'border-0'
  )

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-base',
  }

  const variantStyles = {
    primary: 'bg-accent text-accent-foreground hover:bg-[#ffff00] active:scale-95',
    secondary: 'border-2 border-foreground text-foreground hover:bg-foreground/5 bg-transparent',
    default: 'bg-accent text-accent-foreground hover:bg-[#ffff00] active:scale-95',
    outline: 'border-2 border-foreground text-foreground hover:bg-foreground/5 bg-transparent',
    blue: 'bg-blue-accent text-blue-accent-foreground hover:bg-[#0000cc] active:scale-95',
  }

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClassName}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        {(variant === 'secondary' || variant === 'outline') && (
          <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }}>
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        )}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {(variant === 'secondary' || variant === 'outline') && (
        <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }}>
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.button>
  )
}
