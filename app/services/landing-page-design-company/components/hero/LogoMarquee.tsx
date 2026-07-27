'use client'

import { motion } from 'framer-motion'

const logos = [
  'Acme',
  'Tech Co',
  'StartUp',
  'Enterprise',
  'Digital',
  'Cloud',
  'Acme',
  'Tech Co',
]

export function LogoMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-4"
    >
      <p className="text-sm text-foreground/50 font-medium uppercase tracking-wider">
        Trusted by leading companies
      </p>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient fade on left */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Gradient fade on right */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <motion.div
          className="flex gap-8"
          animate={{ x: [-500, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo}-${index}`}
              className="flex items-center gap-4 whitespace-nowrap px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-foreground/10 text-xs font-bold text-foreground/70">
                {logo.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-foreground/70 opacity-0 hover:opacity-100 transition-opacity">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex gap-8"
          animate={{ x: [-500, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={`${logo}-${index}-2`}
              className="flex items-center gap-4 whitespace-nowrap px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-foreground/10 text-xs font-bold text-foreground/70">
                {logo.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-foreground/70 opacity-0 hover:opacity-100 transition-opacity">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
