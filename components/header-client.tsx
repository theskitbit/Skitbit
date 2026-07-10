'use client'

import { useContactOverlay } from './contact-overlay'

export function HeaderClientOnly() {
  const { open } = useContactOverlay()

  return (
    <button 
      onClick={open}
      className="bg-primary text-primary-foreground border border-primary px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm"
    >
      Contact Us
    </button>
  )
}
