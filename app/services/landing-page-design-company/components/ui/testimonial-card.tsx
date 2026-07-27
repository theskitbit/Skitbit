import { motion } from 'framer-motion'
import Image from 'next/image'

interface TestimonialCardProps {
  author: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
  delay?: number
}

export function TestimonialCard({
  author,
  role,
  company,
  content,
  avatar,
  rating,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className="border border-border p-6 flex flex-col h-full"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-xl">
            ⭐
          </span>
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-foreground mb-6 flex-grow">{content}</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="font-bold text-sm">{author}</p>
          <p className="text-xs text-muted-foreground">
            {role} · {company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
