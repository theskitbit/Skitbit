import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Performance That Drives Serious Revenue for D2C Brands | Skitbit',
  description:
    'Skitbit helps D2C brands grow profitable revenue through paid social, Google Ads, performance creative and testing built to acquire new customers.',
  openGraph: {
    title: 'Performance That Drives Serious Revenue for D2C Brands | Skitbit',
    description:
      'Skitbit helps D2C brands grow profitable revenue through paid social, Google Ads, performance creative and testing built to acquire new customers.',
    type: 'website',
    siteName: 'Skitbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance That Drives Serious Revenue for D2C Brands | Skitbit',
    description:
      'Skitbit helps D2C brands grow profitable revenue through paid social, Google Ads, performance creative and testing built to acquire new customers.',
  },
}

export default function PerformanceCreativeManagementLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return children
}