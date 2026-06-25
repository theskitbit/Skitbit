import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next' // 1. Added SpeedInsights Import
import { ContactOverlayProvider } from '@/components/contact-overlay'
import { SEOSchema } from '@/components/seo-schema'
import { ThemeDetector } from '@/components/theme-detector'
import { CookieConsent } from '@/components/cookie-consent'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Metadata Object - FIXED FOR SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://theskitbit.com'),
  title: '3D Product Rendering for E-commerce Brands | No Photoshoots Needed',
  description: 'High-end 3D product visuals designed for performance. Create consistent creatives across ads, PDPs, and social—without production delays.',
  generator: 'Skitbit International',
  keywords: ['3D product rendering', 'e-commerce product visuals', 'product photography alternative', 'CGI product images', 'digital product rendering', 'ad creatives', 'product visualization'],
  authors: [{ name: 'Skitbit International' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theskitbit.com',
    title: '3D Product Rendering for E-commerce Brands | No Photoshoots Needed',
    description: 'High-end 3D product visuals designed for performance. Create consistent creatives across ads, PDPs, and social—without production delays.',
    images: [
      {
        url: '/skien.jpg',
        width: 1200,
        height: 630,
        alt: 'SKITBIT 3D Product Rendering',
      },
    ],
    siteName: 'Skitbit International',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Product Rendering for E-commerce Brands | No Photoshoots Needed',
    description: 'High-end 3D product visuals designed for performance.',
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
      <head>
        <Script
          id="tracking-scripts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;
                b.head.appendChild(t);
                }(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                
                fbq('set', 'autoConfig', false, '936091006015773'); 
                fbq('init', '936091006015773');
                fbq('track', 'PageView');

                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-10791428257';
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-10791428257');

              } catch(e) {
                console.warn('Tracking initialization warning:', e.message);
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <SEOSchema />
        <ThemeDetector />
        <ContactOverlayProvider>
          {children}
        </ContactOverlayProvider>

        <Analytics />
        <SpeedInsights /> {/* 2. Added Component here */}
        <CookieConsent /> 

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=936091006015773&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>
      </body>
    </html>
  )
}