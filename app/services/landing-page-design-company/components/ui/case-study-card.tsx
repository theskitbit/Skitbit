import { motion } from 'framer-motion'
import { StatBadge } from './stat-badge'

interface CaseStudyCardProps {
  logo: string
  cvrIncrease: string
  advIncrease: string
  image: string
  delay?: number
}

export function CaseStudyCard({
  logo,
  cvrIncrease,
  advIncrease,
  image,
  delay = 0,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className="border border-border overflow-hidden flex flex-col"
    >
      {/* Image placeholder */}
      <div className="bg-muted h-64 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={logo}
          className="w-full h-full object-cover opacity-50"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 border-t border-border flex-grow flex flex-col">
        <p className="font-bold mb-6">{logo}</p>
        <div className="space-y-6">
          <StatBadge label="CVR" value={`+${cvrIncrease}`} />
          <StatBadge label="ADV" value={advIncrease} />
        </div>
      </div>
    </motion.div>
  )
}
