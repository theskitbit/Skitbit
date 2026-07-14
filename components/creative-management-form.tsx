'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const WHATSAPP_NUMBER = '918384092211'
const initialFormData = { fullName: '', brandName: '', phone: '' }

export function CreativeManagementForm({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    const message = `Name: ${formData.fullName}\nBrand: ${formData.brandName}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
    window.location.href = '/contact-success'
  }

  return (
    <div className="fixed inset-0 z-50 bg-white p-10">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-black mb-8">Performance Creative Form</h1>
        {step === 1 && <input className="border p-2 w-full" placeholder="Full Name" onChange={e => setFormData({...formData, fullName: e.target.value})} />}
        {step === 2 && <input className="border p-2 w-full" placeholder="Brand Name" onChange={e => setFormData({...formData, brandName: e.target.value})} />}
        {step === 3 && <input className="border p-2 w-full" placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} />}
        
        <button type="submit" className="mt-8 bg-black text-white px-8 py-4 rounded-full">
          {step === 3 ? 'Continue on WhatsApp' : 'Continue'}
        </button>
      </form>
    </div>
  )
}