"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Ensures component only renders on client to avoid Next.js SSR hydration bugs
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          // Removed shadow-sm from the className below
          className="relative w-full bg-white text-black border-b border-gray-200 z-[99999] overflow-hidden flex justify-center"
        >
          <div className="flex items-center justify-center gap-3 py-2.5 px-4 sm:px-10 text-center w-full max-w-7xl relative">
            
            {/* Blue Award Icon */}
            <div className="flex items-center justify-center w-6 h-6 bg-[#1a4eff] text-white shrink-0 rounded-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-3.5 h-3.5"
              >
                <path d="M12 15c-2 0-4-1.5-4-3s1.5-3 3-3c.5 0 1 .1 1.5.3" />
                <path d="M12 15c2 0 4-1.5 4-3s-1.5-3-3-3c-.5 0-1 .1-1.5.3" />
                <path d="M7 6.5C5.5 8 4 10.5 4 13.5c0 4 3 6.5 8 8 5-1.5 8-4 8-8 0-3-1.5-5.5-3-7" />
              </svg>
            </div>
            
            {/* Banner Text */}
            <span className="text-sm font-normal text-black tracking-tight">
              Motion Recognized by Motion Design Awards.
            </span>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-2 sm:right-4 p-1 text-gray-400 hover:text-black transition-colors rounded-md"
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