'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { saveFormToAirtable } from '@/app/actions'

// --- CONSTANTS & HELPERS ---
const TOTAL_STEPS = 3
const WHATSAPP_NUMBER = '918384092211'
const ACID = '#e3ff00'
const BRAND_BLUE = '#b4c3d1'

const initialFormData = {
  fullName: '',
  brandName: '',
  brandLink: '',
  productCategory: '',
  categoryOther: '',
  needs: [] as string[],
  runningAds: '',
  adSpend: '',
  biggestProblem: '',
  timeline: '',
  workingBudget: '',
  phone: '',
  message: '',
}

const categoryOptions = [
  { value: 'Beauty & Cosmetics', label: 'Beauty & Cosmetics' },
  { value: 'Wellness & Supplements', label: 'Wellness & Supplements' },
  { value: 'Fashion & Apparel', label: 'Fashion & Apparel' },
  { value: 'Food & Beverage', label: 'Food & Beverage' },
  { value: 'Home & Lifestyle', label: 'Home & Lifestyle' },
  { value: 'Travel & Accessories', label: 'Travel & Accessories' },
  { value: 'Other', label: 'Other' },
]

const needOptions = [
  { value: 'Meta Ads Management', label: 'Meta Ads Management' },
  { value: 'Performance Creatives', label: 'Performance Creatives' },
  { value: 'Creative Testing Strategy', label: 'Creative Testing Strategy' },
  { value: 'Landing Page / CRO Support', label: 'Landing Page / CRO Support' },
  { value: 'Digital Strategy & Execution', label: 'Digital Strategy & Execution' },
]

const runningAdsOptions = [
  { value: 'Yes', label: 'Yes, we are running ads' },
  { value: 'No', label: 'No, not currently' },
]

const problemOptions = [
  { value: 'Creatives are not performing', label: 'Creatives are not performing' },
  { value: 'ROAS is too low', label: 'ROAS is too low' },
  { value: 'Cannot scale profitably', label: 'Cannot scale profitably' },
  { value: 'Need more winning ad concepts', label: 'Need more winning ad concepts' },
  { value: 'Need someone to manage everything', label: 'Need someone to manage everything' },
]

const timelineOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: 'Within 2 weeks', label: 'Within 2 weeks' },
  { value: 'This month', label: 'This month' },
  { value: 'Just exploring', label: 'Just exploring' },
]

// --- COMPONENT ---
export function CreativeManagementForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ... [Keep all your other existing state and logic here] ...

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < TOTAL_STEPS) {
      setStep((step + 1) as 1 | 2 | 3)
      return
    }

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

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=New Lead: ${formData.fullName}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    window.location.href = '/contact-success'
  }

  // Ensure you include your existing return (...) JSX here
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--brand-blue)] text-black">
        {/* ... Rest of your UI ... */}
    </div>
  )
}