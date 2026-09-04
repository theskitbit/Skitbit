import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ContactOverlayProvider } from '@/components/contact-overlay'
import { SEOSchema } from '@/components/seo-schema'
import { ThemeDetector } from '@/components/theme-detector'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

// Configure fonts with CSS variable names for seamless global CSS integration
const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NFLHXXGK'

export const metadata: Metadata = {
  metadataBase: new URL('https://theskitbit.com'),
  title: '3D Product Animation & CGI Rendering Agency | Skitbit',
  description:
    'High-converting 3D CGI product videos & renders for cosmetics, skincare, wellness & luxury brands. Trusted by 200+ global brands. Get a quote!',
  generator: 'Skitbit International',
  keywords: [
    '3D Product Animation',
    '3D Product Animation Company',
    '3D Product Animation Studio',
    '3D Product Rendering Agency',
    '3D Product Video Agency',
    'CGI Product Animation',
    'CGI Product Rendering',
    'Photoreal CGI Studio',
    'Ecommerce Product Visuals',
    'Beauty Product Animation',
    'Cosmetic Product Rendering',
    'Luxury Watch Rendering',
    '3D Product Animation Agency Mumbai',
    '3D Product Animation Agency US',
  ],
  authors: [{ name: 'Skitbit International' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theskitbit.com',
    title: '3D Product Animation & CGI Rendering Agency | Skitbit',
    description:
      'High-converting 3D CGI product videos & renders for cosmetics, skincare, wellness & luxury brands. Trusted by 200+ global brands. Get a quote!',
    images: [
      {
        url: '/skien.jpg',
        width: 1200,
        height: 630,
        alt: 'Skitbit 3D Product Rendering Studio',
      },
    ],
    siteName: 'Skitbit International',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Product Animation & CGI Studio | Skitbit',
    description:
      'Photoreal 3D product animation, CGI and rendering for e-commerce, beauty, and luxury brands worldwide.',
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
    canonical: 'https://theskitbit.com/',
    languages: {
      'en-IN': '/in',
      'en-US': '/us',
      'en-GB': '/uk',
      'en-AE': '/ae',
      'en-CA': '/ca',
      'en-AU': '/au',
      'en-DE': '/de',
      'en-FR': '/fr',
    },
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Next.js automatically injects metadata and font preload links here */}
      </head>
      <body className={`${geist.className} font-sans antialiased`}>
        {/* GOOGLE TAG MANAGER */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* UNIFIED GOOGLE BASE SCRIPT (Loads library for both GA4 & Ads) */}
        <Script
          id="google-gtag-base"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3K1XLE2F7M"
        />
        
        {/* UNIFIED GOOGLE CONFIGURATION */}
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Analytics 4
            gtag('config', 'G-3K1XLE2F7M');
            
            // Google Ads
            gtag('config', 'AW-10791428257');
          `}
        </Script>

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
        <SpeedInsights />
        <CookieConsent />
      </body>
    </html>
  )
}
