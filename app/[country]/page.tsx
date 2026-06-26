import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCountryPage, getAllCountryCodes } from '@/data/country-pages'
import { CountryPageTemplate } from '@/components/country-page-template'

// This prevents the route from catching non-country paths like /sitemap.xml
export const dynamicParams = false; 

export async function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({
    country: code,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params
  
  // Guard Clause: If the route is hijacked, return empty metadata immediately
  if (country === 'sitemap.xml') return {}

  const countryContent = getCountryPage(country)

  if (!countryContent) {
    return {}
  }

  const title = `${countryContent.hero.headline} | Skitbit`
  const description = countryContent.hero.subheadline
  const url = `https://theskitbit.com/${country}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Skitbit',
      type: 'website',
    },
    alternates: {
      canonical: url,
      languages: {
        en: 'https://theskitbit.com/',
        'en-US': 'https://theskitbit.com/us',
        'en-GB': 'https://theskitbit.com/uk',
        'en-CA': 'https://theskitbit.com/ca',
        'en-AU': 'https://theskitbit.com/au',
        'en-AE': 'https://theskitbit.com/ae',
      },
    },
  }
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params

  // Guard Clause: If the route is hijacked, force a 404 to stop execution
  if (country === 'sitemap.xml') {
    notFound()
  }

  const countryContent = getCountryPage(country)

  if (!countryContent) {
    notFound()
  }

  const canonical = `https://theskitbit.com/${country}`

  return <CountryPageTemplate content={countryContent} canonical={canonical} />
}