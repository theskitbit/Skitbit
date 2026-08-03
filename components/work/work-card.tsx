'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import type { WorkItem } from '@/lib/sanity/client'

export function WorkCard({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Separated states for clean logic
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false) // Tracks scroll (Mobile)
  const [isHovering, setIsHovering] = useState(false) // Tracks mouse (Desktop)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState<boolean | null>(null)

  const isVideo = item.type === 'animation'

  // 1. Safely detect device type on mount
  useEffect(() => {
    setIsFinePointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
  }, [])

  // 2. Observer 1: Preload zone (Mounts video 600px before it's seen)
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
        }
      },
      { rootMargin: '600px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo])

  // 3. Observer 2: Viewport (Tracks when it is actually on screen)
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        
        // Fallback: if they scrolled insanely fast, force load it
        if (entry.isIntersecting) {
          setIsLoaded(true)
        }
      },
      { rootMargin: '0px', threshold: 0.1 } // Triggers when 10% visible
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo])

  // Force the browser to start fetching data once mounted
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.load()
    }
  }, [isLoaded])

  // 4. The Brains: Determine intent based on the user's device
  // Desktop? Follow hover state. Mobile? Follow scroll state.
  const wantsToPlay =
    isFinePointer === null ? false : isFinePointer ? isHovering : isInView

  // 5. Play/Pause Manager
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isCancelled = false

    if (wantsToPlay) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isCancelled) {
              video.pause()
              video.currentTime = 0
            } else {
              setIsPlaying(true)
            }
          })
          .catch(() => {
            setIsPlaying(false)
          })
      }
    } else {
      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
    }

    return () => {
      isCancelled = true
    }
  }, [wantsToPlay, isLoaded]) 
  // ^ Adding `isLoaded` here is the secret sauce. It forces React to re-evaluate 
  // the playback rules the exact millisecond the video element finishes mounting.

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    if (isFinePointer) setIsHovering(true)
  }
  const handleMouseLeave = () => {
    if (isFinePointer) setIsHovering(false)
  }

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

  const showSpinner = isVideo && wantsToPlay && !isPlaying

  return (
    <div className="break-inside-avoid mb-4">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-lg bg-foreground/5"
        style={{ aspectRatio: '9 / 16' }}
      >
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
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {showSpinner && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[1px]">
            <div className="h-6 w-6 rounded-full border-2 border-background/40 border-t-background animate-spin" />
          </div>
        )}

        <div className="absolute top-3 right-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm z-10">
          <Play className="h-4 w-4 text-foreground fill-foreground" />
        </div>

        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-foreground/90 px-3 py-1.5 text-[10px] font-semibold text-background uppercase z-10">
          {item.formatTag}
        </div>
      </div>

      <Metadata />
    </div>
  )
}