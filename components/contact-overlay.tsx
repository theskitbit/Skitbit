'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { saveFormToAirtable } from '@/app/actions'

const ContactOverlayContext = createContext<any>(null)

export function useContactOverlay() {
  const ctx = useContext(ContactOverlayContext)
  if (!ctx) throw new Error('Wrap app with ContactOverlayProvider')
  return ctx
}

export function ContactOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ContactOverlayContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <Suspense fallback={null}>
        <ContactOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Suspense>
    </ContactOverlayContext.Provider>
  )
}

type Step = 1 | 2 | 3
const TOTAL_STEPS = 3

const CheckIcon = () => (
  <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </motion.svg>
)

const CategoryIcons: Record<string, ReactNode> = {
  'Health & Wellness': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  'Beauty & Cosmetics': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5" /></svg>,
  'Fine Jewelry': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 7.5L12 21l7.5-13.5L15 3H9L4.5 7.5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 7.5h15M9 3l3 4.5M15 3l-3 4.5" /></svg>,
  'Luxury Watches': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="7" y="5" width="10" height="14" rx="3" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5V3m4 2V3M9 19v2m4-2v2M12 9v3l1.5 1.5" /></svg>,
  'Food & Beverage': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m-8 4v10" /></svg>,
  'Consumer Tech': <svg className="w-4 h-4 mr-2 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
}

