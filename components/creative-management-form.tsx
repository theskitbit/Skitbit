'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

type Step = 1 | 2 | 3
type Market = 'IN' | 'UK' | 'INTL'

type Option = {
  value: string
  label: string
}

type MarketConfig = {
  label: string
  currencyLabel: string
  adSpendOptions: Option[]
  budgetOptions: Option[]
}

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

type GeoData = {
  market: Market
  countryName: string
  countryCode: string
  callingCode: string
  loading: boolean
}

type CreativeManagementFormProps = {
  onClose?: () => void // Made optional to prevent Vercel build errors
}

const TOTAL_STEPS = 3
const WHATSAPP_NUMBER = '918384092211'

const ACID = '#e3ff00'
const BRAND_BLUE = '#b4c3d1'

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

const categoryOptions: Option[] = [
  { value: 'Beauty & Cosmetics', label: 'Beauty & Cosmetics' },
  { value: 'Wellness & Supplements', label: 'Wellness & Supplements' },
  { value: 'Fashion & Apparel', label: 'Fashion & Apparel' },
  { value: 'Food & Beverage', label: 'Food & Beverage' },
  { value: 'Home & Lifestyle', label: 'Home & Lifestyle' },
  { value: 'Travel & Accessories', label: 'Travel & Accessories' },
  { value: 'Other', label: 'Other' },
]

const needOptions: Option[] = [
  { value: 'Meta Ads Management', label: 'Meta Ads Management' },
  { value: 'Performance Creatives', label: 'Performance Creatives' },
  { value: 'Creative Testing Strategy', label: 'Creative Testing Strategy' },
  { value: 'Landing Page / CRO Support', label: 'Landing Page / CRO Support' },
  { value: 'Digital Strategy & Execution', label: 'Digital Strategy & Execution' },
]

const runningAdsOptions: Option[] = [
  { value: 'Yes', label: 'Yes, we are running ads' },
  { value: 'No', label: 'No, not currently' },
]

const problemOptions: Option[] = [
  { value: 'Creatives are not performing', label: 'Creatives are not performing' },
  { value: 'ROAS is too low', label: 'ROAS is too low' },
  { value: 'Cannot scale profitably', label: 'Cannot scale profitably' },
  { value: 'Need more winning ad concepts', label: 'Need more winning ad concepts' },
  { value: 'Need someone to manage everything', label: 'Need someone to manage everything' },
]

const timelineOptions: Option[] = [
  { value: 'Immediately', label: 'Immediately' },
  { value: 'Within 2 weeks', label: 'Within 2 weeks' },
  { value: 'This month', label: 'This month' },
  { value: 'Just exploring', label: 'Just exploring' },
]

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

function getMarketFromCountryCode(countryCode: string): Market {
  const code = countryCode.toUpperCase()

  if (code === 'IN') return 'IN'

  if (['GB', 'UK', 'JE', 'GG', 'IM'].includes(code)) {
    return 'UK'
  }

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

  if (cleanPhone.startsWith('+')) {
    return cleanPhone
  }

  const normalizedCode = normalizeCallingCode(callingCode)

  return normalizedCode === '+' ? cleanPhone : `${normalizedCode} ${cleanPhone}`
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 text-[12px] font-medium text-red-600 md:text-[13px]"
    >
      {error}
    </p>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  type?: 'text' | 'tel' | 'url'
  autoComplete?: string
}) {
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[7px] block text-[13px] font-black tracking-[-0.025em] text-black md:mb-3 md:text-[15px]"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          'w-full border bg-white px-[13px] py-[12px] text-[16px] font-medium text-black outline-none transition placeholder:text-black/35 focus:border-black focus:ring-2 focus:ring-[var(--acid)] md:px-4 md:py-[15px]',
          error ? 'border-red-500' : 'border-black/20',
        ].join(' ')}
      />

      <FieldError id={errorId} error={error} />
    </div>
  )
}

