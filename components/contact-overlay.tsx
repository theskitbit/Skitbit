'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { saveFormToAirtable } from '@/app/actions' // Keep this here

// ... [Keep your types, icons, and configuration constants] ...

export function ContactOverlay({ isOpen, onClose }: any) {
  // ... [Keep your existing state, useEffects, and logic] ...

  const next = async () => {
    const validationError = validateStep()
    if (validationError) return setError(validationError)
    
    setError('')
    
    if (step < TOTAL_STEPS) { 
      setDirection(1)
      setStep((step + 1) as Step) 
    } else { 
      try {
        // Airtable logic only here
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

  // ... [Keep your existing UI JSX] ...
}