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
  const x = useMotionValue(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate item width + gap dynamically
  const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 272 : 280
  
  // Render enough duplicates so it takes a long time to hit the end visually
  const repeatedImages = [...sliderImages, ...sliderImages, ...sliderImages, ...sliderImages]
  const maxScroll = -((repeatedImages.length - 1) * step)

  const moveToIndex = useCallback((direction: 1 | -1) => {
    const currentX = x.get()
    // Find current snap index, then add direction
    const currentIndex = Math.round(currentX / step)
    let nextX = (currentIndex + direction) * step
    
    // Prevent scrolling past the ends
    if (nextX > 0) nextX = 0
    if (nextX < maxScroll) nextX = maxScroll

    animate(x, nextX, { type: 'spring', damping: 26, stiffness: 140 })
  }, [maxScroll, step, x])

  const pauseAutoPlay = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const startAutoPlay = useCallback(() => {
    pauseAutoPlay()
    timerRef.current = setTimeout(() => {
      moveToIndex(-1) // Move one step left
      startAutoPlay() // Schedule the next move
    }, 3000)
  }, [moveToIndex])

  // Handle play/pause on hover
  useEffect(() => {
    if (isHovered) {
      pauseAutoPlay()
    } else {
      startAutoPlay()
    }
    return pauseAutoPlay
  }, [isHovered, startAutoPlay])

  const handleDragEnd = (e: any, { velocity }: any) => {
    const currentX = x.get()
    
    // Use swipe velocity to predict the target snap point for a natural "flick" feel
    const targetX = currentX + velocity.x * 0.2
    const nextIndex = Math.round(targetX / step)
    
    let nextX = nextIndex * step
    if (nextX > 0) nextX = 0
    if (nextX < maxScroll) nextX = maxScroll

    animate(x, nextX, { type: 'spring', damping: 26, stiffness: 140 })
    
    // Restart the 3-second wait after dragging
    if (!isHovered) startAutoPlay()
  }

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16" aria-label="Featured product images">
      <div 
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        
        <div className="absolute right-6 top-4 z-20 flex gap-2 sm:right-8">
          <button 
            onClick={() => { moveToIndex(1); startAutoPlay(); }} 
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary" 
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => { moveToIndex(-1); startAutoPlay(); }} 
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary" 
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <motion.div 
          className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6" 
          style={{ x }} 
          drag="x" 
          dragConstraints={{ left: maxScroll, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={pauseAutoPlay}
          onDragEnd={handleDragEnd}
        >
          {repeatedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="relative h-80 w-64 shrink-0 cursor-grab overflow-hidden rounded-lg bg-muted active:cursor-grabbing">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover" 
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