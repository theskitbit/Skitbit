'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const waUrl = searchParams.get('wa')

  useEffect(() => {
    // We add a 1-second delay here. 
    // This ensures the Google Tag has time to fire the "Page Load" event 
    // before the redirect carries the user away.
    const timer = setTimeout(() => {
      if (waUrl) {
        window.location.href = decodeURIComponent(waUrl)
      } else {
        window.location.href = '/'
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [waUrl])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F7F2] text-center px-4">
      <h1 className="text-xl font-medium text-[#0B1A28]">Redirecting to WhatsApp...</h1>
    </div>
  )
}

export default function ContactSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F7F2]" />}>
      <SuccessContent />
    </Suspense>
  )
}