'use client'

import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '@/lib/work-data'

const PRELOAD_ROOT_MARGIN = '600px 0px'

export function WorkMedia({ item }: { item: WorkItem }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const isVideo = item.type === 'animation'

  // Detect touch vs mouse capabilities
  useEffect(() => {
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      )
    }
    setIsTouchDevice(checkTouch())
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

  // Viewport observer
  useEffect(() => {
    if (!isVideo) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) setIsLoaded(true)
      },
      { rootMargin: '0px', threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo])

  // Buffer video once loaded
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      videoRef.current.load()
    }
  }, [isLoaded])

  // Determine intent based on device
  const wantsToPlay = isTouchDevice ? isInView : isHovering

  // Centralized playback manager
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isCancelled = false

    if (wantsToPlay && isLoaded) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isCancelled) {
              video.pause()
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
      setIsPlaying(false)
    }

    return () => {
      isCancelled = true
    }
  }, [wantsToPlay, isLoaded])

  const handleMouseEnter = () => !isTouchDevice && setIsHovering(true)
  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovering(false)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
    }
  }

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

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden rounded-md bg-foreground/5"
      style={{ aspectRatio: '9 / 16' }}
    >
      <video
        ref={videoRef}
        src={isLoaded ? item.src : undefined}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {item.poster && (
        <img
          src={item.poster}
          alt={item.alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      )}
    </div>
  )
}