function PhoneField({
  value,
  onChange,
  callingCode,
  onCallingCodeChange,
  loading,
  error,
}: {
  value: string
  onChange: (value: string) => void
  callingCode: string
  onCallingCodeChange: (value: string) => void
  loading: boolean
  error?: string
}) {
  const id = 'phone'
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[7px] block text-[13px] font-black tracking-[-0.025em] text-black md:mb-3 md:text-[15px]"
      >
        Phone / WhatsApp number <span aria-hidden="true">*</span>
      </label>

      <div
        className={[
          'flex w-full bg-white transition focus-within:ring-2 focus-within:ring-[var(--acid)]',
          error ? 'border border-red-500' : 'border border-black/20 focus-within:border-black',
        ].join(' ')}
      >
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-country-code"
          aria-label="Country calling code"
          value={loading ? '' : callingCode}
          onChange={(event) => onCallingCodeChange(event.target.value)}
          placeholder={loading ? '...' : '+'}
          className="w-[74px] shrink-0 border-r border-black/15 bg-black/[0.035] px-[12px] py-[12px] text-[16px] font-medium text-black outline-none placeholder:text-black/35 md:w-[86px] md:px-4 md:py-[15px]"
        />

        <input
          id={id}
          name={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="98765 43210"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-white px-[13px] py-[12px] text-[16px] font-medium text-black outline-none placeholder:text-black/35 md:px-4 md:py-[15px]"
        />
      </div>

      <p className="mt-[6px] text-[11px] font-medium text-black/50 md:mt-2 md:text-[12px]">
        {loading
          ? 'Detecting your country code...'
          : 'Country code detected automatically. Change it if your WhatsApp number uses another code.'}
      </p>

      <FieldError id={errorId} error={error} />
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder: string
  error?: string
  required?: boolean
}) {
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-[7px] block text-[13px] font-black tracking-[-0.025em] text-black md:mb-3 md:text-[15px]"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={[
            'w-full appearance-none bg-white px-[13px] py-[12px] pr-10 text-[16px] font-medium text-black outline-none transition focus:border-black focus:ring-2 focus:ring-[var(--acid)] md:px-4 md:py-[15px]',
            error ? 'border border-red-500' : 'border border-black/20',
          ].join(' ')}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[14px] font-black text-black"
        >
          ↓
        </span>
      </div>

      <FieldError id={errorId} error={error} />
    </div>
  )
}

function ChoiceCards({
  id,
  label,
  value,
  onChange,
  options,
  error,
  compactMobile = false,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  error?: string
  compactMobile?: boolean
}) {
  const errorId = `${id}-error`

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-[8px] block text-[13px] font-black tracking-[-0.025em] text-black md:mb-3 md:text-[15px]">
        {label} *
      </legend>

      <div
        className={
          compactMobile
            ? 'grid grid-cols-2 gap-[7px] md:gap-3'
            : 'grid grid-cols-1 gap-[7px] sm:grid-cols-2 md:gap-3'
        }
      >
        {options.map((option) => {
          const active = value === option.value

          return (
            <label
              key={option.value}
              className={[
                'flex cursor-pointer items-center border text-[13px] font-bold leading-[1.22] tracking-[-0.02em] transition md:text-[15px]',
                compactMobile
                  ? 'min-h-[46px] px-[11px] py-[11px] md:min-h-0 md:px-4 md:py-[15px]'
                  : 'px-[13px] py-[12px] md:px-4 md:py-[15px]',
                active
                  ? 'border-black bg-[var(--acid)] text-black'
                  : 'border-black/20 bg-white text-black hover:border-black',
              ].join(' ')}
            >
              <input
                className="sr-only"
                type="radio"
                name={id}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
              />

              {option.label}
            </label>
          )
        })}
      </div>

      <FieldError id={errorId} error={error} />
    </fieldset>
  )
}

