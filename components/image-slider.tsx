'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue } from 'framer-motion'

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

  useEffect(() => {
    // 256px width + 16px gap (mobile) = 272
    // 256px width + 24px gap (desktop) = 280
    const itemWidth = window.innerWidth < 640 ? 272 : 280
    const loopWidth = sliderImages.length * itemWidth
    const speed = 50 // Pixels per second

    const controls = animate(x, -loopWidth, {
      ease: 'linear',
      duration: loopWidth / speed,
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => controls.stop()
  }, [x])

  // Render 4 sets so it comfortably covers ultrawide monitors without visual gaps
  const repeatedImages = [...sliderImages, ...sliderImages, ...sliderImages, ...sliderImages]

  return (
    <section 
      className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16 pointer-events-none select-none" 
      aria-label="Featured product images"
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        
        {/* Edge Fade Gradients */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        
        {/* Pure Visual Layer */}
        <motion.div 
          style={{ x }} 
          className="flex w-max gap-4 px-4 py-4 sm:gap-6 sm:px-6"
        >
          {repeatedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="relative h-80 w-64 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                draggable={false}
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