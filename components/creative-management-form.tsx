'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

// --- TYPES & CONFIG ---
type Step = 1 | 2 | 3
type Market = 'IN' | 'UK' | 'INTL'
type Option = { value: string; label: string }
type MarketConfig = { label: string; currencyLabel: string; adSpendOptions: Option[]; budgetOptions: Option[] }

type FormData = {
  fullName: string; brandName: string; brandLink: string; productCategory: string; categoryOther: string;
  needs: string[]; runningAds: string; adSpend: string; biggestProblem: string; timeline: string;
  workingBudget: string; phone: string; message: string;
}

const TOTAL_STEPS = 3
const WHATSAPP_NUMBER = '918384092211'
const ACID = '#e3ff00'
const BRAND_BLUE = '#b4c3d1'

const initialFormData: FormData = {
  fullName: '', brandName: '', brandLink: '', productCategory: '', categoryOther: '',
  needs: [], runningAds: '', adSpend: '', biggestProblem: '', timeline: '',
  workingBudget: '', phone: '', message: '',
}

const marketConfig: Record<Market, MarketConfig> = {
  IN: { label: 'India', currencyLabel: 'INR', adSpendOptions: [{ value: 'qualified-tier-1', label: '₹1L–₹5L/month' }, { value: 'qualified-tier-2', label: '₹5L–₹15L/month' }, { value: 'qualified-tier-3', label: '₹15L–₹50L/month' }, { value: 'qualified-tier-4', label: '₹50L+/month' }], budgetOptions: [{ value: 'budget-tier-1', label: '₹50k–₹1L/month' }, { value: 'budget-tier-2', label: '₹1L–₹2L/month' }, { value: 'budget-tier-3', label: '₹2L–₹5L/month' }, { value: 'budget-tier-4', label: '₹5L+/month' }, { value: 'unsure', label: 'Not sure yet' }] },
  UK: { label: 'United Kingdom', currencyLabel: 'GBP', adSpendOptions: [{ value: 'qualified-tier-1', label: '£8k–£20k/month' }, { value: 'qualified-tier-2', label: '£20k–£40k/month' }, { value: 'qualified-tier-3', label: '£40k–£80k/month' }, { value: 'qualified-tier-4', label: '£80k+/month' }], budgetOptions: [{ value: 'budget-tier-1', label: '£800–£2,000/month' }, { value: 'budget-tier-2', label: '£2,000–£4,000/month' }, { value: 'budget-tier-3', label: '£4,000–£8,000/month' }, { value: 'budget-tier-4', label: '£8,000+/month' }, { value: 'unsure', label: 'Not sure yet' }] },
  INTL: { label: 'International', currencyLabel: 'USD', adSpendOptions: [{ value: 'qualified-tier-1', label: '$10k–$25k USD/month' }, { value: 'qualified-tier-2', label: '$25k–$50k USD/month' }, { value: 'qualified-tier-3', label: '$50k–$100k USD/month' }, { value: 'qualified-tier-4', label: '$100k+ USD/month' }], budgetOptions: [{ value: 'budget-tier-1', label: '$1,000–$2,500 USD/month' }, { value: 'budget-tier-2', label: '$2,500–$5,000 USD/month' }, { value: 'budget-tier-3', label: '$5,000–$10,000 USD/month' }, { value: 'budget-tier-4', label: '$10,000+ USD/month' }, { value: 'unsure', label: 'Not sure yet' }] }
}

const categoryOptions = [{ value: 'Beauty & Cosmetics', label: 'Beauty & Cosmetics' }, { value: 'Wellness & Supplements', label: 'Wellness & Supplements' }, { value: 'Fashion & Apparel', label: 'Fashion & Apparel' }, { value: 'Food & Beverage', label: 'Food & Beverage' }, { value: 'Home & Lifestyle', label: 'Home & Lifestyle' }, { value: 'Travel & Accessories', label: 'Travel & Accessories' }, { value: 'Other', label: 'Other' }]
const needOptions = [{ value: 'Meta Ads Management', label: 'Meta Ads Management' }, { value: 'Performance Creatives', label: 'Performance Creatives' }, { value: 'Creative Testing Strategy', label: 'Creative Testing Strategy' }, { value: 'Landing Page / CRO Support', label: 'Landing Page / CRO Support' }, { value: 'Digital Strategy & Execution', label: 'Digital Strategy & Execution' }]
const runningAdsOptions = [{ value: 'Yes', label: 'Yes, we are running ads' }, { value: 'No', label: 'No, not currently' }]
const problemOptions = [{ value: 'Creatives are not performing', label: 'Creatives are not performing' }, { value: 'ROAS is too low', label: 'ROAS is too low' }, { value: 'Cannot scale profitably', label: 'Cannot scale profitably' }, { value: 'Need more winning ad concepts', label: 'Need more winning ad concepts' }, { value: 'Need someone to manage everything', label: 'Need someone to manage everything' }]
const timelineOptions = [{ value: 'Immediately', label: 'Immediately' }, { value: 'Within 2 weeks', label: 'Within 2 weeks' }, { value: 'This month', label: 'This month' }, { value: 'Just exploring', label: 'Just exploring' }]

// --- HELPER FUNCTIONS ---
function findLabel(options: Option[], value: string): string { return options.find((o) => o.value === value)?.label ?? value }
function normalizeCallingCode(value: string): string { const d = value.replace(/[^\d]/g, '').slice(0, 4); return d ? `+${d}` : '+' }

export function CreativeManagementForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [phoneCallingCode, setPhoneCallingCode] = useState('+')
  const [geoData, setGeoData] = useState({ market: 'INTL' as Market, countryName: '', callingCode: '+', loading: true })
  const headingRef = useRef<HTMLHeadingElement>(null)
  const config = marketConfig[geoData.market]

  // --- LOGIC ---
  function validateStep(currentStep: Step): boolean {
    const nextErrors: Record<string, string> = {}
    if (currentStep === 1 && (!formData.fullName.trim() || !formData.brandName.trim() || !formData.brandLink.trim() || !formData.productCategory)) nextErrors.general = 'Please fill all fields'
    if (currentStep === 2 && (formData.needs.length === 0 || !formData.runningAds || !formData.biggestProblem)) nextErrors.general = 'Please select options'
    if (currentStep === 3 && (!formData.timeline || !formData.workingBudget || !formData.phone.trim())) nextErrors.general = 'Please fill all fields'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleNext() { if (validateStep(step) && step < TOTAL_STEPS) { setDirection(1); setStep((step + 1) as Step) } }
  function handleBack() { if (step > 1) { setDirection(-1); setErrors({}); setStep((step - 1) as Step) } }

  function buildWhatsAppMessage(): string {
    const pCat = formData.productCategory === 'Other' ? formData.categoryOther : formData.productCategory
    return `Hi Skitbit, Lead: ${formData.fullName}\nBrand: ${formData.brandName}\nCategory: ${pCat}\nNeed: ${formData.needs.join(', ')}`
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < TOTAL_STEPS) { handleNext(); return }
    if (!validateStep(3)) return
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    window.location.href = '/contact-success'
  }

  // --- UI (Include your existing JSX here starting from <div className="fixed ..."> ) ---
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--brand-blue)] text-black" style={{ '--acid': ACID, '--brand-blue': BRAND_BLUE } as CSSProperties}>
        {/* Your original UI JSX goes here */}
        <form onSubmit={handleSubmit} noValidate className="min-h-[calc(100dvh-70px)] bg-white px-[14px] md:px-[66px]">
            {/* ... Content ... */}
        </form>
    </div>
  )
}