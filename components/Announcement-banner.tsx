"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const messages = [
  "You have the campaign. We have the execution.",
  "Assets delivered on time, every time.",
  "Visuals that actually drive ad performance."
]

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isVisible || !isMounted) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 2500)

    return () => clearInterval(timer)
  }, [isVisible, isMounted])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative w-full bg-white border-b border-gray-200 z-[99999] overflow-hidden flex justify-center"
        >
          {/* 👇 Changed px-8 to px-3 to give more horizontal room on mobile */}
          <div className="flex items-center justify-center py-1.5 px-3 sm:px-10 w-full max-w-7xl relative">
            
            {/* 👇 Changed gap-3 to gap-1.5 on mobile */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-4">
              
              <div 
                className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-950 shrink-0" 
                style={{
                  WebkitMaskImage: 'url("https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/left%20wreath.svg")',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url("https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/left%20wreath.svg")',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
              
              {/* 👇 Changed w-[280px] to w-[230px] so it fits on small phones */}
              <div className="relative w-[230px] sm:w-[320px] h-5 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    // 👇 Changed text-sm to text-[11px] on mobile to prevent clipping
                    className="text-[11px] sm:text-sm font-medium text-blue-950 tracking-tight whitespace-nowrap block absolute"
                  >
                    {messages[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div 
                className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-950 shrink-0" 
                style={{
                  WebkitMaskImage: 'url("https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Right%20wreath.svg")',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url("https://k7fdlkciit9qv6j1.public.blob.vercel-storage.com/Right%20wreath.svg")',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
              />
            </div>

            <button
              onClick={() => setIsVisible(false)}
              // 👇 Changed right-2 to right-1 on mobile
              className="absolute right-1 sm:right-4 p-1 text-gray-400 hover:text-blue-950 transition-colors rounded-md"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}