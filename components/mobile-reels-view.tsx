'use client'

import { useEffect, useRef, useState } from 'react'
import { videos } from './video-modal'

interface MobileReelsViewProps {
  onClose: () => void
}

export function MobileReelsView({ onClose }: MobileReelsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // ✅ Native-feel scroll tracking (no jitter)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const index = Math.round(el.scrollTop / el.clientHeight)
          setCurrentIndex(index)
          ticking = false
        })
        ticking = true
      }
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-primary flex flex-col md:hidden">

      {/* HEADER - Fixed at top */}
      <div className="flex items-center justify-between px-4 py-4 bg-primary border-b border-primary/20">
        <h2 className="text-lg font-semibold text-primary-foreground">
          Product Videos
        </h2>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-foreground hover:bg-foreground/90 flex items-center justify-center text-background transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* SCROLL CONTAINER - One video at a time, no overlap */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-none"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {videos.map((video, index) => {
          const isActive = currentIndex === index
          const isNext = index === currentIndex + 1

          return (
            <div
              key={video.id}
              className="snap-center h-screen w-full flex flex-col items-center justify-center flex-shrink-0 px-4"
            >
              <div className="w-full max-w-sm flex flex-col gap-3">

                {/* VIDEO CARD - Fills visible area */}
                <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-muted shadow-lg">

                  {/* ACTIVE + PRELOAD NEXT */}
                  {(isActive || isNext) && (
                    <iframe
                      key={video.id}
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=${isActive ? 1 : 0}&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${video.id}`}
                      allow="autoplay; encrypted-media"
                    />
                  )}

                  {/* FALLBACK THUMBNAIL */}
                  {!isActive && !isNext && (
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* PLAY OVERLAY - Only show when not active */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center text-foreground shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* TEXT - Below video */}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-primary-foreground">
                    {video.title}
                  </p>
                  <p className="text-xs text-primary-foreground/70">
                    {video.category} • {video.duration}
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
