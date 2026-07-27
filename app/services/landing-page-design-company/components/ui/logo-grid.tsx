import { motion } from 'framer-motion'

interface LogoGridProps {
  logos: string[]
  badge?: string
  title?: string
  description?: string
}

export function LogoGrid({
  logos,
  badge,
  title,
  description,
}: LogoGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="text-center mb-12">
        {title && (
          <h2 className="text-4xl md:text-5xl font-black mb-4">{title}</h2>
        )}
        {description && (
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {badge && (
          <div className="inline-block bg-blue-accent text-blue-accent-foreground px-4 py-2 text-sm font-bold">
            {badge}
          </div>
        )}
      </div>

      {/* Logos Grid */}
      <div className="border-2 border-border p-6 bg-card">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.05 }}
              className="border border-border p-4 flex items-center justify-center text-center text-sm font-semibold min-h-24"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
