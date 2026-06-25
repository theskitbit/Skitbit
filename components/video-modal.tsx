'use client'

import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { MobileReelsView } from './mobile-reels-view'
import { DesktopSplitView } from './desktop-split-view'

export const videos = [
  { id: 'H1h5dHpp1Nw', },
  { id: 'HXARcSSdfMU', },
  { id: 'fd8zraQ1JdE', },
  { id: 'ARQyF2FA3Ec', },
  { id: 'dEZfHADlFtw', },
  { id: 'wuyfdfKO6Rc', },
  { id: 'VakkmhtrUA0', },
  { id: 'o8DoIg9yNGk', },
  { id: 'rtReBkFt-To', },
  { id: 'ASV2myPRfKA', },
  { id: 'eTfS2lqwf6A', },
  { id: 'KALbYHmGV4I', },
  { id: 'Go0AA9hZ4as', },
  { id: 'sB7RZ9QCOAg', },
  { id: 'TK2WboJOJaw', },
  { id: '5Xq7UdXXOxI', },
  { id: 'kMjWCidQSK0', },
  { id: 'RKKdQvwKOhQ', },
]

export type Video = {
  id: string
  title: string
  category: string
  duration: string
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

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

  if (!mounted) return null
  if (!isOpen) return null

  // Mobile: Reels (YouTube)
  if (isMobile) {
    return <MobileReelsView onClose={onClose} />
  }

  // Desktop: Split view (YouTube)
  return <DesktopSplitView onClose={onClose} />
}