function ContactOverlay({ isOpen, onClose }: any) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [error, setError] = useState('')
  const [data, setData] = useState({ category: '', needs: [] as string[], timeline: '', product: '', name: '', contact: '' })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => { setMounted(true); if (isOpen) setStep(1) }, [isOpen])

  if (!mounted || !isOpen) return null

  const messageText = `Hi Adnan, brief for: ${data.product}\nCategory: ${data.category}\nNeeds: ${data.needs.join(', ')}\nTimeline: ${data.timeline}\n\nName: ${data.name}\nContact: ${data.contact}`
  const whatsappUrl = `https://wa.me/918384092211?text=${encodeURIComponent(messageText)}`

  const validateStep = () => {
    if (step === 1 && !data.category) return 'Please select a category'
    if (step === 2) {
      if (data.needs.length === 0) return 'Select at least one requirement'
      if (!data.product.trim()) return 'Enter your brand name or link'
    }
    if (step === 3) {
      if (!data.timeline || !data.name.trim() || !data.contact.trim()) return 'Please complete the details'
    }
    return ''
  }

  const next = async () => {
    const validationError = validateStep()
    if (validationError) return setError(validationError)
    
    setError('')
    
    if (step < TOTAL_STEPS) { 
      setDirection(1)
      setStep((step + 1) as Step) 
    } else { 
      try {
        // Now this passes exactly what the LeadData interface expects
        await saveFormToAirtable({
          name: data.name,
          contact: data.contact,
          product: data.product,
          category: data.category,
          needs: data.needs,
          timeline: data.timeline
        })
      } catch (err) {
        console.error('Airtable pipeline recording error:', err)
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      window.location.href = `/contact-success`
    }
  }

  const categoryOptions = ['Health & Wellness', 'Beauty & Cosmetics', 'Fine Jewelry', 'Luxury Watches', 'Food & Beverage', 'Consumer Tech']
  const needsOptions = ['Web Images', 'Lifestyle Images', 'Ad Creatives', 'Product Videos']
  const timelineOptions = ['ASAP', 'Within 2 weeks', 'Next month']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 bg-[#F6F7F2] overflow-y-auto text-foreground flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="w-full h-1 bg-muted fixed top-0 left-0 z-50">
            <motion.div className="h-full bg-primary" animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>

          <div className="flex justify-between items-center px-6 py-6 sm:py-8 max-w-5xl w-full mx-auto shrink-0">
            <div className="flex items-center gap-3 select-none">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/5 text-[#0B1A28] text-xs font-bold">{step}</span>
              <span className="text-sm font-medium text-slate-400">of {TOTAL_STEPS}</span>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black/5 text-slate-400 transition-colors" aria-label="Close dialog">✕</button>
          </div>

          <div className="flex-1 flex flex-col px-6 pb-8 sm:pb-12">
            <div className="max-w-xl w-full mx-auto flex-1 flex flex-col">
              <div className="flex-1 flex flex-col justify-center pb-8">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col gap-10 w-full">
                    {step === 1 && (
                      <div className="space-y-8">
                        <h2 className="text-[34px] leading-tight sm:text-4xl font-semibold text-[#0B1A28]">What are you<br className="sm:hidden"/> building?</h2>
                        <div className="flex flex-wrap gap-3">
                          {categoryOptions.map(o => (
                            <motion.div key={o} onClick={() => setData({ ...data, category: o })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex flex-auto sm:flex-initial justify-center items-center px-5 py-3.5 rounded-full border cursor-pointer transition-all text-sm font-medium ${data.category === o ? 'bg-[#D4F05A] text-[#0B1A28] border-[#D4F05A]' : 'border-black/10 text-slate-600 hover:border-black/20 bg-transparent'}`}>
                              {data.category === o ? <CheckIcon /> : CategoryIcons[o]}
                              <span className="whitespace-nowrap">{o}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-10">
                        <div className="space-y-8">
                          <h2 className="text-[34px] leading-tight sm:text-4xl font-semibold text-[#0B1A28]">What do you need?</h2>
                          <div className="flex flex-wrap gap-3">
                            {needsOptions.map((o) => {
                              const active = data.needs.includes(o)
                              return (
                                <motion.div key={o} onClick={() => setData({ ...data, needs: active ? data.needs.filter(n => n !== o) : [...data.needs, o] })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex flex-auto sm:flex-initial justify-center items-center px-5 py-3.5 rounded-full border cursor-pointer transition-all text-sm font-medium ${active ? 'bg-[#D4F05A] text-[#0B1A28] border-[#D4F05A]' : 'border-black/10 text-slate-600 bg-transparent'}`}>
                                  {active && <CheckIcon />}
                                  <span className="whitespace-nowrap">{o}</span>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                        <input placeholder="Brand Name or Link *" className="w-full border-b border-black/15 bg-transparent py-4 text-lg sm:text-xl placeholder:text-slate-400 focus:border-[#0B1A28] outline-none text-[#0B1A28] transition-colors" value={data.product} onChange={(e) => setData({ ...data, product: e.target.value })} />
                      </div>
                    )}
                    {step === 3 && (
                      <div className="space-y-8">
                        <h2 className="text-[34px] leading-tight sm:text-4xl font-semibold text-[#0B1A28]">The Timeline</h2>
                        <div className="flex flex-wrap gap-3">
                          {timelineOptions.map(o => (
                            <motion.button key={o} onClick={() => setData({ ...data, timeline: o })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex flex-auto sm:flex-initial justify-center items-center px-5 py-3.5 rounded-full border cursor-pointer transition-all text-sm font-medium ${data.timeline === o ? 'bg-[#D4F05A] text-[#0B1A28] border-[#D4F05A]' : 'border-black/10 text-slate-600 bg-transparent'}`}>
                              {data.timeline === o && <CheckIcon />}
                              <span className="whitespace-nowrap">{o}</span>
                            </motion.button>
                          ))}
                        </div>
                        <div className="space-y-2 pt-6">
                          <input placeholder="Your Name" className="w-full border-b border-black/15 bg-transparent py-4 text-base placeholder:text-slate-400 focus:border-[#0B1A28] outline-none text-[#0B1A28] transition-colors" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                          <input placeholder="Email or @Instagram" className="w-full border-b border-black/15 bg-transparent py-4 text-base placeholder:text-slate-400 focus:border-[#0B1A28] outline-none text-[#0B1A28] transition-colors" value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex flex-col sm:flex-row-reverse gap-3 shrink-0">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={next} className="flex-1 bg-[#D4F05A] text-[#0B1A28] font-semibold py-4 rounded-full border border-[#B5CE4D] shadow-sm">
                  {step === TOTAL_STEPS ? 'Initialize via WhatsApp' : 'Continue'}
                </motion.button>
                {step > 1 && (
                  <button onClick={() => setStep((step - 1) as Step)} className="px-10 py-4 border border-black/10 text-[#0B1A28] rounded-full font-medium hover:bg-black/5 transition-colors bg-transparent">Back</button>
                )}
              </div>
              {error && <p className="text-red-500 text-sm font-medium text-center pt-4">{error}</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}