function MultiChoiceCards({
  id,
  label,
  values,
  onToggle,
  options,
  error,
}: {
  id: string
  label: string
  values: string[]
  onToggle: (value: string) => void
  options: Option[]
  error?: string
}) {
  const errorId = `${id}-error`

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <div className="mb-[8px] flex items-end justify-between gap-3 md:mb-3">
        <legend className="block text-[13px] font-black tracking-[-0.025em] text-black md:text-[15px]">
          {label} *
        </legend>

        <span className="shrink-0 text-[11px] font-medium text-black/50 md:text-[12px]">
          Select all
        </span>
      </div>

      <div className="grid grid-cols-2 gap-[7px] md:gap-3">
        {options.map((option) => {
          const active = values.includes(option.value)

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-[48px] cursor-pointer items-center justify-between gap-[6px] border px-[10px] py-[10px] text-[12px] font-bold leading-[1.18] tracking-[-0.02em] transition md:min-h-0 md:gap-4 md:px-4 md:py-[15px] md:text-[15px] md:leading-[1.25]',
                active
                  ? 'border-black bg-[var(--acid)] text-black'
                  : 'border-black/20 bg-white text-black hover:border-black',
              ].join(' ')}
            >
              <input
                className="sr-only"
                type="checkbox"
                name={id}
                value={option.value}
                checked={active}
                onChange={() => onToggle(option.value)}
              />

              <span>{option.label}</span>

              <span
                aria-hidden="true"
                className={[
                  'flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition md:h-[22px] md:w-[22px]',
                  active
                    ? 'border-black bg-black text-[var(--acid)]'
                    : 'border-black/25 bg-white text-transparent',
                ].join(' ')}
              >
                <Check
                  className="h-[12px] w-[12px] md:h-[14px] md:w-[14px]"
                  strokeWidth={3}
                />
              </span>
            </label>
          )
        })}
      </div>

      <FieldError id={errorId} error={error} />
    </fieldset>
  )
}

