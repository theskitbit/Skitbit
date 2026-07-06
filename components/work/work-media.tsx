// components/work/work-media.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/work-data'

// Distance before a tile enters viewport where we start loading the src.
// Gives the browser a head start buffering before the tile is actually visible.
const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkMedia({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  const isVideo = item.type === 'animation'

  // Detect desktop (mouse) vs touch once on mount.
  useEffect(() => {
    setIsFinePointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
  }, [])

  // Observer 1: preload zone — assigns src before tile is near-visible.
  // No-ops for renders (images use native loading="lazy" instead).
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

  // Observer 2: actual viewport — play/pause + unload to free memory.
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current

        if (entry.isIntersecting) {
          // Mobile/touch: autoplay in view. Desktop: hover controls playback instead.
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

  // Render — plain lazy-loaded still image, 4:5.
  if (!isVideo) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-md bg-muted"
        style={{ aspectRatio: '4 / 5' }}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  // Animation — 9:16 video, hover-play desktop / in-view-play mobile.
  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden rounded-md bg-foreground/5"
      style={{ aspectRatio: '9 / 16' }}
    >
      {isLoaded ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      ) : (
        item.poster && (
          <img
            src={item.poster}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )
      )}
    </div>
  )
}