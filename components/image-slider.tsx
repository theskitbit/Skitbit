'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue } from 'framer-motion'
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
  const x = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  
  // The exact same math logic from your Testimonials slider
  // 256px width + 16px gap (mobile) = 272
  // 256px width + 24px gap (desktop) = 280
  const loopWidth = sliderImages.length * (typeof window !== 'undefined' && window.innerWidth < 640 ? 272 : 280)
  const speed = 50 // Pixels per second

  const resume = () => {
    animationRef.current?.stop()
    let current = x.get()
    
    // Invisible Math Wrapping: Always keep the start position within one loop width.
    // This ensures the repeat: 'loop' animation never gets confused or runs out of track.
    if (current <= -loopWidth || current > 0) {
      current = current % loopWidth
      if (current > 0) current -= loopWidth
      x.set(current)
    }
    
    // The bulletproof infinite loop pattern
    animationRef.current = animate(x, current - loopWidth, {
      ease: 'linear',
      duration: loopWidth / speed,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    })
  }

  const pause = () => animationRef.current?.stop()

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resume()
    }
    return () => animationRef.current?.stop()
  }, [loopWidth])

  // Click handler for the arrows
  const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 272 : 280
  const move = (direction: 1 | -1) => {
    pause()
    let current = x.get()
    let next = current + direction * step
    
    // If clicking 'prev' pushes us into positive (blank space), invisibly wrap it first
    if (next > 0) {
      current -= loopWidth
      x.set(current)
      next = current + direction * step
    }
    
    animate(x, next, {
      type: 'spring', 
      damping: 24, 
      stiffness: 120,
    }).then(() => resume()) // Safely resume ONLY after the spring finishes
  }

  // Brute-force render 16 sets so even the most aggressive flick never hits a visual edge
  const repeatedImages = Array.from({ length: 16 }).flatMap(() => sliderImages)

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16" aria-label="Featured product images">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        
        <div className="absolute right-6 top-4 z-20 flex gap-2 sm:right-8">
          <button onClick={() => move(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-secondary" aria-label="Previous image">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => move(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-secondary" aria-label="Next image">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <motion.div 
          className="flex w-max gap-4 px-4 py-4 sm:gap-6 sm:px-6" 
          style={{ x }} 
          drag="x" 
          // Massive left constraint allows aggressive pulling; right constraint blocked at 0
          dragConstraints={{ left: -20000, right: 0 }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={pause}
          onDragEnd={resume}
        >
          {repeatedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="relative h-80 w-64 shrink-0 cursor-grab overflow-hidden rounded-lg bg-muted active:cursor-grabbing">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                draggable={false} 
                className="pointer-events-none object-cover"
                sizes="(max-width: 768px) 160px, 256px" 
                loading="lazy" 
                quality={75} 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}