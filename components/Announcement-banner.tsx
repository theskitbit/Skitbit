"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-full bg-white border-b border-gray-100 overflow-hidden"
        >
          {/* Banner Content Container */}
          <div className="flex items-center gap-3 py-3 px-12 sm:px-6 lg:px-8">
            {/* Blue Icon Square */}
            <div className="flex items-center justify-center w-[26px] h-[26px] bg-[#1a4eff] text-white shrink-0">
              {/* Custom SVG mimicking the laurel wreath from image_702a93.png */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4"
              >
                <path d="M12 15c-2 0-4-1.5-4-3s1.5-3 3-3c.5 0 1 .1 1.5.3" />
                <path d="M12 15c2 0 4-1.5 4-3s-1.5-3-3-3c-.5 0-1 .1-1.5.3" />
                <path d="M7 6.5C5.5 8 4 10.5 4 13.5c0 4 3 6.5 8 8 5-1.5 8-4 8-8 0-3-1.5-5.5-3-7" />
              </svg>
            </div>
            
            {/* Text */}
            <p className="text-[15px] font-normal text-black tracking-tight">
              Motion Recognized by Motion Design Awards.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1.5 text-gray-400 hover:text-black transition-colors rounded-md"
            aria-label="Close announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}