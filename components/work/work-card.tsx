// components/work/work-card.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/sanity/client'

const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkCard({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  const isVideo = item.type === 'animation'

  useEffect(() => {
    setIsFinePointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
  }, [])

  // Preload observer
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsLoaded(true)
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo])

  // Viewport observer — play/pause/unload
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current

        if (entry.isIntersecting) {
          if (!isFinePointer && video) {
            video.play().catch(() => {})
          }
        } else {
          if (video) {
            video.pause()
            video.removeAttribute('src')
            video.load()
          }
          setIsLoaded(false)
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo, isFinePointer])

  const handleMouseEnter = () => {
    if (isFinePointer) videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    if (isFinePointer && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // Renders (still images)
  if (!isVideo) {
    return (
      <div className="break-inside-avoid mb-4">
        <div
          className="relative w-full overflow-hidden rounded-lg bg-muted"
          style={{ aspectRatio: '4 / 5' }}
        >
          <img
            src={item.mediaUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Mobile metadata */}
        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="text-xs text-foreground/60 line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground/70 uppercase">
              {item.fidelityTag}
            </span>
            {item.industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700 uppercase"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Animations (videos)
  return (
    <div className="break-inside-avoid mb-4">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-lg bg-foreground/5"
        style={{ aspectRatio: '9 / 16' }}
      >
        {isLoaded ? (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            poster={item.posterUrl}
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          item.posterUrl && (
            <img
              src={item.posterUrl}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )
        )}

        {/* Format tag overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold text-background uppercase">
          {item.formatTag}
        </div>
      </div>

      {/* Mobile metadata */}
      <div className="mt-3 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
        <p className="text-xs text-foreground/60 line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground/70 uppercase">
            {item.fidelityTag}
          </span>
          {item.industries.map((industry) => (
            <span
              key={industry}
              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700 uppercase"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}