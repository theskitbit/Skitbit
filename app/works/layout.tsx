// app/works/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // Expanded title to hit the ~50-60 character sweet spot for SEO
  title: 'Our Work | 3D Product Animation & Rendering | SKITBIT',
  description: 'Precision-crafted 3D experiences and premium product visualizations for high-growth brands.',
  alternates: {
    // FIX: Forces Google to index this specific page rather than falling back to the homepage
    canonical: 'https://theskitbit.com/works',
  },
  openGraph: {
    title: 'Our Work | 3D Product Animation & Rendering | SKITBIT',
    description: 'Precision-crafted 3D experiences and premium product visualizations for high-growth brands.',
    type: 'website',
    url: 'https://theskitbit.com/works',
  }
}

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}