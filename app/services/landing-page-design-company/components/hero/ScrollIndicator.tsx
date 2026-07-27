'use client'

import { motion } from 'framer-motion'

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="hidden md:flex flex-col items-center gap-3"
    >
      <p className="text-xs text-foreground/50 font-medium uppercase tracking-widest">
        Scroll to explore
      </p>

      {/* Animated scroll wheel */}
      <motion.div
        className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-1 h-2 bg-foreground/50 rounded-full"
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
