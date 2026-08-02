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
          Landing pages built<br className="hidden sm:inline" /> for paid traffic.
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
          Convert more visitors<br className="hidden sm:inline" /> without spending more.
        </motion.span>
      </h1>
    </div>
  )
}