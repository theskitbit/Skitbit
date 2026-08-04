'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
      <ContactOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactOverlayContext.Provider>
  )
}

type Step = 1 | 2 | 3
const TOTAL_STEPS = 3

const CheckIcon = () => (
  <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </motion.svg>
)

const CategoryIcons: Record<string, ReactNode> = {
  'Skincare': <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  'Supplements': <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  'Beauty': <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5" /></svg>,
  'Wellness': <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
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

  if (!mounted) return null

  const whatsappUrl = `https://wa.me/918384092211?text=${encodeURIComponent(`Hi Adnan, brief for: ${data.product}\nCategory: ${data.category}\nNeeds: ${data.needs.join(', ')}\nTimeline: ${data.timeline}\n\nName: ${data.name}\nContact: ${data.contact}`)}`

  const next = () => {
    if (step === 1 && !data.category) return setError('Please select a category')
    if (step === 2) {
      if (data.needs.length === 0) return setError('Select at least one requirement')
      if (!data.product.trim()) return setError('Enter your brand name or link')
    }
    if (step === 3) {
      if (!data.timeline || !data.name.trim() || !data.contact.trim()) return setError('Please complete the details')
    }
    setError('')
    if (step < TOTAL_STEPS) { setDirection(1); setStep((step + 1) as Step) }
    else { window.open(whatsappUrl, '_blank') }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm text-foreground flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-muted fixed top-0 left-0 z-50">
            <motion.div className="h-full bg-primary" animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }} transition={{ duration: 0.3 }} />
          </div>

          {/* TOP NAV - FIXED LAYOUT */}
          <div className="flex justify-between items-center px-6 py-8 max-w-5xl w-full mx-auto">
            <div className="flex items-center gap-3 select-none">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-foreground text-[10px] font-bold leading-none">
                {step}
              </span>
              <span className="text-sm font-medium text-muted-foreground/60 leading-none translate-y-[0.5px]">
                of {TOTAL_STEPS}
              </span>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors opacity-50 hover:opacity-100">✕</button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
            <div className="max-w-xl w-full py-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={step} custom={direction} initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col gap-10">

                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-4xl font-semibold">What are you building?</h2>
                      <div className="flex gap-3 flex-wrap">
                        {['Skincare', 'Supplements', 'Beauty', 'Wellness'].map(o => (
                          <motion.div key={o} onClick={() => setData({ ...data, category: o })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex items-center px-6 py-3 rounded-full border cursor-pointer transition-all ${data.category === o ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                            {data.category === o ? <CheckIcon /> : CategoryIcons[o]}
                            <span className="font-medium">{o}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold">What do you need?</h2>
                        <div className="flex flex-wrap gap-3">
                          {['Launch Visuals', 'Ad Creatives', 'Product Video', 'Web Images'].map((o) => {
                            const active = data.needs.includes(o)
                            return (
                              <motion.div key={o} onClick={() => setData({ ...data, needs: active ? data.needs.filter(n => n !== o) : [...data.needs, o] })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex items-center px-6 py-3 rounded-full border cursor-pointer transition-all ${active ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'}`}>
                                {active && <CheckIcon />}
                                <span className="font-medium">{o}</span>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                      <input placeholder="Brand Name or Link *" className="w-full border-b-2 border-border bg-transparent py-3 text-xl focus:border-primary outline-none" value={data.product} onChange={(e) => setData({ ...data, product: e.target.value })} />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <h2 className="text-3xl md:text-4xl font-semibold">The Timeline</h2>
                      <div className="flex gap-3 flex-wrap">
                        {['ASAP', 'Within 2 weeks', 'Next month'].map(o => (
                          <motion.button key={o} onClick={() => setData({ ...data, timeline: o })} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex items-center px-6 py-3 rounded-full border cursor-pointer transition-all ${data.timeline === o ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'border-border text-muted-foreground'}`}>
                            {data.timeline === o && <CheckIcon />}
                            <span className="font-medium">{o}</span>
                          </motion.button>
                        ))}
                      </div>
                      <div className="space-y-4 pt-4 border-t border-border">
                        <input placeholder="Your Name" className="w-full border-b-2 border-border bg-transparent py-3 text-lg focus:border-primary outline-none" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                        <input placeholder="Email or @Instagram" className="w-full border-b-2 border-border bg-transparent py-3 text-lg focus:border-primary outline-none" value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex flex-col sm:flex-row-reverse gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={next} className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-full shadow-sm">{step === TOTAL_STEPS ? 'Initialize via WhatsApp' : 'Continue'}</motion.button>
                {step > 1 && <button onClick={() => setStep((step - 1) as Step)} className="px-10 py-4 border-2 border-border rounded-full font-medium hover:bg-muted transition-colors">Back</button>}
              </div>
              {error && <p className="mt-6 text-destructive text-sm font-medium text-center">{error}</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}