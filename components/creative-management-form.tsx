'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { saveFormToAirtable } from '@/app/actions'

// ... [Keep all your existing types and constants here exactly as you had them] ...
// I am including the component definition below with the necessary fixes

export function CreativeManagementForm({ onClose }: { onClose?: () => void }): JSX.Element {
  const router = useRouter()
  // ... [Keep your state hooks: step, formData, errors, phoneCallingCode, etc.] ...

  // FIX: handleSubmit with correct mapping
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < TOTAL_STEPS) {
      handleNext()
      return
    }

    if (!validateStep(3)) return

    // Mapping formData to the structure expected by actions.ts
    const mappedData = {
        name: formData.fullName,
        contact: formData.phone,
        product: formData.brandName,
        category: formData.productCategory === 'Other' ? formData.categoryOther : formData.productCategory,
        needs: formData.needs,
        timeline: formData.timeline
    }

    saveFormToAirtable(mappedData).catch((error) => {
      console.error('Background Airtable save failed:', error)
    })

    const message = buildWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    window.location.href = '/contact-success'
  }

  // ... [Keep the rest of your UI/JSX code exactly as is] ...

  return (
     /* Your entire JSX structure goes here */
     <div className="..."> 
        {/* ... */}
     </div>
  )
}