'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// Ensure this path matches where your actual Airtable action lives, or remove if not using it here
import { saveFormToAirtable } from '@/app/actions' 

const LandingContactContext = createContext<any>(null)

export function useLandingContact() {
  const ctx = useContext(LandingContactContext)
  if (!ctx) throw new Error('Wrap with LandingContactProvider')
  return ctx
}

export function LandingContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <LandingContactContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <Suspense fallback={null}>
        <LandingContactOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Suspense>
    </LandingContactContext.Provider>
  )
}

type Step = 1 | 2 | 3
const TOTAL_STEPS = 3

function LandingContactOverlay({ isOpen, onClose }: any) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState({ currentUrl: '', problem: '', timeline: '', name: '', contact: '' })
  const [error, setError] = useState('')

  const messageText = `Lead: Landing Page Architecture\nURL: ${data.currentUrl}\nProblem: ${data.problem}\nTimeline: ${data.timeline}\nName: ${data.name}\nContact: ${data.contact}`
  const whatsappUrl = `https://wa.me/918384092211?text=${encodeURIComponent(messageText)}`

  const validateStep = () => {
    if (step === 1 && !data.currentUrl.trim()) return 'Enter your current website or type None'
    if (step === 2 && !data.problem) return 'Select the primary issue'
    if (step === 3 && (!data.name.trim() || !data.contact.trim() || !data.timeline)) return 'Complete all details'
    return ''
  }

  const next = () => {
    const err = validateStep()
    if (err) return setError(err)
    setError('')
    
    if (step < TOTAL_STEPS) {
      setStep((step + 1) as Step)
    } else {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-10791428257/4CAoCKP-ucAcEKHB4Jko',
            'value': 1.0,
            'currency': 'INR'
        });
      }

      saveFormToAirtable(data).catch(console.error)
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      window.location.href = `/contact-success`
    }
  }

  useEffect(() => { setMounted(true); if (isOpen) setStep(1) }, [isOpen])
  if (!mounted || !isOpen) return null

  const problemOptions = ['Low Conversion Rate', 'Slow Load Speed', 'Poor Mobile Layout', 'Starting from scratch']
  const timelineOptions = ['Immediate start', 'Next 14 days', 'Planning phase']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 bg-[#0B1A28] overflow-y-auto text-white flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          
          <div className="flex justify-between items-center px-6 py-6 max-w-5xl w-full mx-auto shrink-0">
             <div className="text-sm font-medium text-slate-400">Step {step} of {TOTAL_STEPS}</div>
             <button type="button" onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-xl">✕</button>
          </div>

          <div className="flex-1 flex flex-col px-6 pb-8">
            <div className="max-w-xl w-full mx-auto flex-1 flex flex-col justify-center">
                
                {step === 1 && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold">Where are you sending traffic right now?</h2>
                    <input 
                      placeholder="Current Website URL" 
                      className="w-full border-b border-white/20 bg-transparent py-4 text-white focus:border-white outline-none transition-colors" 
                      value={data.currentUrl} 
                      onChange={(e) => setData({ ...data, currentUrl: e.target.value })} 
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold">What is the main problem?</h2>
                    <div className="flex flex-col gap-3">
                      {problemOptions.map(o => (
                        <button 
                          key={o} 
                          onClick={() => setData({ ...data, problem: o })} 
                          className={`text-left px-6 py-4 border transition-colors ${data.problem === o ? 'border-white bg-white/10' : 'border-white/20 hover:border-white/50'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold">Final Details</h2>
                    <div className="flex flex-wrap gap-3">
                      {timelineOptions.map(o => (
                        <button 
                          key={o} 
                          onClick={() => setData({ ...data, timeline: o })} 
                          className={`px-5 py-3 border rounded-full transition-colors ${data.timeline === o ? 'border-white bg-white text-black' : 'border-white/20 hover:border-white/50'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                    <input placeholder="Your Name" className="w-full border-b border-white/20 bg-transparent py-4 text-white focus:border-white outline-none transition-colors mt-6" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <input placeholder="Email or WhatsApp Number" className="w-full border-b border-white/20 bg-transparent py-4 text-white focus:border-white outline-none transition-colors mt-2" value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} />
                  </div>
                )}

                <div className="flex gap-4 mt-12">
                  {step > 1 && <button onClick={() => setStep((step - 1) as Step)} className="px-8 py-4 border border-white/20 hover:bg-white/5 transition-colors">Back</button>}
                  <button onClick={next} className="flex-1 bg-white text-black py-4 font-bold hover:bg-gray-200 transition-colors">
                    {step === TOTAL_STEPS ? 'Submit Request' : 'Next'}
                  </button>
                </div>
                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}