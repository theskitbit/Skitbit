import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rhuq6lk0'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const readToken = process.env.SANITY_API_READ_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: readToken,
})

export interface WorkItem {
  _id: string
  title: string
  description: string
  seoTitle?: string
  seoDescription?: string
  type: 'animation' | 'render'
  mediaUrl: string
  posterUrl?: string
  gallery?: Array<{
    _key: string
    url: string
    alt: string
  }>
  formatTag: string
  industries: string[]
  fidelityTag: string
  slug: {
    current: string
  }
}

export const WORK_ITEMS_QUERY = `
  *[_type == "workItem"] | order(_createdAt desc) {
    _id,
    title,
    description,
    type,
    mediaUrl,
    posterUrl,
    gallery[]{_key, "url": image.asset->url, "alt": coalesce(image.alt, title)},
    formatTag,
    industries,
    fidelityTag,
    slug,
  }
`

export async function getWorkItems(): Promise<WorkItem[]> {
  return client.fetch(WORK_ITEMS_QUERY)
}

export const HOMEPAGE_SETTINGS_QUERY = `
  *[_type == "homepageSettings"][0]{
    heroStills[]->{
      _id,
      title,
      type,
      mediaUrl,
      posterUrl,
      gallery[]{_key, "url": image.asset->url, "alt": coalesce(image.alt, title)}
    }
  }
`

export async function getHomepageSettings() {
  return client.fetch<{ heroStills?: WorkItem[] } | null>(HOMEPAGE_SETTINGS_QUERY)
}

export async function getUniqueIndustries(): Promise<string[]> {
  const items = await getWorkItems()
  const industries = new Set<string>()
  items.forEach((item) => {
    item.industries.forEach((ind) => industries.add(ind))
  })
  return Array.from(industries).sort()
}

export const MOBILE_NAVIGATION_QUERY = `*[_type == "mobileNavigation"][0]{
  primaryLinks[]{_key, label, href},
  featuredCards[]{_key, title, subtitle, href, alt, "imageUrl": image.asset->url},
  groups[]{_key, title, links[]{_key, label, href}},
  utilityLinks[]{_key, label, href}
}`

export async function getMobileNavigation() {
  return client.fetch(MOBILE_NAVIGATION_QUERY)
}
