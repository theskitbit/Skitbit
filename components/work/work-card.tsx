'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/sanity/client'

const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkCard({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false) // src has been assigned
  const [isReady, setIsReady] = useState(false)   // video can actually play (buffered)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [wantsToPlay, setWantsToPlay] = useState(false) // hover intent, even before ready

  const isVideo = item.type === 'animation'

  useEffect(() => {
    setIsFinePointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
  }, [])

  // Observer 1: Preload zone — load src 600px before viewport (scroll-based, passive)
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

  // Observer 2: Viewport visibility — mobile autoplay, desktop pause-on-exit
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current

        if (entry.isIntersecting) {
          if (!isFinePointer) {
            // Mobile: force-load immediately if not already loading, then play
            if (!isLoaded) setIsLoaded(true)
            setWantsToPlay(true)
          }
        } else {
          if (video) {
            video.pause()
            video.currentTime = 0
          }
          setIsPlaying(false)
          setWantsToPlay(false)
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo, isFinePointer, isLoaded])

  // Actually play once the video reports it's ready AND we still want it to play
  useEffect(() => {
    const video = videoRef.current
    if (!video || !wantsToPlay || !isReady) return

    video.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [wantsToPlay, isReady])

  // Desktop hover: instant load trigger + intent to play
  const handleMouseEnter = () => {
    if (!isFinePointer) return
    if (!isLoaded) setIsLoaded(true) // skip the 600px wait, load NOW
    setWantsToPlay(true)
  }

  const handleMouseLeave = () => {
    if (!isFinePointer) return
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setIsPlaying(false)
    setWantsToPlay(false)
  }

  // Fires when enough data is buffered to play smoothly
  const handleCanPlay = () => {
    setIsReady(true)
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

  // Renders (still images) — unchanged
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
  const showSpinner = isVideo && wantsToPlay && !isReady

  return (
    <div className="break-inside-avoid mb-4">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-lg bg-foreground/5"
        style={{ aspectRatio: '9 / 16' }}
      >
        {/* Poster stays mounted underneath until video is actually playing —
            this prevents any black/empty flash between states */}
        {item.posterUrl && (
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {isLoaded && (
          <video
            ref={videoRef}
            src={item.mediaUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={handleCanPlay}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Loading feedback — only shows when user is actively waiting (hovered/in-view but not ready) */}
        {showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[1px]">
            <div className="h-6 w-6 rounded-full border-2 border-background/40 border-t-background animate-spin" />
          </div>
        )}

        {/* Format tag overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold text-background uppercase z-10">
          {item.formatTag}
        </div>
      </div>

      <Metadata />
    </div>
  )
}