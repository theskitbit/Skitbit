'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { saveFormToAirtable } from '@/app/actions'

// ... (Keep your types and configurations exactly as they were, I am including them below for completeness)

type Step = 1 | 2 | 3
type Market = 'IN' | 'UK' | 'INTL'
type Option = { value: string; label: string }
type MarketConfig = { label: string; currencyLabel: string; adSpendOptions: Option[]; budgetOptions: Option[] }

type FormData = {
  fullName: string; brandName: string; brandLink: string; productCategory: string; categoryOther: string; 
  needs: string[]; runningAds: string; adSpend: string; biggestProblem: string; timeline: string; 
  workingBudget: string; phone: string; message: string;
}

// ... (Keep your existing helpers: marketConfig, categoryOptions, etc.)
// (I am omitting the long config arrays here to keep this response clean, ensure you keep them in your file)

export function CreativeManagementForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  // ... (Keep all your existing states)

  // FIX: Explicitly map form data to LeadData interface
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < TOTAL_STEPS) {
      handleNext()
      return
    }

    if (!validateStep(3)) return

    // Mapped data object to satisfy TypeScript
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

  // ... (Rest of your component remains the same)
}