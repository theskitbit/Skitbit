'use server'

import { headers } from 'next/headers'

const FREE_EMAIL_DOMAINS = new Set(['gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com'])

function normalizeWebsite(value: string) {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`
  let url: URL
  try { url = new URL(candidate) } catch { throw new Error('Invalid website or product link') }
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.') || url.hostname.split('.').some((part) => !part)) throw new Error('Invalid website or product link')
  return url.toString()
}

function validateWorkEmail(value: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error('Invalid work email')
  const domain = value.split('@')[1].toLowerCase()
  if (FREE_EMAIL_DOMAINS.has(domain)) throw new Error('Please use a work email')
}

export async function getPhoneCountryCode() {
  const requestHeaders = await headers()
  const country = (requestHeaders.get('x-vercel-ip-country') || requestHeaders.get('cf-ipcountry') || '').toUpperCase()
  const codes: Record<string, string> = { IN: '+91', US: '+1', CA: '+1', GB: '+44', AU: '+61', AE: '+971', SG: '+65', DE: '+49', FR: '+33', NL: '+31', JP: '+81' }
  return codes[country] || '+91'
}

interface LeadData {
  name: string
  contact: string
  product: string
  category: string
  needs: string[]
  timeline: string
  phone: string
}

const MAX_FIELD_LENGTH = 500
const MAX_NEEDS = 20

function cleanString(value: unknown, field: string) {
  if (typeof value !== 'string') throw new Error(`Invalid ${field}`)
  const result = value.trim()
  if (!result || result.length > MAX_FIELD_LENGTH) throw new Error(`Invalid ${field}`)
  return result
}

function validateLeadData(input: unknown): LeadData {
  if (!input || typeof input !== 'object') throw new Error('Invalid form data')
  const data = input as Partial<LeadData>
  if (!Array.isArray(data.needs) || data.needs.length > MAX_NEEDS) throw new Error('Invalid needs')
  const needs = data.needs.map((value) => cleanString(value, 'needs'))
  const contact = cleanString(data.contact, 'contact')
  validateWorkEmail(contact)
  const product = normalizeWebsite(cleanString(data.product, 'product'))
  const phone = cleanString(data.phone, 'phone')
  if (!/^\+?[0-9 ()-]{7,20}$/.test(phone)) throw new Error('Invalid phone')
  return {
    name: cleanString(data.name, 'name'),
    contact,
    product,
    category: cleanString(data.category, 'category'),
    needs,
    timeline: cleanString(data.timeline, 'timeline'),
    phone,
  }
}

export async function saveFormToAirtable(input: LeadData) {
  let data: LeadData
  try {
    data = validateLeadData(input)
  } catch {
    return { success: false, error: 'Please check the submitted form fields.' }
  }

  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  const pat = process.env.AIRTABLE_PAT
  if (!baseId || !tableName || !pat) {
    console.error('[lead] Airtable configuration is incomplete')
    return { success: false, error: 'The form is temporarily unavailable.' }
  }

  const body = { fields: { Name: data.name, 'Contact Info': data.contact, 'Phone Number': data.phone, Brand: data.product, Industry: data.category, Needs: data.needs, Timeline: data.timeline, Status: 'New' } }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, { method: 'POST', headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store' })
    if (!response.ok) {
      console.error('[lead] Airtable request failed', response.status)
      return { success: false, error: 'We could not submit your request. Please try again.' }
    }
    const json = await response.json()
    return { success: true, record: { id: json.id } }
  } catch (error) {
    console.error('[lead] Airtable request error', error instanceof Error ? error.message : 'unknown')
    return { success: false, error: 'We could not submit your request. Please try again.' }
  }
}
