'use client'

import { motion } from 'framer-motion'

export function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        <button className="flex items-center justify-center gap-2 border border-neutral-900 bg-[#E5FF00] px-8 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#D4EC00]">
          Book a call &rarr;
        </button>
        
        <button className="flex items-center justify-center gap-2 border border-neutral-900 bg-transparent px-8 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900/5">
          Run the math &darr;
        </button>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 sm:text-[11px]">
        REPLY WITHIN <span className="text-blue-600">24H</span> &middot; NO PITCH ON CALL #1
      </div>
    </motion.div>
  )
}
