'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const sliderImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1607746882042-f3eed3584e94?w=400&h=500&fit=crop', alt: 'Product showcase 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop', alt: 'Product showcase 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1570194676174-79f2a8d3aa40?w=400&h=500&fit=crop', alt: 'Product showcase 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1596462502278-af3c37dba338?w=400&h=500&fit=crop', alt: 'Product showcase 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop', alt: 'Product showcase 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1506685408688-c7fb62413e61?w=400&h=500&fit=crop', alt: 'Product showcase 6' },
]

export function ImageSlider() {
  const [offset, setOffset] = useState(0)
  const [running, setRunning] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const step = 280
  const resume = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { setOffset((current) => current - step); setRunning(true) }, 2600)
  }
  useEffect(() => {
    if (!running) return
    resume()
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [running, offset])
  const move = (direction: 1 | -1) => setOffset((current) => current + direction * step)

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16" aria-label="Featured product images">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden" onMouseEnter={() => { setRunning(false); if (timer.current) clearTimeout(timer.current) }} onMouseLeave={() => { setRunning(true); resume() }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="absolute right-6 top-4 z-20 flex gap-2 sm:right-8"><button onClick={() => { setRunning(false); move(1) }} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground" aria-label="Previous image"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => { setRunning(false); move(-1) }} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground" aria-label="Next image"><ChevronRight className="h-5 w-5" /></button></div>
        <motion.div className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6" animate={{ x: offset }} transition={{ type: 'spring', damping: 22, stiffness: 100 }} drag="x" dragElastic={0.15} onDragStart={() => { setRunning(false); if (timer.current) clearTimeout(timer.current) }} onDragEnd={() => { setRunning(true); resume() }}>
          {[...sliderImages, ...sliderImages].map((image, index) => <div key={`${image.id}-${index}`} className="relative h-80 w-64 shrink-0 cursor-grab overflow-hidden rounded-lg bg-muted active:cursor-grabbing"><Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 160px, 256px" loading="lazy" quality={75} /></div>)}
        </motion.div>
      </div>
    </section>
  )
}