export function CreativeManagementForm({ onClose }: CreativeManagementFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [phoneCallingCode, setPhoneCallingCode] = useState('')
  const [callingCodeWasEdited, setCallingCodeWasEdited] = useState(false)

  const [geoData, setGeoData] = useState<GeoData>({
    market: 'INTL',
    countryName: '',
    countryCode: '',
    callingCode: '+',
    loading: true,
  })

  const headingRef = useRef<HTMLHeadingElement>(null)
  const config = marketConfig[geoData.market]

  // Handlers for closing the form safely
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    // Fallback: If they are viewing this on the dedicated page, go back to home
    if (typeof window !== 'undefined' && window.location.pathname.includes('/contact-form')) {
      router.push('/')
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose])

  useEffect(() => {
    let active = true

    async function detectMarket() {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Unable to detect visitor market.')
        }

        const result = (await response.json()) as {
          country_code?: string
          country_name?: string
          country_calling_code?: string
        }

        if (!active) return

        const countryCode = result.country_code?.toUpperCase() ?? ''
        const detectedCallingCode = normalizeCallingCode(
          result.country_calling_code ?? '+',
        )

        setGeoData({
          market: getMarketFromCountryCode(countryCode),
          countryName: result.country_name ?? '',
          countryCode,
          callingCode: detectedCallingCode,
          loading: false,
        })
      } catch {
        if (!active) return

        setGeoData({
          market: 'INTL',
          countryName: 'International',
          countryCode: '',
          callingCode: '+',
          loading: false,
        })
      }
    }

    void detectMarket()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (geoData.loading || callingCodeWasEdited) return

    setPhoneCallingCode(geoData.callingCode)
  }, [geoData.callingCode, geoData.loading, callingCodeWasEdited])

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  const detectedMarketText = useMemo(() => {
    if (geoData.loading) return 'Detecting your region...'

    if (geoData.countryName) {
      return `Showing ${config.currencyLabel} ranges for ${geoData.countryName}.`
    }

    return `Showing ${config.currencyLabel} ranges.`
  }, [config.currencyLabel, geoData.countryName, geoData.loading])

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))

    setErrors((previous) => {
      if (!previous[field]) return previous

      const nextErrors = { ...previous }
      delete nextErrors[field]
      return nextErrors
    })
  }

  function updatePhoneCallingCode(value: string) {
    setCallingCodeWasEdited(true)
    setPhoneCallingCode(normalizeCallingCode(value))
  }

  function toggleNeed(value: string) {
    setFormData((previous) => {
      const isSelected = previous.needs.includes(value)

      return {
        ...previous,
        needs: isSelected
          ? previous.needs.filter((item) => item !== value)
          : [...previous.needs, value],
      }
    })

    setErrors((previous) => {
      if (!previous.needs) return previous

      const nextErrors = { ...previous }
      delete nextErrors.needs
      return nextErrors
    })
  }

  function selectRunningAds(value: string) {
    setFormData((previous) => ({
      ...previous,
      runningAds: value,
      adSpend: value === 'No' ? 'not-running' : '',
    }))

    setErrors((previous) => {
      const nextErrors = { ...previous }
      delete nextErrors.runningAds
      delete nextErrors.adSpend
      return nextErrors
    })
  }

  function validateStep(currentStep: Step): boolean {
    const nextErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = 'Please enter your name.'
      }

      if (!formData.brandName.trim()) {
        nextErrors.brandName = 'Please enter your brand name.'
      }

      if (!formData.brandLink.trim()) {
        nextErrors.brandLink = 'Please add your website or Instagram link.'
      }

      if (!formData.productCategory) {
        nextErrors.productCategory = 'Please select your product category.'
      }

      if (formData.productCategory === 'Other' && !formData.categoryOther.trim()) {
        nextErrors.categoryOther = 'Please specify your category.'
      }
    }

    if (currentStep === 2) {
      if (formData.needs.length === 0) {
        nextErrors.needs = 'Please choose at least one service.'
      }

      if (!formData.runningAds) {
        nextErrors.runningAds = 'Please select whether you are currently running ads.'
      }

      if (formData.runningAds === 'Yes' && !formData.adSpend) {
        nextErrors.adSpend = 'Please select your current monthly ad spend.'
      }

      if (!formData.biggestProblem) {
        nextErrors.biggestProblem = 'Please select your biggest problem.'
      }
    }

    if (currentStep === 3) {
      if (!formData.timeline) {
        nextErrors.timeline = 'Please select when you want to start.'
      }

      if (!formData.workingBudget) {
        nextErrors.workingBudget = 'Please select your monthly working budget.'
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = 'Please enter your phone or WhatsApp number.'
      }
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  function handleNext() {
    if (!validateStep(step)) return

    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep((step + 1) as Step)
    }
  }

  function handleBack() {
    if (step <= 1) return

    setDirection(-1)
    setErrors({})
    setStep((step - 1) as Step)
  }

  function buildWhatsAppMessage(): string {
    const productCategory =
      formData.productCategory === 'Other'
        ? formData.categoryOther.trim()
        : formData.productCategory

    const adSpend =
      formData.runningAds === 'No'
        ? 'Not currently running ads'
        : findLabel(config.adSpendOptions, formData.adSpend)

    const workingBudget = findLabel(config.budgetOptions, formData.workingBudget)

    const submittedPhone = formatSubmittedPhone(
      phoneCallingCode || geoData.callingCode,
      formData.phone,
    )

    const sourceLines: string[] = []

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const source = url.searchParams.get('utm_source')
      const medium = url.searchParams.get('utm_medium')
      const campaign = url.searchParams.get('utm_campaign')

      if (source) sourceLines.push(`Source: ${source}`)
      if (medium) sourceLines.push(`Medium: ${medium}`)
      if (campaign) sourceLines.push(`Campaign: ${campaign}`)
    }

    const messageLines = [
      "Hi Skitbit, I'm interested in Performance Creative Management.",
      '',
      '*Contact*',
      `Name: ${formData.fullName.trim()}`,
      `Phone: ${submittedPhone}`,
      '',
      '*Brand*',
      `Brand: ${formData.brandName.trim()}`,
      `Website / Instagram: ${formData.brandLink.trim()}`,
      `Category: ${productCategory}`,
      `Market: ${geoData.countryName || config.label} / ${config.currencyLabel}`,
      '',
      '*Requirement*',
      `Need: ${formData.needs.join(', ')}`,
      `Currently Running Ads: ${formData.runningAds}`,
      `Monthly Ad Spend: ${adSpend}`,
      `Biggest Problem: ${formData.biggestProblem}`,
      '',
      '*Timeline & Budget*',
      `Start Timeline: ${formData.timeline}`,
      `Monthly Working Budget: ${workingBudget}`,
      formData.message.trim() ? '' : null,
      formData.message.trim() ? '*Additional Note*' : null,
      formData.message.trim() ? formData.message.trim() : null,
      sourceLines.length > 0 ? '' : null,
      sourceLines.length > 0 ? '*Lead Source*' : null,
      ...sourceLines,
    ].filter((line): line is string => line !== null)

    return messageLines.join('\n')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step < TOTAL_STEPS) {
      handleNext()
      return
    }

    if (!validateStep(3)) return
    
    const message = buildWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    // Restored your original flow: open WhatsApp in a new tab, then redirect current page to success
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    window.location.href = '/contact-success'
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Performance Creative Management enquiry form"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[var(--brand-blue)] text-black"
      style={
        {
          '--acid': ACID,
          '--brand-blue': BRAND_BLUE,
        } as CSSProperties
      }
    >
      {/* COMPACT STICKY HEADER */}
      <header className="sticky top-0 z-30 bg-black text-white">
        <div
          aria-label={`Progress: step ${step} of ${TOTAL_STEPS}`}
          aria-valuemax={TOTAL_STEPS}
          aria-valuemin={1}
          aria-valuenow={step}
          role="progressbar"
          className="h-[4px] w-full bg-white/15 md:h-[5px]"
        >
          <motion.div
            className="h-full bg-[var(--acid)]"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </div>

        <div className="mx-auto flex h-[50px] max-w-[980px] items-center justify-between px-[14px] md:h-auto md:px-8 md:py-6">
          <p className="text-[21px] font-black leading-none tracking-[-0.06em] text-[var(--acid)] md:text-[34px]">
            SKITBIT
          </p>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close form"
            className="flex h-[34px] w-[34px] items-center justify-center border border-white/30 bg-transparent text-[25px] font-light leading-none text-white transition hover:border-[var(--acid)] hover:bg-[var(--acid)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acid)] md:h-10 md:w-10 md:text-[30px]"
          >
            ×
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[980px] px-[10px] pb-[96px] pt-[10px] md:px-8 md:pb-[46px] md:pt-[46px]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="min-h-[calc(100dvh-70px)] bg-white px-[14px] pb-[22px] pt-[16px] md:min-h-0 md:px-[66px] md:pb-[54px] md:pt-[50px]"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={step}
              custom={direction}
              initial={{ x: direction > 0 ? 28 : -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -28 : 28, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {step === 1 && (
                <div>
                  <p className="mb-[9px] inline-block bg-[var(--acid)] px-[9px] py-[4px] text-[11px] font-black uppercase tracking-[-0.02em] md:mb-4 md:px-3 md:py-1 md:text-[13px]">
                    Step 1 · Your brand
                  </p>

                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="max-w-[660px] text-[30px] font-black leading-[1.04] tracking-[-0.055em] outline-none md:text-[56px]"
                  >
                    Tell us about your brand.
                  </h2>

                  <p className="mt-[9px] max-w-[620px] text-[14px] font-medium leading-[1.34] tracking-[-0.025em] text-black/60 md:mt-4 md:text-[20px] md:leading-[1.42]">
                    Two minutes. Your details open pre-filled in WhatsApp.
                  </p>

                  <div className="mt-[18px] grid gap-[15px] md:mt-[36px] md:grid-cols-2 md:gap-x-6 md:gap-y-7">
                    <TextField
                      id="fullName"
                      label="Your name"
                      value={formData.fullName}
                      onChange={(value) => updateField('fullName', value)}
                      placeholder="Your full name"
                      error={errors.fullName}
                      required
                      autoComplete="name"
                    />

                    <TextField
                      id="brandName"
                      label="Brand name"
                      value={formData.brandName}
                      onChange={(value) => updateField('brandName', value)}
                      placeholder="Your brand name"
                      error={errors.brandName}
                      required
                      autoComplete="organization"
                    />

                    <div className="md:col-span-2">
                      <TextField
                        id="brandLink"
                        label="Website or Instagram link"
                        value={formData.brandLink}
                        onChange={(value) => updateField('brandLink', value)}
                        placeholder="yourbrand.com or instagram.com/yourbrand"
                        error={errors.brandLink}
                        required
                      />
                    </div>

                    <div className={formData.productCategory === 'Other' ? '' : 'md:col-span-2'}>
                      <SelectField
                        id="productCategory"
                        label="Product category"
                        value={formData.productCategory}
                        onChange={(value) => updateField('productCategory', value)}
                        options={categoryOptions}
                        placeholder="Select a category"
                        error={errors.productCategory}
                        required
                      />
                    </div>

                    {formData.productCategory === 'Other' && (
                      <TextField
                        id="categoryOther"
                        label="Specify your category"
                        value={formData.categoryOther}
                        onChange={(value) => updateField('categoryOther', value)}
                        placeholder="Your product category"
                        error={errors.categoryOther}
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="mb-[9px] inline-block bg-[var(--acid)] px-[9px] py-[4px] text-[11px] font-black uppercase tracking-[-0.02em] md:mb-4 md:px-3 md:py-1 md:text-[13px]">
                    Step 2 · Performance
                  </p>

                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="max-w-[680px] text-[30px] font-black leading-[1.04] tracking-[-0.055em] outline-none md:text-[56px]"
                  >
                    What are you trying to fix?
                  </h2>

                  <p className="mt-[9px] max-w-[660px] text-[14px] font-medium leading-[1.34] tracking-[-0.025em] text-black/60 md:mt-4 md:text-[20px] md:leading-[1.42]">
                    Choose what applies. This helps us judge fit quickly.
                  </p>

                  <div className="mt-[18px] space-y-[17px] md:mt-[36px] md:space-y-[31px]">
                    <MultiChoiceCards
                      id="needs"
                      label="What do you need help with?"
                      values={formData.needs}
                      onToggle={toggleNeed}
                      options={needOptions}
                      error={errors.needs}
                    />

                    <ChoiceCards
                      id="runningAds"
                      label="Are you currently running ads?"
                      value={formData.runningAds}
                      onChange={selectRunningAds}
                      options={runningAdsOptions}
                      error={errors.runningAds}
                      compactMobile
                    />

                    {formData.runningAds === 'Yes' && (
                      <div>
                        <SelectField
                          id="adSpend"
                          label="Current monthly ad spend"
                          value={formData.adSpend}
                          onChange={(value) => updateField('adSpend', value)}
                          options={config.adSpendOptions}
                          placeholder="Select your spend range"
                          error={errors.adSpend}
                          required
                        />

                        <p className="mt-[6px] text-[11px] font-medium text-black/50 md:mt-3 md:text-[13px]">
                          {detectedMarketText}
                        </p>
                      </div>
                    )}

                    {formData.runningAds === 'No' && (
                      <div className="border border-black bg-[var(--brand-blue)] px-[12px] py-[10px] text-[12px] font-medium leading-[1.3] tracking-[-0.02em] md:px-4 md:py-4 md:text-[15px] md:leading-[1.4]">
                        We can still review your requirement, but active spend helps us judge fit.
                      </div>
                    )}

                    <SelectField
                      id="biggestProblem"
                      label="Biggest problem right now"
                      value={formData.biggestProblem}
                      onChange={(value) => updateField('biggestProblem', value)}
                      options={problemOptions}
                      placeholder="Select your biggest challenge"
                      error={errors.biggestProblem}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="mb-[9px] inline-block bg-[var(--acid)] px-[9px] py-[4px] text-[11px] font-black uppercase tracking-[-0.02em] md:mb-4 md:px-3 md:py-1 md:text-[13px]">
                    Step 3 · Start
                  </p>

                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="max-w-[680px] text-[30px] font-black leading-[1.04] tracking-[-0.055em] outline-none md:text-[56px]"
                  >
                    Ready to start growing?
                  </h2>

                  <p className="mt-[9px] max-w-[650px] text-[14px] font-medium leading-[1.34] tracking-[-0.025em] text-black/60 md:mt-4 md:text-[20px] md:leading-[1.42]">
                    Your answers will open directly in WhatsApp.
                  </p>

                  <div className="mt-[18px] space-y-[17px] md:mt-[36px] md:space-y-[30px]">
                    <ChoiceCards
                      id="timeline"
                      label="When do you want to start?"
                      value={formData.timeline}
                      onChange={(value) => updateField('timeline', value)}
                      options={timelineOptions}
                      error={errors.timeline}
                      compactMobile
                    />

                    <div>
                      <SelectField
                        id="workingBudget"
                        label="Monthly budget to work with Skitbit"
                        value={formData.workingBudget}
                        onChange={(value) => updateField('workingBudget', value)}
                        options={config.budgetOptions}
                        placeholder="Select your working budget"
                        error={errors.workingBudget}
                        required
                      />

                      <p className="mt-[6px] text-[11px] font-medium text-black/50 md:mt-3 md:text-[13px]">
                        {detectedMarketText}
                      </p>
                    </div>

                    <PhoneField
                      value={formData.phone}
                      onChange={(value) => updateField('phone', value)}
                      callingCode={phoneCallingCode}
                      onCallingCodeChange={updatePhoneCallingCode}
                      loading={geoData.loading}
                      error={errors.phone}
                    />

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-[7px] block text-[13px] font-black tracking-[-0.025em] text-black md:mb-3 md:text-[15px]"
                      >
                        Additional note{' '}
                        <span className="font-medium text-black/45">(optional)</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder="Anything useful about your current ads or creative problem."
                        className="w-full resize-none border border-black/20 bg-white px-[13px] py-[12px] text-[16px] font-medium text-black outline-none transition placeholder:text-black/35 focus:border-black focus:ring-2 focus:ring-[var(--acid)] md:px-4 md:py-[15px]"
                      />
                    </div>

                    <p className="text-center text-[11px] font-medium leading-[1.4] text-black/50 md:hidden">
                      Your details will be pre-filled. Review and hit send in WhatsApp.
                    </p>
                  </div>
                </div>
              )}
            </motion.section>
          </AnimatePresence>

          {/* DESKTOP ACTIONS */}
          <div className="mt-[42px] hidden flex-col-reverse gap-3 border-t border-black/10 pt-[25px] md:flex md:flex-row">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-black bg-white px-6 py-[17px] text-[16px] font-black text-black transition hover:bg-black hover:text-white"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="flex-1 bg-[var(--acid)] px-6 py-[18px] text-[17px] font-black leading-none text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-[var(--acid)] active:translate-y-0"
            >
              {step === TOTAL_STEPS ? 'Continue on WhatsApp' : 'Continue'}
            </button>
          </div>

          {step === TOTAL_STEPS && (
            <p className="mt-4 hidden text-center text-[13px] font-medium leading-[1.45] text-black/55 md:block">
              Your details will be pre-filled. You only need to review and hit send in WhatsApp.
            </p>
          )}

          {/* MOBILE STICKY ACTIONS */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white px-[10px] pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] md:hidden">
            <div className="flex gap-[7px]">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-[38%] border border-black bg-white px-3 py-[15px] text-[14px] font-black leading-none text-black"
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                className={[
                  'bg-[var(--acid)] px-3 py-[15px] text-[14px] font-black leading-none text-black',
                  step > 1 ? 'w-[62%]' : 'w-full',
                ].join(' ')}
              >
                {step === TOTAL_STEPS ? 'Continue on WhatsApp' : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
