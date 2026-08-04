'use client'

import { useEffect } from 'react'

export function ThemeDetector() {
  useEffect(() => {
    // Function to update favicon based on system theme
    const updateFavicon = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // Get or create the favicon link element
      let faviconLink = document.querySelector('link[rel="icon"]')
      
      if (!faviconLink) {
        faviconLink = document.createElement('link')
        faviconLink.rel = 'icon'
        document.head.appendChild(faviconLink)
      }
      
      // Update favicon based on theme
      const href = prefersDark ? '/icon-white.svg' : '/icon-black.svg'
      faviconLink.setAttribute('href', href)
      faviconLink.setAttribute('type', 'image/svg+xml')
    }

    // Initial update
    updateFavicon()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => updateFavicon()
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return null
}
