import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContactOverlayProvider } from '@/components/contact-overlay'
import { SEOSchema } from '@/components/seo-schema'
import { ThemeDetector } from '@/components/theme-detector'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://theskitbit.com'),
  title: 'High-End 3D Product Rendering for E-commerce | Skitbit',
  description: 'Elevate your brand with photorealistic 3D product rendering. Skitbit creates high-converting CGI visuals for ads and PDPs without the photoshoot.',
  generator: 'Skitbit International',
  keywords: ['3D product rendering', 'e-commerce product visuals', 'product photography alternative', 'CGI product images', 'digital product rendering', 'ad creatives', 'product visualization'],
  authors: [{ name: 'Skitbit International' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theskitbit.com',
    title: 'High-End 3D Product Rendering for E-commerce | Skitbit',
    description: 'Elevate your brand with photorealistic 3D product rendering. Skitbit creates high-converting CGI visuals for ads and PDPs without the photoshoot.',
    images: [
      {
        url: '/skien.jpg',
        width: 1200,
        height: 630,
        alt: 'Skitbit 3D Product Rendering',
      },
    ],
    siteName: 'Skitbit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-End 3D Product Rendering for E-commerce | Skitbit',
    description: 'Elevate your brand with photorealistic 3D product rendering. Skitbit creates high-converting CGI visuals for ads and PDPs without the photoshoot.',
    creator: '@skitbit',
    images: ['/skien.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-black.svg', media: '(prefers-color-scheme: light)', type: 'image/svg+xml' },
      { url: '/icon-white.svg', media: '(prefers-color-scheme: dark)', type: 'image/svg+xml' },
      { url: '/icon-black.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/', 
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SEOSchema />
        <ThemeDetector />
        <ContactOverlayProvider>
          {children}
        </ContactOverlayProvider>

        <Analytics />
        <CookieConsent /> 
      </body>
    </html>
  )
}