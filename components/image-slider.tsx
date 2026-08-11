'use client'

import Image from 'next/image'

const sliderImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1607746882042-f3eed3584e94?w=400&h=500&fit=crop', alt: 'Product showcase 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop', alt: 'Product showcase 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1570194676174-79f2a8d3aa40?w=400&h=500&fit=crop', alt: 'Product showcase 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1596462502278-af3c37dba338?w=400&h=500&fit=crop', alt: 'Product showcase 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop', alt: 'Product showcase 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1506685408688-c7fb62413e61?w=400&h=500&fit=crop', alt: 'Product showcase 6' },
]

export function ImageSlider() {
  // We bundle 4 sets of images together to ensure the block is wide enough to cover any 4K/ultrawide monitor
  const imageBlock = [...sliderImages, ...sliderImages, ...sliderImages, ...sliderImages]

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-14 lg:py-16 pointer-events-none select-none" aria-label="Featured product images">
      
      {/* Injecting CSS Keyframes directly for guaranteed continuous scrolling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
          will-change: transform; /* Forces GPU acceleration for buttery smoothness */
        }
      `}</style>
      
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden flex">
        
        {/* Edge Gradients */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        
        {/* The Animated Track */}
        <div className="flex w-max animate-marquee">
          
          {/* BLOCK 1 */}
          <div className="flex shrink-0 gap-4 px-2 sm:gap-6 sm:px-3">
            {imageBlock.map((image, index) => (
              <div key={`block1-${image.id}-${index}`} className="relative h-80 w-64 shrink-0 overflow-hidden rounded-lg bg-muted">
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
          </div>

          {/* BLOCK 2: Exact duplicate of Block 1. 
              Translating the parent by -50% shifts Block 1 completely out of view 
              and puts Block 2 in its exact starting place for a mathematically flawless loop. */}
          <div className="flex shrink-0 gap-4 px-2 sm:gap-6 sm:px-3">
            {imageBlock.map((image, index) => (
              <div key={`block2-${image.id}-${index}`} className="relative h-80 w-64 shrink-0 overflow-hidden rounded-lg bg-muted">
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
          </div>

        </div>
      </div>
    </section>
  )
}