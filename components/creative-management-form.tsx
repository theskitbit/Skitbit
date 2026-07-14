'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

// --- CONSTANTS & TYPES ---
type Step = 1 | 2 | 3
type Market = 'IN' | 'UK' | 'INTL'
type Option = { value: string; label: string }
type MarketConfig = { label: string; currencyLabel: string; adSpendOptions: Option[]; budgetOptions: Option[] }

type FormData = {
  fullName: string
  brandName: string
  brandLink: string
  productCategory: string
  categoryOther: string
  needs: string[]
  runningAds: string
  adSpend: string
  biggestProblem: string
  timeline: string
  workingBudget: string
  phone: string
  message: string
}

const TOTAL_STEPS = 3
const WHATSAPP_NUMBER = '918384092211'
const ACID = '#e3ff00'
const BRAND_BLUE = '#b4c3d1'

const initialFormData: FormData = {
  fullName: '',
  brandName: '',
  brandLink: '',
  productCategory: '',
  categoryOther: '',
  needs: [],
  runningAds: '',
  adSpend: '',
  biggestProblem: '',
  timeline: '',
  workingBudget: '',
  phone: '',
  message: '',
}

const marketConfig: Record<Market, MarketConfig> = {
  IN: {
    label: 'India',
    currencyLabel: 'INR',
    adSpendOptions: [
      { value: 'qualified-tier-1', label: '₹1L–₹5L/month' },
      { value: 'qualified-tier-2', label: '₹5L–₹15L/month' },
      { value: 'qualified-tier-3', label: '₹15L–₹50L/month' },
      { value: 'qualified-tier-4', label: '₹50L+/month' },
    ],
    budgetOptions: [
      { value: 'budget-tier-1', label: '₹50k–₹1L/month' },
      { value: 'budget-tier-2', label: '₹1L–₹2L/month' },
      { value: 'budget-tier-3', label: '₹2L–₹5L/month' },
      { value: 'budget-tier-4', label: '₹5L+/month' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  UK: {
    label: 'United Kingdom',
    currencyLabel: 'GBP',
    adSpendOptions: [
      { value: 'qualified-tier-1', label: '£8k–£20k/month' },
      { value: 'qualified-tier-2', label: '£20k–£40k/month' },
      { value: 'qualified-tier-3', label: '£40k–£80k/month' },
      { value: 'qualified-tier-4', label: '£80k+/month' },
    ],
    budgetOptions: [
      { value: 'budget-tier-1', label: '£800–£2,000/month' },
      { value: 'budget-tier-2', label: '£2,000–£4,000/month' },
      { value: 'budget-tier-3', label: '£4,000–£8,000/month' },
      { value: 'budget-tier-4', label: '£8,000+/month' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  INTL: {
    label: 'International',
    currencyLabel: 'USD',
    adSpendOptions: [
      { value: 'qualified-tier-1', label: '$10k–$25k USD/month' },
      { value: 'qualified-tier-2', label: '$25k–$50k USD/month' },
      { value: 'qualified-tier-3', label: '$50k–$100k USD/month' },
      { value: 'qualified-tier-4', label: '$100k+ USD/month' },
    ],
    budgetOptions: [
      { value: 'budget-tier-1', label: '$1,000–$2,500 USD/month' },
      { value: 'budget-tier-2', label: '$2,500–$5,000 USD/month' },
      { value: 'budget-tier-3', label: '$5,000–$10,000 USD/month' },
      { value: 'budget-tier-4', label: '$10,000+ USD/month' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
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

// --- HELPERS ---
function getMarketFromCountryCode(countryCode: string): Market {
  const code = countryCode.toUpperCase()
  if (code === 'IN') return 'IN'
  if (['GB', 'UK', 'JE', 'GG', 'IM'].includes(code)) return 'UK'
  return 'INTL'
}

function findLabel(options: Option[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

function normalizeCallingCode(value: string): string {
  const digitsOnly = value.replace(/[^\d]/g, '').slice(0, 4)
  return digitsOnly ? `+${digitsOnly}` : '+'
}

function formatSubmittedPhone(callingCode: string, phone: string): string {
  const cleanPhone = phone.trim()
  if (!cleanPhone) return ''
  if (cleanPhone.startsWith('+')) return cleanPhone
  const normalizedCode = normalizeCallingCode(callingCode)
  return normalizedCode === '+' ? cleanPhone : `${normalizedCode} ${cleanPhone}`
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return <p id={id} role="alert" className="mt-2 text-[12px] font-medium text-red-600 md:text-[13px]">{error}</p>
}

// --- SUB-COMPONENTS (TextField, PhoneField, SelectField, ChoiceCards, MultiChoiceCards) ---
// (Keep these exactly as they were in your existing file)

export function CreativeManagementForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [phoneCallingCode, setPhoneCallingCode] = useState('')
  const [callingCodeWasEdited, setCallingCodeWasEdited] = useState(false)
  const [geoData, setGeoData] = useState({ market: 'INTL' as Market, countryName: '', countryCode: '', callingCode: '+', loading: true })
  const headingRef = useRef<HTMLHeadingElement>(null)
  const config = marketConfig[geoData.market]

  // ... [Keep all your useEffects: detectMarket, event listeners, etc.] ...

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < TOTAL_STEPS) {
      handleNext()
      return
    }

    if (!validateStep(3)) return

    // NO AIRTABLE LOGIC HERE. Just WhatsApp redirect.
    const message = buildWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    window.location.href = '/contact-success'
  }

  // ... [Keep all your other handlers: updateField, toggleNeed, validateStep, handleNext, etc.] ...

  return (
     <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[var(--brand-blue)] text-black" style={{ '--acid': ACID, '--brand-blue': BRAND_BLUE } as CSSProperties}>
       {/* ... Your full existing JSX ... */}
     </div>
  )
}