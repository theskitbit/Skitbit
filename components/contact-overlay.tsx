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

function ContactOverlay({ isOpen, onClose }: any) {
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ category: '', needs: [] as string[], timeline: '', product: '', name: '', contact: '' })

  useEffect(() => { setMounted(true) }, [])

  const next = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Airtable submission
      await saveFormToAirtable({
        name: data.name,
        contact: data.contact,
        product: data.product,
        category: data.category,
        needs: data.needs,
        timeline: data.timeline
      }).catch(console.error)
      
      const msg = `Brief: ${data.product}\nCategory: ${data.category}\nNeeds: ${data.needs.join(', ')}\nTimeline: ${data.timeline}\nName: ${data.name}\nContact: ${data.contact}`
      window.open(`https://wa.me/918384092211?text=${encodeURIComponent(msg)}`, '_blank')
      window.location.href = '/contact-success'
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 bg-[#F6F7F2] p-6 flex flex-col justify-center items-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-2xl">✕</button>
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold">Step {step}</h2>
          {step === 1 && <input className="w-full border p-2" placeholder="Category" onChange={e => setData({...data, category: e.target.value})} />}
          {step === 2 && <input className="w-full border p-2" placeholder="Product/Brand" onChange={e => setData({...data, product: e.target.value})} />}
          {step === 3 && (
            <div className="space-y-4">
              <input className="w-full border p-2" placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
              <input className="w-full border p-2" placeholder="Contact" onChange={e => setData({...data, contact: e.target.value})} />
            </div>
          )}
          <button onClick={next} className="w-full bg-black text-white p-3 rounded-full">
             {step === 3 ? 'Send' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}