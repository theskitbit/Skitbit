'use client'

import { motion } from 'framer-motion'

export function HeroHeading() {
  return (
    <div className="w-full">
      <h1 className="hero-heading text-neutral-900">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0,
            ease: 'easeOut',
          }}
          className="block"
        >
          Landing pages<br className="hidden sm:inline" /> that pays itself.
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: 'easeOut',
          }}
          className="block"
        >
          Make more money<br className="hidden sm:inline" /> from same ad spend
        </motion.span>
      </h1>
    </div>
  )
}