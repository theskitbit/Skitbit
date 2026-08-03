'use client'

import { motion } from 'framer-motion'

const logos = [
  {
    name: 'Gruns',
    type: 'image' as const,
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/gruns%20Logo.webp',
  },
  {
    name: 'Hexagon',
    type: 'image' as const,
    src: 'https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/hexagon_logo_new_115x.avif',
  },
  // TODO: replace with real logo URLs as you get them — swap type to 'image' and add src
  { name: 'Palladio', type: 'text' as const, src: '' },
  { name: 'Messika', type: 'text' as const, src: '' },
  { name: 'Victorinox', type: 'text' as const, src: '' },
  { name: 'Rimowa', type: 'text' as const, src: '' },
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

        {/* Seamless scrolling track: duplicated content, animates 0% -> -50% */}
        <motion.div
          className="flex w-max gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-4 whitespace-nowrap px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              {logo.type === 'image' ? (
                <div className="flex items-center justify-center h-12 w-auto">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="h-8 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-foreground/10 text-xs font-bold text-foreground/70">
                  {logo.name.substring(0, 2)}
                </div>
              )}
              <span className="text-sm font-medium text-foreground/70 opacity-0 hover:opacity-100 transition-opacity">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}