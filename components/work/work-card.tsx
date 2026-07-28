'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/sanity/client'

const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkCard({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  const isVideo = item.type === 'animation'

  // Detect desktop (fine pointer) vs mobile (touch)
  useEffect(() => {
    setIsFinePointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
  }, [])

  // Observer 1: Preload zone — load src 600px before viewport
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true)
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo, isLoaded])

  // Observer 2: Viewport visibility — auto-play on mobile, play/pause on desktop
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    const video = videoRef.current
    if (!el || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Mobile: autoplay when in view
          if (!isFinePointer) {
            video.play().catch(() => {})
            setIsPlaying(true)
          }
        } else {
          // Out of view: pause and reset for memory efficiency
          video.pause()
          video.currentTime = 0
          setIsPlaying(false)
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo, isFinePointer])

  // Desktop: hover triggers play, shows video (poster hides automatically)
  const handleMouseEnter = () => {
    if (!isFinePointer || !videoRef.current) return
    videoRef.current.play().catch(() => {})
    setIsPlaying(true)
  }

  // Desktop: mouse leave pauses and resets
  const handleMouseLeave = () => {
    if (!isFinePointer || !videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
  }

  // Metadata component
  const Metadata = () => (
    <div className="mt-3 space-y-2">
      <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
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
  )

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
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold text-background uppercase">
            {item.formatTag}
          </div>
        </div>

        <Metadata />
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
          <>
            {/* Video always muted and looping */}
            <video
              ref={videoRef}
              src={item.mediaUrl}
              poster={item.posterUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </>
        ) : (
          // Show poster while video is loading (preload zone)
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

      <Metadata />
    </div>
  )
}