import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContactOverlayProvider } from '@/components/contact-overlay'
import { SEOSchema } from '@/components/seo-schema'
import { ThemeDetector } from '@/components/theme-detector'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NFLHXXGK'

export const metadata: Metadata = {
  metadataBase: new URL('https://theskitbit.com'),
 title: '3D Product Animation Company | Photoreal CGI | Skitbit',
  description:
  'Photoreal 3D product animation, CGI and product rendering for ecommerce brands. Create high-converting visuals that drive clicks, sales and product launches.',
  generator: 'Skitbit International',
  keywords: [
  '3D Product Animation',
  '3D Product Animation Company',
  '3D Product Animation Studio',
  '3D Product Rendering',
  '3D Product Video Agency',
  'CGI Product Animation',
  'CGI Product Rendering',
  'Photoreal CGI',
  'Product Visualization',
  'Ecommerce Product Animation',
  'Beauty Product Animation',
  'Cosmetic Product Rendering',
  'Luxury Product Rendering',
  'Product Launch Animation',
  '3D Rendering Company',
],
  authors: [{ name: 'Skitbit International' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theskitbit.com',
    title: '3D Product Animation Company | Photoreal CGI | Skitbit',
    description:
  'Photoreal 3D product animation, CGI and product rendering for ecommerce brands. Create high-converting visuals that drive clicks, sales and product launches.',
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
    title: '3D Product Animation Company | Photoreal CGI | Skitbit',
    description:
  'Photoreal 3D product animation, CGI and product rendering for ecommerce brands. Create high-converting visuals that drive clicks, sales and product launches.',
    creator: '@theskitbit',
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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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