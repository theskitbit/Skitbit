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
  type: 'animation' | 'render'
  mediaUrl: string
  posterUrl?: string
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
    formatTag,
    industries,
    fidelityTag,
    slug,
  }
`

export async function getWorkItems(): Promise<WorkItem[]> {
  return client.fetch(WORK_ITEMS_QUERY)
}

export async function getUniqueIndustries(): Promise<string[]> {
  const items = await getWorkItems()
  const industries = new Set<string>()
  items.forEach((item) => {
    item.industries.forEach((ind) => industries.add(ind))
  })
  return Array.from(industries).sort()
}