'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import type { WorkItem } from '@/lib/sanity/client'

const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkCard({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [wantsToPlay, setWantsToPlay] = useState(false)

  const isVideo = item.type === 'animation'

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

  // Observer 2: Viewport visibility — ONLY for mobile autoplay
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current

        if (entry.isIntersecting) {
          // ONLY mobile gets autoplay on scroll
          if (!isFinePointer) {
            if (!isLoaded) setIsLoaded(true)
            setWantsToPlay(true)
          }
        } else {
          // Out of view: stop everything
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

  // Play when ready + user wants it
  useEffect(() => {
    const video = videoRef.current
    if (!video || !wantsToPlay || !isReady) return

    video.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [wantsToPlay, isReady])

  // DESKTOP ONLY: Hover triggers play (early return on mobile)
  const handleMouseEnter = () => {
    if (!isFinePointer) return // Mobile: ignore hover completely
    if (!isLoaded) setIsLoaded(true)
    setWantsToPlay(true)
  }

  // DESKTOP ONLY: Hover ends = stop video
  const handleMouseLeave = () => {
    if (!isFinePointer) return // Mobile: ignore hover completely
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setIsPlaying(false)
    setWantsToPlay(false)
  }

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
  const showSpinner = isVideo && wantsToPlay && !isReady

  return (
    <div className="break-inside-avoid mb-4">
      <div
        ref={containerRef}
        // ONLY attach hover on desktop — mobile has no handlers
        onMouseEnter={isFinePointer ? handleMouseEnter : undefined}
        onMouseLeave={isFinePointer ? handleMouseLeave : undefined}
        className="relative w-full overflow-hidden rounded-lg bg-foreground/5"
        style={{ aspectRatio: '9 / 16' }}
      >
        {/* Poster background */}
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

        {/* Video */}
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

        {/* Loading spinner */}
        {showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[1px]">
            <div className="h-6 w-6 rounded-full border-2 border-background/40 border-t-background animate-spin" />
          </div>
        )}

        {/* Play icon badge — ALWAYS visible on videos to signal they're interactive */}
        <div className="absolute top-3 right-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm z-10">
          <Play className="h-4 w-4 text-foreground fill-foreground" />
        </div>

        {/* Format tag overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold text-background uppercase z-10">
          {item.formatTag}
        </div>
      </div>

      <Metadata />
    </div>
  )
}