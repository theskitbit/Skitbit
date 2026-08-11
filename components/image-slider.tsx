'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [loopWidth, setLoopWidth] = useState(0)
  const x = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const speed = 50 // Pixels per second
  
  // Render 3 sets so there is never a visible blank edge when dragging aggressively
  const repeatedImages = [...sliderImages, ...sliderImages, ...sliderImages]

  // 1. Measure the exact DOM width of ONE set to prevent hardcoded math bugs (jerks)
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const children = trackRef.current.children
      if (children.length >= sliderImages.length + 1) {
        const first = children[0] as HTMLElement
        const nextSetFirst = children[sliderImages.length] as HTMLElement
        // Exact distance from Set 1 start to Set 2 start
        setLoopWidth(nextSetFirst.offsetLeft - first.offsetLeft)
      }
    }
    
    measure()
    // Small timeout to catch any late layout shifts from font/image loading
    const timer = setTimeout(measure, 200) 
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const startInfiniteLoop = useCallback(() => {
    if (!loopWidth) return
    animationRef.current?.stop()
    x.set(0)
    animationRef.current = animate(x, -loopWidth, {
      ease: 'linear',
      duration: loopWidth / speed,
      repeat: Infinity,
      repeatType: 'loop',
    })
  }, [loopWidth, x])

  const resume = useCallback(() => {
    if (!loopWidth) return
    animationRef.current?.stop()
    let current = x.get()

    // Seamlessly wrap the position if dragged way out of bounds
    if (current <= -loopWidth) {
      current = current % loopWidth
      x.set(current)
    } else if (current > 0) {
      current = 0
      x.set(current)
    }
    
    const distanceRemaining = loopWidth + current
    animationRef.current = animate(x, -loopWidth, {
      ease: 'linear',
      duration: distanceRemaining / speed,
      onComplete: startInfiniteLoop
    })
  }, [loopWidth, x, startInfiniteLoop])

  const pause = () => animationRef.current?.stop()

  useEffect(() => {
    if (loopWidth > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resume()
    }
    return pause
  }, [loopWidth, resume])

  const move = (direction: 1 | -1) => {
    pause()
    const current = x.get()
    const jumpWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 272 : 280
    const next = current + direction * jumpWidth
    
    animate(x, next, {
      type: 'spring', 
      damping: 24, 
      stiffness: 120, 
      onComplete: resume
    })
  }

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
          ref={trackRef}
          className="flex w-max gap-4 px-4 py-4 sm:gap-6 sm:px-6" 
          style={{ x }} 
          drag="x" 
          // Allows dragging far to the left without hitting a wall before it wraps on let go
          dragConstraints={{ left: loopWidth ? -(loopWidth * 2) : -10000, right: 0 }}
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
                draggable={false} // Prevents browser from "stealing" the drag gesture
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