'use client'

import { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import Image from 'next/image'

interface GalleryImage {
  id: string
  src: string
  alt: string
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  images: GalleryImage[]
}

export function GalleryModal({
  isOpen,
  onClose,
  title,
  images,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showMobileFull, setShowMobileFull] = useState(false)
  const isMobile = useIsMobile()
  const touchStartX = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  if (!mounted || !isOpen) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
  }

  // Mobile grid view
  if (isMobile && !showMobileFull) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
        <div
          className="bg-primary rounded-2xl overflow-hidden flex flex-col w-full max-w-xs"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary border-b border-primary/20">
            <h2 className="text-xs font-semibold text-primary-foreground uppercase tracking-wider">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close gallery"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary-foreground"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-primary overflow-y-auto max-h-[60vh]">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setCurrentIndex(index)
                  setShowMobileFull(true)
                }}
                className={`relative aspect-[9/16] rounded overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-yellow-400 scale-105'
                    : 'opacity-70 hover:opacity-90'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mobile full-screen view
  if (isMobile && showMobileFull) {
    return (
      <div
        className="fixed inset-0 z-50 bg-background flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <button
            onClick={() => setShowMobileFull(false)}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            aria-label="Back to grid"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center bg-muted">
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Counter */}
        <div className="p-4 text-center text-sm text-muted-foreground border-t border-border">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    )
  }

  // Desktop view - split modal
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden flex w-full max-w-3xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - Large image (yellow background) - 70% */}
        <div className="flex-[7] bg-primary flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative aspect-[9/16] h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 left-4 text-xs text-primary-foreground/50 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 21 18 21 12 15 12"></polyline>
              <polyline points="9 6 3 6 3 12 9 12"></polyline>
              <line x1="9" y1="9" x2="15" y2="9"></line>
            </svg>
            Use arrow keys
          </div>
        </div>

        {/* Right side - Thumbnails + Header (white background) - 30% */}
        <div className="flex-[3] bg-white flex flex-col border-l border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close gallery"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-gray-600"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Thumbnails Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative aspect-[9/16] rounded overflow-hidden transition-all duration-200 ${
                    index === currentIndex
                      ? 'ring-2 ring-yellow-400'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="p-3 border-t border-border">
            <button className="w-full bg-foreground text-background font-semibold py-2.5 px-4 rounded-full hover:opacity-90 transition-opacity text-xs">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
