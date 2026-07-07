// app/works/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | SKITBIT',
  description: 'Precision-crafted 3D experiences and premium product visualizations for high-growth brands.',
  openGraph: {
    title: 'Our Work | SKITBIT',
    description: 'Precision-crafted 3D experiences and premium product visualizations for high-growth brands.',
    type: 'website',
    // url: 'https://skitbit.com/works',
    // images: ['/og-works.jpg'], // Add an Open Graph image path here later
  }
}

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}