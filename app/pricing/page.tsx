import type { Metadata } from 'next'

import { PricingContent } from '@/components/pricing-client'

export const metadata: Metadata = {
  metadataBase: new URL("https://theskitbit.com"),
  title: "Pricing | Skitbit – Simple 3D Product Rendering Packages",
  description:
    "Transparent pricing for 3D product rendering, animation, and CGI creative systems. Starter, Content System, and Growth packages for D2C brands.",
  alternates: {
    canonical: "/pricing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://theskitbit.com/pricing",
    title: "Pricing | Skitbit – Simple 3D Product Rendering Packages",
    description:
      "Transparent pricing for 3D product rendering, animation, and CGI creative systems. Starter, Content System, and Growth packages for D2C brands.",
    images: [
      {
        url: "/skien.jpg",
        width: 1200,
        height: 630,
        alt: "Skitbit Pricing",
      },
    ],
    siteName: "Skitbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Skitbit – Simple 3D Product Rendering Packages",
    description:
      "Transparent pricing for 3D product rendering, animation, and CGI creative systems. Starter, Content System, and Growth packages for D2C brands.",
    creator: "@skitbit",
    images: ["/skien.jpg"],
  },
}

export default function PricingPage() {
  return <PricingContent />
}
