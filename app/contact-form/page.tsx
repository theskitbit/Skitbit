import { Metadata } from 'next'
import { CreativeManagementForm } from '@/components/creative-management-form'

export const metadata: Metadata = {
  title: 'Performance Creative Management Form | Skitbit',
  description: 'Get a free creative audit for your brand. Tell us about your goals and we\'ll create a custom plan.',
}

export default function ContactFormPage() {
  return <CreativeManagementForm />
}
